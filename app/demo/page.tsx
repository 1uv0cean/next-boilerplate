'use client';

import { AccordionDemo } from '@/components/demo/AccordionDemo';
import { ButtonDemo } from '@/components/demo/ButtonDemo';
import { CheckboxDemo } from '@/components/demo/CheckboxDemo';
import { DatePickerDemo } from '@/components/demo/DatePickerDemo';
import { DateRangePickerDemo } from '@/components/demo/DateRangePickerDemo';
import { DialogDemo } from '@/components/demo/DialogDemo';
import { InputDemo } from '@/components/demo/InputDemo';
import { SelectDemo } from '@/components/demo/SelectDemo';
import { SwitchDemo } from '@/components/demo/SwitchDemo';
import { TableDemo } from '@/components/demo/TableDemo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Component configuration for easy management and extensibility
const componentTabs = [
  { id: 'accordion', label: 'Accordion', component: AccordionDemo },
  { id: 'button', label: 'Button', component: ButtonDemo },
  { id: 'checkbox', label: 'Checkbox', component: CheckboxDemo },
  { id: 'datepicker', label: 'Date Picker', component: DatePickerDemo },
  { id: 'daterange', label: 'Date Range', component: DateRangePickerDemo },
  { id: 'dialog', label: 'Dialog', component: DialogDemo },
  { id: 'input', label: 'Input', component: InputDemo },
  { id: 'select', label: 'Select', component: SelectDemo },
  { id: 'switch', label: 'Switch', component: SwitchDemo },
  { id: 'table', label: 'Table', component: TableDemo },
] as const;

const DemoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Component Library</h1>
        <p className="text-muted-foreground text-lg">
          Explore our comprehensive collection of UI components
        </p>
      </div>

      <Tabs defaultValue="accordion" className="space-y-6">
        {/* Responsive Tab Navigation */}
        <div className="w-full">
          <div className="mx-auto max-w-fit">
            <TabsList className="bg-muted/50 inline-grid h-auto grid-cols-2 gap-1 rounded-xl p-1 md:grid-cols-4 lg:flex lg:h-12">
              {componentTabs.map(({ id, label }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="data-[state=active]:bg-background flex-1 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-all data-[state=active]:shadow-sm lg:px-6"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        {/* Dynamic Tab Content */}
        {componentTabs.map(({ id, component: Component }) => (
          <TabsContent
            key={id}
            value={id}
            className="from-background to-muted/20 rounded-2xl border bg-gradient-to-br p-6 shadow-sm md:p-8"
          >
            <div className="mx-auto flex max-w-6xl justify-center">
              <Component />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DemoPage;
