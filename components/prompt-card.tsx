"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/lib/data";
import { Share2, Copy, Download, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PromptCardProps {
  prompt: Prompt;
  variant?: "small" | "large";
  className?: string;
}

export function PromptCard({ prompt, variant = "small", className }: PromptCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    if (variant === "small") {
      router.push(`/prompt/${prompt.id}`);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/prompt/${prompt.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast.success("Content copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy content");
    }
  };

  const handleSaveAsMd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const markdownContent = `# ${prompt.title}\n\n${prompt.tags?.map(tag => `\`${tag}\``).join(" ") || ""}\n\n${prompt.content}`;
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prompt.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File downloaded successfully!");
  };

  const actions = [
    { label: "Share", icon: Share2, onClick: handleShare },
    { label: "Copy", icon: Copy, onClick: handleCopy },
    { label: "Save", icon: Download, onClick: handleSaveAsMd },
  ];

  const isLarge = variant === "large";

  return (
    <div className={cn("group/card flex h-full flex-col", className)}>
      {/* Title and Tags - Only for large variant (detail page) */}
      {isLarge && (
        <div className="mb-6 space-y-3">
          <h3 className="text-3xl font-semibold text-white">
            {prompt.title}
          </h3>
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-md border border-zinc-700 bg-zinc-800/50 px-4 py-1.5 text-sm font-medium text-zinc-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Card Container with Offset Effect */}
      <div className="relative flex-1">
        {/* Outer rectangle - elevation layer */}
        <div className={cn(
          "absolute inset-0 border bg-zinc-900/40 transition-all duration-200",
          isLarge ? "left-3 top-3 border-zinc-800/60" : "left-2 top-2 border-zinc-800/50 group-hover/card:border-zinc-700/70"
        )} />
        
        {/* Inner rectangle - main card */}
        <div
          onClick={handleCardClick}
          className={cn(
            "relative flex flex-col border bg-[#0A0A0A] transition-all duration-200 overflow-hidden",
            isLarge 
              ? "border-zinc-800/80 hover:border-zinc-700 h-full" 
              : "border-zinc-800/70 cursor-pointer group-hover/card:border-zinc-700 h-[350px]"
          )}
        >
          {/* Content Area with Custom Scrollbar */}
          <div className={cn(
            "h-full overflow-y-auto",
            isLarge ? "p-8" : "p-6"
          )}>
            <pre className={cn(
              "whitespace-pre-wrap font-mono leading-relaxed text-zinc-300",
              isLarge ? "text-sm pr-4" : "text-[13px] pr-4"
            )}>
              {prompt.content}
            </pre>
          </div>

          {/* Floating Action Buttons - Only for small variant */}
          {!isLarge && (
            <div className="absolute bottom-4 right-4 z-10 flex gap-2 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100">
              <button
                onClick={handleShare}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:shadow-md"
                title="Share"
              >
                <ExternalLink className="h-4 w-4 text-black" />
              </button>
              
              <button
                onClick={handleCopy}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:shadow-md"
                title="Copy"
              >
                <Copy className="h-4 w-4 text-black" />
              </button>
            </div>
          )}

          {/* Action Buttons - Only for large variant (detail page) */}
          {isLarge && (
            <div className="relative z-10 flex items-center justify-center gap-4 border-t border-zinc-800/50 bg-[#0A0A0A] px-8 py-5">
              {actions.map(({ label, icon: Icon, onClick }) => (
                <Button
                  key={label}
                  type="button"
                  variant="ghost"
                  onClick={onClick}
                  size="sm"
                  className="gap-2 text-sm text-zinc-400 hover:text-zinc-200"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
