'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ChevronDown, Home, Info, Mail, Settings, ShoppingCart, Users } from 'lucide-react';
import { forwardRef, useState } from 'react';
import Link from 'next/link';

const topNavigatorVariants = cva(
  'flex items-center justify-between w-full bg-background border-b border-border transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-background border-border',
        minimal: 'bg-transparent border-transparent',
        filled: 'bg-primary/5 border-primary/20',
        outline: 'border-2 border-border rounded-lg',
      },
      size: {
        sm: 'h-12 px-4',
        md: 'h-16 px-6',
        lg: 'h-20 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const navItemVariants = cva(
  'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground hover:text-foreground hover:bg-accent',
        active: 'text-foreground bg-accent',
        disabled: 'text-muted-foreground/50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface NavigationItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: NavigationItem[];
}

export interface TopNavigatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof topNavigatorVariants> {
  logo?: React.ReactNode;
  logoText?: string;
  items?: NavigationItem[];
  actions?: React.ReactNode;
  showActions?: boolean;
  onItemClick?: (item: NavigationItem) => void;
}

const defaultItems: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: 'Products',
    href: '/products',
    icon: <ShoppingCart className="h-4 w-4" />,
    children: [
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Books', href: '/products/books' },
      { label: 'Apparel', href: '/products/apparel' },
    ],
  },
  {
    label: 'Users',
    href: '/users',
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: 'About',
    href: '/about',
    icon: <Info className="h-4 w-4" />,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: <Mail className="h-4 w-4" />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="h-4 w-4" />,
    disabled: true,
  },
];

const TopNavigator = forwardRef<HTMLDivElement, TopNavigatorProps>(
  (
    {
      className,
      variant,
      size,
      logo,
      logoText = 'Next Boilerplate',
      items = defaultItems,
      actions,
      showActions = true,
      onItemClick,
      ...props
    },
    ref,
  ) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleItemClick = (item: NavigationItem) => {
      if (item.disabled) return;
      
      if (item.onClick) {
        item.onClick();
      }
      
      onItemClick?.(item);
      setOpenDropdown(null);
    };

    const toggleDropdown = (label: string) => {
      setOpenDropdown(openDropdown === label ? null : label);
    };

    const renderLogo = () => {
      if (logo) return logo;
      
      const [primaryText, secondaryText] = logoText.split(' ');
      
      return (
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="text-primary">{primaryText}</span>
          {secondaryText && (
            <span className="text-muted-foreground">{secondaryText}</span>
          )}
        </Link>
      );
    };

    const renderNavItem = (item: NavigationItem, index: number) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openDropdown === item.label;
      const itemVariant = item.disabled ? 'disabled' : item.active ? 'active' : 'default';

      if (hasChildren) {
        return (
          <div key={`${item.label}-${index}`} className="relative">
            <button
              className={cn(
                navItemVariants({ variant: itemVariant }),
                item.disabled && 'pointer-events-none',
              )}
              onClick={() => !item.disabled && toggleDropdown(item.label)}
              disabled={item.disabled}
            >
              {item.icon}
              {item.label}
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 min-w-48 bg-background border border-border rounded-md shadow-lg z-50">
                <div className="py-1">
                  {item.children!.map((child, childIndex) => (
                    <button
                      key={`${child.label}-${childIndex}`}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2"
                      onClick={() => handleItemClick(child)}
                      disabled={child.disabled}
                    >
                      {child.icon}
                      {child.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      return (
        <button
          key={`${item.label}-${index}`}
          className={cn(
            navItemVariants({ variant: itemVariant }),
            item.disabled && 'pointer-events-none',
          )}
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
        >
          {item.icon}
          {item.label}
        </button>
      );
    };

    const renderActions = () => {
      if (actions) return actions;
      
      if (!showActions) return null;
      
      return (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(topNavigatorVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          {renderLogo()}
        </div>
        
        <div className="flex items-center gap-1">
          {items.map(renderNavItem)}
        </div>
        
        <div className="flex items-center">
          {renderActions()}
        </div>
      </div>
    );
  },
);

TopNavigator.displayName = 'TopNavigator';

export { TopNavigator, topNavigatorVariants };
