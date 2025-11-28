"use client";

import { MCP } from "@/lib/queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface MCPDetailDialogProps {
  mcp: MCP | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MCPDetailDialog({ mcp, open, onOpenChange }: MCPDetailDialogProps) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!mcp) return null;

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-surface overflow-hidden">
              {mcp.icon_url ? (
                <Image
                  src={mcp.icon_url}
                  alt={mcp.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
                  {mcp.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-foreground">
                {mcp.name}
              </DialogTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                {mcp.description}
              </p>
              {mcp.install_instructions_url && (
                <a
                  href={mcp.install_instructions_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline"
                >
                  Learn more here: {mcp.install_instructions_url}
                </a>
              )}
            </div>
          </div>
        </DialogHeader>

        {mcp.cursor_deep_link && (
          <div className="mt-4">
            <Button
              onClick={() => window.open(mcp.cursor_deep_link!, '_blank')}
              className="w-full sm:w-auto bg-surface hover:bg-surface-highlight border border-border text-foreground"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Add to Cursor
            </Button>
          </div>
        )}

        <div className="mt-6 space-y-6">
          {/* How to Use MCP Section */}
          <div className="rounded-xl bg-surface p-6 border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              How to Use Model Context Protocol (MCP) in Cursor
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is MCP?</h4>
                <p className="text-sm text-muted-foreground">
                  Model Context Protocol (MCP) is an open protocol that allows you to provide custom
                  tools to agentic LLMs (Large Language Models) in Cursor&apos;s Composer feature.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Installation Steps</h4>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Open Cursor Settings</li>
                  <li>Navigate to Cursor Settings &gt; Features &gt; MCP</li>
                  <li>Click the &quot;+ Add New MCP Server&quot; button</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Configure the Server</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong>Name:</strong> Give your server a nickname</li>
                  <li><strong>Type:</strong> Select the transport type (stdio or sse)</li>
                  <li><strong>Command/URL:</strong> Enter either:
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>• For SSE servers: The URL of the SSE endpoint</li>
                      <li>• For stdio servers: A valid shell command to run the server</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Example Configurations</h4>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>For stdio Server (Weather Server Example):</strong>
                    </p>
                    <div className="relative">
                      <pre className="bg-background rounded-lg p-3 text-sm text-foreground overflow-x-auto border border-border/50">
                        <code>Command: node ~/mcp-quickstart/weather-server-typescript/build/index.js</code>
                      </pre>
                      <button
                        onClick={() => handleCopy('node ~/mcp-quickstart/weather-server-typescript/build/index.js', 'stdio')}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-surface hover:bg-surface-highlight transition-colors"
                      >
                        {copied === 'stdio' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>For SSE Server:</strong>
                    </p>
                    <div className="relative">
                      <pre className="bg-background rounded-lg p-3 text-sm text-foreground overflow-x-auto border border-border/50">
                        <code>URL: http://example.com:8000/sse</code>
                      </pre>
                      <button
                        onClick={() => handleCopy('http://example.com:8000/sse', 'sse')}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-surface hover:bg-surface-highlight transition-colors"
                      >
                        {copied === 'sse' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Using MCP Tools</h4>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li><strong>Tool Availability:</strong> After adding a server, it will appear in your MCP servers list. You may need to click the refresh button to populate the tool list.</li>
                  <li><strong>Using Tools in Composer:</strong> The Composer Agent automatically uses MCP tools when relevant. You can explicitly prompt tool usage by referring to the tool by name or describing the tool&apos;s function.</li>
                  <li><strong>Tool Execution Process:</strong>
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>• Displays a message in chat requesting approval</li>
                      <li>• Shows tool call arguments (expandable)</li>
                      <li>• Executes the tool upon user approval</li>
                      <li>• Displays the tool&apos;s response in the chat</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Important Notes</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>MCP tools may not work with all models</li>
                  <li>MCP tools are only available to the Agent in Composer</li>
                  <li>For servers requiring environment variables, create a wrapper script that sets the variables before running the server</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
