// Home page functionality
document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedProducts();
  setupMobileMenu();
  setupNewsletter();
  setupHeaderSearch();
});

function loadFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;

  // Get featured products (first 4)
  const featured = PRODUCTS.slice(0, 4);

  container.innerHTML = featured.map(product => `
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
          <button class="btn btn-primary" onclick="addToCartAndNotify({id: ${product.id}, name: '${product.name}', price: ${product.price}, originalPrice: ${product.originalPrice}, image: '${product.image}', category: '${product.category}'})">Add</button>
          <a href="product.html?id=${product.id}" class="btn btn-outline btn-small" style="text-decoration: none; text-align: center;">View</a>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCartAndNotify(product) {
  addToCart(product);
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
}

function setupNewsletter() {
  const form = document.getElementById('newsletterForm');
  const message = document.getElementById('newsletterMessage');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;

      if (validateEmail(email)) {
        message.textContent = `Thank you! Check ${email} for exclusive beauty tips.`;
        message.style.color = 'var(--primary-pink)';
        message.style.display = 'block';
        form.reset();

        setTimeout(() => {
          message.style.display = 'none';
        }, 4000);
      } else {
        message.textContent = 'Please enter a valid email address.';
        message.style.color = '#D32F2F';
        message.style.display = 'block';
      }
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
