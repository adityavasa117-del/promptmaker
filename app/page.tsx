"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { FilterTabs } from "@/components/filter-tabs";
import { PromptCard } from "@/components/prompt-card";
import { Input } from "@/components/ui/input";
import { getPrompts, Prompt } from "@/lib/queries";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "popular" | "official">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch prompts from Supabase
  useEffect(() => {
    async function fetchPrompts() {
      setLoading(true);
      const data = await getPrompts({
        categoryId: selectedCategory || undefined,
        isPopular: activeFilter === "popular" ? true : undefined,
        isOfficial: activeFilter === "official" ? true : undefined,
        searchQuery: searchQuery || undefined,
      });
      setPrompts(data);
      setLoading(false);
    }

    fetchPrompts();
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
        <main className="lg:ml-[250px] min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-4 sm:py-8">
          <div className="mx-auto max-w-[1300px]">
            {/* Filter Tabs and Search */}
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <FilterTabs 
                activeFilter={activeFilter} 
                onFilterChange={setActiveFilter} 
              />
              
              <Input
                type="search"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:max-w-xs rounded border-border bg-surface text-sm text-foreground placeholder:text-tertiary focus-visible:ring-ring"
              />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="py-12 sm:py-20 text-center">
                <p className="text-muted-foreground">Loading prompts...</p>
              </div>
            )}

            {/* Prompts Grid */}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-x-4 sm:gap-y-6 pb-20 lg:pb-0">
                {prompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && prompts.length === 0 && (
              <div className="py-12 sm:py-20 text-center">
                <p className="text-muted-foreground">No prompts found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
