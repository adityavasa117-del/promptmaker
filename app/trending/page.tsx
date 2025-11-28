"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { TrendingPostCard } from "@/components/trending-post-card";
import { Button } from "@/components/ui/button";
import { getTrendingPosts, TrendingPost } from "@/lib/queries";

export default function TrendingPage() {
  const [posts, setPosts] = useState<TrendingPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const data = await getTrendingPosts();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-6 sm:py-12">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-bold text-foreground">
              Trending in Cursor
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore what the community is talking about
            </p>
          </div>

          {/* Create Post Button */}
          <Button className="w-full sm:w-auto rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Create Post
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        )}

        {/* Trending Posts List */}
        {!loading && (
          <div className="space-y-0">
            {posts.map((post) => (
              <TrendingPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
