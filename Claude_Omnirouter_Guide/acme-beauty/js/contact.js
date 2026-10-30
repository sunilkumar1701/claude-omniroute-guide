// Contact page functionality
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupHeaderSearch();
  setupContactForm();
  setupAccordions();
});

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
      };

      // Validate
      let errors = {};
      if (!formData.name || formData.name.trim() === '') {
        errors.contactName = 'Name is required';
      }
      if (!formData.email || !validateEmail(formData.email)) {
        errors.contactEmail = 'Valid email is required';
      }
      if (!formData.subject || formData.subject.trim() === '') {
        errors.contactSubject = 'Subject is required';
      }
      if (!formData.message || formData.message.trim() === '') {
        errors.contactMessage = 'Message is required';
      }

      // Clear previous errors
      document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
      document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('form-error-show'));

      if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach(key => {
          const errorEl = document.getElementById(`${key}Error`);
          const inputEl = document.getElementById(key);
          if (errorEl) errorEl.textContent = errors[key];
          if (inputEl) inputEl.classList.add('form-error-show');
        });
        showNotification('Please fix the errors', 'error');
        return;
      }

      // Show success message
      const messageDiv = document.getElementById('contactMessage');
      messageDiv.style.display = 'block';
      form.reset();

      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 4000);
    });
  }
}

function setupAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
      toggleAccordion(this);
    });
  });
}

function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const isOpen = content.style.display === 'block';

  // Close all other accordions
  document.querySelectorAll('.accordion-content').forEach(el => {
    el.style.display = 'none';
  });
  document.querySelectorAll('.accordion-header span:last-child').forEach(el => {
    el.textContent = '+';
  });

  // Toggle current
  if (!isOpen) {
    content.style.display = 'block';
    button.querySelector('span:last-child').textContent = '−';
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
