// Product details page functionality
let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupHeaderSearch();
  loadProduct();
});

function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    window.location.href = 'shop.html';
    return;
  }

  currentProduct = getProductById(productId);

  if (!currentProduct) {
    window.location.href = 'shop.html';
    return;
  }

  renderProductDetails();
  loadRelatedProducts();
}

function renderProductDetails() {
  // Update breadcrumb
  document.getElementById('breadcrumbProduct').textContent = currentProduct.name;

  // Update title
  document.title = `${currentProduct.name} - Acme Beauty`;

  // Update image
  const imageContainer = document.getElementById('productImageContainer');
  imageContainer.innerHTML = `
    <img src="${currentProduct.image}" alt="${currentProduct.name}" style="width: 100%; height: 100%; object-fit: cover;"
         onerror="this.parentElement.innerHTML = '<div class=\"product-image-placeholder\"><div style=\"font-size: 3rem; margin-bottom: 10px;\">✨</div><p>${currentProduct.name}</p></div>'">
  `;

  // Update details
  document.getElementById('productCategory').textContent = currentProduct.category;
  document.getElementById('productName').textContent = currentProduct.name;
  document.getElementById('productPrice').textContent = `₹${currentProduct.price}`;
  document.getElementById('productOriginalPrice').textContent = `₹${currentProduct.originalPrice}`;
  document.getElementById('productDescription').textContent = currentProduct.description;
  document.getElementById('productRating').textContent = '★'.repeat(Math.floor(currentProduct.rating)) + '☆'.repeat(5 - Math.floor(currentProduct.rating));
  document.getElementById('productReviews').textContent = `(${currentProduct.reviewCount} reviews)`;

  // Calculate discount percentage
  const discountPercent = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);
  document.getElementById('discountPercent').textContent = `${discountPercent}% OFF`;

  // Update highlights
  const highlightsContainer = document.getElementById('productHighlights');
  highlightsContainer.innerHTML = currentProduct.highlights.map(highlight => `
    <li style="padding: var(--spacing-xs) 0; color: var(--secondary-text);">
      <span style="color: var(--primary-pink); margin-right: var(--spacing-sm);">✓</span>${highlight}
    </li>
  `).join('');
}

function loadRelatedProducts() {
  const container = document.getElementById('relatedProducts');
  if (!container) return;

  // Get related products from same category, excluding current product
  let related = PRODUCTS.filter(p =>
    p.category === currentProduct.category && p.id !== currentProduct.id
  );

  // If not enough, add from other categories
  if (related.length < 4) {
    related = related.concat(
      PRODUCTS.filter(p =>
        p.category !== currentProduct.category && p.id !== currentProduct.id
      ).slice(0, 4 - related.length)
    );
  }

  related = related.slice(0, 4);

  container.innerHTML = related.map(product => `
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
          <button class="btn btn-primary" onclick="addToCartFromProduct(${product.id})">Add</button>
          <a href="product.html?id=${product.id}" class="btn btn-outline btn-small" style="text-decoration: none; text-align: center;">View</a>
        </div>
      </div>
    </div>
  `).join('');
}

function increaseQuantity() {
  const input = document.getElementById('quantityInput');
  input.value = Math.max(1, parseInt(input.value) + 1);
}

function decreaseQuantity() {
  const input = document.getElementById('quantityInput');
  input.value = Math.max(1, parseInt(input.value) - 1);
}

function addProductToCart() {
  const quantity = Math.max(1, parseInt(document.getElementById('quantityInput').value) || 1);
  addToCart(currentProduct, quantity);
  document.getElementById('quantityInput').value = '1';
}

function buyNow() {
  const quantity = Math.max(1, parseInt(document.getElementById('quantityInput').value) || 1);
  addToCart(currentProduct, quantity);
  window.location.href = 'checkout.html';
}

function addToCartFromProduct(productId) {
  const product = getProductById(productId);
  if (product) {
    addToCart(product);
  }
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
