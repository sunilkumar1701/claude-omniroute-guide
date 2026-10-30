# Acme Beauty - Premium E-Commerce Website

A fully functional, frontend-only e-commerce demonstration website for Acme Beauty, a premium skincare and beauty brand. Built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

### Complete Shopping Experience
- **Product Catalog**: 10 curated skincare and beauty products
- **Search & Filter**: Search by name, filter by category, sort by price and rating
- **Product Details**: Dynamic product pages with full information and related products
- **Shopping Cart**: Full cart management with quantity controls, persistence via localStorage
- **Promo Codes**: Support for BEAUTY10 (10% off) and GLOW15 (15% off)
- **Checkout**: Complete checkout flow with form validation and order creation
- **Order Confirmation**: Beautiful order confirmation page with full order details

### Pages
- **Home**: Hero section, featured products, testimonials, newsletter signup
- **Shop**: Product grid with advanced filtering and sorting
- **Product Details**: Full product information, related products, quantity selector
- **Cart**: Shopping cart management with order summary
- **Checkout**: Multi-step checkout with customer info and delivery options
- **Order Placed**: Order confirmation with all details
- **About**: Brand story, mission, vision, and values
- **Contact**: Contact form, FAQ section, and customer support info

### Design & UX
- **Premium Design**: Soft pink and white color palette matching luxury beauty brands
- **Typography**: Elegant serif headings (Playfair Display) with modern sans-serif body text (Poppins)
- **Responsive Layout**: Fully responsive for desktop, tablet, and mobile
- **Smooth Interactions**: Hover effects, transitions, and smooth scrolling
- **Accessibility**: Semantic HTML, proper labels, keyboard navigation, sufficient contrast

### Technical Features
- **Frontend Only**: No backend, database, or external APIs required
- **Local Storage**: Cart persistence using browser localStorage
- **Session Storage**: Order data persists during checkout flow
- **Form Validation**: Client-side validation for emails, phone numbers, PIN codes
- **Static Product Data**: All products defined in JavaScript, easy to modify
- **No Dependencies**: Pure vanilla HTML, CSS, and JavaScript

## 📁 Project Structure

```
acme-beauty/
├── index.html                 # Home page
├── shop.html                  # Product listing
├── product.html               # Product details (dynamic)
├── cart.html                  # Shopping cart
├── checkout.html              # Checkout form
├── order-placed.html          # Order confirmation
├── about.html                 # About page
├── contact.html               # Contact & FAQ
│
├── css/
│   └── style.css              # Main stylesheet with all styles
│
├── js/
│   ├── products.js            # Product catalog and utilities
│   ├── common.js              # Shared functions (cart, validation, etc.)
│   ├── home.js                # Home page logic
│   ├── shop.js                # Shop page logic
│   ├── product.js             # Product details logic
│   ├── cart.js                # Shopping cart logic
│   ├── checkout.js            # Checkout logic
│   ├── order-placed.js        # Order confirmation logic
│   ├── about.js               # About page logic
│   └── contact.js             # Contact page logic
│
└── assets/
    └── images/
        ├── hero-beauty.jpg        # Hero section image
        ├── brand-story.jpg        # Brand story image
        ├── product-01.jpg to 10   # Product images
```

## 🚀 Getting Started

### Quick Start with VS Code Live Server

1. **Install Live Server Extension** (if not already installed)
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" and install

2. **Open the Project**
   - Open the `acme-beauty` folder in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

3. **Browse the Site**
   - The website opens at `http://localhost:5500` or similar
   - Start shopping!

### Alternative: Python HTTP Server

```bash
cd acme-beauty
python -m http.server 8000
# Then visit http://localhost:8000
```

### Alternative: Node.js HTTP Server

```bash
cd acme-beauty
npx http-server
# Then visit http://localhost:8080
```

## 🛒 How to Use

### Shopping Flow
1. **Browse Products**: Visit the Shop page or search for specific items
2. **View Details**: Click "View" on any product for full details
3. **Add to Cart**: Select quantity and add to cart (from product page or shop grid)
4. **Review Cart**: Click the cart icon to review items
5. **Apply Promo**: Enter BEAUTY10 or GLOW15 for discounts
6. **Checkout**: Proceed to checkout and fill in delivery information
7. **Place Order**: Review order and place demo order
8. **Confirmation**: View order confirmation with all details

### Cart Features
- ✓ Add/remove items
- ✓ Update quantities
- ✓ View live totals
- ✓ Automatic shipping calculation (free over ₹999)
- ✓ Apply promo codes
- ✓ Cart persists across page refreshes

### Promo Codes
- **BEAUTY10**: 10% discount on subtotal
- **GLOW15**: 15% discount on subtotal

## 📦 Products

The catalog includes 10 demo products:
1. Rose Glow Face Serum (₹599)
2. Hydrating Day Cream (₹449)
3. Vitamin C Glow Serum (₹699)
4. Gentle Foaming Cleanser (₹349)
5. Overnight Repair Cream (₹749)
6. Peptide Eye Cream (₹549)
7. Rose Water Face Mist (₹299)
8. Shea Butter Body Lotion (₹399)
9. Nourishing Lip Balm (₹199)
10. Daily Glow Sunscreen SPF 50 (₹649)

All products are fictional demo items. Categories include Skincare, Moisturizers, Cleansers, Toners & Mists, Body Care, Lip Care, and Sun Care.

## 💳 Checkout & Payment

This is a **demonstration website**. The checkout process is fully functional for demo purposes:

- ✓ Complete form validation
- ✓ Realistic checkout flow
- ✓ Multiple payment method options (all demo)
- ✓ Order reference generation
- ✓ Order confirmation with details

**No real payment is processed. No card details are collected or stored.**

## 🎨 Design Elements

### Color Palette
- Primary Pink: #F58D96
- Soft Pink: #FCE8E3
- Very Light Pink: #FFF7F6
- White: #FFFFFF
- Primary Text: #252525
- Secondary Text: #777777

### Typography
- Headings: Playfair Display (elegant serif)
- Body: Poppins (modern sans-serif)

### Responsive Breakpoints
- Desktop: Full 4-column grid
- Tablet (1024px): 3-column grid
- Mobile (768px): 2-column grid / hamburger menu
- Small Mobile (480px): 1-column grid

## 🔧 Customization

### Adding Products
Edit `js/products.js` and add to the PRODUCTS array:

```javascript
{
  id: 11,
  slug: 'new-product',
  name: 'New Product Name',
  category: 'Skincare',
  price: 599,
  originalPrice: 799,
  description: 'Product description',
  image: 'assets/images/product-11.jpg',
  rating: 4.8,
  reviewCount: 100,
  highlights: ['Feature 1', 'Feature 2']
}
```

### Changing Colors
Edit CSS variables in `css/style.css` under `:root`:

```css
:root {
  --primary-pink: #F58D96;
  --soft-pink: #FCE8E3;
  /* ... etc */
}
```

### Adding Product Images
Place images in `assets/images/` folder. If images are unavailable, the site displays elegant placeholder cards automatically.

## ✅ Quality Assurance

### Tested Features
- ✓ All navigation links work
- ✓ Search functionality works across categories
- ✓ Filters reset correctly
- ✓ Cart persists on page refresh
- ✓ Promo codes apply and calculate correctly
- ✓ Shipping calculated correctly based on subtotal
- ✓ Form validation prevents invalid submissions
- ✓ Order confirmation displays all details
- ✓ Mobile responsive on all breakpoints
- ✓ No console errors

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📝 Notes

- This is a **demonstration website** for educational and portfolio purposes
- All product data, prices, and customer information are fictional
- No real transactions occur
- Cart data is stored locally (not synced to any server)
- Order data persists only for the current session
- All contact form submissions are demo only (no emails sent)

## 🚫 Important Disclaimers

- This is NOT a real e-commerce platform
- No payments are processed
- No shipments will occur
- No customer data is stored on any server
- All testimonials and reviews are fictional
- All contact information is for demo purposes only

## 📞 Support

This is a frontend demonstration. For questions or customization:

1. Review the code in the relevant JavaScript file
2. Check the HTML structure in the corresponding page
3. Modify CSS variables for styling changes
4. Add products to `js/products.js` for inventory changes

## 📄 License

This project is a demonstration website created for educational purposes. Feel free to use, modify, and learn from the code.

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

*No frameworks. No dependencies. Just pure web development.*
