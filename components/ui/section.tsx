'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

const sectionVariants = cva(
  'w-full',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
      spacing: {
        none: 'space-y-0',
        sm: 'space-y-2',
        md: 'space-y-4',
        lg: 'space-y-6',
        xl: 'space-y-8',
      },
      background: {
        none: 'bg-transparent',
        default: 'bg-background',
        muted: 'bg-muted',
        card: 'bg-card',
        accent: 'bg-accent',
      },
      border: {
        none: 'border-0',
        default: 'border border-border',
        muted: 'border border-muted',
        rounded: 'border border-border rounded-lg',
        'rounded-muted': 'border border-muted rounded-lg',
      },
    },
    defaultVariants: {
      padding: 'md',
      spacing: 'md',
      background: 'none',
      border: 'none',
    },
  },
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
  as?: 'section' | 'div' | 'article' | 'aside' | 'main';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      padding,
      spacing,
      background,
      border,
      title,
      description,
      headerAction,
      as = 'section',
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as;
    
    const hasHeader = title || description || headerAction;

    return (
      <Component
        className={cn(sectionVariants({ padding, spacing, background, border }), className)}
        ref={ref as any}
        {...props}
      >
        {hasHeader && (
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              {title && (
                <h2 className="text-lg font-semibold leading-none tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="flex-shrink-0 ml-4">
                {headerAction}
              </div>
            )}
          </div>
        )}
        <div className={cn(hasHeader && 'space-y-0', !hasHeader && spacing && sectionVariants({ spacing }))}>
          {children}
        </div>
      </Component>
    );
  },
);

Section.displayName = 'Section';

export { Section, sectionVariants };