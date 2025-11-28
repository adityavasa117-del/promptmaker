"use client";

import { MCP } from "@/lib/queries";
import { Card } from "@/components/ui/card";
import { MCPIcon } from "@/components/mcp-icon";
import Link from "next/link";

interface FeaturedMCPCardProps {
  mcp: MCP;
}

export function FeaturedMCPCard({ mcp }: FeaturedMCPCardProps) {
  return (
    <Link href={`/mcps/${mcp.id}`}>
      <Card 
        className="group flex flex-col gap-3 rounded-xl border border-border/50 bg-card p-5 transition-all duration-200 hover:border-border hover:bg-surface cursor-pointer min-w-[280px] h-full"
      >
        <div className="flex items-start gap-4">
          <MCPIcon name={mcp.name} iconUrl={mcp.icon_url} size="md" />
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base">
              {mcp.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {mcp.description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
