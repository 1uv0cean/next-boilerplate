# 🚀 Next.js Production Boilerplate

**CLAUDELWP** - A battle-tested Next.js boilerplate for rapid development of production-grade web applications. Built with modern React patterns, comprehensive UI components, and enterprise-ready architecture.

> **Perfect for**: SaaS applications, admin dashboards, e-commerce sites, corporate websites, and any web application requiring rapid development with maintainable code.

## ✨ Why Choose This Boilerplate?

### 🚀 **Rapid Development**
- **20+ Production-Ready Components** - Skip weeks of UI development
- **Interactive Demo Pages** - Test and customize components instantly
- **TypeScript Templates** - Copy-paste component patterns
- **Enterprise Architecture** - Scales from MVP to production

### 🎯 **Developer Experience**
- ⚡ **Next.js 15** with App Router and Turbopack for blazing fast builds
- 🔧 **TypeScript Strict Mode** - Catch errors before they happen
- 🎨 **Tailwind CSS 4** with automatic class sorting
- 📦 **pnpm** for lightning-fast installs
- 🎭 **ESLint 9 + Prettier** with Next.js optimized rules
- 🔥 **Hot Module Replacement** for instant feedback

### 🏗️ **Production Architecture**
- 📱 **Mobile-First Responsive Design**
- ♿ **Accessibility-First Components** (WCAG 2.1 compliant)
- 🎨 **Design System** with consistent variants and theming
- 🧪 **Testable Components** built for isolation and mocking
- 🛡️ **Type Safety** across the entire application
- ⚡ **Performance Optimized** with lazy loading and code splitting

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
- **Fixed Size**: 4×4 for consistent alignment
- **Features**: indeterminate state, custom colors, labels with descriptions
- **Accessibility**: proper labeling, keyboard interaction, focus management
- **Use Cases**: forms, settings, multi-select, terms acceptance

#### 🔄 Switch Component

- **Variants**: default, error, success
- **Fixed Size**: 5×9 track with 4×4 thumb for consistent alignment
- **Features**: smooth sliding animation, custom colors, clickable labels
- **Use Cases**: settings toggles, feature flags, binary options

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

#### 📝 Textarea Component

- **Variants**: default, error, success
- **Sizes**: sm, md, lg
- **Features**: auto-resize, character counting, validation states

#### 🏷️ Badge Component

- **Variants**: default, secondary, destructive, outline
- **Sizes**: sm, md, lg
- **Features**: removable badges, custom colors, icon support

#### 🗂️ Tabs Component

- Tab navigation for organizing content sections
- **Features**: keyboard navigation, active state management

#### 🃏 Card Component

- **Variants**: default, elevated, outlined
- **Features**: header, content, footer sections
- **Use Cases**: content containers, info panels, dashboards

#### 📊 Table & DataTable Components

- **Table**: Basic table with responsive design
- **DataTable**: Advanced table with sorting, filtering, pagination
- **Features**: selection, actions, custom cells

#### 🗂️ Accordion Component

- Collapsible content sections
- **Features**: single/multiple expansion, custom triggers

#### 🏗️ Section Component

- **Variants**: padding (none, sm, md, lg, xl), background (none, default, muted, card, accent), border (none, default, muted, rounded, rounded-muted)
- **Features**: optional title/description header, header actions, flexible content organization

#### 🧭 Navigation Components

- **TopNavigator**: main navigation bar with responsive design
- **Sidebar**: collapsible side navigation
- **Breadcrumb**: breadcrumb navigation trail

#### 📤 FileUpload Component

- Drag and drop file upload with progress
- **Features**: multiple files, file type validation, preview

#### 🎨 Typography Component

- Consistent text styling system
- **Variants**: headings (h1-h6), body text, captions, labels

#### 🍞 Toast Component

- Notification system with different variants
- **Features**: auto-dismiss, action buttons, positioning

## Demo Page

Visit `/demo` to test all component features interactively. The demo page includes:

### 🎮 Interactive Component Demos

### 🎮 Comprehensive Component Demonstrations

The demo page is organized into tabs showcasing each component category:

#### Input & Form Components
- **Input Demo** - Text inputs with variants, sizes, icons, and validation
- **Textarea Demo** - Multi-line text input with auto-resize and character counting
- **Select Demo** - Dropdown selections with search and validation
- **Checkbox Demo** - Binary selections with states and custom colors
- **Switch Demo** - Toggle switches for settings and preferences
- **FileUpload Demo** - Drag-and-drop file uploads with progress

#### Action & Navigation Components
- **Button Demo** - All button variants, sizes, and interactive states
- **Badge Demo** - Labels and tags with different styles
- **TopNavigator Demo** - Main navigation bar examples
- **Sidebar Demo** - Collapsible side navigation patterns
- **Breadcrumb Demo** - Navigation trail demonstrations

#### Layout & Structure Components
- **Card Demo** - Content containers with headers and actions
- **Section Demo** - Page sections with various layouts
- **Accordion Demo** - Collapsible content sections
- **Table Demo** - Basic data tables with styling
- **DataTable Demo** - Advanced tables with sorting and filtering

#### Feedback & Interaction Components
- **Dialog Demo** - Modal dialogs and overlays
- **Toast Demo** - Notification messages and alerts
- **Typography Demo** - Text styling and hierarchy

#### Date & Time Components
- **DatePicker Demo** - Single date selection with calendar interface
- **DateRangePicker Demo** - Date range selection for filters and bookings

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (20+ recommended)
- **pnpm** (faster than npm/yarn)

### 1️⃣ Create Your Project

```bash
# Method 1: Clone this repository
git clone https://github.com/your-username/next-boilerplate.git my-project
cd my-project
rm -rf .git && git init  # Start fresh

# Method 2: Use as template (recommended)
# Click "Use this template" on GitHub
```

### 2️⃣ Install & Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### 3️⃣ Explore & Customize

1. **📊 Demo Page**: Visit [localhost:3000/demo](http://localhost:3000/demo) to explore all components
2. **🎨 Customize**: Edit `app/globals.css` for your brand colors
3. **🔧 Configure**: Update `tailwind.config.js` for your design system
4. **📝 Document**: Edit `CLAUDE.md` with your project-specific guidelines

### 4️⃣ Start Building

```bash
# Your project structure is ready!
# Copy components from /components/ui to build your pages
# Use /components/demo for reference implementations
```

### 📋 Available Scripts

```bash
# Development
pnpm dev          # Start dev server with Turbopack (recommended)
pnpm dev:next     # Start dev server with standard Next.js

# Production
pnpm build        # Build optimized production bundle
pnpm start        # Start production server
pnpm preview      # Preview production build locally

# Code Quality
pnpm lint         # Run ESLint with Next.js rules
pnpm lint:fix     # Auto-fix linting issues
pnpm type-check   # Run TypeScript compiler check
pnpm format       # Format code with Prettier

# Testing (when added)
pnpm test         # Run unit tests
pnpm test:e2e     # Run end-to-end tests
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── demo/              # Interactive demo pages
│   │   └── page.tsx       # Main demo with tab navigation
│   ├── dashboard/         # Dashboard example page
│   ├── login/             # Login page example
│   ├── organizations/     # Organizations page example
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Complete UI component library
│   │   ├── Accordion.tsx      # Collapsible content sections
│   │   ├── Badge.tsx          # Labels and status indicators
│   │   ├── Breadcrumb.tsx     # Navigation trail component
│   │   ├── Button.tsx         # Button with variants, icons, custom colors
│   │   ├── Card.tsx           # Content containers with headers
│   │   ├── Checkbox.tsx       # Checkbox with states, custom colors
│   │   ├── DataTable.tsx      # Advanced data table with features
│   │   ├── DatePicker.tsx     # Single date selection component
│   │   ├── DateRangePicker.tsx # Date range selection component
│   │   ├── Dialog.tsx         # Modal dialog component
│   │   ├── FileUpload.tsx     # File upload with drag-and-drop
│   │   ├── Input.tsx          # Input with validation, icons, types
│   │   ├── Navigation.tsx     # Navigation utilities
│   │   ├── Section.tsx        # Layout sections with variants
│   │   ├── Select.tsx         # Select dropdown with search
│   │   ├── Sidebar.tsx        # Collapsible sidebar navigation
│   │   ├── Switch.tsx         # Toggle switch component
│   │   ├── Table.tsx          # Basic table component
│   │   ├── Tabs.tsx           # Tab navigation component
│   │   ├── Textarea.tsx       # Multi-line text input
│   │   ├── Toast.tsx          # Notification system
│   │   ├── TopNavigator.tsx   # Main navigation bar
│   │   └── Typography.tsx     # Text styling system
│   ├── demo/              # Comprehensive demo components
│   │   ├── AccordionDemo.tsx      # Accordion demonstrations
│   │   ├── BadgeDemo.tsx          # Badge examples
│   │   ├── BreadcrumbDemo.tsx     # Breadcrumb examples
│   │   ├── ButtonDemo.tsx         # Button demonstrations
│   │   ├── CardDemo.tsx           # Card layout examples
│   │   ├── CheckboxDemo.tsx       # Checkbox examples
│   │   ├── DataTableDemo.tsx      # Advanced table examples
│   │   ├── DatePickerDemo.tsx     # Date picker examples
│   │   ├── DateRangePickerDemo.tsx # Date range examples
│   │   ├── DialogDemo.tsx         # Dialog examples
│   │   ├── FileUploadDemo.tsx     # File upload examples
│   │   ├── InputDemo.tsx          # Input variations
│   │   ├── SectionDemo.tsx        # Section layout examples
│   │   ├── SelectDemo.tsx         # Select demonstrations
│   │   ├── SidebarDemo.tsx        # Sidebar examples
│   │   ├── SwitchDemo.tsx         # Switch toggle examples
│   │   ├── TableDemo.tsx          # Basic table examples
│   │   ├── TextareaDemo.tsx       # Textarea examples
│   │   ├── ToastDemo.tsx          # Toast notification examples
│   │   ├── TopNavigatorDemo.tsx   # Navigation bar examples
│   │   └── TypographyDemo.tsx     # Typography demonstrations
│   ├── features/          # Feature-specific components
│   ├── forms/             # Form-related components
│   └── layout/            # Layout components
├── constants/             # Application constants
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   └── utils.ts          # Tailwind class merging utilities
├── types/                 # TypeScript type definitions
├── CLAUDE.md             # Development guidelines & component docs
└── README.md             # Project documentation
```

## 🏗️ Architecture & Patterns

### 🎨 Design System Philosophy

- **📐 Consistent API**: Unified prop patterns across all components
- **🎯 Variant System**: Predictable size/variant combinations
- **🎨 Brand Flexibility**: Custom color support with `customColor` prop
- **♿ Accessibility First**: WCAG 2.1 compliant with proper ARIA
- **🔧 TypeScript Strict**: 100% type safety with exported interfaces
- **🧩 Composable**: Composition over inheritance patterns
- **🧪 Testable**: Isolated components ready for unit testing

### 🚀 Getting Started Patterns

#### Copy-Paste Component Usage
```tsx
// 1. Import the component
import { Button } from '@/components/ui/button'

// 2. Use with variants
<Button variant="default" size="md">
  Click me
</Button>

// 3. Customize with brand colors
<Button customColor="#FF6B35" size="lg">
  Brand Button
</Button>
```

#### Build Complex Forms Quickly
```tsx
import { Input, Select, Checkbox, Button } from '@/components/ui'

// Complete form in minutes, not hours
<form className="space-y-4">
  <Input label="Email" type="email" required />
  <Select label="Country" options={countries} searchable />
  <Checkbox label="Subscribe to newsletter" />
  <Button type="submit" className="w-full">
    Sign Up
  </Button>
</form>
```

## Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Framework**: React 19
- **UI Components**: Custom-built from scratch (20+ components)
- **Variant Management**: CVA (Class Variance Authority)
- **Utility Library**: clsx, tailwind-merge
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Code Quality**: ESLint 9, Prettier with Tailwind plugin
- **Animation**: tw-animate-css

## 🛠️ Customization Guide

### 🎨 Brand Your Application

#### 1. Update Colors (5 minutes)
```css
/* app/globals.css */
:root {
  --primary: 210 40% 98%;        /* Your brand primary */
  --secondary: 210 40% 96%;      /* Your brand secondary */ 
  --accent: 210 40% 94%;         /* Your brand accent */
  --destructive: 0 84% 60%;      /* Error/danger color */
}
```

#### 2. Add Custom Components (10 minutes)
```bash
# Copy existing component as template
cp components/ui/button.tsx components/ui/my-component.tsx

# Add to demo page
cp components/demo/ButtonDemo.tsx components/demo/MyComponentDemo.tsx
```

#### 3. Extend Existing Components
```tsx
// Extend Button with your brand variants
const buttonVariants = cva(baseStyles, {
  variants: {
    variant: {
      default: "...",
      "my-brand": "bg-gradient-to-r from-blue-500 to-purple-600",
      "my-outline": "border-2 border-blue-500 text-blue-500"
    }
  }
})
```

### 🚀 Production Deployment

#### Vercel (Recommended - 2 minutes)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Other Platforms
```bash
# Build for production
pnpm build

# The `out` folder contains your static files
# Deploy to any static hosting service
```

### 📈 Performance Tips

- **Components are already optimized** with proper lazy loading
- **Images**: Use Next.js `Image` component (already configured)
- **Fonts**: Optimize with `next/font` (already set up)
- **Bundle**: Automatic code splitting with App Router
- **SEO**: Meta tags configured in layout files
