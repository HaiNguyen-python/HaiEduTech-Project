/**
 * @file elevated-tabs.tsx
 * @description "Polished elevated chips" tab row: a soft elevated strip with larger
 *   pill triggers, white active chip and primary-tinted icon. Used by Finnish pages
 *   for a consistent, professional section navigation.
 * @author Teacher Hai (HaiEduTech)
 */
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const ElevatedTabs = TabsPrimitive.Root;

const ElevatedTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-auto flex-wrap items-center justify-start gap-1.5 rounded-2xl border border-border/70 bg-muted/60 p-1.5 shadow-sm backdrop-blur-md",
      className,
    )}
    {...props}
  />
));
ElevatedTabsList.displayName = "ElevatedTabsList";

const ElevatedTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent px-4 py-2.5 text-sm font-medium tracking-tight text-muted-foreground transition-all duration-200 hover:bg-background/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-border/60 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:[&>svg]:text-primary data-[state=active]:[&_.tab-emoji]:text-primary",
      className,
    )}
    {...props}
  />
));
ElevatedTabsTrigger.displayName = "ElevatedTabsTrigger";

export { ElevatedTabs, ElevatedTabsList, ElevatedTabsTrigger };
