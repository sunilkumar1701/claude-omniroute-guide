// Acme Beauty - Static Product Catalog
const PRODUCTS = [
  {
    id: 1,
    slug: 'rose-glow-face-serum',
    name: 'Rose Glow Face Serum',
    category: 'Skincare',
    price: 599,
    originalPrice: 799,
    description: 'A lightweight facial serum for a fresh, radiant-looking finish.',
    image: 'assets/images/product-01.svg',
    rating: 4.8,
    reviewCount: 128,
    highlights: [
      'Lightweight formula',
      'Fresh, radiant finish',
      'Rose extract infused',
      'Suitable for all skin types'
    ]
  },
  {
    id: 2,
    slug: 'hydrating-day-cream',
    name: 'Hydrating Day Cream',
    category: 'Moisturizers',
    price: 449,
    originalPrice: 599,
    description: 'A daily moisturizer for a soft, comfortable skin feel.',
    image: 'assets/images/product-02.svg',
    rating: 4.7,
    reviewCount: 95,
    highlights: [
      'Daily hydration',
      'Soft skin feel',
      'Non-greasy formula',
      'SPF protection ready'
    ]
  },
  {
    id: 3,
    slug: 'vitamin-c-glow-serum',
    name: 'Vitamin C Glow Serum',
    category: 'Skincare',
    price: 699,
    originalPrice: 899,
    description: 'A lightweight serum for a bright-looking skincare routine.',
    image: 'assets/images/product-03.svg',
    rating: 4.9,
    reviewCount: 156,
    highlights: [
      'Brightening formula',
      'Vitamin C enriched',
      'Lightweight texture',
      'Antioxidant protection'
    ]
  },
  {
    id: 4,
    slug: 'gentle-foaming-cleanser',
    name: 'Gentle Foaming Cleanser',
    category: 'Cleansers',
    price: 349,
    originalPrice: 449,
    description: 'A gentle everyday cleanser for your skincare routine.',
    image: 'assets/images/product-04.svg',
    rating: 4.6,
    reviewCount: 82,
    highlights: [
      'Gentle formula',
      'Effective cleansing',
      'No harsh chemicals',
      'Removes makeup easily'
    ]
  },
  {
    id: 5,
    slug: 'overnight-repair-cream',
    name: 'Overnight Repair Cream',
    category: 'Moisturizers',
    price: 749,
    originalPrice: 999,
    description: 'A rich night cream for a comforting evening skincare ritual.',
    image: 'assets/images/product-05.svg',
    rating: 4.8,
    reviewCount: 110,
    highlights: [
      'Rich, nourishing formula',
      'Night-time repair',
      'Deep hydration',
      'Wake up to soft skin'
    ]
  },
  {
    id: 6,
    slug: 'peptide-eye-cream',
    name: 'Peptide Eye Cream',
    category: 'Skincare',
    price: 549,
    originalPrice: 699,
    description: 'A targeted eye-area moisturizer for daily self-care.',
    image: 'assets/images/product-06.svg',
    rating: 4.7,
    reviewCount: 104,
    highlights: [
      'Targets eye area',
      'Peptide complex',
      'Reduces fine lines',
      'Gentle on delicate skin'
    ]
  },
  {
    id: 7,
    slug: 'rose-water-face-mist',
    name: 'Rose Water Face Mist',
    category: 'Toners & Mists',
    price: 299,
    originalPrice: 399,
    description: 'A refreshing facial mist for a quick beauty refresh.',
    image: 'assets/images/product-07.svg',
    rating: 4.5,
    reviewCount: 68,
    highlights: [
      'Refreshing mist',
      'Rose water formula',
      'Quick refresh',
      'Travel-friendly size'
    ]
  },
  {
    id: 8,
    slug: 'shea-butter-body-lotion',
    name: 'Shea Butter Body Lotion',
    category: 'Body Care',
    price: 399,
    originalPrice: 499,
    description: 'A moisturizing body lotion for everyday softness.',
    image: 'assets/images/product-08.svg',
    rating: 4.6,
    reviewCount: 76,
    highlights: [
      'Shea butter enriched',
      'Everyday moisturizing',
      'Soft skin texture',
      'Luxurious feel'
    ]
  },
  {
    id: 9,
    slug: 'nourishing-lip-balm',
    name: 'Nourishing Lip Balm',
    category: 'Lip Care',
    price: 199,
    originalPrice: 249,
    description: 'A simple lip-care essential for daily use.',
    image: 'assets/images/product-09.svg',
    rating: 4.4,
    reviewCount: 45,
    highlights: [
      'Nourishing formula',
      'Long-lasting moisture',
      'Natural ingredients',
      'Subtle sweet scent'
    ]
  },
  {
    id: 10,
    slug: 'daily-glow-sunscreen-spf50',
    name: 'Daily Glow Sunscreen SPF 50',
    category: 'Sun Care',
    price: 649,
    originalPrice: 849,
    description: 'A sunscreen for a daytime skincare routine. Display SPF 50 only as a product specification for the fictional demo item.',
    image: 'assets/images/product-10.svg',
    rating: 4.7,
    reviewCount: 98,
    highlights: [
      'SPF 50 protection',
      'Lightweight formula',
      'No white cast',
      'Daily protection'
    ]
  }
];

// Get a product by ID
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

// Get a product by slug
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

// Get all products by category
function getProductsByCategory(category) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

// Get all unique categories
function getAllCategories() {
  const categories = [...new Set(PRODUCTS.map(p => p.category))];
  return categories.sort();
}

// Search products by name
function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

// Sort products
function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch(sortBy) {
    case 'price-low-to-high':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high-to-low':
      return sorted.sort((a, b) => b.price - a.price);
    case 'alphabetical':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'featured':
      return sorted;
    default:
      return sorted;
  }
}
