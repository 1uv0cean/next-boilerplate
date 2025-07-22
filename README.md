# Next.js UI Component Boilerplate

A modern Next.js boilerplate featuring a comprehensive UI component library with shadcn/ui integration, TypeScript support, and interactive demo pages.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 📦 **shadcn/ui** components
- 🔧 **TypeScript** for type safety
- 🎯 **ESLint & Prettier** for code formatting
- 📱 **Responsive Design** with mobile-first approach
- 🧪 **Interactive Demo Pages** for component testing
- 🎭 **Clean Architecture** following SOLID principles

## UI Components

### Input Component

- Multiple size variants (small, medium, large)
- State variants (default, error, success)
- Special features (password toggle, clear button)
- Icon support (left, right, or both)
- Various input types (email, phone, number, etc.)
- Loading and disabled states
- Built-in validation and error handling

## Demo Page

Visit `/demo` to test all component features interactively. The demo page includes:

- **Basic Examples** - Simple input variations
- **Size Variants** - Different input sizes
- **State Variants** - Error and success states
- **Special Features** - Password toggle, clear functionality
- **Icons** - Left and right icon placement
- **Input Types** - Email, phone, number inputs
- **States** - Loading, disabled conditions
- **Complex Examples** - Advanced search, security codes

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd next-boilerplate
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the application.

5. Visit [http://localhost:3000/demo](http://localhost:3000/demo) to explore component demos.

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── demo/              # Demo pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   └── demo/              # Demo-specific components
├── lib/                   # Utility functions
└── CLAUDE.md             # Development guidelines
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
