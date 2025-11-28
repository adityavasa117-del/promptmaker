"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategories, Category } from "@/lib/queries";
import { SlidersHorizontal, X } from "lucide-react";

interface SidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  // Close mobile sidebar when category is selected
  const handleCategorySelect = (categoryId: string | null) => {
    onSelectCategory(categoryId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-[280px] sm:w-[250px] 
          border-r-0 border-transparent bg-background lg:bg-transparent flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border/50">
          <span className="text-sm font-semibold text-foreground">Categories</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-muted-foreground hover:text-foreground rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Category List - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-8 space-y-1">
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(isActive ? null : category.id)}
                className={`flex w-full items-center justify-between py-2.5 sm:py-2 pl-4 pr-2 text-left text-sm transition-colors rounded-md lg:rounded-none ${
                  isActive
                    ? "border-l-2 border-primary pl-3.5 text-foreground bg-surface/50 lg:bg-transparent"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/50 lg:hover:bg-transparent"
                }`}
              >
                <span className="font-normal">{category.name}</span>
                <Badge 
                  variant="secondary" 
                  className="font-mono text-xs text-tertiary bg-transparent border-0 px-0"
                >
                  {category.count || 0}
                </Badge>
              </button>
            );
          })}
        </nav>

        {/* Submit Button - Fixed at Bottom */}
        <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 border-t border-border/50">
          <Link href="/submit" onClick={() => setMobileOpen(false)}>
            <Button
              variant="outline"
              className="w-full rounded-full border border-border-highlight bg-background py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface-highlight"
            >
              Submit +
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
