"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingPost } from "@/lib/data";
import { ChevronUp, ChevronDown, ExternalLink } from "lucide-react";

interface TrendingPostCardProps {
  post: TrendingPost;
}

export function TrendingPostCard({ post }: TrendingPostCardProps) {
  const [votes, setVotes] = useState(post.votes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleUpvote = () => {
    if (userVote === "up") {
      setVotes(votes - 1);
      setUserVote(null);
    } else if (userVote === "down") {
      setVotes(votes + 2);
      setUserVote("up");
    } else {
      setVotes(votes + 1);
      setUserVote("up");
    }
  };

  const handleDownvote = () => {
    if (userVote === "down") {
      setVotes(votes + 1);
      setUserVote(null);
    } else if (userVote === "up") {
      setVotes(votes - 2);
      setUserVote("down");
    } else {
      setVotes(votes - 1);
      setUserVote("down");
    }
  };

  return (
    <div className="group relative border-b border-border/40 py-6 transition-colors hover:bg-muted/20">
      <div className="flex items-start gap-4">
        {/* Author Avatar */}
        <div className="shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="font-mono text-xs font-medium text-muted-foreground">
              {post.author.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          {/* Author Name */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h3 className="group-hover:text-primary flex items-center gap-2 text-lg font-semibold text-foreground transition-colors">
            <Link href={post.url || "#"} className="hover:underline">
              {post.title}
            </Link>
            {post.url && (
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </div>

        {/* Vote Buttons - Positioned on the right */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={handleUpvote}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground opacity-0 shadow-sm transition-all hover:bg-white/90 group-hover:opacity-100"
            aria-label="Upvote"
          >
            <ChevronUp
              className={`h-5 w-5 ${userVote === "up" ? "fill-current text-green-600" : ""}`}
            />
          </button>
          
          <span className="font-mono text-sm font-medium text-foreground">
            {votes}
          </span>
          
          <button
            onClick={handleDownvote}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground opacity-0 shadow-sm transition-all hover:bg-white/90 group-hover:opacity-100"
            aria-label="Downvote"
          >
            <ChevronDown
              className={`h-5 w-5 ${userVote === "down" ? "fill-current text-red-600" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
