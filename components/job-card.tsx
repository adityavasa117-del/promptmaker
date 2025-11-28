"use client";

import { Job } from "@/lib/queries";
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
        "group relative flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 sm:p-6 transition-all hover:border-zinc-700",
        isFeatured && "h-full",
        className
      )}
    >
      {/* Company Logo and Header */}
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          {/* Company Logo */}
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-zinc-800 text-base sm:text-lg font-semibold text-white shrink-0 overflow-hidden">
            {job.companyLogo && job.companyLogo.startsWith('http') ? (
              <img 
                src={job.companyLogo} 
                alt={job.company} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.textContent = job.company.charAt(0);
                }}
              />
            ) : (
              job.company.charAt(0)
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-400">
              <span>{job.company}</span>
              {job.experience && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">{job.experience}</span>
                </>
              )}
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.type}</span>
            </div>
          </div>
        </div>
        <button className="w-full sm:w-auto rounded-md border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700">
          View
        </button>
      </div>

      {/* Job Title */}
      <h3 className="mb-2 text-base sm:text-lg font-semibold text-white">{job.title}</h3>

      {/* Job Description */}
      <p className="line-clamp-2 text-xs sm:text-sm text-zinc-400">{job.description}</p>

      {/* Tags if available */}
      {job.tags && job.tags.length > 0 && (
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
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
