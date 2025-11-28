import { supabase } from './supabase';
import { Tables } from './database.types';

// ============================================
// TYPE EXPORTS (for backward compatibility)
// ============================================
export type Category = Tables<'categories'> & { count?: number };
export type Prompt = Tables<'prompts'> & { category?: string };
export type TrendingPost = Tables<'trending_posts'>;
export type Job = Tables<'jobs'> & { 
  companyLogo?: string | null;
  isFeatured?: boolean | null;
};

// ============================================
// CATEGORIES QUERIES
// ============================================
export async function getCategories(): Promise<Category[]> {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Get prompt counts for each category
  const { data: counts } = await supabase
    .from('prompts')
    .select('category_id');

  const countMap: Record<string, number> = {};
  counts?.forEach((item) => {
    countMap[item.category_id] = (countMap[item.category_id] || 0) + 1;
  });

  return categories.map((cat) => ({
    ...cat,
    count: countMap[cat.id] || 0,
  }));
}

// ============================================
// PROMPTS QUERIES
// ============================================
export async function getPrompts(options?: {
  categoryId?: string;
  isPopular?: boolean;
  isOfficial?: boolean;
  searchQuery?: string;
}): Promise<Prompt[]> {
  let query = supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false });

  if (options?.categoryId) {
    query = query.eq('category_id', options.categoryId);
  }

  if (options?.isPopular) {
    query = query.eq('is_popular', true);
  }

  if (options?.isOfficial) {
    query = query.eq('is_official', true);
  }

  if (options?.searchQuery) {
    query = query.or(`title.ilike.%${options.searchQuery}%,content.ilike.%${options.searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching prompts:', error);
    return [];
  }

  // Map category_id to category for backward compatibility
  return data.map((prompt) => ({
    ...prompt,
    category: prompt.category_id,
  }));
}

export async function getPromptById(id: string): Promise<Prompt | null> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching prompt:', error);
    return null;
  }

  return {
    ...data,
    category: data.category_id,
  };
}

export async function incrementPromptViewCount(id: string): Promise<void> {
  // Simple increment - get current value and update
  const { data } = await supabase
    .from('prompts')
    .select('view_count')
    .eq('id', id)
    .single();

  if (data) {
    await supabase
      .from('prompts')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', id);
  }
}

// ============================================
// TRENDING POSTS QUERIES
// ============================================
export async function getTrendingPosts(): Promise<TrendingPost[]> {
  const { data, error } = await supabase
    .from('trending_posts')
    .select('*')
    .order('votes', { ascending: false });

  if (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }

  return data;
}

// ============================================
// JOBS QUERIES
// ============================================
export async function getJobs(options?: {
  isFeatured?: boolean;
}): Promise<Job[]> {
  let query = supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (options?.isFeatured) {
    query = query.eq('is_featured', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  // Map to include backward-compatible field names
  return data.map((job) => ({
    ...job,
    companyLogo: job.company_logo,
    isFeatured: job.is_featured,
  }));
}

export async function getJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching job:', error);
    return null;
  }

  return {
    ...data,
    companyLogo: data.company_logo,
    isFeatured: data.is_featured,
  };
}

// ============================================
// PROMPT SUBMISSIONS (for admin review)
// ============================================
export type PromptSubmission = Tables<'prompt_submissions'>;

export async function getPromptSubmissions(options?: {
  status?: 'pending' | 'approved' | 'rejected';
}): Promise<PromptSubmission[]> {
  let query = supabase
    .from('prompt_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }

  return data;
}

export async function approveSubmission(submissionId: string): Promise<boolean> {
  // Get the submission
  const { data: submission, error: fetchError } = await supabase
    .from('prompt_submissions')
    .select('*')
    .eq('id', submissionId)
    .single();

  if (fetchError || !submission) {
    console.error('Error fetching submission:', fetchError);
    return false;
  }

  // Insert into prompts table
  const { error: insertError } = await supabase.from('prompts').insert({
    title: submission.title,
    content: submission.content,
    category_id: submission.category_id,
    tags: submission.tags,
    is_popular: false,
    is_official: false,
  });

  if (insertError) {
    console.error('Error inserting prompt:', insertError);
    return false;
  }

  // Update submission status
  const { error: updateError } = await supabase
    .from('prompt_submissions')
    .update({ status: 'approved', reviewed_at: new Date().toISOString() })
    .eq('id', submissionId);

  if (updateError) {
    console.error('Error updating submission:', updateError);
    return false;
  }

  return true;
}

export async function rejectSubmission(submissionId: string, notes?: string): Promise<boolean> {
  const { error } = await supabase
    .from('prompt_submissions')
    .update({ 
      status: 'rejected', 
      reviewed_at: new Date().toISOString(),
      admin_notes: notes || null
    })
    .eq('id', submissionId);

  if (error) {
    console.error('Error rejecting submission:', error);
    return false;
  }

  return true;
}

// ============================================
// NAVIGATION LINKS (static, no DB needed)
// ============================================
export const navigationLinks = [
  { name: "Prompts", href: "/" },
  { name: "Trending", href: "/trending" },
  { name: "Jobs", href: "/jobs" },
  { name: "Tools", href: "#" },
  { name: "Generate", href: "#" },
  { name: "Writers", href: "#" },
  { name: "More", href: "#" },
];
