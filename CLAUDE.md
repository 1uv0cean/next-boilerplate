# 🧠 CLAUDELWP Boilerplate Development Guidelines

> **Mission**: Enable rapid development of production-grade web applications through proven patterns, reusable components, and enterprise architecture.

## 🎯 Development Philosophy

**Build for Production from Day One**
Every component, pattern, and architectural decision should be made with production scalability in mind. This boilerplate accelerates development while maintaining enterprise-grade code quality.

### Core Development Principles

- **🏗️ Clean Architecture**: Separation of concerns, dependency inversion, testable code
- **📐 TypeScript Strict**: Zero tolerance for `any` types, full type safety
- **⚛️ Modern React**: Functional components, hooks, no legacy patterns
- **🧩 Composition > Inheritance**: Build through composition patterns
- **🎨 Design System**: Consistent UI patterns with variant management
- **⚡ Performance First**: Code splitting, lazy loading, optimized bundles
- **🔧 Developer Experience**: Hot reloading, type checking, linting automation
- **📦 pnpm**: Lightning-fast package management

**Golden Rule**: Write code as if the next developer maintaining it is a violent psychopath who knows where you live.

🎯 When creating shared UI components (e.g., input, select, date picker, checkbox):

- Build with modern React patterns (forwardRef, hooks)
- Use CVA (Class Variance Authority) for variant management
- Place them in `/components/ui`
- Ensure they follow SOLID principles:
  - Single Responsibility
  - Open/Closed
  - Composition-friendly

## 🚀 Rapid Development Patterns

### 📦 Component Development Checklist

Every reusable UI component MUST:

- ✅ **Props Interface**: Accept `className`, `...props`, and type-safe inputs
- ✅ **Type Exports**: Export props and types separately for reusability
- ✅ **Accessibility**: WCAG 2.1 compliant with proper ARIA attributes
- ✅ **Keyboard Navigation**: Full keyboard interaction support
- ✅ **TailwindCSS**: Easily customizable with utility classes
- ✅ **Demo Component**: Comprehensive examples in `/components/demo`
- ✅ **Testability**: Isolated, mockable, and unit-testable
- ✅ **forwardRef**: Proper ref forwarding for form libraries
- ✅ **Error Handling**: Graceful error states and validation
- ✅ **Loading States**: Proper loading/pending state management

### 🎨 Design System Integration

```tsx
// Every component follows this pattern
export interface ComponentProps {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  customColor?: string
  className?: string
  // ... component-specific props
}

// CVA for consistent styling
const componentVariants = cva(baseClasses, {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ }
})
```

---

## 🎨 UI Component Architecture Standards

Follow these patterns for consistent, maintainable components:

### Component Type Categories

**1. Input Components** (text-based, user entry)
- Input, Select, DatePicker, DateRangePicker
- Variable sizes: `sm`, `md`, `lg`
- Support icons, validation states
- Use `items-center` alignment

**2. Toggle Components** (binary state)
- Checkbox, Switch  
- Fixed sizes for consistent label alignment
- Use `items-center` alignment
- Support custom colors and states

**3. Action Components** (trigger actions)
- Button, Dialog
- Variable sizes and states
- Support loading, icons, custom colors

**4. Layout Components** (structure and organization)
- Section
- Flexible container with content organization
- Variable padding, spacing, backgrounds, borders

### CVA Pattern for Input Components
```typescript
const inputVariants = cva(
  "base-classes focus-states disabled-states",
  {
    variants: {
      size: {
        sm: 'h-8 px-2 py-1',
        md: 'h-10 px-3 py-2', 
        lg: 'h-12 px-4 py-3'
      },
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500'
      }
    },
    defaultVariants: { size: 'md', variant: 'default' }
  }
);
```

### CVA Pattern for Toggle Components
```typescript
const toggleVariants = cva(
  "fixed-size base-classes focus-states disabled-states",
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-primary',
        error: 'border-destructive focus-visible:ring-destructive', 
        success: 'border-green-500 focus-visible:ring-green-500'
      }
    },
    defaultVariants: { variant: 'default' }
  }
);
```

### Universal Component Structure
```typescript
const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, label, error, customColor, ...props }, ref) => {
    const componentId = useId();
    const hasError = !!error;
    const effectiveVariant = hasError ? 'error' : variant;
    
    const customStyle = customColor ? {
      // Apply custom color logic
    } : {};

    return (
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          {/* Interactive element */}
          <div className="relative">
            <input
              id={componentId}
              className="peer..."
              style={customStyle}
              {...props}
            />
            {/* Visual representation */}
          </div>
          
          {/* Labels */}
          {(label || description) && (
            <div className="space-y-0.5">
              <label htmlFor={componentId} className="cursor-pointer...">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </label>
              {description && (
                <label htmlFor={componentId} className="cursor-pointer text-xs...">
                  {description}
                </label>
              )}
            </div>
          )}
        </div>
        
        {/* Helper/Error text */}
        {(error || helperText) && (
          <p className="text-xs ml-[offset]">
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
```

### Design System Standards

**Colors & States:**
- Semantic tokens: `border-input`, `bg-background`, `text-destructive`
- Error states: `border-destructive focus-visible:ring-destructive`
- Success states: `border-green-500 focus-visible:ring-green-500` 
- Muted elements: `text-muted-foreground`

**Focus & Accessibility:**
- Focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Transitions: `transition-colors` for smooth interactions
- Disabled: `disabled:cursor-not-allowed disabled:opacity-50`
- Labels clickable: `cursor-pointer` with `htmlFor` connection

**Common Props Interface:**
```tsx
interface ComponentProps {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  customColor?: string;
  onCheckedChange?: (checked: boolean) => void;
  // Component-specific props...
}
```

**Fixed Size Implementation (Toggle Components):**
- **Checkbox**: `h-4 w-4` with `h-3 w-3` icons
- **Switch**: `h-5 w-9` with `h-4 w-4` thumb
- **Rationale**: Consistent label alignment, no layout shifts
- **Helper text offset**: Match component width (`ml-6` for checkbox, `ml-11` for switch)

**Custom Color Support:**
- Hex color values override variant colors
- Applied to active/checked states
- Maintains semantic meaning for accessibility
- Example: `backgroundColor: checked ? customColor : defaultColor`

---

## 📁 Project Structure & Organization

### Component Placement Rules

**`/components/ui/`** - Shared UI Components Only
- ✅ Input, Button, Select, Checkbox, Switch
- ✅ DatePicker, Dialog, Card, Table
- ✅ Layout components (Section, Grid)
- ❌ Business logic components
- ❌ Page-specific components
- ❌ Feature-specific components

**`/components/demo/`** - Component Demonstrations
- ✅ Interactive examples for each UI component
- ✅ Copy-paste code examples
- ✅ Multiple usage scenarios

**`/components/features/`** - Feature-Specific Components
- ✅ Business logic components
- ✅ Complex feature implementations
- ✅ Data-fetching components

### 🏗️ Folder Structure Best Practices

```
components/
├── ui/                 # Shared UI library
│   ├── button.tsx      # <Button /> component
│   ├── input.tsx       # <Input /> component
│   └── index.ts        # Barrel exports
├── demo/               # Component demonstrations
│   ├── ButtonDemo.tsx  # Button usage examples
│   └── InputDemo.tsx   # Input usage examples
├── features/           # Business logic
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard-specific components
│   └── profile/       # User profile components
├── forms/             # Form compositions
├── layout/            # Layout components
└── providers/         # Context providers
```

### 🎯 Rapid Development Instructions

**Component Creation Keywords** → Route to `/components/ui/`:
- "Create a reusable [component]"
- "Build a shared [component]"
- "Make a common [component]"
- "Design system [component]"

**Feature Keywords** → Route to `/components/features/`:
- "Build [feature name] functionality"
- "Create [business logic]"
- "Implement [user workflow]"

## 📋 Implemented Components

### Current UI Components Library

#### Input Component (`/components/ui/input.tsx`)
- **Variants**: default, error, success
- **Sizes**: sm, md, lg
- **Features**: password toggle, clear button, loading state, icons
- **Props**: label, error, helperText, leftIcon, rightIcon, required, success

#### Button Component (`/components/ui/button.tsx`)
- **Variants**: default, destructive, outline, secondary, ghost, link, success, warning, info, hmm-marine, hmm-red
- **Sizes**: sm, md, lg, icon
- **Features**: loading state, left/right icons, custom colors
- **Props**: leftIcon, rightIcon, loading, customColor

#### Checkbox Component (`/components/ui/checkbox.tsx`)
- **Fixed Size**: 4×4 for consistent alignment
- **Variants**: default, error, success
- **Features**: indeterminate state, custom colors, clickable labels
- **Props**: label, description, error, helperText, indeterminate, required, customColor, onCheckedChange

#### Select Component (`/components/ui/select.tsx`)
- **Variants**: default, error, success
- **Sizes**: sm, md, lg
- **Features**: searchable, disabled options, loading state, icons
- **Props**: options, placeholder, searchable, loading, leftIcon

#### Switch Component (`/components/ui/switch.tsx`)
- **Fixed Size**: 5×9 track with 4×4 thumb for consistent alignment
- **Variants**: default, error, success
- **Features**: smooth sliding animation, custom colors, clickable labels
- **Props**: label, description, error, helperText, required, customColor, onCheckedChange

#### Date Components
- **DatePicker** (`/components/ui/datepicker.tsx`)
- **DateRangePicker** (`/components/ui/daterangepicker.tsx`)

#### Dialog Component (`/components/ui/dialog.tsx`)
- Modal dialogs with overlay and animations

#### Section Component (`/components/ui/section.tsx`)
- **Variants**: padding (none, sm, md, lg, xl), background (none, default, muted, card, accent), border (none, default, muted, rounded, rounded-muted), spacing (none, sm, md, lg, xl)
- **HTML Elements**: section, div, article, aside, main
- **Features**: optional title/description header, header actions, flexible content organization
- **Props**: title, description, headerAction, padding, spacing, background, border, as

#### Tabs Component (`/components/ui/tabs.tsx`)
- Tab navigation for demo page organization

## 🎮 Interactive Demo System

### Demo Component Standards

Each UI component MUST have a comprehensive demo showing:

- **All Variants**: default, error, success states
- **All Sizes**: sm, md, lg where applicable
- **Interactive Examples**: Real form submissions, state changes
- **Copy-Paste Code**: Ready-to-use code snippets
- **Accessibility Features**: Keyboard navigation, screen reader support
- **Edge Cases**: Loading states, disabled states, error handling

### Current Demo Components

#### 📝 Form & Input Demos
- `InputDemo.tsx` - Text inputs with validation, icons, types
- `TextareaDemo.tsx` - Multi-line inputs with auto-resize
- `SelectDemo.tsx` - Dropdowns with search and validation
- `CheckboxDemo.tsx` - Binary selections with custom colors
- `SwitchDemo.tsx` - Toggle switches for settings
- `DatePickerDemo.tsx` - Calendar date selection
- `DateRangePickerDemo.tsx` - Date range selection

#### 🎯 Action & Navigation Demos
- `ButtonDemo.tsx` - All button variants and states
- `BadgeDemo.tsx` - Status indicators and labels
- `DialogDemo.tsx` - Modal interactions
- `TabsDemo.tsx` - Tab navigation patterns

#### 🏗️ Layout & Structure Demos
- `SectionDemo.tsx` - Page layout patterns
- `CardDemo.tsx` - Content containers
- `TableDemo.tsx` - Data presentation
- `AccordionDemo.tsx` - Collapsible content

### 🚀 Using Demos for Development

```tsx
// 1. Check the demo page for implementation patterns
visit('/demo')

// 2. Copy the pattern you need
const MyForm = () => {
  // Copy from InputDemo.tsx
  return (
    <Input 
      label="Email" 
      type="email" 
      required 
      error={errors.email}
    />
  )
}

// 3. Customize for your use case
```

## 🔧 Development Workflow

### Starting a New Project

1. **🎯 Define Requirements**
   ```bash
   # What are you building?
   # - SaaS dashboard?
   # - E-commerce site?
   # - Corporate website?
   # - Admin panel?
   ```

2. **🎨 Customize Design System**
   ```css
   /* app/globals.css - Update brand colors */
   :root {
     --primary: YOUR_BRAND_PRIMARY;
     --secondary: YOUR_BRAND_SECONDARY;
   }
   ```

3. **📄 Plan Your Pages**
   ```bash
   app/
   ├── (auth)/login/page.tsx      # Authentication
   ├── dashboard/page.tsx         # Main dashboard
   ├── settings/page.tsx          # User settings
   └── (marketing)/page.tsx       # Landing page
   ```

4. **🧩 Build with Components**
   ```tsx
   // Use existing components
   import { Button, Input, Card } from '@/components/ui'
   
   // Compose complex UIs quickly
   <Card>
     <Input label="Search" />
     <Button>Submit</Button>
   </Card>
   ```

### Adding New Features

1. **Check Existing Components**: Visit `/demo` first
2. **Extend if Needed**: Add variants to existing components
3. **Create New Components**: Follow the established patterns
4. **Add Demo**: Always create a demo for new components
5. **Update Documentation**: Keep CLAUDE.md updated

### Code Quality Checklist

- ✅ TypeScript strict mode compliance
- ✅ ESLint passes without warnings
- ✅ Components are responsive (mobile-first)
- ✅ Accessibility testing with keyboard navigation
- ✅ Error boundaries for error handling
- ✅ Loading states for async operations
- ✅ Proper form validation patterns

## 🚀 Production Deployment Checklist

### Pre-Deployment
- ✅ `pnpm build` succeeds without errors
- ✅ `pnpm lint` passes
- ✅ `pnpm type-check` passes
- ✅ All pages load correctly
- ✅ Mobile responsiveness tested
- ✅ Accessibility audit completed
- ✅ Performance audit (Lighthouse score 90+)

### Environment Setup
```bash
# Production environment variables
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
DATABASE_URL=your_production_db_url
```

### Performance Optimization
- **Images**: Use Next.js `Image` component
- **Fonts**: Optimize with `next/font`
- **Bundle**: Automatic code splitting enabled
- **SEO**: Meta tags configured
- **Analytics**: Add your analytics provider

---

## 💡 Quick Reference

### Common Patterns
```tsx
// Form with validation
<form className="space-y-4">
  <Input label="Email" type="email" required error={errors.email} />
  <Button type="submit" loading={isSubmitting}>Submit</Button>
</form>

// Data display
<Card>
  <CardHeader>
    <CardTitle>Users</CardTitle>
  </CardHeader>
  <CardContent>
    <DataTable data={users} columns={columns} />
  </CardContent>
</Card>

// Settings panel
<Section title="Preferences">
  <Switch label="Email notifications" />
  <Switch label="Push notifications" />
</Section>
```

### Essential Commands
```bash
pnpm dev              # Start development
pnpm build            # Production build
pnpm lint             # Check code quality
visit /demo           # Explore components
```

**Remember**: This boilerplate is designed for speed without sacrificing quality. Every pattern and component has been battle-tested in production environments.
