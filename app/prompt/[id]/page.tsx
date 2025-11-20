"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prompts } from "@/lib/data";
import { ArrowLeft, Share2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params.id as string;

  const prompt = prompts.find((p) => p.id === promptId);

  if (!prompt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Prompt Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The prompt you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.push("/")}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast.success("Content copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy content");
    }
  };

  const handleSaveAsMd = () => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Layout with Sidebar */}
      <div className="relative">
        {/* Sidebar */}
        <Sidebar selectedCategory={prompt.category} onSelectCategory={() => {}} />

        {/* Main Content */}
        <main className="ml-[250px] min-h-[calc(100vh-4rem)] px-6 py-8">
          <div className="mx-auto max-w-[900px]">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {/* Prompt Card */}
            <Card className="flex flex-col relative border border-zinc-800 bg-[#09090b] rounded-xl overflow-hidden h-[calc(100vh-200px)]">
              {/* Header - Tags and Title */}
              <div className="px-8 pt-8 pb-6">
                {/* Tags */}
                {prompt.tags && prompt.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {prompt.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-sm bg-zinc-800 px-3 py-1 text-sm font-normal text-zinc-500"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-2xl font-bold text-white">
                  {prompt.title}
                </h2>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-8">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-400 pb-6">
                  {prompt.content}
                </pre>
              </div>

              {/* Action Buttons Row */}
              <div className="border-t border-zinc-800 py-4 flex items-center justify-center gap-8">
                <button
                  onClick={handleShare}
                  className="text-zinc-500 hover:text-white transition-colors"
                  title="Share URL"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={handleCopy}
                  className="text-zinc-500 hover:text-white transition-colors"
                  title="Copy"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <button
                  onClick={handleSaveAsMd}
                  className="text-zinc-500 hover:text-white transition-colors"
                  title="Save as MD"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
