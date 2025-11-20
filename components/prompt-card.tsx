"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/lib/data";
import { Share2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/prompt/${prompt.id}`);
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

  return (
    <div className="group/card flex h-full flex-col">
      {/* Title and Tags - Outside the box */}
      <div className="mb-4 space-y-3">
        <h3 className="text-2xl font-semibold text-white">
          {prompt.title}
        </h3>
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-md border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300"
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
        <div className="absolute inset-0 left-3 top-3 border border-zinc-800/50 bg-zinc-900/20" />
        
        {/* Inner rectangle - main card */}
        <div
          onClick={handleCardClick}
          className="relative flex h-full cursor-pointer flex-col border border-zinc-700/80 bg-[#18181b] transition-all duration-200 hover:border-zinc-600"
        >
          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto border-b border-zinc-800/50 bg-[#0f0f11] p-5">
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-zinc-300">
                {prompt.content}
              </pre>
            </div>
          </div>

          {/* Action Buttons - Footer */}
          <div className="flex items-center justify-center gap-4 border-t border-zinc-800/50 bg-[#18181b] px-6 py-4">
            {actions.map(({ label, icon: Icon, onClick }) => (
              <Button
                key={label}
                type="button"
                variant="ghost"
                onClick={onClick}
                size="sm"
                className="gap-2 text-xs text-zinc-400 hover:text-zinc-200"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
