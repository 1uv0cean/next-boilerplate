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

🎯 When creating shared UI components (e.g., input, select, date picker, checkbox):

- Build with modern React patterns (forwardRef, hooks)
- Use CVA (Class Variance Authority) for variant management
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
- Include comprehensive demo components in `/components/demo`

🧪 They should be easy to test and mock in isolation

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

📌 Examples of instructions that should be routed to `/components/ui`:

- "Create a reusable input component"
- "Build a shared date range picker" 
- "Make a common searchable dropdown"
- "Create a checkbox component"
- "Build a button component"
- "Make a select component"

Do **not** place all components in `/components/ui`. Only shared UI elements go there.

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

#### Tabs Component (`/components/ui/tabs.tsx`)
- Tab navigation for demo page organization

### Demo Components (`/components/demo/`)
Each UI component has a corresponding comprehensive demo:
- `ButtonDemo.tsx` - Button variants, sizes, and states  
- `CheckboxDemo.tsx` - Checkbox examples with interactive states
- `DatePickerDemo.tsx` - Date selection examples
- `DateRangePickerDemo.tsx` - Date range selection
- `DialogDemo.tsx` - Modal dialog examples
- `InputDemo.tsx` - All input variations and use cases
- `SelectDemo.tsx` - Select dropdown demonstrations
- `SwitchDemo.tsx` - Switch toggle examples with settings scenarios
