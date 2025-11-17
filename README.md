# Next.js Portfolio Starter

A lean, production-ready Next.js starter template optimized for fast shipping and portfolio projects. Built with TypeScript, Material UI, and industry-standard tooling.

## ✨ Features

- **Next.js 14** (App Router) with **TypeScript** (strict mode)
- **Material UI v5** with Emotion, SSR support, and dark mode
- **Form handling** with react-hook-form + Zod validation
- **Data fetching** with TanStack Query (React Query)
- **Dynamic configuration** via `app.config.json` (branding, theme, copy)
- **Mock authentication** (easily replaceable with NextAuth or other providers)
- **Error handling** with dynamic error and 404 pages
- **Testing** setup with Vitest + Testing Library
- **CI/CD** with GitHub Actions
- **Vercel-ready** deployment configuration
- **Code generators** for components, pages, and API routes
- **Interactive setup script** for quick configuration

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run interactive setup (optional - configures app.config.json)
pnpm setup

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint

# Format code
pnpm format
```

Visit `http://localhost:3000` to see your app.

## ⚡ Code Generators

Speed up development with built-in generators:

### Generate a Component

```bash
pnpm generate:component MyComponent
```

Creates `src/components/MyComponent.tsx` with proper structure.

### Generate a Page

```bash
# Public page
pnpm generate:page about

# Protected page (requires auth)
pnpm generate:page settings --protected

# Client component page
pnpm generate:page dashboard --client

# Protected client page
pnpm generate:page profile --protected --client
```

### Generate an API Route

```bash
# GET endpoint
pnpm generate:api users

# POST endpoint with validation
pnpm generate:api users --post
```

### Generate a Test

```bash
# Component test
pnpm generate:test components/LoginForm

# Page test
pnpm generate:test app/login/page --type page

# Hook test
pnpm generate:test hooks/useToast --type hook
```

## 📦 What's Included

### Core Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Material UI v5** - Component library with dark mode
- **Emotion** - CSS-in-JS styling
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Development Tools

- **ESLint** - Code linting (Next.js + TypeScript)
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Testing Library** - Component testing utilities

## ⚙️ Configuration

All branding, theming, and page copy is controlled via `app.config.json`:

```json
{
  "appName": "My App",
  "brand": {
    "primaryColor": "#1976d2",
    "logoPath": "/logo.svg"
  },
  "auth": {
    "enabled": false
  },
  "ui": {
    "theme": "light",
    "showFooter": true
  },
  "pages": {
    "home": {
      "hero": {
        "title": "Welcome to {appName}",
        "description": "{description}",
        "ctaText": "Get Started"
      },
      "about": {
        "title": "About This Project",
        "paragraphs": ["Your about content here..."]
      }
    },
    "login": {
      "title": "Welcome back",
      "subtitle": "Sign in to continue",
      "allowGuest": false
    },
    "error": {
      "title": "Something went wrong",
      "supportEmail": "support@example.com"
    }
  },
  "metadata": {
    "title": "My App",
    "description": "A modern web application built with Next.js.",
    "ogImage": "/logo.svg"
  }
}
```

### Theme Configuration

- `ui.theme`: Set to `"light"` or `"dark"` (default: `"light"`)
- `brand.primaryColor`: MUI theme primary color (hex format)
- Users can toggle theme via the navbar icon (toggles between light and dark)
- Theme preference is persisted in localStorage

## 🎨 Dark Mode

Dark mode is fully supported:

- Initial mode is read from `config.ui.theme`
- User selection is persisted in localStorage
- Toggle available in the navbar (toggles between light and dark)

## 🔐 Authentication

### Mock Authentication (Default)

The starter includes a mock authentication system using localStorage:

- Login page at `/login`
- Mock session stored in localStorage
- Protected routes under `/protected/*` (dashboard, profile)
- Profile menu in navbar when authenticated (access to profile and logout)

**Mock Login Credentials:**

- Any valid email address (e.g., `user@example.com`)
- Any password with at least 6 characters (e.g., `password123`)

The mock system doesn't validate credentials—it accepts any valid email format and password of 6+ characters. After login, users are redirected to the dashboard.

### Replacing with NextAuth

To replace mock auth with NextAuth:

1. Install NextAuth: `pnpm add next-auth`
2. Create API route: `src/app/api/auth/[...nextauth]/route.ts`
3. Update `src/lib/auth-mock.ts` to use NextAuth session
4. Update `src/lib/guards.ts` to check NextAuth session
5. Set `config.auth.enabled = true` in `app.config.json`
6. Update middleware if needed

The login page structure is already separated (`src/components/LoginForm.tsx`), making this swap straightforward.

## 🛡️ Route Guards

### Client-Side Guards

Use the `<RequireAuth>` component:

```tsx
import { RequireAuth } from '@/lib/guards'
import { isAuthenticated } from '@/lib/auth-mock'

export default function ProtectedPage() {
  const authed = isAuthenticated()

  return (
    <RequireAuth isAuthed={authed}>
      <YourContent />
    </RequireAuth>
  )
}
```

### Middleware

The `middleware.ts` file handles server-side route protection:

- Only active when `config.auth.enabled === true`
- Protects routes under `/protected/*`
- Currently a placeholder (client-side guards handle auth)

## 🚨 Error Handling

### Dynamic Error Pages

- **Error page** (`/app/error.tsx`): Catches runtime errors
  - Shows error details in development
  - Generic message in production (from config)
  - Actions: "Try again", "Home", "Contact support"

- **404 page** (`/app/not-found.tsx`): Handles not found routes
  - Branded 404 page
  - Link back to home

Both pages read copy from `app.config.json` for easy customization.

## 🧪 Testing

Tests are set up with Vitest and Testing Library:

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with UI
pnpm test:ui
```

### Test Utilities

`src/tests/utils.tsx` provides `renderWithProviders` that wraps components with:

- QueryClientProvider
- ThemeProvider
- CssBaseline

Example:

```tsx
import { renderWithProviders } from '@/tests/utils'

test('my component', () => {
  renderWithProviders(<MyComponent />)
  // ...
})
```

## 🎯 Pages & Routes

- **Home** (`/`): Landing page with hero section and about information
- **Login** (`/login`): Authentication page with form validation
- **Dashboard** (`/protected/dashboard`): Main protected page (placeholder)
- **Profile** (`/protected/profile`): User profile page with account information
- **Form Example** (`/examples/form`): Example form with validation
- **API Health** (`/api/health`): Health check endpoint
- **API Echo** (`/api/echo`): Example POST endpoint with Zod validation

## 📁 Project Structure

```
/
  /scripts             # Development scripts
    setup.js          # Interactive setup
    generate-*.js     # Code generators
  /.vscode            # VS Code snippets (optional)
  /src
    /app              # Next.js App Router pages
      /layout.tsx     # Root layout with providers
      /error.tsx      # Error boundary page
      /not-found.tsx  # 404 page
      /login          # Login page
      /protected      # Protected routes
        /dashboard    # Dashboard page
        /profile      # User profile page
      /examples       # Example pages
        /form         # Form example (RHF + Zod)
      /api            # API routes
        /health       # Health check endpoint
        /echo         # Example POST endpoint with validation
    /components       # React components
      AppThemeProvider.tsx
      Navbar.tsx
      Footer.tsx
      LoginForm.tsx
      PageHeader.tsx
      LoadingSkeleton.tsx
      EmptyState.tsx
      InlineError.tsx
      ErrorPage.tsx
      NotFoundPage.tsx
      ErrorBoundary.tsx
      ToastProvider.tsx
      Providers.tsx
    /contexts         # React contexts
      ThemeContext.tsx # Theme management
    /hooks            # Custom React hooks
      useToast.ts
    /lib              # Utilities and helpers
      api.ts          # Typed fetch with Zod validation
      auth-mock.ts    # Mock authentication
      config.ts       # Config loader and validation
      env.ts          # Environment variables
      form.ts         # Form helpers (useZodForm, getFieldError)
      guards.ts       # Route guards (RequireAuth)
      mui-cache.ts    # Emotion cache for SSR
      queryClient.ts  # TanStack Query setup
      seo.ts          # SEO helpers
    /tests            # Test files and utilities
      utils.tsx       # Test helpers
      setup.ts        # Test setup
  /public             # Static assets
  app.config.json     # App configuration
  middleware.ts       # Next.js middleware
  vercel.json         # Vercel deployment config
```

## 📄 Example Pages

- **Form Example** (`/examples/form`): react-hook-form + Zod validation with error handling

These examples demonstrate best practices and can be used as templates for your own pages.

## 🌐 Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Environment variables are validated via Zod in `src/lib/env.ts`.

## 🚢 Deployment

### Vercel (Recommended)

This starter is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

The `vercel.json` file is included for additional configuration if needed.

### Other Platforms

The starter works on any platform that supports Next.js:

- **Netlify**: Use the Next.js build preset
- **Railway**: Automatic Next.js detection
- **Docker**: Build with `pnpm build && pnpm start`

## 📝 Scripts

### Development

- `dev`: Start development server
- `build`: Build for production
- `start`: Start production server

### Code Quality

- `lint`: Run ESLint
- `typecheck`: Run TypeScript type check
- `format`: Format code with Prettier
- `format:check`: Check code formatting

### Testing

- `test`: Run Vitest tests
- `test:ui`: Run tests with UI

### Generators

- `setup`: Interactive setup script (configures app.config.json)
- `generate:component`: Generate a new component
- `generate:page`: Generate a new page
- `generate:api`: Generate a new API route
- `generate:test`: Generate a new test file

## 🔧 Requirements

- **Node.js** >= 18.18
- **pnpm** (recommended) or npm/yarn

## 📚 Key Concepts

### Styling

- Use MUI components with `sx` prop for styling
- Theme colors come from `app.config.json`
- Avoid custom CSS files; use MUI's styling system
- Global styles only in `src/app/globals.css` for resets

### Data Fetching

- Use TanStack Query for server state
- Use `api()` helper from `src/lib/api.ts` for typed, validated requests
- All API responses are validated with Zod

### Forms

- Use `useZodForm()` from `src/lib/form.ts`
- Validation schemas with Zod
- Error handling with `getFieldError()`

### Configuration

- All app configuration in `app.config.json`
- Never import config directly; use `getConfig()` from `src/lib/config.ts`
- Config is validated with Zod on load
- Use placeholders like `{appName}` and `{description}` in config strings for dynamic values
- Home page content is fully configurable via `pages.home` in config

## 🎯 Using as a GitHub Template

To make this repository a GitHub template:

1. Go to your repository settings on GitHub
2. Check "Template repository" under "General"
3. Users can now click "Use this template" to create new projects instantly

This is the fastest way to start new projects from this starter!

## 🎯 Getting Started Checklist

1. **Clone or use template**: Use GitHub template or clone the repo
2. **Install dependencies**: `pnpm install`
3. **Configure app**: Run `pnpm setup` or edit `app.config.json` manually
4. **Start developing**: `pnpm dev`
5. **Generate code**: Use generators for components, pages, API routes, and tests
6. **Customize**: Update branding, colors, and content in `app.config.json`

## 🤝 Contributing

This is a starter template. Feel free to fork and customize for your needs!

## 📄 License

MIT

---

**Built with ❤️ for fast portfolio projects**
