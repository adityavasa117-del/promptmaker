import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";

interface SidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[250px] overflow-y-auto border-r-0 border-transparent bg-transparent px-6 py-8">
      {/* Category List */}
      <nav className="space-y-1">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(isActive ? null : category.id)}
              className={`flex w-full items-center justify-between py-2 pl-4 pr-2 text-left text-sm transition-colors ${
                isActive
                  ? "border-l-2 border-primary pl-3.5 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="font-normal">{category.name}</span>
              <Badge 
                variant="secondary" 
                className="font-mono text-xs text-tertiary bg-transparent border-0 px-0"
              >
                {category.count}
              </Badge>
            </button>
          );
        })}
      </nav>

      {/* Submit Button */}
      <div className="mt-8">
        <Button
          variant="outline"
          className="w-full rounded-full border border-border-highlight bg-background py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface-highlight"
        >
          Submit +
        </Button>
      </div>
    </aside>
  );
}
