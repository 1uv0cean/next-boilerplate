'use client';

import { Navigation, NavigationItem } from '@/components/ui/navigation';
import { Home, Info, Mail, Settings, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';

export const TopNavigator = () => {
  const navItems: NavigationItem[] = [
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
        {
          label: 'Electronics',
          description: 'Latest gadgets and devices',
          href: '/products/electronics',
        },
        {
          label: 'Books',
          description: 'Fiction and non-fiction',
          href: '/products/books',
        },
        {
          label: 'Apparel',
          description: 'Fashion and accessories',
          href: '/products/apparel',
        },
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

  return (
    <Navigation
      items={navItems}
      logo={
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="text-primary">Next</span>
          <span className="text-muted-foreground">Boilerplate</span>
        </Link>
      }
      actions={
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Login
          </Link>
          <Link href="/signup" className="text-sm font-medium text-primary hover:text-primary/80">
            Sign Up
          </Link>
        </div>
      }
    />
  );
};
