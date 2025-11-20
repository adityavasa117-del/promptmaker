import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterTabsProps {
  activeFilter: "all" | "popular" | "official";
  onFilterChange: (filter: "all" | "popular" | "official") => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <Tabs value={activeFilter} onValueChange={(value) => onFilterChange(value as "all" | "popular" | "official")}>
      <TabsList className="inline-flex rounded-md bg-surface p-1">
        <TabsTrigger 
          value="all" 
          className="rounded px-3 py-1 text-sm data-[state=active]:bg-surface-highlight data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground"
        >
          All
        </TabsTrigger>
        <TabsTrigger 
          value="popular" 
          className="rounded px-3 py-1 text-sm data-[state=active]:bg-surface-highlight data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground"
        >
          Popular
        </TabsTrigger>
        <TabsTrigger 
          value="official" 
          className="rounded px-3 py-1 text-sm data-[state=active]:bg-surface-highlight data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground"
        >
          Official
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
