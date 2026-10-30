// Checkout page functionality
let checkoutCart = [];
let checkoutPromoCode = '';

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupHeaderSearch();
  loadCheckoutCart();
});

function loadCheckoutCart() {
  checkoutCart = getCart();

  if (checkoutCart.length === 0) {
    showNotification('Your cart is empty. Redirecting to shop...', 'warning');
    setTimeout(() => {
      window.location.href = 'shop.html';
    }, 2000);
    return;
  }

  renderOrderSummary();
}

function renderOrderSummary() {
  const container = document.getElementById('orderItems');

  container.innerHTML = checkoutCart.map(item => `
    <div style="margin-bottom: var(--spacing-md); padding-bottom: var(--spacing-md); border-bottom: 1px solid var(--border-color);">
      <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs);">
        <span style="font-weight: 500;">${item.name}</span>
        <span style="font-weight: 600;">₹${item.price * item.quantity}</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--secondary-text); margin: 0;">Qty: ${item.quantity} × ₹${item.price}</p>
    </div>
  `).join('');

  updateCheckoutTotals();
}

function updateCheckoutTotals() {
  const subtotal = calculateSubtotal(checkoutCart);
  const shipping = calculateShipping(subtotal);
  const discount = calculateDiscount(subtotal, checkoutPromoCode);
  const total = calculateTotal(subtotal, shipping, discount);

  document.getElementById('summarySubtotal').textContent = subtotal;
  document.getElementById('summaryShipping').textContent = shipping;
  document.getElementById('summaryTotal').textContent = total;

  const discountRow = document.getElementById('summaryDiscountRow');
  if (discount > 0) {
    document.getElementById('summaryDiscount').textContent = discount;
    discountRow.style.display = 'flex';
  } else {
    discountRow.style.display = 'none';
  }
}

function getCheckoutFormData() {
  return {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    mobile: document.getElementById('mobile').value,
    address1: document.getElementById('address1').value,
    address2: document.getElementById('address2').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    pinCode: document.getElementById('pinCode').value,
    country: document.getElementById('country').value,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value || ''
  };
}

function clearFormErrors() {
  document.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
  });
  document.querySelectorAll('input, textarea, select').forEach(el => {
    el.classList.remove('form-error-show');
  });
}

function displayFormErrors(errors) {
  Object.keys(errors).forEach(fieldName => {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement) {
      errorElement.textContent = errors[fieldName];
    }
    if (inputElement) {
      inputElement.classList.add('form-error-show');
    }
  });
}

function placeOrder() {
  clearFormErrors();

  const formData = getCheckoutFormData();
  const errors = validateCheckoutForm(formData);

  if (Object.keys(errors).length > 0) {
    displayFormErrors(errors);
    showNotification('Please fix the errors below', 'error');
    return;
  }

  if (checkoutCart.length === 0) {
    showNotification('Your cart is empty', 'error');
    return;
  }

  // Create order
  const subtotal = calculateSubtotal(checkoutCart);
  const shipping = calculateShipping(subtotal);
  const discount = calculateDiscount(subtotal, checkoutPromoCode);

  const orderRef = createOrder(
    formData,
    checkoutCart,
    subtotal,
    shipping,
    discount,
    checkoutPromoCode,
    formData.paymentMethod
  );

  if (orderRef) {
    showNotification('Order placed successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'order-placed.html';
    }, 1000);
  } else {
    showNotification('Error creating order. Please try again.', 'error');
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
