"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { PromptCard } from "@/components/prompt-card";
import { Button } from "@/components/ui/button";
import { getPromptById, Prompt } from "@/lib/queries";
import { ArrowLeft } from "lucide-react";

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params.id as string;
  
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrompt() {
      setLoading(true);
      const data = await getPromptById(promptId);
      setPrompt(data);
      setLoading(false);
    }
    fetchPrompt();
  }, [promptId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading prompt...</p>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Prompt Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The prompt you&apos;re looking for doesn&apos;t exist.
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
        {/* Sidebar - Hidden on mobile for detail page */}
        <div className="hidden lg:block">
          <Sidebar selectedCategory={prompt.category || null} onSelectCategory={() => {}} />
        </div>

        {/* Main Content */}
        <main className="lg:ml-[250px] min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-4 sm:py-8">
          <div className="max-w-full sm:max-w-[600px]">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="mb-4 sm:mb-6 -ml-2 text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {/* Large Prompt Card */}
            <div className="h-[calc(100vh-180px)] sm:h-[calc(100vh-220px)]">
              <PromptCard prompt={prompt} variant="large" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
