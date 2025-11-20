"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { TrendingPostCard } from "@/components/trending-post-card";
import { Button } from "@/components/ui/button";
import { trendingPosts } from "@/lib/data";

export default function TrendingPage() {
  const [posts] = useState(trendingPosts);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="mx-auto max-w-[800px] px-6 py-12">
        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Trending in Cursor
            </h1>
            <p className="text-base text-muted-foreground">
              Explore what the community is talking about
            </p>
          </div>

          {/* Create Post Button */}
          <Button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Create Post
          </Button>
        </div>

        {/* Trending Posts List */}
        <div className="space-y-0">
          {posts.map((post) => (
            <TrendingPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
