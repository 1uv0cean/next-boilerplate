'use client';

import { InputDemo } from '@/components/demo/InputDemo';
import { SelectDemo } from '@/components/demo/SelectDemo';
import { ButtonDemo } from '@/components/demo/ButtonDemo';
import { DatePickerDemo } from '@/components/demo/DatePickerDemo';
import { DateRangePickerDemo } from '@/components/demo/DateRangePickerDemo';
import { DialogDemo } from '@/components/demo/DialogDemo';
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
            <TabsTrigger value="button" className="px-6 py-2">
              Button Components
            </TabsTrigger>
            <TabsTrigger value="datepicker" className="px-6 py-2">
              Date Components
            </TabsTrigger>
            <TabsTrigger value="daterange" className="px-6 py-2">
              DateRange Components
            </TabsTrigger>
            <TabsTrigger value="dialog" className="px-6 py-2">
              Dialog Components
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="input" className="rounded-xl bg-gray-50 p-8">
          <InputDemo />
        </TabsContent>
        <TabsContent value="select" className="rounded-xl bg-gray-50 p-8">
          <SelectDemo />
        </TabsContent>
        <TabsContent value="button" className="rounded-xl bg-gray-50 p-8">
          <ButtonDemo />
        </TabsContent>
        <TabsContent value="datepicker" className="rounded-xl bg-gray-50 p-8">
          <DatePickerDemo />
        </TabsContent>
        <TabsContent value="daterange" className="rounded-xl bg-gray-50 p-8">
          <DateRangePickerDemo />
        </TabsContent>
        <TabsContent value="dialog" className="rounded-xl bg-gray-50 p-8">
          <DialogDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DemoPage;
