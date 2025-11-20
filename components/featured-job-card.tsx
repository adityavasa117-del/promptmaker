"use client";

import { Job } from "@/lib/data";
import { cn } from "@/lib/utils";

interface FeaturedJobCardProps {
  job: Job;
  className?: string;
}

export function FeaturedJobCard({ job, className }: FeaturedJobCardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700",
        className
      )}
    >
      {/* Company Logo */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-zinc-800 text-xl font-semibold text-white">
        {job.companyLogo || job.company.charAt(0)}
      </div>

      {/* Company Name and Location */}
      <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
        <span>{job.company}</span>
        <span>•</span>
        <span>{job.type}</span>
      </div>

      {/* Job Title */}
      <h3 className="mb-3 text-lg font-semibold text-white line-clamp-2">{job.title}</h3>

      {/* Additional Info */}
      {job.experience && (
        <div className="mb-3 text-sm text-zinc-400">
          {job.experience}
        </div>
      )}

      {/* Job Description */}
      <p className="mb-4 flex-1 text-sm text-zinc-400 line-clamp-2">{job.description}</p>

      {/* View Button */}
      <button className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700">
        View
      </button>
    </div>
  );
}
