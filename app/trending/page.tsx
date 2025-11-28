"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { TrendingPostCard } from "@/components/trending-post-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTrendingPosts } from "@/hooks/use-trending-posts";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

export default function TrendingPage() {
  const {
    posts,
    loading,
    error,
    isCreating,
    isVoting,
    createPost,
    voteOnPost,
    refetch,
    clearError,
  } = useTrendingPosts();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    const success = await createPost({
      title: formData.title,
      description: formData.description,
      url: formData.url || undefined,
      author: 'user', // TODO: Replace with actual user when auth is implemented
    });

    if (success) {
      setFormData({ title: "", description: "", url: "" });
      setIsDialogOpen(false);
    }
  };

  const handleVote = async (postId: string) => {
    await voteOnPost(postId, 1);
  };

  const isSubmitDisabled = !formData.title.trim() || !formData.description.trim() || isCreating;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">Loading trending posts...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-6 sm:py-12">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          {/* Title and Description */}
          <div className="mb-4 sm:mb-0 sm:flex sm:items-start sm:justify-between sm:gap-4">
            <div className="text-center sm:text-left mb-5 sm:mb-0">
              <h1 className="mb-1.5 sm:mb-2 text-2xl sm:text-3xl font-bold text-foreground">
                Trending in Cursor
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Explore what the community is talking about
              </p>
            </div>

            {/* Desktop Buttons - Hidden on Mobile */}
            <div className="hidden sm:flex items-center space-x-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  clearError();
                  refetch();
                }}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-card border border-border">
                  <DialogHeader className="space-y-0 pb-4">
                    <DialogTitle className="text-lg font-semibold text-foreground">
                      Add a post
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title-desktop" className="text-sm font-medium text-foreground">
                        Title
                      </Label>
                      <Input
                        id="title-desktop"
                        type="text"
                        placeholder="Type your title here"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="w-full bg-background border-border text-foreground"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="url-desktop" className="text-sm font-medium text-foreground">
                        Link
                      </Label>
                      <Input
                        id="url-desktop"
                        type="url"
                        placeholder="https://example.com"
                        value={formData.url}
                        onChange={(e) => handleInputChange("url", e.target.value)}
                        className="w-full bg-background border-border text-foreground"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description-desktop" className="text-sm font-medium text-foreground">
                        Description
                      </Label>
                      <Textarea
                        id="description-desktop"
                        placeholder="Describe your post here"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="w-full min-h-[120px] bg-background border-border text-foreground resize-none"
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isSubmitDisabled}
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Mobile Buttons - Shown only on Mobile */}
          <div className="flex sm:hidden gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearError();
                refetch();
              }}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border-border/60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            {/* Create Post Dialog - Mobile */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-2 h-11 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-card border border-border">
                <DialogHeader className="space-y-0 pb-4">
                  <DialogTitle className="text-lg font-semibold text-foreground">
                    Add a post
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title-mobile" className="text-sm font-medium text-foreground">
                      Title
                    </Label>
                    <Input
                      id="title-mobile"
                      type="text"
                      placeholder="Type your title here"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full bg-background border-border text-foreground"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="url-mobile" className="text-sm font-medium text-foreground">
                      Link
                    </Label>
                    <Input
                      id="url-mobile"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.url}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                      className="w-full bg-background border-border text-foreground"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description-mobile" className="text-sm font-medium text-foreground">
                      Description
                    </Label>
                    <Textarea
                      id="description-mobile"
                      placeholder="Describe your post here"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="w-full min-h-[120px] bg-background border-border text-foreground resize-none"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitDisabled}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="h-auto p-0 text-destructive-foreground hover:text-destructive-foreground/80"
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Posts List */}
        {!loading && (
          <div className="space-y-3 sm:space-y-0">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-2">No posts yet.</p>
                <p className="text-muted-foreground">Be the first to create one!</p>
              </div>
            ) : (
              posts.map((post) => (
                <TrendingPostCard
                  key={post.id}
                  post={post}
                  onVote={() => handleVote(post.id)}
                  isVoting={isVoting[post.id] || false}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
