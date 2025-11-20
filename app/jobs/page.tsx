"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { JobCard } from "@/components/job-card";
import { FeaturedJobCard } from "@/components/featured-job-card";
import { Button } from "@/components/ui/button";
import { jobs } from "@/lib/data";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function JobsPage() {
  const [showAddJobForm, setShowAddJobForm] = useState(false);

  // Separate featured and regular jobs
  const featuredJobs = jobs.filter((job) => job.isFeatured);
  const regularJobs = jobs.filter((job) => !job.isFeatured);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Featured Jobs Section */}
        <div className="mb-16">
          {/* Section Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Featured Jobs</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Browse positions or post a job to reach 250,000+ monthly active developers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowAddJobForm(true)}
                className="rounded-md border border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add job listing
              </Button>
              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 bg-transparent text-white transition-colors hover:bg-zinc-800">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 bg-transparent text-white transition-colors hover:bg-zinc-800">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Featured Jobs Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredJobs.map((job) => (
              <FeaturedJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* All Jobs Section */}
        <div>
          {/* Large CTA Card */}
          <div className="mb-8 flex items-center justify-between rounded-lg border border-zinc-800 bg-linear-to-br from-zinc-900 to-black p-8">
            <div>
              <h3 className="mb-2 text-3xl font-bold text-white">
                Reach 300k+ developers per month.
              </h3>
              <p className="text-zinc-400">
                Connect with top talent and grow your team faster by reaching a dedicated community of developers.
              </p>
            </div>
            <Button
              onClick={() => setShowAddJobForm(true)}
              className="whitespace-nowrap rounded-md border border-white bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              Add job listing
            </Button>
          </div>

          {/* Regular Jobs List */}
          <div className="space-y-4">
            {regularJobs.map((job) => (
              <JobCard key={job.id} job={job} variant="list" />
            ))}
          </div>
        </div>

        {/* Brand Attribution */}
        <div className="mt-16 flex items-center justify-end gap-2 text-sm text-zinc-500">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-600">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </div>
          <span className="font-semibold text-white">Brand.dev</span>
          <span>AI API to personalize your product with logo and company info from any domain.</span>
        </div>
      </main>

      {/* Add Job Form Modal (placeholder) */}
      {showAddJobForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-zinc-800 bg-zinc-900 p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Add Job Listing</h2>
              <button
                onClick={() => setShowAddJobForm(false)}
                className="text-zinc-400 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Job Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                  placeholder="Describe the role and responsibilities..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                    placeholder="e.g. San Francisco, Remote"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Type
                  </label>
                  <select className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-zinc-600 focus:outline-none">
                    <option value="Remote">Remote</option>
                    <option value="On site">On site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Global">Global</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Experience Level
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                  placeholder="e.g. 2+ years"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-white focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="featured" className="text-sm text-zinc-300">
                  Feature this job listing (+$99)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowAddJobForm(false)}
                  className="rounded-md border border-zinc-700 bg-transparent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-md bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                >
                  Post Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
