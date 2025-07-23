'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Check, Minus } from 'lucide-react';
import { forwardRef, useId } from 'react';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
      variant: {
        default: 'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
        error: 'border-destructive focus-visible:ring-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground data-[state=checked]:border-destructive',
        success: 'border-green-500 focus-visible:ring-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white data-[state=checked]:border-green-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
  required?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  customColor?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      variant,
      label,
      description,
      error,
      helperText,
      indeterminate,
      required,
      checked,
      disabled,
      onChange,
      onCheckedChange,
      customColor,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const hasError = !!error;
    const effectiveVariant = hasError ? 'error' : variant;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    const iconSize = size === 'sm' ? 'h-2.5 w-2.5' : size === 'lg' ? 'h-3.5 w-3.5' : 'h-3 w-3';

    const checkboxStyle = customColor ? {
      borderColor: customColor,
      backgroundColor: (checked || indeterminate) ? customColor : 'transparent',
    } : {};

    return (
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="checkbox"
              id={checkboxId}
              className={cn('absolute inset-0 opacity-0 cursor-pointer peer', disabled && 'cursor-not-allowed')}
              ref={ref}
              checked={checked}
              disabled={disabled}
              onChange={handleChange}
              {...props}
            />
            <div
              className={cn(
                checkboxVariants({ size, variant: customColor ? undefined : effectiveVariant }),
                'flex items-center justify-center transition-colors',
                !customColor && checked && 'bg-current border-current',
                !customColor && indeterminate && 'bg-current border-current',
                customColor && 'border-2',
                className,
              )}
              style={checkboxStyle}
              data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
            >
              {checked && !indeterminate && (
                <Check className={cn(iconSize, 'text-white')} strokeWidth={3} />
              )}
              {indeterminate && (
                <Minus className={cn(iconSize, 'text-white')} strokeWidth={3} />
              )}
            </div>
          </div>

          {(label || description) && (
            <div className="space-y-0.5">
              {label && (
                <label 
                  htmlFor={checkboxId}
                  className={cn(
                    'text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
                    disabled && 'cursor-not-allowed opacity-70'
                  )}
                >
                  {label}
                  {required && <span className="text-destructive ml-1">*</span>}
                </label>
              )}
              {description && (
                <label
                  htmlFor={checkboxId}
                  className={cn(
                    'text-xs text-muted-foreground cursor-pointer block',
                    disabled && 'opacity-70 cursor-not-allowed'
                  )}
                >
                  {description}
                </label>
              )}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn('text-xs ml-6', error ? 'text-destructive' : 'text-muted-foreground')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };