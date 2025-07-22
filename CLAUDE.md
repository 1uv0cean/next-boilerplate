🧠 Coding Guidelines

You must always write code as if you are a senior software engineer building a production-grade application.

Follow modern best practices in:

- Clean architecture and reusable design patterns
- TypeScript strict typing
- Functional components (no `FC` type)
- Composition over inheritance
- Separation of concerns (UI, logic, state)
- Minimal and meaningful abstractions
- SOLID principles and scalable folder structure
- Use pnpm package manager
- Use Arrow Function

Avoid shortcuts or naive implementations.  
Always prioritize clarity, maintainability, extensibility, and testability in your code.

🎯 When creating shared UI components (e.g., input, select, date picker):

- Use `shadcn/ui` primitives as the base
- Place them in `/components/ui`
- Ensure they follow SOLID principles:
  - Single Responsibility
  - Open/Closed
  - Composition-friendly

📦 Reusable UI components must:

- Accept `className`, `...props`, and type-safe inputs
- Export props and types separately
- Support accessibility and keyboard interaction
- Be easily styled with TailwindCSS

🧪 They should be easy to test and mock in isolation

---

## 🎨 UI Component Styling Standards

Follow these patterns for consistent, maintainable components:

### CVA (Class Variance Authority) Structure
```typescript
const componentVariants = cva(
  "base-classes comprehensive-defaults focus-states disabled-states",
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
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
);
```

### Component Interface Pattern
```typescript
export interface ComponentProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'size'>,
    VariantProps<typeof componentVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  // Feature-specific props...
}
```

### forwardRef Implementation
```typescript
const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {/* Component structure */}
      </div>
    );
  }
);

Component.displayName = 'Component';
export { Component, componentVariants };
```

### Design System Standards

**Colors & States:**
- Use semantic tokens: `border-input`, `bg-background`, `text-destructive`
- Error states: `border-destructive focus-visible:ring-destructive` 
- Success states: `border-green-500 focus-visible:ring-green-500`
- Muted elements: `text-muted-foreground`

**Focus & Interaction:**
- Standard focus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Transitions: `transition-colors` for hover/focus states
- Disabled: `disabled:cursor-not-allowed disabled:opacity-50`

**Icons:**
- Standard size: `h-4 w-4`
- Position: `absolute top-1/2 -translate-y-1/2`
- Left icons: `left-3` with `pl-10` input padding
- Right icons: `right-3` with `pr-10` input padding
- Colors: `text-muted-foreground hover:text-foreground`

**Size Variants:**
- Always use `sm`, `md`, `lg` naming
- Progressive scaling with consistent ratios
- Include both height and padding adjustments

**Component Structure:**
1. Wrapper with `space-y-1` for vertical spacing
2. Optional label above main element
3. Relative container for absolute-positioned icons  
4. Main interactive element with variants applied
5. Optional helper/error text below

### Enhanced Component Features

**Required Field Indicator:**
```tsx
// Add required prop to interface
interface ComponentProps {
  required?: boolean;
}

// In label rendering
{label && (
  <label className="text-sm leading-none font-medium">
    {label}
    {required && <span className="text-destructive ml-1">*</span>}
  </label>
)}
```

**Enhanced Disabled Styling:**
- Base variants: `disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted`
- Icons in disabled state: `text-muted-foreground/50`
- Focus rings disabled when component is disabled

**Select Component Specific:**
- Click outside to close dropdown functionality
- Searchable option with filtered results
- Keyboard navigation support (Enter/Space)
- Maximum height with scrolling (`max-h-60 overflow-auto`)
- Option states: disabled options, selected indication

**Common Props Pattern:**
```tsx
interface ComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
}
```

---

📌 Examples of instructions that should be routed to `/components/ui`:

- "Create a reusable input component"
- "Build a shared date range picker"
- "Make a common searchable dropdown"

Do **not** place all components in `/components/ui`. Only shared UI elements go there.
