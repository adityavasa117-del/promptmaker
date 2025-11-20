"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { PromptCard } from "@/components/prompt-card";
import { Button } from "@/components/ui/button";
import { prompts } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

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
          <div className="mx-auto max-w-[1200px]">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="mb-6 -ml-2 text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {/* Large Prompt Card */}
            <div className="h-[calc(100vh-220px)]">
              <PromptCard prompt={prompt} variant="large" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
