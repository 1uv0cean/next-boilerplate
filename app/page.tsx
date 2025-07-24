'use client';

import { Button } from '@/components/ui/Button';
import { TopNavigator, NavigationItem } from '@/components/ui/TopNavigator';
import { Typography } from '@/components/ui/Typography';
import { Home, LayoutDashboard, Layers } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  const navItems: NavigationItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: <Home className="h-4 w-4" />,
      active: true,
    },
    {
      label: 'Dashboard',
      href: '/main',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: 'Components',
      href: '/demo',
      icon: <Layers className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopNavigator items={navItems} />

      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="h1" className="mb-4 text-4xl">
            Next.js Boilerplate
          </Typography>
          <Typography variant="muted" className="mb-8 text-lg">
            A modern React component library with TypeScript support
          </Typography>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/demo">View Components</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/main">Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Login Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
