'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';

const navigationVariants = cva(
  'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        // Inspired by Stripe's navigation
        stripe:
          'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-[0_1px_3px_0_rgb(0,0,0,0.1),0_1px_2px_0_rgb(0,0,0,0.06)]',
        // Inspired by Notion's clean design
        notion: 'bg-white/95 backdrop-blur-sm border-b border-gray-200/60',
        // Inspired by Linear's minimal approach
        linear: 'bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/40',
        // Inspired by Vercel's dark theme
        vercel: 'bg-black backdrop-blur-xl border-b border-gray-800/50',
        // Inspired by GitHub's navigation
        github: 'bg-gray-900 border-b border-gray-700/50',
        // Glassmorphism modern style
        glass:
          'bg-white/20 backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]',
      },
      size: {
        compact: 'h-14',
        default: 'h-16',
        comfortable: 'h-20',
      },
      scrolled: {
        true: 'shadow-lg',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'stripe',
      size: 'default',
      scrolled: false,
    },
  },
);

const navigationItemVariants = cva(
  'relative inline-flex items-center font-medium transition-all duration-200 ease-out cursor-pointer select-none group',
  {
    variants: {
      variant: {
        stripe:
          'text-gray-600 hover:text-gray-900 px-4 py-2 text-sm rounded-lg hover:bg-gray-100/80',
        'stripe-active': 'text-gray-900 px-4 py-2 text-sm rounded-lg bg-gray-100 font-semibold',
        notion:
          'text-gray-700 hover:text-gray-900 px-3 py-1.5 text-sm rounded-md hover:bg-gray-100/70',
        'notion-active':
          'text-gray-900 px-3 py-1.5 text-sm rounded-md bg-gray-100/70 font-semibold',
        linear: 'text-gray-600 hover:text-gray-900 px-3 py-2 text-sm rounded-lg hover:bg-white/80',
        'linear-active':
          'text-gray-900 px-3 py-2 text-sm rounded-lg bg-white font-semibold shadow-sm',
        vercel: 'text-gray-400 hover:text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-800/80',
        'vercel-active': 'text-white px-4 py-2 text-sm rounded-lg bg-gray-800 font-semibold',
        github: 'text-gray-300 hover:text-white px-3 py-2 text-sm rounded-md hover:bg-gray-800/60',
        'github-active': 'text-white px-3 py-2 text-sm rounded-md bg-gray-800 font-semibold',
        glass: 'text-white/80 hover:text-white px-4 py-2 text-sm rounded-lg hover:bg-white/20',
        'glass-active':
          'text-white px-4 py-2 text-sm rounded-lg bg-white/20 font-semibold backdrop-blur-sm',
      },
      size: {
        compact: 'text-sm px-2 py-1',
        default: 'text-sm px-3 py-2',
        comfortable: 'text-base px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'stripe',
      size: 'default',
    },
  },
);

const dropdownVariants = cva(
  'absolute mt-2 rounded-xl border backdrop-blur-xl shadow-2xl z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200',
  {
    variants: {
      variant: {
        stripe:
          'bg-white/95 border-gray-200/60 shadow-[0_20px_25px_-5px_rgb(0,0,0,0.1),0_10px_10px_-5px_rgb(0,0,0,0.04)]',
        notion:
          'bg-white/98 border-gray-200/50 shadow-[0_16px_24px_2px_rgb(0,0,0,0.14),0_6px_30px_5px_rgb(0,0,0,0.12)]',
        linear:
          'bg-white border-gray-200/40 shadow-[0_24px_38px_3px_rgb(0,0,0,0.14),0_9px_46px_8px_rgb(0,0,0,0.12)]',
        vercel: 'bg-gray-900/95 border-gray-700/50 shadow-[0_20px_25px_-5px_rgb(0,0,0,0.5)]',
        github: 'bg-gray-800/95 border-gray-700/60 shadow-[0_16px_24px_2px_rgb(0,0,0,0.4)]',
        glass: 'bg-white/30 border-white/20 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]',
      },
    },
    defaultVariants: {
      variant: 'stripe',
    },
  },
);

export interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  description?: string;
  children?: NavigationItem[];
}

export interface NavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationVariants> {
  items: NavigationItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  mobileBreakpoint?: 'sm' | 'md' | 'lg';
  onItemClick?: (item: NavigationItem) => void;
  showScrollEffect?: boolean;
}

const Navigation = forwardRef<HTMLElement, NavigationProps>(
  (
    {
      className,
      variant = 'stripe',
      size,
      items,
      logo,
      actions,
      mobileBreakpoint = 'lg',
      onItemClick,
      showScrollEffect = true,
      ...props
    },
    ref,
  ) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Handle scroll effect
    useEffect(() => {
      if (!showScrollEffect) return;

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [showScrollEffect]);

    // Close dropdowns when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const clickedOutside = !Object.values(dropdownRefs.current).some((ref) =>
          ref?.contains(event.target as Node),
        );

        if (clickedOutside) {
          setOpenDropdowns(new Set());
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (label: string) => {
      const newOpenDropdowns = new Set(openDropdowns);
      if (newOpenDropdowns.has(label)) {
        newOpenDropdowns.delete(label);
      } else {
        newOpenDropdowns.clear(); // Close other dropdowns
        newOpenDropdowns.add(label);
      }
      setOpenDropdowns(newOpenDropdowns);
    };

    const handleItemClick = (item: NavigationItem) => {
      if (item.disabled) return;

      if (item.onClick) {
        item.onClick();
      }

      if (onItemClick) {
        onItemClick(item);
      }

      setIsMobileOpen(false);
      setOpenDropdowns(new Set());
    };

    const getItemVariant = (item: NavigationItem) => {
      const baseVariant = variant || 'stripe';
      return item.active ? `${baseVariant}-active` : baseVariant;
    };

    const renderNavigationItem = (item: NavigationItem, index: number) => {
      const hasChildren = item.children && item.children.length > 0;
      const isDropdownOpen = openDropdowns.has(item.label);
      const itemVariant = getItemVariant(item);

      if (hasChildren) {
        return (
          <div
            key={`${item.label}-${index}`}
            className="relative"
            ref={(el) => {
              dropdownRefs.current[item.label] = el;
            }}
          >
            <button
              className={cn(
                navigationItemVariants({
                  variant: itemVariant as VariantProps<typeof navigationItemVariants>['variant'],
                  size,
                }),
                item.disabled && 'cursor-not-allowed opacity-50',
                'gap-1',
              )}
              onClick={() => !item.disabled && toggleDropdown(item.label)}
              disabled={item.disabled}
              onMouseEnter={() => !item.disabled && toggleDropdown(item.label)}
            >
              {item.icon && <span className="mr-1 h-4 w-4">{item.icon}</span>}
              {item.label}
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  isDropdownOpen && 'rotate-180',
                )}
              />
              {item.badge && (
                <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                  {item.badge}
                </span>
              )}
            </button>

            {isDropdownOpen && (
              <div
                className={cn(dropdownVariants({ variant }), 'top-full left-0 min-w-[280px] p-2')}
              >
                {item.children!.map((child, childIndex) => (
                  <button
                    key={`${child.label}-${childIndex}`}
                    className={cn(
                      'group w-full rounded-lg px-4 py-3 text-left transition-all duration-150 hover:bg-black/5',
                      variant === 'vercel' && 'hover:bg-white/10',
                      variant === 'github' && 'hover:bg-white/10',
                      variant === 'glass' && 'hover:bg-white/20',
                      child.active && 'bg-black/5 font-medium',
                      child.disabled && 'cursor-not-allowed opacity-50',
                    )}
                    onClick={() => handleItemClick(child)}
                    disabled={child.disabled}
                  >
                    <div className="flex items-start gap-3">
                      {child.icon && (
                        <span className="mt-0.5 h-5 w-5 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100">
                          {child.icon}
                        </span>
                      )}
                      <div className="flex-1">
                        <div
                          className={cn(
                            'text-sm font-medium',
                            variant === 'vercel' ? 'text-gray-200' : 'text-gray-900',
                            variant === 'github' ? 'text-gray-200' : 'text-gray-900',
                            variant === 'glass' ? 'text-white' : 'text-gray-900',
                          )}
                        >
                          {child.label}
                          {child.badge && (
                            <span className="ml-2 rounded-full bg-blue-500 px-1.5 py-0.5 text-xs font-medium text-white">
                              {child.badge}
                            </span>
                          )}
                        </div>
                        {child.description && (
                          <div
                            className={cn(
                              'mt-1 text-xs opacity-60',
                              variant === 'vercel' ? 'text-gray-400' : 'text-gray-600',
                              variant === 'github' ? 'text-gray-400' : 'text-gray-600',
                              variant === 'glass' ? 'text-white/70' : 'text-gray-600',
                            )}
                          >
                            {child.description}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <button
          key={`${item.label}-${index}`}
          className={cn(
            navigationItemVariants({
              variant: itemVariant as VariantProps<typeof navigationItemVariants>['variant'],
              size,
            }),
            item.disabled && 'cursor-not-allowed opacity-50',
            'gap-2',
          )}
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
        >
          {item.icon && <span className="h-4 w-4">{item.icon}</span>}
          {item.label}
          {item.badge && (
            <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
              {item.badge}
            </span>
          )}
        </button>
      );
    };

    const breakpointClass = {
      sm: 'sm:hidden',
      md: 'md:hidden',
      lg: 'lg:hidden',
    }[mobileBreakpoint];

    const showClass = {
      sm: 'sm:flex',
      md: 'md:flex',
      lg: 'lg:flex',
    }[mobileBreakpoint];

    return (
      <nav
        className={cn(navigationVariants({ variant, size, scrolled: isScrolled }), className)}
        ref={ref}
        {...props}
      >
        <div className="mx-auto mt-3 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            {logo && <div className="z-10 flex-shrink-0">{logo}</div>}

            {/* Desktop Navigation */}
            <div className={cn('hidden items-center gap-1', showClass)}>
              {items.map(renderNavigationItem)}
            </div>

            {/* Actions */}
            {actions && <div className={cn('hidden items-center gap-3', showClass)}>{actions}</div>}

            {/* Mobile menu button */}
            <button
              className={cn(
                'relative z-10 h-10 w-10 rounded-lg transition-all duration-200',
                breakpointClass,
                variant === 'vercel' || variant === 'github'
                  ? 'text-gray-400 hover:bg-gray-800/60 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
              )}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-expanded={isMobileOpen}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative mx-auto h-6 w-6">
                <span
                  className={cn(
                    'absolute top-1.5 left-0 h-0.5 w-6 bg-current transition-all duration-300 ease-out',
                    isMobileOpen ? 'translate-y-1.5 rotate-45' : 'translate-y-0 rotate-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute top-3 left-0 h-0.5 w-6 bg-current transition-all duration-300 ease-out',
                    isMobileOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                  )}
                />
                <span
                  className={cn(
                    'absolute top-4.5 left-0 h-0.5 w-6 bg-current transition-all duration-300 ease-out',
                    isMobileOpen ? '-translate-y-1.5 -rotate-45' : 'translate-y-0 rotate-0',
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'absolute top-full right-0 left-0 transition-all duration-300 ease-out',
            breakpointClass,
            isMobileOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-4 opacity-0',
          )}
        >
          <div
            className={cn(
              'border-t backdrop-blur-xl',
              variant === 'stripe' && 'border-gray-200/50 bg-white/95',
              variant === 'notion' && 'border-gray-200/50 bg-white/98',
              variant === 'linear' && 'border-gray-200/40 bg-gray-50/95',
              variant === 'vercel' && 'border-gray-800/50 bg-black/95',
              variant === 'github' && 'border-gray-700/50 bg-gray-900/95',
              variant === 'glass' && 'border-white/20 bg-white/20',
            )}
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-6">
              {items.map((item, index) => {
                const hasChildren = item.children && item.children.length > 0;
                const isDropdownOpen = openDropdowns.has(item.label);
                const itemVariant = getItemVariant(item);

                return (
                  <div key={`mobile-${item.label}-${index}`}>
                    <button
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all duration-200',
                        navigationItemVariants({
                          variant: itemVariant as VariantProps<
                            typeof navigationItemVariants
                          >['variant'],
                        }),
                        item.disabled && 'cursor-not-allowed opacity-50',
                      )}
                      onClick={() => {
                        if (hasChildren) {
                          toggleDropdown(item.label);
                        } else {
                          handleItemClick(item);
                        }
                      }}
                      disabled={item.disabled}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && <span className="h-5 w-5">{item.icon}</span>}
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {hasChildren && (
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-200',
                            isDropdownOpen && 'rotate-180',
                          )}
                        />
                      )}
                    </button>

                    {hasChildren && isDropdownOpen && (
                      <div className="mt-2 ml-4 space-y-1">
                        {item.children!.map((child, childIndex) => (
                          <button
                            key={`mobile-${child.label}-${childIndex}`}
                            className={cn(
                              'w-full rounded-lg px-4 py-2 text-left text-sm transition-all duration-150',
                              variant === 'vercel' || variant === 'github'
                                ? 'text-gray-400 hover:bg-gray-800/60 hover:text-white'
                                : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900',
                              child.active && 'font-medium',
                              child.disabled && 'cursor-not-allowed opacity-50',
                            )}
                            onClick={() => handleItemClick(child)}
                            disabled={child.disabled}
                          >
                            <div className="flex items-center gap-3">
                              {child.icon && <span className="h-4 w-4">{child.icon}</span>}
                              <span>{child.label}</span>
                              {child.badge && (
                                <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-xs font-medium text-white">
                                  {child.badge}
                                </span>
                              )}
                            </div>
                            {child.description && (
                              <div className="mt-1 ml-7 text-xs opacity-60">
                                {child.description}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Actions */}
            {actions && (
              <div className="border-t border-current/10 px-4 py-4">
                <div className="flex flex-col gap-3">{actions}</div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile backdrop */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-[-1] bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </nav>
    );
  },
);

Navigation.displayName = 'Navigation';

export { Navigation, navigationItemVariants, navigationVariants };
