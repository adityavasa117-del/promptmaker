"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { JobCard } from "@/components/job-card";
import { FeaturedJobCard } from "@/components/featured-job-card";
import { Button } from "@/components/ui/button";
import { getJobs, createJob, Job } from "@/lib/queries";
import { ChevronLeft, ChevronRight, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function JobsPage() {
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    description: "",
    location: "",
    type: "Remote",
    experience: "",
  });

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    }
    fetchJobs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company.trim() || !formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const newJob = await createJob({
        company: formData.company.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        type: formData.type,
        experience: formData.experience.trim() || null,
        is_featured: false,
      });

      if (newJob) {
        setJobs((prev) => [newJob, ...prev]);
        toast.success("Job listing created successfully!");
        setShowAddJobForm(false);
        setFormData({
          company: "",
          title: "",
          description: "",
          location: "",
          type: "Remote",
          experience: "",
        });
      }
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Failed to create job listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Separate featured and regular jobs
  const featuredJobs = jobs.filter((job) => job.isFeatured);
  const regularJobs = jobs.filter((job) => !job.isFeatured);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {/* Featured Jobs Section */}
        <div className="mb-10 sm:mb-16">
          {/* Section Header */}
          <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-white">Featured Jobs</h2>
                {/* Mobile navigation arrows - inline with title */}
                <div className="flex items-center gap-2 sm:hidden">
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-transparent text-white transition-colors hover:bg-zinc-800">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-transparent text-white transition-colors hover:bg-zinc-800">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-1.5 text-sm text-zinc-400 max-w-md">
                Browse positions or post a job to reach 250,000+ monthly active writers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowAddJobForm(true)}
                className="flex-1 sm:flex-none rounded-md border border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add job listing
              </Button>
              {/* Desktop navigation arrows */}
              <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 bg-transparent text-white transition-colors hover:bg-zinc-800">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 bg-transparent text-white transition-colors hover:bg-zinc-800">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Featured Jobs Grid */}
          <div className="grid grid-cols-1 gap-5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                Reach 300k+ writers per month.
              </h3>
              <p className="text-zinc-400">
                Connect with top writing talent and grow your team faster by reaching a dedicated community of writers.
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
          <div className="space-y-5 sm:space-y-4">
            {regularJobs.map((job) => (
              <JobCard key={job.id} job={job} variant="list" />
            ))}
          </div>
        </div>

      </main>

      {/* Add Job Form Modal (placeholder) */}
      {showAddJobForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 sm:p-8">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">Add Job Listing</h2>
              <button
                onClick={() => setShowAddJobForm(false)}
                className="text-zinc-400 transition-colors hover:text-white p-2"
              >
                ✕
              </button>
            </div>

            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-zinc-300">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-zinc-300">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                  placeholder="e.g. Senior Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-zinc-300">
                  Description *
                </label>
                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                  placeholder="Describe the role and responsibilities..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-zinc-300">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                    placeholder="e.g. San Francisco, Remote"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-zinc-300">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 sm:px-4 py-2 text-sm sm:text-base text-white focus:border-zinc-600 focus:outline-none"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On site">On site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Global">Global</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-zinc-300">
                  Experience Level
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                  placeholder="e.g. 2+ years"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowAddJobForm(false)}
                  disabled={submitting}
                  className="w-full sm:w-auto rounded-md border border-zinc-700 bg-transparent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto rounded-md bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post Job"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
