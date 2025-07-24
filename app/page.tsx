'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { TopNavigator } from '@/components/ui/TopNavigator';
import { Typography } from '@/components/ui/Typography';
import { ArrowRight, Code, Palette, Zap } from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  const features = [
    {
      icon: Code,
      title: 'Component Library',
      description: 'Comprehensive collection of reusable UI components built with modern React patterns.',
      href: '/demo',
    },
    {
      icon: Zap,
      title: 'Dashboard Demo',
      description: 'Interactive dashboard showcasing real-world application patterns and layouts.',
      href: '/main',
    },
    {
      icon: Palette,
      title: 'Design System',
      description: 'Consistent design tokens, typography, and styling patterns for scalable applications.',
      href: '/demo',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <TopNavigator />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Typography variant="h1" className="text-5xl lg:text-6xl mb-6" gradient>
            Next.js Boilerplate
          </Typography>
          <Typography variant="lead" className="text-xl mb-8 max-w-2xl mx-auto">
            A modern, production-ready Next.js boilerplate with a comprehensive component library,
            TypeScript support, and best practices built-in.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/demo">
                Explore Components
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/main">
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={feature.href}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <Typography variant="h2" className="text-3xl mb-4">
                Ready to get started?
              </Typography>
              <Typography variant="muted" className="text-lg mb-6">
                Explore our components or jump straight into the dashboard demo to see everything in action.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/login">
                    Try Login Demo
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/demo">
                    Browse Components
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
