import { supabase } from './supabase';
import { Tables, TablesInsert, TablesUpdate } from './database.types';

// ============================================
// TYPE EXPORTS
// ============================================
export type Category = Tables<'categories'> & { count?: number };
export type Prompt = Tables<'prompts'> & { category?: string };
export type TrendingPost = Tables<'trending_posts'>;
export type NewTrendingPost = TablesInsert<'trending_posts'>;
export type UpdateTrendingPost = TablesUpdate<'trending_posts'>;
export type Job = Tables<'jobs'> & { 
  companyLogo?: string | null;
  isFeatured?: boolean | null;
};
export type MCP = Tables<'mcps'>;
export type NewMCP = TablesInsert<'mcps'>;

// ============================================
// CUSTOM ERROR CLASSES
// ============================================
export class DatabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
const validatePostData = (data: Partial<NewTrendingPost>) => {
  if (!data.title?.trim()) {
    throw new ValidationError('Title is required and cannot be empty');
  }
  if (!data.description?.trim()) {
    throw new ValidationError('Description is required and cannot be empty');
  }
  if (!data.author?.trim()) {
    throw new ValidationError('Author is required');
  }
  if (data.url && !isValidUrl(data.url)) {
    throw new ValidationError('Invalid URL format');
  }
};

const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
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
// ============================================
// TRENDING POSTS QUERIES
// ============================================
export async function getTrendingPosts(): Promise<TrendingPost[]> {
  try {
    const { data, error } = await supabase
      .from('trending_posts')
      .select('*')
      .order('votes', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error fetching posts:', error);
      throw new DatabaseError('Failed to fetch trending posts', error);
    }

    return data || [];
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw new DatabaseError('Unexpected error while fetching posts', error);
  }
}

export async function createTrendingPost(postData: Omit<NewTrendingPost, 'id' | 'created_at' | 'updated_at'>): Promise<TrendingPost> {
  try {
    // Validate input data
    validatePostData(postData);

    // Clean and prepare data
    const cleanData: NewTrendingPost = {
      title: postData.title.trim(),
      description: postData.description.trim(),
      url: postData.url?.trim() || null,
      author: postData.author.trim(),
      votes: postData.votes || 1,
    };

    const { data, error } = await supabase
      .from('trending_posts')
      .insert(cleanData)
      .select()
      .single();

    if (error) {
      console.error('Database error creating post:', error);
      throw new DatabaseError('Failed to create post', error);
    }

    if (!data) {
      throw new DatabaseError('No data returned after creating post');
    }

    return data;
  } catch (error) {
    if (error instanceof ValidationError || error instanceof DatabaseError) {
      throw error;
    }
    throw new DatabaseError('Unexpected error while creating post', error);
  }
}

export async function updatePostVotes(postId: string, increment: number = 1): Promise<TrendingPost> {
  try {
    if (!postId?.trim()) {
      throw new ValidationError('Post ID is required');
    }

    // First get current post to check if it exists
    const { data: currentPost, error: fetchError } = await supabase
      .from('trending_posts')
      .select('votes')
      .eq('id', postId)
      .single();

    if (fetchError) {
      throw new DatabaseError('Post not found or database error', fetchError);
    }

    // Calculate new vote count
    const newVotes = Math.max(0, (currentPost?.votes || 0) + increment);

    // Update with new vote count
    const { data, error } = await supabase
      .from('trending_posts')
      .update({ votes: newVotes })
      .eq('id', postId)
      .select()
      .single();

    if (error) {
      console.error('Database error updating votes:', error);
      throw new DatabaseError('Failed to update votes', error);
    }

    if (!data) {
      throw new DatabaseError('No data returned after updating votes');
    }

    return data;
  } catch (error) {
    if (error instanceof ValidationError || error instanceof DatabaseError) {
      throw error;
    }
    throw new DatabaseError('Unexpected error while updating votes', error);
  }
}

export function subscribeToTrendingPosts(callback: (posts: TrendingPost[]) => void) {
  const subscription = supabase
    .channel('trending_posts_changes')
    .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'trending_posts' },
        async () => {
          // Refetch all posts when any change occurs
          try {
            const updatedPosts = await getTrendingPosts();
            callback(updatedPosts);
          } catch (error) {
            console.error('Error refetching posts after real-time update:', error);
          }
        }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
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

export type NewJob = {
  company: string;
  company_logo?: string | null;
  description: string;
  experience?: string | null;
  location: string;
  tags?: string[] | null;
  title: string;
  type: string;
  is_featured?: boolean | null;
};

export async function createJob(jobData: NewJob): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .insert(jobData)
    .select()
    .single();

  if (error) {
    console.error('Error creating job:', error);
    throw new DatabaseError('Failed to create job listing', error);
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
  { name: "Tools", href: "/mcps" },
  { name: "Generate", href: "#" },
  { name: "About", href: "/about" },
  { name: "More", href: "#" },
];

// ============================================
// MCP QUERIES
// ============================================
export async function getMCPs(options?: {
  isFeatured?: boolean;
  searchQuery?: string;
}): Promise<MCP[]> {
  let query = supabase
    .from('mcps')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (options?.isFeatured !== undefined) {
    query = query.eq('is_featured', options.isFeatured);
  }

  if (options?.searchQuery) {
    query = query.or(`name.ilike.%${options.searchQuery}%,description.ilike.%${options.searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching MCPs:', error);
    throw new DatabaseError('Failed to fetch MCPs', error);
  }

  return data || [];
}

export async function getMCPById(id: string): Promise<MCP | null> {
  const { data, error } = await supabase
    .from('mcps')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error fetching MCP:', error);
    throw new DatabaseError('Failed to fetch MCP', error);
  }

  return data;
}

export async function createMCP(mcp: NewMCP): Promise<MCP | null> {
  // Validate required fields
  if (!mcp.name?.trim()) {
    throw new ValidationError('MCP name is required');
  }
  if (!mcp.description?.trim()) {
    throw new ValidationError('MCP description is required');
  }

  const { data, error } = await supabase
    .from('mcps')
    .insert({
      name: mcp.name.trim(),
      description: mcp.description.trim(),
      icon_url: mcp.icon_url?.trim() || null,
      cursor_deep_link: mcp.cursor_deep_link?.trim() || null,
      install_instructions_url: mcp.install_instructions_url?.trim() || null,
      company: mcp.company?.trim() || null,
      pricing_tier: mcp.pricing_tier || 'standard',
      is_featured: mcp.is_featured || false,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating MCP:', error);
    throw new DatabaseError('Failed to create MCP', error);
  }

  return data;
}

export async function getFeaturedMCPs(): Promise<MCP[]> {
  const { data, error } = await supabase
    .from('mcps')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(4);

  if (error) {
    console.error('Error fetching featured MCPs:', error);
    return [];
  }

  return data || [];
}
