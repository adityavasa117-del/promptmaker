"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getCategories, Category } from "@/lib/queries";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Sparkles, 
  X, 
  Plus,
  FileText,
  Tag,
  FolderOpen,
  Loader2,
  CheckCircle2,
  Clock,
  Shield
} from "lucide-react";

export default function SubmitPromptPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter the prompt content");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);

    try {
      // Submit to prompt_submissions table (pending review)
      const { error } = await supabase.from("prompt_submissions").insert({
        title: title.trim(),
        content: content.trim(),
        category_id: categoryId,
        tags: tags.length > 0 ? tags : null,
        submitter_name: submitterName.trim() || null,
        submitter_email: submitterEmail.trim() || null,
        status: "pending",
      });

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast.success("Prompt submitted for review!");
    } catch (error) {
      console.error("Error submitting prompt:", error);
      toast.error("Failed to submit prompt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success state - after submission
  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500" />
            </div>
            
            {/* Success Message */}
            <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl font-bold text-foreground">
              Submission Received!
            </h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
              Thank you for contributing to our community. Your prompt has been submitted and is now pending review.
            </p>

            {/* Status Card */}
            <div className="mb-6 sm:mb-8 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6 text-left">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Pending Review</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Usually reviewed within 24-48 hours</p>
                </div>
              </div>
              
              <div className="border-t border-zinc-800 pt-3 sm:pt-4 mt-3 sm:mt-4">
                <h3 className="text-xs sm:text-sm font-medium text-foreground mb-2">What happens next?</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
                    Our team will review your prompt for quality and originality
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
                    Once approved, your prompt will appear in the public directory
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
                    High-quality prompts may be featured on the homepage
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setTitle("");
                  setContent("");
                  setCategoryId("");
                  setTags([]);
                  setSubmitterName("");
                  setSubmitterEmail("");
                }}
                className="w-full sm:w-auto px-6 border-zinc-700 text-foreground hover:bg-zinc-800"
              >
                Submit Another
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="w-full sm:w-auto px-6 bg-white text-black font-semibold hover:bg-zinc-200"
              >
                Browse Prompts
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="mb-6 sm:mb-8 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Prompts
        </Button>

        {/* Page Header */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Submit a Prompt
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Share your best prompts with the community. Help others create better content.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Title Field */}
          <div className="space-y-2 sm:space-y-3">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Viral YouTube Hook Generator"
              className="h-11 sm:h-12 rounded-lg border-zinc-800 bg-zinc-900/50 px-3 sm:px-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:border-zinc-600 focus:ring-zinc-600"
            />
            <p className="text-xs text-muted-foreground">
              A clear, descriptive title that explains what your prompt does
            </p>
          </div>

          {/* Category Field */}
          <div className="space-y-2 sm:space-y-3">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              Category
            </label>
            <div className="relative">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="h-11 sm:h-12 w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 sm:px-4 pr-10 text-sm sm:text-base text-foreground focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              >
                <option value="" className="bg-zinc-900 text-muted-foreground">
                  Select a category
                </option>
                {categories.map((category) => (
                  <option 
                    key={category.id} 
                    value={category.id}
                    className="bg-zinc-900 text-foreground"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tags Field */}
          <div className="space-y-2 sm:space-y-3">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
              <Tag className="h-4 w-4 text-muted-foreground" />
              Tags
              <span className="text-muted-foreground font-normal">(up to 5)</span>
            </label>
            
            {/* Tag Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag and press Enter"
                disabled={tags.length >= 5}
                className="h-11 sm:h-12 flex-1 rounded-lg border-zinc-800 bg-zinc-900/50 px-3 sm:px-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:border-zinc-600 focus:ring-zinc-600"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                disabled={!tagInput.trim() || tags.length >= 5}
                className="h-11 sm:h-12 px-3 sm:px-4 rounded-lg border border-zinc-700 bg-zinc-800 text-foreground hover:bg-zinc-700 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Tags Display */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="group flex items-center gap-1 sm:gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/50 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:border-zinc-600"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-0.5 sm:ml-1 rounded-full p-0.5 text-zinc-500 hover:bg-zinc-700 hover:text-white transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Content Field */}
          <div className="space-y-2 sm:space-y-3">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              Prompt Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your full prompt here...

Include:
- Clear instructions for the AI
- Specific formatting or structure requirements  
- Examples if helpful
- Any variables or placeholders"
              rows={10}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 sm:px-4 py-3 sm:py-4 text-foreground placeholder:text-muted-foreground focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 resize-none font-mono text-xs sm:text-sm leading-relaxed"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <p>Markdown formatting supported</p>
              <p>{content.length} characters</p>
            </div>
          </div>

          {/* Optional Contact Info */}
          <div className="space-y-3 sm:space-y-4 rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Contact Information</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">Optional</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm text-muted-foreground">Your Name</label>
                <Input
                  type="text"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  placeholder="John Doe"
                  className="h-10 sm:h-11 rounded-lg border-zinc-800 bg-zinc-900/50 px-3 sm:px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-zinc-600 focus:ring-zinc-600"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm text-muted-foreground">Email Address</label>
                <Input
                  type="email"
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="h-10 sm:h-11 rounded-lg border-zinc-800 bg-zinc-900/50 px-3 sm:px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-zinc-600 focus:ring-zinc-600"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              We may contact you if we have questions about your submission or want to feature it.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-800/50" />

          {/* Submit Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/")}
              className="w-full sm:w-auto px-6 text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !title.trim() || !content.trim() || !categoryId}
              className="w-full sm:w-auto px-6 sm:px-8 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Submit Prompt
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Guidelines */}
        <div className="mt-8 sm:mt-12 rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-4 sm:p-6">
          {/* Review Notice */}
          <div className="flex items-start gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-zinc-800/50">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-amber-500/10 shrink-0">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-foreground mb-1">
                All submissions are reviewed
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Our team manually reviews every prompt submission to ensure quality and originality. 
                Approved prompts will appear in the public directory within 24-48 hours.
              </p>
            </div>
          </div>

          <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-foreground">
            Submission Guidelines
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
              Be specific and clear in your prompt instructions
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
              Include examples or sample outputs when possible
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
              Use relevant tags to help others discover your prompt
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
              Ensure your prompt is original and provides unique value
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
              No spam, plagiarized content, or low-quality submissions
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
