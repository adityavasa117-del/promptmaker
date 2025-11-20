"use client";

import { Job } from "@/lib/data";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  variant?: "featured" | "list";
  className?: string;
}

export function JobCard({ job, variant = "list", className }: JobCardProps) {
  const isFeatured = variant === "featured";

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700",
        isFeatured && "h-full",
        className
      )}
    >
      {/* Company Logo and Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Company Logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-lg font-semibold text-white">
            {job.companyLogo || job.company.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span>{job.company}</span>
              {job.experience && (
                <>
                  <span>•</span>
                  <span>{job.experience}</span>
                </>
              )}
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.type}</span>
            </div>
          </div>
        </div>
        <button className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700">
          View
        </button>
      </div>

      {/* Job Title */}
      <h3 className="mb-2 text-lg font-semibold text-white">{job.title}</h3>

      {/* Job Description */}
      <p className="line-clamp-2 text-sm text-zinc-400">{job.description}</p>

      {/* Tags if available */}
      {job.tags && job.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
