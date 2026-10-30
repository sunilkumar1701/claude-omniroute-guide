# 🚀 Quick Start Guide - Acme Beauty

## ⚡ Start the Website in 30 Seconds

### Option 1: VS Code Live Server (Easiest)

1. Open VS Code
2. Open the `acme-beauty` folder
3. Right-click `index.html` → "Open with Live Server"
4. Website opens automatically at `http://localhost:5500`

✅ Done! Start shopping.

### Option 2: Python (Mac/Linux/Windows)

```bash
cd acme-beauty
python -m http.server 8000
```

Then visit: `http://localhost:8000`

### Option 3: Node.js

```bash
cd acme-beauty
npx http-server
```

Then visit: `http://localhost:8080`

---

## 📋 What's Included

✅ **8 Complete Pages**
- Home (with hero, featured products, testimonials, newsletter)
- Shop (with search, filters, sorting)
- Product Details (dynamic product pages)
- Shopping Cart (full cart management)
- Checkout (complete form with validation)
- Order Confirmation (full order details display)
- About (brand story, mission, values)
- Contact (contact form, FAQ)

✅ **10 Products**
- All with images (placeholders auto-generate if missing)
- Prices in Indian rupees
- Categories, ratings, descriptions
- Full product details pages

✅ **Shopping Features**
- Add to cart functionality
- Cart persistence (survives page refresh)
- Quantity management
- Promo codes: BEAUTY10 (10% off) & GLOW15 (15% off)
- Free shipping over ₹999
- Order reference generation
- Demo payment methods

✅ **Design**
- Premium pink & white color scheme
- Fully responsive (desktop, tablet, mobile)
- Elegant typography (Playfair Display + Poppins)
- Smooth animations and transitions
- Beautiful hover effects

✅ **No Dependencies**
- Pure HTML, CSS, JavaScript
- No frameworks, no npm packages
- No backend required
- No database needed
- Works completely offline

---

## 🛍️ Test the Complete Flow

1. **Browse Products**: Visit Shop page, search/filter products
2. **View Details**: Click "View" on any product
3. **Add to Cart**: Select quantity, click "Add"
4. **View Cart**: Click cart icon in header
5. **Apply Promo**: Try BEAUTY10 or GLOW15
6. **Checkout**: Fill in shipping details
7. **Place Order**: See order confirmation

**Demo Promo Codes:**
- `BEAUTY10` → 10% discount
- `GLOW15` → 15% discount

---

## 📁 File Structure

```
acme-beauty/
├── index.html              ← Start here
├── shop.html               ← Product listing
├── product.html            ← Product details
├── cart.html               ← Shopping cart
├── checkout.html           ← Checkout form
├── order-placed.html       ← Order confirmation
├── about.html              ← About page
├── contact.html            ← Contact & FAQ
├── generate-images.html    ← Image placeholder generator
├── README.md               ← Full documentation
│
├── css/
│   └── style.css           ← All styles (700+ lines)
│
├── js/
│   ├── products.js         ← Product catalog
│   ├── common.js           ← Shared functions
│   ├── home.js, shop.js, etc. ← Page-specific logic
│
└── assets/
    └── images/             ← Product images (auto-generated placeholders)
```

---

## ✨ Key Features Explained

### Shopping Cart
- Items persist in browser localStorage
- Survives page refresh and browser restart
- Automatic shipping calculation
- Supports promo code discounts
- Live total updates

### Product Search
- Real-time search across product names/descriptions
- Category-based filtering
- Multiple sort options (price, rating, alphabetical)
- Filters work together without conflicts

### Checkout Validation
- Email format validation
- Indian phone number validation (10 digits)
- Indian PIN code validation (6 digits)
- Required field checking
- Clear error messages

### Order Confirmation
- Order reference auto-generated
- All order details displayed
- Customer information recap
- Price breakdown (subtotal, shipping, discount)
- Beautiful confirmation page

---

## 🎨 Customize the Design

### Change Colors
Edit `css/style.css` at the top:
```css
:root {
  --primary-pink: #F58D96;      /* Main color */
  --soft-pink: #FCE8E3;          /* Light backgrounds */
  --very-light-pink: #FFF7F6;    /* Lightest backgrounds */
  --primary-text: #252525;       /* Text color */
}
```

### Change Fonts
Google Fonts are loaded automatically. To change:
1. Edit the `@import` line in `css/style.css`
2. Update font names in `:root` variables

### Add/Edit Products
Edit `js/products.js` and add to the PRODUCTS array:
```javascript
{
  id: 11,
  slug: 'new-product-name',
  name: 'Product Name',
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

---

## ✅ Quality Checklist

- ✓ All pages load without errors
- ✓ Navigation works on all pages
- ✓ Search filters multiple dimensions
- ✓ Add to cart updates header count
- ✓ Cart persists on refresh
- ✓ Promo codes apply correctly
- ✓ Shipping calculated correctly
- ✓ Checkout validates forms
- ✓ Order confirmation displays
- ✓ Mobile responsive
- ✓ Smooth animations
- ✓ No console errors

---

## 🚫 Demo Limitations

This is a **demonstration website** for educational/portfolio purposes:

- No real payments processed
- No card details collected
- No emails sent
- No data stored on server
- Cart data only in browser
- Order data only in session

---

## 📞 Troubleshooting

**Images not showing?**
- That's fine! Placeholders auto-generate
- Or use `generate-images.html` to create them

**Cart not saving?**
- Enable localStorage in browser
- Check if in private/incognito mode

**Promo codes not working?**
- Use exactly: `BEAUTY10` or `GLOW15` (uppercase)

**Checkout form not submitting?**
- Check all required fields are filled
- Validate phone (10 digits) and PIN (6 digits)

---

## 📚 Learn More

- Open `README.md` for full documentation
- Check `js/common.js` for shared functions
- Review page-specific JS files for logic
- Modify `css/style.css` for styling

---

## 🎯 What to Test

1. **Navigation**: All links work
2. **Search**: Try searching for products
3. **Filters**: Filter by category
4. **Sort**: Sort by price/rating
5. **Add to Cart**: Add multiple items
6. **Quantity**: Update quantities in cart
7. **Promo Codes**: Apply BEAUTY10 or GLOW15
8. **Checkout**: Complete the form
9. **Order**: View confirmation
10. **Mobile**: Resize browser to test responsiveness

---

**🎉 You're ready to go! Open index.html and start exploring.**

Built with ❤️ using vanilla HTML, CSS, and JavaScript.
