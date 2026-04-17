# The Online Store

E-commerce website built with React Router v7 (Remix), TypeScript and TailWindCSS.

## Features
- Homepage: product grid with possibility to sort, category filteringand pagination
- Product detail page: full product information with "Add to Cart" functionality
- Shopping Cart: view items, update quantities, remove products and see summary
- Responsive design: optimized for both mobile and desktop
- Server-side state: all data fetching handled via loaders and mutations via actions
- Cookie-based cart: cart state persisted across sessions using cookie session

## Tech Stack

- Framework: React Router v7 (sucessor to Remix v2)
- Language: TypeScript
- Styling: TailwindCSS
- Icons: Lucide React
- API: DummyJSON

## Structure

```
app/
├── components/
│   ├── Header.tsx           # Global header 
│   └── ProductCard.tsx      # Product card used in the homepage 
├── lib/
│   ├── api.ts               # DummyJSON API fetch functions
│   └── cart.server.ts       # Cookie session storage for the cart
├── routes/
│   ├── home.tsx             # Homepage with products and features
│   ├── products.$id.tsx     # Product detail page with "Add to Cart" action
│   └── cart.tsx             # Shopping cart page with remove/update quantity
├── app.css                  # Tailwind entry point and theme variables
├── root.tsx                 # Root layout
└── routes.ts                # Route configuration
```
---
## Prerequisites

- Node.js 20 or higher
- npm

## Installation

```bash
git clone https://github.com/joaopcastro710/the-online-store.git
cd the-online-store
npm install
```

## Development

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
npm start
```

## Key Implementation Notes

### URL as Source of Truth

Filters, sort, and pagination state live in the URL search params rather than in React State. When the user changes a filter or navigates pages, the browser navigates to a new URL, the loader runs again on the server and the page updates with fresh data. This approach provides shareable links, browser back/forward support and aligns with the React Router paradigm.

### Loaders and Actions

- Loaders: handle all data fetching (read operations) on the server before the page is rendered
- Actions: handle form submissions (write operations) — adding to cart, removing from cart, updating quantities
- Forms use `<Form method="post">` for progressive enhancement

### Cart State

The cart is stored in an HTTP-only cookie session, managed server-side via `createCookieSessionStorage`. This approach was chosen over `localStorage` because:

- The loader can read the cart before rendering the page
- Works without JavaScript (progressive enhancement)
- More aligned with the React Router/Remix paradigm
