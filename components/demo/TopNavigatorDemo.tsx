'use client';

import { TopNavigator } from '@/components/ui/top-navigator';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => {
  return (
    <section
      className={`space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h3 className="border-b border-gray-100 pb-2 text-xl font-semibold text-gray-900">{title}</h3>
      {children}
    </section>
  );
};

export const TopNavigatorDemo = () => {
  return (
    <div className="max-w-full space-y-8">
      <DemoSection title="Top Navigator Demo">
        <div className="relative h-[200px] w-[400px] overflow-hidden rounded-lg border">
          <TopNavigator />
          <div className="text-muted-foreground absolute inset-0 flex items-center justify-center bg-gray-100/50">
            (This is a demo of the TopNavigator component)
          </div>
        </div>
      </DemoSection>
    </div>
  );
};
