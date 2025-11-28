"use client";

import { Header } from "@/components/header";
import { 
  Sparkles, 
  TrendingUp, 
  Search, 
  Zap, 
  Shield, 
  Clock,
  BookOpen,
  Globe,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative mx-auto max-w-[1200px] px-6 py-20 sm:py-28 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/50 px-4 py-1.5 text-sm text-muted-foreground mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              Welcome to writers.directory
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Your Gateway to
              <span className="block text-primary mt-2">Intelligent Productivity</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Discover curated prompts, stay updated with trending content, and supercharge your 
              daily workflows — all without the noise of social media.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <Link href="/">
                <Button className="rounded-full px-6 py-3 text-base font-semibold gap-2">
                  Explore Prompts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/trending">
                <Button variant="outline" className="rounded-full px-6 py-3 text-base font-semibold">
                  View Trending
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Everything You Need, One Place
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We've built a comprehensive platform to help you work smarter, not harder.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1: Prompts */}
              <div className="group relative rounded-2xl border border-border/50 bg-surface/30 p-8 transition-all hover:border-primary/30 hover:bg-surface/50">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Curated Prompt Library
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access thousands of carefully curated prompts across various categories. 
                  From coding assistance to creative writing, find the perfect prompt for any task.
                </p>
              </div>

              {/* Feature 2: Trending */}
              <div className="group relative rounded-2xl border border-border/50 bg-surface/30 p-8 transition-all hover:border-primary/30 hover:bg-surface/50">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Trending Content Hub
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stay informed with trending posts from across the internet, curated and 
                  presented without the distractions of social media feeds.
                </p>
              </div>

              {/* Feature 3: Tools */}
              <div className="group relative rounded-2xl border border-border/50 bg-surface/30 p-8 transition-all hover:border-primary/30 hover:bg-surface/50">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Powerful Tools
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Explore our collection of MCP tools and integrations that enhance your 
                  AI-powered workflows and boost productivity.
                </p>
              </div>

              {/* Feature 4: Search */}
              <div className="group relative rounded-2xl border border-border/50 bg-surface/30 p-8 transition-all hover:border-primary/30 hover:bg-surface/50">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Smart Search
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find exactly what you need with our intelligent search. Filter by category, 
                  popularity, or dive into specific topics effortlessly.
                </p>
              </div>

              {/* Feature 5: Focus */}
              <div className="group relative rounded-2xl border border-border/50 bg-surface/30 p-8 transition-all hover:border-primary/30 hover:bg-surface/50">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Distraction-Free
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  No ads, no algorithmic manipulation, no endless scrolling. Get the information 
                  you need and get back to what matters.
                </p>
              </div>

              {/* Feature 6: Time */}
              <div className="group relative rounded-2xl border border-border/50 bg-surface/30 p-8 transition-all hover:border-primary/30 hover:bg-surface/50">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Save Time
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stop wasting hours crafting prompts from scratch. Use our tested, optimized 
                  prompts to get better results in less time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 sm:py-28 border-t border-border/50 bg-surface/20">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Getting started is simple. Here's how you can make the most of our platform.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Prompts Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Using Prompts
                  </h3>
                </div>
                
                <div className="space-y-4 pl-14">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Browse Categories:</span> Navigate through 
                      our organized categories in the sidebar to find prompts that match your needs.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Search & Filter:</span> Use the search bar 
                      to find specific prompts, or filter by popular and official prompts.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Copy & Use:</span> Simply click on any prompt 
                      to copy it, then paste it into your AI tool of choice — ChatGPT, Claude, or any other.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Integrate Daily:</span> Bookmark your favorite 
                      prompts and integrate them into your daily workflow for consistent productivity gains.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trending Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Staying Updated
                  </h3>
                </div>
                
                <div className="space-y-4 pl-14">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Visit Trending:</span> Head to the Trending 
                      section to see the most popular and relevant content from across the web.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">No Social Media Noise:</span> We curate content 
                      from multiple sources so you don't have to scroll through endless feeds.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Focus on Quality:</span> Every trending post 
                      is selected for its value and relevance, saving you from distractions.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Stay Informed:</span> Keep up with industry 
                      news, AI developments, and productivity tips — all in one distraction-free environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Benefits Section */}
        <section className="py-20 sm:py-28 border-t border-border/50">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm text-green-500 mb-6">
                  <Globe className="h-4 w-4" />
                  Trending Section
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Stay Informed Without
                  <span className="block text-green-500">Social Media Distractions</span>
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Social media platforms are designed to keep you scrolling endlessly. Our Trending 
                  section aggregates the best content from across the internet, presenting it in a 
                  clean, focused format that respects your time and attention.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Curated content from trusted sources</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">No algorithmic manipulation or ads</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Focus on what actually matters to you</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Get informed in minutes, not hours</span>
                  </li>
                </ul>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-border/50 bg-surface/30 p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/30">
                      <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-500" />
                      <div className="flex-1">
                        <div className="h-4 w-3/4 rounded bg-foreground/10 mb-2" />
                        <div className="h-3 w-full rounded bg-muted-foreground/10" />
                        <div className="h-3 w-2/3 rounded bg-muted-foreground/10 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/30">
                      <div className="h-10 w-10 rounded-lg bg-linear-to-br from-green-500 to-teal-500" />
                      <div className="flex-1">
                        <div className="h-4 w-2/3 rounded bg-foreground/10 mb-2" />
                        <div className="h-3 w-full rounded bg-muted-foreground/10" />
                        <div className="h-3 w-1/2 rounded bg-muted-foreground/10 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/30">
                      <div className="h-10 w-10 rounded-lg bg-linear-to-br from-orange-500 to-red-500" />
                      <div className="flex-1">
                        <div className="h-4 w-4/5 rounded bg-foreground/10 mb-2" />
                        <div className="h-3 w-full rounded bg-muted-foreground/10" />
                        <div className="h-3 w-3/4 rounded bg-muted-foreground/10 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 inset-0 bg-linear-to-r from-green-500/20 to-blue-500/20 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 border-t border-border/50 bg-linear-to-b from-surface/30 to-background">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join thousands of users who have transformed their workflow with our curated 
              prompts and distraction-free trending content.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/">
                <Button className="rounded-full px-8 py-3 text-base font-semibold gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/trending">
                <Button variant="outline" className="rounded-full px-8 py-3 text-base font-semibold">
                  Explore Trending
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="mx-auto max-w-[1200px] px-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} writers.directory. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
