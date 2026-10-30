// Shopping cart page functionality
let currentCart = [];
let currentPromoCode = '';

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupHeaderSearch();
  loadCart();
});

function loadCart() {
  currentCart = getCart();

  const emptyCart = document.getElementById('emptyCart');
  const cartContent = document.getElementById('cartContent');

  if (currentCart.length === 0) {
    emptyCart.style.display = 'block';
    cartContent.style.display = 'none';
  } else {
    emptyCart.style.display = 'none';
    cartContent.style.display = 'block';
    renderCartItems();
    updateOrderSummary();
  }
}

function renderCartItems() {
  const container = document.getElementById('cartItems');

  container.innerHTML = currentCart.map(item => `
    <div style="background-color: var(--white); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
      <div class="grid" style="grid-template-columns: 100px 1fr auto; gap: var(--spacing-lg); align-items: center;">
        <!-- Image -->
        <div style="border-radius: var(--radius-md); overflow: hidden; background-color: var(--light-gray); min-height: 100px; display: flex; align-items: center; justify-content: center;">
          <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;"
               onerror="this.parentElement.innerHTML = '<div style=\"font-size: 2rem;\">✨</div>'">
        </div>

        <!-- Details -->
        <div>
          <h4 style="margin-bottom: var(--spacing-sm);">${item.name}</h4>
          <p style="color: var(--secondary-text); margin: 0; font-size: 0.9rem;">${item.category}</p>
          <div style="margin-top: var(--spacing-sm);">
            <span style="font-weight: 600;">₹${item.price}</span>
            <span style="color: var(--secondary-text); text-decoration: line-through; margin-left: var(--spacing-sm);">₹${item.originalPrice}</span>
          </div>
        </div>

        <!-- Actions -->
        <div style="text-align: right;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-md); justify-content: flex-end;">
            <button class="btn btn-outline btn-small" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <input type="number" value="${item.quantity}" min="1" style="width: 50px; text-align: center; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: var(--spacing-xs);" onchange="updateQuantity(${item.id}, parseInt(this.value))">
            <button class="btn btn-outline btn-small" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <div style="font-weight: 600; margin-bottom: var(--spacing-md); color: var(--primary-text);">
            ₹${item.price * item.quantity}
          </div>
          <button class="btn btn-outline btn-small" onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function updateQuantity(productId, quantity) {
  quantity = Math.max(1, parseInt(quantity) || 1);
  updateCartItemQuantity(productId, quantity);
  loadCart();
}

function removeItem(productId) {
  if (confirm('Remove this item from cart?')) {
    removeFromCart(productId);
    loadCart();
  }
}

function updateOrderSummary() {
  const subtotal = calculateSubtotal(currentCart);
  const shipping = calculateShipping(subtotal);
  const discount = calculateDiscount(subtotal, currentPromoCode);
  const total = calculateTotal(subtotal, shipping, discount);

  document.getElementById('subtotalAmount').textContent = subtotal;
  document.getElementById('shippingAmount').textContent = shipping;
  document.getElementById('totalAmount').textContent = total;

  const discountRow = document.getElementById('discountRow');
  if (discount > 0) {
    document.getElementById('discountAmount').textContent = discount;
    discountRow.style.display = 'flex';
  } else {
    discountRow.style.display = 'none';
  }
}

function applyPromo() {
  const promoInput = document.getElementById('promoInput');
  const promoMessage = document.getElementById('promoMessage');
  const promoCode = promoInput.value.toUpperCase().trim();

  if (!promoCode) {
    promoMessage.textContent = 'Please enter a promo code';
    promoMessage.style.color = '#D32F2F';
    promoMessage.style.display = 'block';
    return;
  }

  if (promoCode === 'BEAUTY10') {
    currentPromoCode = 'BEAUTY10';
    promoMessage.textContent = '✓ BEAUTY10 applied - 10% discount';
    promoMessage.style.color = 'var(--primary-pink)';
  } else if (promoCode === 'GLOW15') {
    currentPromoCode = 'GLOW15';
    promoMessage.textContent = '✓ GLOW15 applied - 15% discount';
    promoMessage.style.color = 'var(--primary-pink)';
  } else {
    promoMessage.textContent = 'Invalid promo code';
    promoMessage.style.color = '#D32F2F';
  }

  promoMessage.style.display = 'block';
  updateOrderSummary();
}

function proceedToCheckout() {
  if (currentCart.length === 0) {
    showNotification('Your cart is empty', 'error');
    return;
  }
  window.location.href = 'checkout.html';
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
