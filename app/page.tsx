"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { FilterTabs } from "@/components/filter-tabs";
import { PromptCard } from "@/components/prompt-card";
import { Input } from "@/components/ui/input";
import { prompts } from "@/lib/data";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "popular" | "official">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter prompts based on category, filter type, and search query
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      // Category filter
      if (selectedCategory && prompt.category !== selectedCategory) {
        return false;
      }

      // Filter type
      if (activeFilter === "popular" && !prompt.isPopular) {
        return false;
      }
      if (activeFilter === "official" && !prompt.isOfficial) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          prompt.title.toLowerCase().includes(query) ||
          prompt.content.toLowerCase().includes(query) ||
          prompt.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [selectedCategory, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="relative">
        {/* Sidebar */}
        <Sidebar 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        {/* Main Content */}
        <main className="ml-[250px] min-h-[calc(100vh-4rem)] px-6 py-8">
          <div className="mx-auto max-w-[1000px]">
            {/* Filter Tabs and Search */}
            <div className="mb-6 flex items-center justify-between">
              <FilterTabs 
                activeFilter={activeFilter} 
                onFilterChange={setActiveFilter} 
              />
              
              <Input
                type="search"
                placeholder="Search rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs rounded border-border bg-surface text-sm text-foreground placeholder:text-tertiary focus-visible:ring-ring"
              />
            </div>

            {/* Prompts Grid */}
            <div className="grid grid-cols-2 gap-6">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>

            {/* No Results */}
            {filteredPrompts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">No prompts found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
