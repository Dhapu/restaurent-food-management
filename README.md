# Restaurant Food Management System

A complete restaurant ordering and management system built with React, TypeScript, Vite, Tailwind CSS, React Router, and Context API.

## Live Links

- Live Website: https://food-mrheced88-dhapus-projects.vercel.app
- GitHub Repository: https://github.com/Dhapu/restaurent-food-management

## Overview

This project includes a customer-facing food ordering experience and an admin dashboard for restaurant operations. Customers can browse dishes, filter the menu, manage their cart, place orders, and view an order summary. Admins can sign in, manage food items, monitor orders, and update delivery statuses.

## Features

### User Side

- Home page with hero banner and featured dishes
- Menu page with food cards, search, category filter, and price filter
- Add to cart flow with toast notifications
- Cart page with quantity controls, item removal, and pricing summary
- Checkout form with validation for customer details
- Order summary page with confirmed order information

### Admin Panel

- Basic admin login
- Dashboard cards for orders, revenue, and menu stats
- Add, edit, and delete menu items
- Update order status from `pending` to `preparing` to `delivered`

### UX and App Behavior

- Responsive layout for mobile and desktop
- Loading skeleton states
- Error and validation handling
- Local persistence using `localStorage`
- SPA routing support with `vercel.json`
- Dark and light theme toggle

## Demo Admin Login

- Email: `admin@flameandfork.com`
- Password: `admin123`

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router DOM
- Context API
- React Hot Toast
- React Icons

## Project Structure

```text
src/
  assets/
  components/
  context/
  pages/
  utils/
  App.tsx
  main.tsx
  types.ts
```

## Main Modules

- `src/context/AppContext.tsx`: global state for foods, cart, orders, auth, and theme
- `src/context/useAppContext.ts`: shared hook for accessing app state
- `src/assets/mockData.ts`: starter restaurant menu data
- `src/components/`: reusable UI like navbar, food cards, cart items, and admin dashboard
- `src/pages/`: route-level pages for user flow and admin flow
- `src/utils/`: currency/date formatting, storage helpers, and constants

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Lint the project

```bash
npm run lint
```

## Deployment

This app is deployed on Vercel. A `vercel.json` rewrite is included so direct navigation to routes like `/menu`, `/cart`, and `/admin/login` works correctly in production.

## Data Handling

- Food items are loaded from mock TypeScript data
- Cart items, orders, auth state, and theme are stored in browser `localStorage`
- No backend is required for the current version

## Screenshots

You can view the running app here:

- Home, Menu, and Admin Demo: https://food-mrheced88-dhapus-projects.vercel.app

If you want, screenshots can be added later in this README after capturing the pages from the live app.

## Notes

- This is a frontend-first implementation using mock data and local persistence
- It is ready to run locally with `npm install` and `npm run dev`
- It is ready for expansion with a Node.js, Express, or database-backed API
