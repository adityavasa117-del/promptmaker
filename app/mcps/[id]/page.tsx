"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getMCPById, MCP } from "@/lib/queries";
import { ExternalLink, ArrowLeft, Loader2 } from "lucide-react";
import { MCPIcon } from "@/components/mcp-icon";

export default function MCPDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [mcp, setMCP] = useState<MCP | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMCP() {
      if (!params.id) return;
      
      setLoading(true);
      try {
        const data = await getMCPById(params.id as string);
        if (!data) {
          router.push("/mcps");
          return;
        }
        setMCP(data);
      } catch (error) {
        console.error("Error fetching MCP:", error);
        router.push("/mcps");
      } finally {
        setLoading(false);
      }
    }
    fetchMCP();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </main>
      </div>
    );
  }

  if (!mcp) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </button>

        {/* Tool Header */}
        <div className="flex items-start gap-5 mb-8">
          <MCPIcon name={mcp.name} iconUrl={mcp.icon_url} size="lg" />
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              {mcp.name}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              {mcp.description}
            </p>
            {mcp.install_instructions_url && (
              <a
                href={mcp.install_instructions_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
              >
                Learn more here: {mcp.install_instructions_url}
              </a>
            )}
          </div>
        </div>

        {/* Try Tool Button */}
        {mcp.cursor_deep_link && (
          <div className="mb-8">
            <Button
              onClick={() => window.open(mcp.cursor_deep_link!, '_blank')}
              className="bg-surface hover:bg-surface-highlight border border-border text-foreground"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Try This Tool
            </Button>
          </div>
        )}

        {/* How to Use This Tool Section */}
        <div className="rounded-xl bg-surface p-6 sm:p-8 border border-border/50">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            How to Use This Writing Tool
          </h2>

          <div className="space-y-6">
            {/* About This Tool */}
            <section>
              <h3 className="font-medium text-foreground mb-2">About This Tool</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This tool is designed to enhance your writing workflow. Whether you&apos;re crafting articles, 
                blog posts, or creative content, this tool can help streamline your process.
              </p>
            </section>

            {/* Getting Started */}
            <section>
              <h3 className="font-medium text-foreground mb-3">Getting Started</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Visit the tool&apos;s website using the link above</li>
                <li>Create an account or sign in if required</li>
                <li>Follow the setup instructions provided by the tool</li>
              </ol>
            </section>

            {/* Key Features */}
            <section>
              <h3 className="font-medium text-foreground mb-3">Key Features</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Enhance your writing productivity</li>
                <li>Integrate with your existing workflow</li>
                <li>Access helpful writing resources and templates</li>
                <li>Collaborate with other writers</li>
              </ul>
            </section>

            {/* Best Practices */}
            <section>
              <h3 className="font-medium text-foreground mb-3">Best Practices</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Take time to explore all features before starting a project</li>
                <li>Customize settings to match your writing style</li>
                <li>Check for updates regularly to access new features</li>
                <li>Join the community to learn tips from other writers</li>
              </ul>
            </section>

            {/* Need Help? */}
            <section>
              <h3 className="font-medium text-foreground mb-3">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                If you encounter any issues or have questions about this tool, 
                visit the tool&apos;s official documentation or support page for assistance.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
