import { useState, useEffect, useCallback } from 'react';
import { 
  getTrendingPosts, 
  createTrendingPost, 
  updatePostVotes, 
  subscribeToTrendingPosts,
  DatabaseError,
  ValidationError,
  type TrendingPost,
  type NewTrendingPost
} from '@/lib/queries';

interface UseTrendingPostsState {
  posts: TrendingPost[];
  loading: boolean;
  error: string | null;
  isCreating: boolean;
  isVoting: Record<string, boolean>;
}

interface CreatePostData {
  title: string;
  description: string;
  url?: string;
  author: string;
}

export const useTrendingPosts = () => {
  const [state, setState] = useState<UseTrendingPostsState>({
    posts: [],
    loading: true,
    error: null,
    isCreating: false,
    isVoting: {},
  });

  // Fetch posts on mount
  const fetchPosts = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const posts = await getTrendingPosts();
      setState(prev => ({ ...prev, posts, loading: false }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load posts'
      }));
    }
  }, []);

  // Create new post with optimistic updates
  const createPost = useCallback(async (postData: CreatePostData): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isCreating: true, error: null }));

      const newPost = await createTrendingPost(postData);
      
      // Add new post to the beginning of the list
      setState(prev => ({
        ...prev,
        posts: [newPost, ...prev.posts],
        isCreating: false
      }));

      return true;
    } catch (error) {
      console.error('Error creating post:', error);
      let errorMessage = 'Failed to create post';
      
      if (error instanceof ValidationError) {
        errorMessage = error.message;
      } else if (error instanceof DatabaseError) {
        errorMessage = 'Database error: ' + error.message;
      }

      setState(prev => ({
        ...prev,
        isCreating: false,
        error: errorMessage
      }));

      return false;
    }
  }, []);

  // Vote on post with optimistic updates
  const voteOnPost = useCallback(async (postId: string, increment: number = 1): Promise<boolean> => {
    try {
      // Set voting state for this specific post
      setState(prev => ({
        ...prev,
        isVoting: { ...prev.isVoting, [postId]: true },
        error: null
      }));

      // Optimistic update
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(post => 
          post.id === postId 
            ? { ...post, votes: Math.max(0, (post.votes || 0) + increment) }
            : post
        )
      }));

      // Update in database
      const updatedPost = await updatePostVotes(postId, increment);

      // Update with real data from database
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(post => 
          post.id === postId ? updatedPost : post
        ),
        isVoting: { ...prev.isVoting, [postId]: false }
      }));

      return true;
    } catch (error) {
      console.error('Error voting on post:', error);
      
      // Revert optimistic update on error
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(post => 
          post.id === postId 
            ? { ...post, votes: Math.max(0, (post.votes || 0) - increment) }
            : post
        ),
        isVoting: { ...prev.isVoting, [postId]: false },
        error: error instanceof Error ? error.message : 'Failed to vote on post'
      }));

      return false;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    fetchPosts();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToTrendingPosts((updatedPosts) => {
      setState(prev => ({ ...prev, posts: updatedPosts }));
    });

    return unsubscribe;
  }, [fetchPosts]);

  return {
    ...state,
    createPost,
    voteOnPost,
    refetch: fetchPosts,
    clearError,
  };
};