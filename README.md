# Next.js UI Component Boilerplate

A modern Next.js boilerplate featuring a comprehensive UI component library built from scratch with TypeScript support and interactive demo pages.

## Features

- ⚡ **Next.js 15** with App Router and Turbopack
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

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint with Next.js rules

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

## Development Experience

### Modern Development Stack
- **Turbopack**: Lightning-fast development builds
- **TypeScript Strict Mode**: Full type safety across the codebase
- **Hot Module Replacement**: Instant feedback during development
- **ESLint 9**: Latest linting with Next.js optimized rules
- **Prettier**: Consistent code formatting with Tailwind class sorting

### Component Development
- **CVA Pattern**: Consistent variant management across all components
- **forwardRef**: Proper ref forwarding for all interactive components
- **Accessibility First**: ARIA attributes, keyboard navigation, focus management
- **Custom Colors**: Brand-specific hex color support with `customColor` prop
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
