"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { MCPCard } from "@/components/mcp-card";
import { FeaturedMCPCard } from "@/components/featured-mcp-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMCPs, MCP } from "@/lib/queries";
import { Plus, ChevronLeft, ChevronRight, Search, Loader2 } from "lucide-react";
import Link from "next/link";

export default function MCPsPage() {
  const [mcps, setMCPs] = useState<MCP[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    async function fetchMCPs() {
      setLoading(true);
      try {
        const data = await getMCPs();
        setMCPs(data);
      } catch (error) {
        console.error("Error fetching MCPs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMCPs();
  }, []);

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCarousel = () => {
    const maxIndex = Math.max(0, featuredMCPs.length - 4);
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Filter MCPs
  const filteredMCPs = mcps.filter((mcp) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      mcp.name.toLowerCase().includes(query) ||
      mcp.description.toLowerCase().includes(query)
    );
  });

  // Separate featured and regular MCPs
  const featuredMCPs = filteredMCPs.filter((mcp) => mcp.is_featured);
  const regularMCPs = filteredMCPs.filter((mcp) => !mcp.is_featured);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {/* Featured MCPs Section */}
        <div className="mb-8 sm:mb-12">
          {/* Header - Stacked on mobile, inline on larger screens */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Title and Description */}
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Featured Tools</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse writing tools or post a tool to reach 250,000+ monthly active writers.
                </p>
              </div>
              
              {/* Actions - Button and Carousel Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <Link href="/mcps/add">
                  <Button size="sm" className="rounded-full bg-surface hover:bg-surface-highlight border border-border text-foreground text-sm">
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add new
                  </Button>
                </Link>
                <div className="flex gap-1.5">
                  <button
                    onClick={handlePrevCarousel}
                    disabled={carouselIndex === 0}
                    className="p-2 rounded-full bg-surface border border-border hover:bg-surface-highlight disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNextCarousel}
                    disabled={carouselIndex >= featuredMCPs.length - 4}
                    className="p-2 rounded-full bg-surface border border-border hover:bg-surface-highlight disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured MCPs Carousel */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : featuredMCPs.length > 0 ? (
            <div className="relative overflow-hidden">
              <div 
                className="flex gap-4 transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${carouselIndex * (280 + 16)}px)` 
                }}
              >
                {featuredMCPs.map((mcp) => (
                  <div key={mcp.id} className="shrink-0 w-[280px]">
                    <FeaturedMCPCard mcp={mcp} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No featured MCPs available
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search writing tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-surface border-border/50 focus:border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* All Tools Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : regularMCPs.length > 0 || featuredMCPs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...featuredMCPs, ...regularMCPs].map((mcp) => (
              <MCPCard key={mcp.id} mcp={mcp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery
                ? "No tools found matching your search"
                : "No tools available yet. Be the first to add one!"}
            </p>
            <Link href="/mcps/add">
              <Button className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Tool
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}