# Next.js UI Component Boilerplate

A modern Next.js boilerplate featuring a comprehensive UI component library built from scratch with TypeScript support and interactive demo pages.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 📦 **Custom UI Components** built from scratch
- 🔧 **TypeScript** for type safety
- 🎯 **ESLint & Prettier** for code formatting
- 📱 **Responsive Design** with mobile-first approach
- 🧪 **Interactive Demo Pages** for component testing
- 🎭 **Clean Architecture** following SOLID principles
- ⚡ **CVA** (Class Variance Authority) for variant management

## UI Components

### Complete Component Library

#### 🔧 Input Component
- **Variants**: default, error, success
- **Sizes**: sm, md, lg  
- **Features**: password toggle, clear button, loading state, icons
- **Input Types**: email, phone, number, search, etc.
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

#### 🎯 Button Component  
- **Variants**: default, destructive, outline, secondary, ghost, link, success, warning, info
- **Brand Colors**: hmm-marine, hmm-red (customizable brand palette)
- **Sizes**: sm, md, lg, icon
- **Features**: loading states, left/right icons, custom hex colors
- **Use Cases**: forms, actions, navigation, CTAs

#### ☑️ Checkbox Component
- **Variants**: default, error, success
- **Sizes**: sm, md, lg
- **Features**: indeterminate state, custom colors, labels with descriptions
- **Accessibility**: proper labeling, keyboard interaction, focus management
- **Use Cases**: forms, settings, multi-select, terms acceptance

#### 📋 Select Component
- **Variants**: default, error, success  
- **Sizes**: sm, md, lg
- **Features**: searchable options, disabled states, loading, icons
- **Accessibility**: keyboard navigation, ARIA attributes
- **Use Cases**: dropdowns, filters, form fields

#### 📅 Date Components
- **DatePicker**: single date selection with calendar interface
- **DateRangePicker**: start and end date selection
- **Features**: keyboard navigation, format validation, accessibility

#### 💬 Dialog Component  
- Modal dialogs with backdrop, animations, and focus management
- **Features**: overlay, close on escape, focus trapping

#### 🗂️ Tabs Component
- Tab navigation for organizing content sections
- **Features**: keyboard navigation, active state management

## Demo Page

Visit `/demo` to test all component features interactively. The demo page includes:

### 🎮 Interactive Component Demos

#### Input Components Tab
- **Basic Examples** - Simple input variations with labels
- **Size Variants** - Small, medium, large inputs
- **State Variants** - Error and success states with validation
- **Special Features** - Password toggle, clear functionality
- **Icons** - Left and right icon placement combinations
- **Input Types** - Email, phone, number, search inputs
- **Interactive States** - Loading, disabled, focus conditions

#### Button Components Tab  
- **Variant Types** - All button styles including brand colors
- **Size Variants** - Multiple sizes with and without icons
- **Interactive States** - Loading animations, disabled states
- **Icon Combinations** - Left, right, and icon-only buttons
- **Action Groups** - Common button groupings and patterns
- **Custom Colors** - Hex color customization examples

#### Checkbox Components Tab
- **Basic Examples** - Simple checkboxes and indeterminate states
- **Size Variants** - Different checkbox sizes with descriptions  
- **Error States** - Dynamic validation with error messages
- **Interactive States** - Disabled, loading, and grouped checkboxes
- **Form Examples** - Real-world form scenarios
- **Custom Colors** - Brand-specific color variations

#### Select Components Tab
- **Basic Dropdowns** - Simple select with options
- **Searchable Select** - Filter options by typing
- **Advanced Features** - Multi-level options, disabled states
- **Form Integration** - Validation and error handling

#### Date Components Tab
- **DatePicker** - Single date selection with calendar
- **DateRangePicker** - Start and end date selection

#### Dialog Components Tab
- **Modal Examples** - Various dialog sizes and content types

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
│   ├── demo/              # Interactive demo pages
│   │   └── page.tsx       # Main demo with tab navigation
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI component library
│   │   ├── button.tsx     # Button with variants, icons, custom colors
│   │   ├── checkbox.tsx   # Checkbox with states, custom colors
│   │   ├── input.tsx      # Input with validation, icons, types
│   │   ├── select.tsx     # Select dropdown with search
│   │   ├── datepicker.tsx # Date selection component
│   │   ├── daterangepicker.tsx # Date range selection
│   │   ├── dialog.tsx     # Modal dialog component
│   │   └── tabs.tsx       # Tab navigation component
│   └── demo/              # Comprehensive demo components
│       ├── ButtonDemo.tsx     # Button demonstrations
│       ├── CheckboxDemo.tsx   # Checkbox examples
│       ├── InputDemo.tsx      # Input variations
│       ├── SelectDemo.tsx     # Select demonstrations
│       ├── DatePickerDemo.tsx # Date picker examples
│       ├── DateRangePickerDemo.tsx # Date range examples
│       └── DialogDemo.tsx     # Dialog examples
├── lib/                   # Utility functions
│   └── utils.ts          # Tailwind class merging utilities
├── CLAUDE.md             # Development guidelines & component docs
└── README.md             # Project documentation
```

## Component Architecture

### Design System Principles

- **Consistent API**: All components follow the same prop patterns
- **Variant System**: Size (sm/md/lg) and variant (default/error/success) support
- **Custom Colors**: Brand-specific hex color support with `customColor` prop
- **Accessibility First**: ARIA labels, keyboard navigation, screen reader support
- **TypeScript Strict**: Full type safety with exported interfaces
- **Composable**: Built with composition over inheritance
- **Testable**: Each component can be tested and mocked in isolation

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom-built from scratch
- **Variant Management**: CVA (Class Variance Authority)
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
