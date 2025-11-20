"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/lib/data";
import { Share2, Copy, Download } from "lucide-react";
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
      {/* Title and Tags - Outside the box */}
      <div className={cn("mb-4 space-y-3", isLarge ? "mb-6" : "mb-4")}>
        <h3 className={cn(
          "font-semibold text-white",
          isLarge ? "text-3xl" : "text-2xl"
        )}>
          {prompt.title}
        </h3>
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className={cn(
                  "rounded-md border border-zinc-700 bg-zinc-800/50 font-medium text-zinc-300",
                  isLarge ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Main Card Container with Offset Effect */}
      <div className="relative flex-1">
        {/* Outer rectangle - elevation layer */}
        <div className={cn(
          "absolute inset-0 border border-zinc-800/50 bg-zinc-900/20",
          isLarge ? "left-4 top-4" : "left-3 top-3"
        )} />
        
        {/* Inner rectangle - main card */}
        <div
          onClick={handleCardClick}
          className={cn(
            "relative flex h-full flex-col border border-zinc-700/80 bg-[#18181b] transition-all duration-200",
            isLarge 
              ? "hover:border-zinc-600" 
              : "cursor-pointer hover:border-zinc-600"
          )}
        >
          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <div className={cn(
              "h-full overflow-auto border-b border-zinc-800/50 bg-[#0f0f11]",
              isLarge ? "p-8" : "p-5"
            )}>
              <pre className={cn(
                "whitespace-pre-wrap font-mono leading-relaxed text-zinc-300",
                isLarge ? "text-sm" : "text-[13px]"
              )}>
                {prompt.content}
              </pre>
            </div>
          </div>

          {/* Action Buttons - Footer */}
          <div className={cn(
            "flex items-center justify-center gap-4 border-t border-zinc-800/50 bg-[#18181b]",
            isLarge ? "px-8 py-5" : "px-6 py-4"
          )}>
            {actions.map(({ label, icon: Icon, onClick }) => (
              <Button
                key={label}
                type="button"
                variant="ghost"
                onClick={onClick}
                size="sm"
                className={cn(
                  "gap-2 text-zinc-400 hover:text-zinc-200",
                  isLarge ? "text-sm" : "text-xs"
                )}
              >
                <Icon className={cn(isLarge ? "h-5 w-5" : "h-4 w-4")} />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
