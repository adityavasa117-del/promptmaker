"use client";

import { Job } from "@/lib/queries";
import { cn } from "@/lib/utils";

interface FeaturedJobCardProps {
  job: Job;
  className?: string;
}

export function FeaturedJobCard({ job, className }: FeaturedJobCardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 sm:p-6 transition-all hover:border-zinc-700",
        className
      )}
    >
      {/* Company Logo */}
      <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg bg-zinc-800 text-lg sm:text-xl font-semibold text-white">
        {job.companyLogo || job.company.charAt(0)}
      </div>

      {/* Company Name and Location */}
      <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-400">
        <span>{job.company}</span>
        <span>•</span>
        <span>{job.type}</span>
      </div>

      {/* Job Title */}
      <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-white line-clamp-2">{job.title}</h3>

      {/* Additional Info */}
      {job.experience && (
        <div className="mb-2 sm:mb-3 text-xs sm:text-sm text-zinc-400">
          {job.experience}
        </div>
      )}

      {/* Job Description */}
      <p className="mb-3 sm:mb-4 flex-1 text-xs sm:text-sm text-zinc-400 line-clamp-2">{job.description}</p>

      {/* View Button */}
      <button className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700">
        View
      </button>
    </div>
  );
}
