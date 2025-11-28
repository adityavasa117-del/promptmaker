"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp, ExternalLink, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingPost } from "@/lib/queries";

interface TrendingPostCardProps {
  post: TrendingPost;
  onVote?: () => void;
  isVoting?: boolean;
}

export function TrendingPostCard({ post, onVote, isVoting = false }: TrendingPostCardProps) {
  const [userVoted, setUserVoted] = useState(false);

  const handleVoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isVoting && onVote) {
      onVote();
      setUserVoted(true);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getAuthorInitial = (author: string) => {
    return author.charAt(0).toUpperCase();
  };

  return (
    <div className="group relative border-b border-border/40 py-4 sm:py-6 transition-colors hover:bg-muted/20">
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Author Avatar */}
        <div className="shrink-0">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
              {getAuthorInitial(post.author)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
          {/* Author Name and Date */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="font-medium">{post.author}</span>
            <span>•</span>
            <span>{formatDate(post.created_at)}</span>
          </div>

          {/* Title */}
          <div className="flex items-start gap-2">
            {post.url ? (
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group-hover:text-primary flex-1 text-base sm:text-lg font-semibold text-foreground transition-colors leading-tight hover:underline cursor-pointer"
              >
                {post.title}
              </Link>
            ) : (
              <h3 className="group-hover:text-primary flex-1 text-base sm:text-lg font-semibold text-foreground transition-colors leading-tight">
                {post.title}
              </h3>
            )}
            {post.url && (
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-2 sm:line-clamp-none">
            {post.description}
          </p>
        </div>

        {/* Vote Button - Only upvote */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 sm:h-9 sm:w-9 p-0 bg-background hover:bg-muted border-border hover:border-border/60 transition-all"
            onClick={handleVoteClick}
            disabled={isVoting}
            aria-label="Upvote"
          >
            {isVoting ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <ChevronUp 
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
                  userVoted 
                    ? 'text-green-600 fill-current' 
                    : 'text-muted-foreground hover:text-foreground'
                }`} 
              />
            )}
          </Button>
          
          <span className="font-mono text-xs sm:text-sm font-medium text-foreground">
            {post.votes || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
