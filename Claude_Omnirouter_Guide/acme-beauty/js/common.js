// Acme Beauty - Common Utilities
// Cart management
const CART_STORAGE_KEY = 'acme_beauty_cart';
const ORDER_SESSION_KEY = 'acme_beauty_order';

function getCart() {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (e) {
    console.error('Error reading cart:', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Error saving cart:', e);
  }
}

function addToCart(product, quantity = 1) {
  if (quantity < 1) return false;

  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      quantity: quantity
    });
  }

  saveCart(cart);
  updateCartCount();
  showNotification(`${product.name} added to cart!`);
  return true;
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

function updateCartItemQuantity(productId, quantity) {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
    updateCartCount();
  }
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartCount();
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
  const count = getCartCount();
  const cartBadge = document.querySelector('.cart-count');
  if (cartBadge) {
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Price calculations
function getProductPrice(productId) {
  const product = getProductById(productId);
  return product ? product.price : 0;
}

function calculateSubtotal(cart) {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateShipping(subtotal) {
  return subtotal >= 999 ? 0 : 49;
}

function calculateDiscount(subtotal, promoCode) {
  let discountPercent = 0;

  if (promoCode === 'BEAUTY10') {
    discountPercent = 10;
  } else if (promoCode === 'GLOW15') {
    discountPercent = 15;
  }

  return Math.round((subtotal * discountPercent) / 100);
}

function calculateTotal(subtotal, shipping, discount = 0) {
  return subtotal + shipping - discount;
}

// Order management
function createOrder(customerData, cart, subtotal, shipping, discount, promoCode, paymentMethod) {
  const orderReference = `ACM-${Date.now().toString().slice(-10)}`;
  const orderDate = new Date().toLocaleDateString('en-IN');

  const order = {
    reference: orderReference,
    date: orderDate,
    customer: customerData,
    items: cart,
    subtotal: subtotal,
    shipping: shipping,
    discount: discount,
    promoCode: promoCode,
    total: calculateTotal(subtotal, shipping, discount),
    paymentMethod: paymentMethod
  };

  try {
    sessionStorage.setItem(ORDER_SESSION_KEY, JSON.stringify(order));
    clearCart();
    return orderReference;
  } catch (e) {
    console.error('Error creating order:', e);
    return null;
  }
}

function getOrder() {
  try {
    const order = sessionStorage.getItem(ORDER_SESSION_KEY);
    return order ? JSON.parse(order) : null;
  } catch (e) {
    console.error('Error reading order:', e);
    return null;
  }
}

function clearOrder() {
  sessionStorage.removeItem(ORDER_SESSION_KEY);
}

// Notification system
function showNotification(message, type = 'success', duration = 3000) {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// Form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateIndianMobile(mobile) {
  const re = /^[6-9]\d{9}$/;
  return re.test(mobile.replace(/\D/g, ''));
}

function validateIndianPinCode(pinCode) {
  const re = /^\d{6}$/;
  return re.test(pinCode);
}

function validateCheckoutForm(formData) {
  const errors = {};

  if (!formData.fullName || formData.fullName.trim() === '') {
    errors.fullName = 'Full name is required';
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Valid email address is required';
  }

  if (!formData.mobile || !validateIndianMobile(formData.mobile)) {
    errors.mobile = 'Valid 10-digit Indian mobile number is required';
  }

  if (!formData.address1 || formData.address1.trim() === '') {
    errors.address1 = 'Address line 1 is required';
  }

  if (!formData.city || formData.city.trim() === '') {
    errors.city = 'City is required';
  }

  if (!formData.state || formData.state.trim() === '') {
    errors.state = 'State is required';
  }

  if (!formData.pinCode || !validateIndianPinCode(formData.pinCode)) {
    errors.pinCode = 'Valid 6-digit PIN code is required';
  }

  if (!formData.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method';
  }

  return errors;
}

// Rating display
function renderStars(rating, size = 'small') {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let stars = '';

  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }
  if (hasHalf) {
    stars += '☆';
  }

  return stars;
}

// Navigation helper
function navigateTo(page) {
  window.location.href = `${page}.html`;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
