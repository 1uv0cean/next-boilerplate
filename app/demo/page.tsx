'use client';

import { InputDemo } from '@/components/demo/InputDemo';
import { SelectDemo } from '@/components/demo/SelectDemo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DemoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Component Demo</h1>
        <p className="text-muted-foreground">Test all component features on this demo page.</p>
      </div>

      <Tabs defaultValue="input" className="space-y-8">
        <div className="flex items-center justify-center">
          <TabsList className="border bg-white shadow-sm">
            <TabsTrigger value="input" className="px-6 py-2">
              Input Components
            </TabsTrigger>
            <TabsTrigger value="select" className="px-6 py-2">
              Select Components
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="input" className="rounded-xl bg-gray-50 p-8">
          <InputDemo />
        </TabsContent>
        <TabsContent value="select" className="rounded-xl bg-gray-50 p-8">
          <SelectDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DemoPage;
