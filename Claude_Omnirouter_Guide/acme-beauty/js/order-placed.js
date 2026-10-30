// Order placed confirmation page functionality
let orderData = null;

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupHeaderSearch();
  loadOrderData();
});

function loadOrderData() {
  orderData = getOrder();

  if (!orderData) {
    // No valid order - show fallback state
    showFallbackState();
    return;
  }

  displayOrderDetails();
}

function displayOrderDetails() {
  // Order information
  document.getElementById('orderReference').textContent = orderData.reference;
  document.getElementById('orderDate').textContent = orderData.date;
  document.getElementById('customerName').textContent = orderData.customer.fullName;
  document.getElementById('paymentMethod').textContent = getPaymentMethodLabel(orderData.paymentMethod);

  // Delivery address
  const addressParts = [
    orderData.customer.address1,
    orderData.customer.address2 ? orderData.customer.address2 : '',
    orderData.customer.city,
    orderData.customer.state,
    orderData.customer.pinCode
  ].filter(p => p).join(', ');

  document.getElementById('deliveryAddress').textContent = addressParts;

  // Total amount
  document.getElementById('totalAmount').textContent = orderData.total;

  // Order items
  renderOrderItems();

  // Price breakdown
  document.getElementById('breakdownSubtotal').textContent = orderData.subtotal;
  document.getElementById('breakdownShipping').textContent = orderData.shipping;
  document.getElementById('breakdownTotal').textContent = orderData.total;

  if (orderData.discount > 0) {
    document.getElementById('breakdownDiscount').textContent = orderData.discount;
    document.getElementById('breakdownDiscountRow').style.display = 'flex';
  }
}

function renderOrderItems() {
  const container = document.getElementById('orderItems');

  container.innerHTML = `
    <table class="table" style="width: 100%; text-align: left;">
      <thead>
        <tr>
          <th>Product</th>
          <th style="text-align: center;">Quantity</th>
          <th style="text-align: right;">Price</th>
          <th style="text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${orderData.items.map(item => `
          <tr>
            <td>
              <div style="font-weight: 600;">${item.name}</div>
              <p style="font-size: 0.85rem; color: var(--secondary-text); margin: var(--spacing-xs) 0 0 0;">${item.category}</p>
            </td>
            <td style="text-align: center;">${item.quantity}</td>
            <td style="text-align: right;">₹${item.price}</td>
            <td style="text-align: right; font-weight: 600;">₹${item.price * item.quantity}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function getPaymentMethodLabel(method) {
  const labels = {
    'cod': 'Cash on Delivery',
    'upi': 'UPI (Demo)',
    'card': 'Credit / Debit Card (Demo)'
  };
  return labels[method] || method;
}

function showFallbackState() {
  // Hide order details and show fallback message
  document.querySelector('.section').innerHTML = `
    <div class="container" style="text-align: center; padding: var(--spacing-2xl) 0;">
      <div style="margin-bottom: var(--spacing-xl);">
        <div style="font-size: 3rem; margin-bottom: var(--spacing-lg);">ℹ️</div>
        <h1 style="margin-bottom: var(--spacing-md);">No Order Found</h1>
        <p style="font-size: 1.05rem; color: var(--secondary-text); max-width: 600px; margin: 0 auto;">
          It looks like you accessed this page directly without completing a checkout.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--spacing-lg); max-width: 500px; margin: 0 auto;">
        <a href="shop.html" class="btn btn-primary" style="text-decoration: none; text-align: center;">Shop Now</a>
        <a href="index.html" class="btn btn-secondary" style="text-decoration: none; text-align: center;">Back to Home</a>
      </div>
    </div>
  `;
}

function scrollToDetails() {
  document.getElementById('orderItems').scrollIntoView({ behavior: 'smooth' });
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
