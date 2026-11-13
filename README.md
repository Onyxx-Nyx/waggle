# Waggle

A pet store front-end built with plain HTML, CSS and JavaScript. Browse food, toys, beds and grooming picks for dogs, cats and fish, build a cart, apply a promo code and check out. Everything runs in the browser and the cart is saved in `localStorage`, so there is no backend to set up.

Waggle is an original design. It takes the general idea of an online pet shop, not the branding or code of any existing store.

## Features

- 14 sample products with generated illustrations (no image files needed)
- Filter by pet (Dogs, Cats, Fish) and product type
- Live search and sorting by price or rating
- Cart drawer with quantity controls and remove buttons
- Promo code: try `WAGGLE10` for 10% off
- Free delivery over ₦50,000, otherwise a flat ₦3,500 fee, with a hint showing how much more to add
- Checkout form with validation and a choice of pay on delivery or card (demo only)
- Order confirmation with a reference number
- Cart survives page reloads
- Responsive layout for phones, tablets and desktops
- Keyboard accessible dialog, visible focus and screen reader announcements

## Run it

No build step. Open `index.html` in a browser.

Or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Project structure

```
waggle/
├── index.html   # page structure
├── style.css    # all styles, with design tokens at the top
├── script.js    # product data, filtering, cart and checkout
└── README.md
```

## Important note about the data

Products, prices and ratings are sample data written for this demo. No payments are taken and no orders are delivered. To make it real you would add a backend for products, stock, accounts, payments and orders. Payment providers such as Paystack or Flutterwave are a common choice in Nigeria.

Built by Onyxx_Nyx
