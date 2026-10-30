// Shop page functionality
let currentProducts = [...PRODUCTS];
let currentFilters = {
  category: 'all',
  search: '',
  sort: 'featured'
};

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupHeaderSearch();
  loadCategories();
  loadProductsFromUrl();
  setupFilters();
  renderProducts();
});

function loadCategories() {
  const container = document.getElementById('categoryFilter');
  if (!container) return;

  const categories = ['All Products', ...getAllCategories()];
  container.innerHTML = categories.map(category => {
    const value = category === 'All Products' ? 'all' : category;
    return `
      <label style="display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer; font-weight: 500; color: var(--primary-text);">
        <input type="radio" name="category" value="${value}" ${value === 'all' ? 'checked' : ''} onchange="updateCategory(this.value)">
        ${category}
      </label>
    `;
  }).join('');
}

function loadProductsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get('search');

  if (searchQuery) {
    document.getElementById('searchInput').value = searchQuery;
    currentFilters.search = searchQuery;
  }
}

function setupFilters() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilters.search = e.target.value;
      applyFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilters.sort = e.target.value;
      applyFilters();
    });
  }
}

function updateCategory(category) {
  currentFilters.category = category;
  applyFilters();
}

function applyFilters() {
  let filtered = [...PRODUCTS];

  // Category filter
  if (currentFilters.category !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilters.category);
  }

  // Search filter
  if (currentFilters.search) {
    const query = currentFilters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  // Sort
  filtered = sortProducts(filtered, currentFilters.sort);

  currentProducts = filtered;
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyState');
  const productCount = document.getElementById('productCount');
  const clearBtn = document.getElementById('clearBtn');

  if (!grid) return;

  productCount.textContent = currentProducts.length;

  const hasActiveFilters = currentFilters.category !== 'all' ||
                          currentFilters.search !== '' ||
                          currentFilters.sort !== 'featured';

  if (clearBtn) {
    clearBtn.style.display = hasActiveFilters ? 'block' : 'none';
  }

  if (currentProducts.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    emptyState.style.display = 'none';

    grid.innerHTML = currentProducts.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}"
               onerror="this.parentElement.innerHTML = '<div class=\"product-image-placeholder\"><div style=\"font-size: 2.5rem; margin-bottom: 10px;\">✨</div><p>${product.name}</p></div>'">
        </div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h4 class="product-name">${product.name}</h4>
          <div class="product-price">
            <span class="price-current">₹${product.price}</span>
            <span class="price-original">₹${product.originalPrice}</span>
          </div>
          <div class="product-rating">★★★★★ (${product.reviewCount})</div>
          <div class="product-actions">
            <button class="btn btn-primary" onclick="addToCartFromShop(${product.id})">Add</button>
            <a href="product.html?id=${product.id}" class="btn btn-outline btn-small" style="text-decoration: none; text-align: center;">View</a>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function addToCartFromShop(productId) {
  const product = getProductById(productId);
  if (product) {
    addToCart(product);
  }
}

function clearFilters() {
  currentFilters = {
    category: 'all',
    search: '',
    sort: 'featured'
  };

  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value = 'featured';
  document.querySelector('input[name="category"][value="all"]').checked = true;

  window.history.replaceState({}, document.title, 'shop.html');
  applyFilters();
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
}

function setupHeaderSearch() {
  const searchInput = document.getElementById('headerSearch');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }
}
