# Customer Portal - FIC

A modern Progressive Web Application (PWA) for e-commerce that enables customers to browse products, manage shopping carts, and track transactions seamlessly. Built with React and TypeScript for a type-safe, performant user experience.

## About This Project

Customer Portal is an e-commerce customer-facing application that provides a complete shopping experience. Users can browse product catalogs, add items to their cart, complete purchases, and track their transaction history. The application is designed as a Progressive Web App, allowing it to work offline and be installed on devices like a native app.

## What We're Building

This project aims to create a comprehensive customer portal with the following features:

- **Product Catalog**: Browse and view available products with an intuitive interface
- **Shopping Cart**: Add, update quantities, and remove items from the cart
- **Transaction Management**: View order history and track payment status
- **User Authentication**: Secure login and registration system
- **Payment Integration**: Seamless checkout and payment processing
- **Progressive Web App**: Offline support and app-like experience
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Tech Stack

### Core Technologies

- **React 19.2.0** - Modern UI library with latest features
- **TypeScript 5.9.3** - Type-safe JavaScript for better developer experience
- **Vite 7.2.4** - Fast build tool and development server

### UI & Styling

- **Tailwind CSS 4.1.18** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Accessible component primitives (Label, Slot)
- **Lucide React** - Beautiful icon library
- **React Icons** - Additional icon support
- **Swiper 12.0.3** - Touch-enabled carousel/slider component

### Routing & State

- **React Router DOM 7.12.0** - Client-side routing for single-page application

### PWA & Performance

- **Vite PWA Plugin 1.2.0** - Progressive Web App support with service workers
- **Workbox** - Service worker library for offline functionality and caching

### HTTP Client

- **Axios 1.13.2** - Promise-based HTTP client for API requests

### Development Tools

- **ESLint** - Code linting and quality assurance
- **TypeScript ESLint** - TypeScript-specific linting rules

## Project Structure

The project follows the **Atomic Design** pattern for component organization:

```
src/
├── Components/
│   ├── Atoms/          # Basic building blocks (Button, Input, Label)
│   ├── Molecules/      # Simple component combinations
│   └── Organisms/       # Complex component groups
├── Pages/              # Route-level page components
├── Data/               # Mock data and data utilities
├── Lib/                # Utility functions
└── Types/              # TypeScript type definitions
```

## Requirements

### Prerequisites

- **Node.js** 20.x or higher (LTS version recommended)
- **npm** 9.x or higher (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### System Requirements

- Minimum 4GB RAM
- 500MB free disk space
- Internet connection for installing dependencies

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd CustomerPortal-FIC
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

The dev server includes:

- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- TypeScript type checking

### Building for Production

Build the application for production:

```bash
npm run build
```

This will:

- Compile TypeScript
- Optimize and bundle the code
- Generate service worker files for PWA
- Create production-ready files in the `dist/` directory

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Code Quality

**Type Checking**

```bash
npm run type-check
```

**Linting**

```bash
npm run lint
```

## Available Scripts

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `npm run dev`        | Start development server     |
| `npm run build`      | Build for production         |
| `npm run preview`    | Preview production build     |
| `npm run lint`       | Run ESLint                   |
| `npm run type-check` | Run TypeScript type checking |

## Features

### Current Features

- ✅ Product catalog browsing
- ✅ Shopping cart management
- ✅ Transaction history tracking
- ✅ User authentication (Login/Register)
- ✅ Responsive design
- ✅ PWA support with offline capabilities
- ✅ SEO optimized (sitemap, robots.txt, meta tags)

### Planned Features

- 🔄 User profile management
- 🔄 Enhanced product catalog with search
- 🔄 Payment page integration
- 🔄 Order tracking

## Deployment

This project is configured for deployment on **Vercel**:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deployments happen automatically on push to main/master branch

The project includes:

- `vercel.json` - Vercel configuration for React Router SPA routing
- `.github/workflows/ci.yml` - GitHub Actions for CI/CD quality gates

## Environment Variables

If you need to configure API endpoints or other environment variables, create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

Access these variables in your code using `import.meta.env.VITE_API_URL`.

## Data Models

### User

- id: string(uuid, PK)
- name: string
- email: string(unique)
- password: string(hashed)
- createdAt: timestamp

### Product

- id: number (primary key)
- name: string
- image: string (URL)
- stock: number
- units: Unit[]
- createdAt: timestamp
- updatedAt: timestamp

### Unit

- unit: string
- unitValue: number
- price: number

### Invoice

- id: number;
- productName: string;
- amount: number;
- status: TransactionStatus;
- createdAt: string;
- external_id: string;
- created: string;
- items?: product[];
- payment_method?: string;
- bank_code?: string;
- invoice_url?: string;

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass (`npm run lint` and `npm run type-check`)
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

FIC

---

## Removing the Coming Soon Landing Page

To completely remove the landing page and restore the full application:

1. **Delete the landing page file:**
   ```bash
   rm src/Pages/Landing/index.tsx
   ```

2. **Revert `src/App.tsx` to its original state:**
   - Remove the `COMING_SOON_MODE` constant
   - Remove the `LandingPage` import
   - Remove the `Navigate` import (if not used elsewhere)
   - Remove the conditional logic that checks `COMING_SOON_MODE`
   - Restore the original `App` component structure with all routes

Alternatively, you can simply set `COMING_SOON_MODE = false` in `src/App.tsx` to temporarily disable the landing page without deleting files.

---

For more information, visit [https://fic.com/](https://fic.com/)
