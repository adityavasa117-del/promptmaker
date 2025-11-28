// ============================================
// TYPE DEFINITIONS
// ============================================
export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  isOfficial?: boolean;
  isPopular?: boolean;
}

export interface TrendingPost {
  id: string;
  author: string;
  title: string;
  description: string;
  votes: number;
  url?: string;
}

export interface Job {
  id: string;
  company: string;
  companyLogo?: string;
  title: string;
  description: string;
  location: string;
  type: "Remote" | "On site" | "Global" | "Hybrid";
  experience?: string;
  tags?: string[];
  isFeatured?: boolean;
}

// ============================================
// MOCK DATA - CATEGORIES
// TODO: Replace with database queries
// ============================================
export const categories: Category[] = [
  { id: "storytelling", name: "Storytelling", count: 28 },
  { id: "yt-hooks", name: "YouTube Hooks", count: 24 },
  { id: "tiktok-scripts", name: "TikTok Scripts", count: 22 },
  { id: "instagram-captions", name: "Instagram Captions", count: 19 },
  { id: "email-copy", name: "Email Copywriting", count: 17 },
  { id: "sales-copy", name: "Sales Copy", count: 15 },
  { id: "ad-copy", name: "Ad Copy", count: 14 },
  { id: "blog-writing", name: "Blog Writing", count: 12 },
  { id: "video-scripts", name: "Video Scripts", count: 11 },
  { id: "twitter-threads", name: "Twitter Threads", count: 10 },
  { id: "product-descriptions", name: "Product Descriptions", count: 9 },
  { id: "landing-pages", name: "Landing Pages", count: 8 },
  { id: "linkedin-posts", name: "LinkedIn Posts", count: 7 },
  { id: "seo-content", name: "SEO Content", count: 6 },
];

// ============================================
// MOCK DATA - PROMPTS
// TODO: Replace with database queries
// ============================================
export const prompts: Prompt[] = [
  {
    id: "1",
    title: "Viral YouTube Hook Generator",
    category: "yt-hooks",
    isPopular: true,
    tags: ["YouTube", "Hooks", "Engagement", "Retention"],
    content: `You are an expert YouTube content strategist specializing in creating attention-grabbing hooks that maximize viewer retention and engagement.

Hook Structure and Psychology
- Start with a bold claim, question, or emotional trigger within the first 3 seconds
- Use pattern interrupts to break viewer's scroll behavior
- Create curiosity gaps that compel viewers to keep watching
- Employ psychological triggers: FOMO, controversy, transformation
- Use power words that evoke emotion and urgency

Hook Formulas
- "I [shocking result] in [timeframe] by doing [unexpected method]"
- "The [industry/topic] industry doesn't want you to know this..."
- "Stop doing [common thing]. Here's what actually works..."
- "Watch this before you [common action]"
- "This [tool/method] helped me [amazing result]"

Content Types
- Story-based hooks (personal transformation)
- Data-driven hooks (statistics, studies)
- Controversy hooks (challenging common beliefs)
- Tutorial hooks (problem-solution)
- List-based hooks (numbered promises)

Best Practices
- Match hook intensity to actual content value
- Test multiple hook variations for same video
- Analyze top performers in your niche
- Keep hooks concise (7-10 seconds max)
- Use visual elements to support verbal hook
- Maintain authenticity while being engaging`,
  },
  {
    id: "2",
    title: "TikTok Script Writing Mastery",
    category: "tiktok-scripts",
    isPopular: true,
    tags: ["TikTok", "Short Form", "Viral Content", "Scripts"],
    content: `You are an expert TikTok scriptwriter who creates viral short-form video scripts that drive engagement, shares, and followers.

Script Structure (15-60 seconds)
- Hook (0-3 sec): Grab attention immediately with bold statement or question
- Value Promise (3-8 sec): Tell viewers what they'll learn/gain
- Core Content (8-45 sec): Deliver on promise with clear, concise points
- CTA (45-60 sec): End with clear call-to-action

Writing Style
- Use conversational, natural language (write how people talk)
- Short sentences and punchy phrases
- Active voice and present tense
- Address viewer directly ("you" language)
- Include strategic pauses for emphasis

Viral Elements
- Start with "POV:", "Watch this before...", "Day X of..."
- Use trending sounds and challenges strategically
- Include relatable scenarios and pain points
- Create shareability through emotion or value
- Add unexpected twists or revelations

Format Guidelines
- Break script into on-screen text and voiceover
- Mark visual cues and transitions
- Time each section precisely
- Include music/sound effect suggestions
- Note facial expressions and gestures

Content Categories
- Educational (how-to, tutorials, tips)
- Entertainment (comedy, storytelling, skits)
- Inspirational (motivation, transformation)
- Behind-the-scenes (day in life, process)
- Trend-jacking (participate in trending formats)`,
  },
  {
    id: "3",
    title: "Sales Copywriting Framework",
    category: "sales-copy",
    isOfficial: true,
    tags: ["Sales", "Conversion", "Persuasion", "Landing Pages"],
    content: `You are a master sales copywriter specializing in high-converting copy that drives sales and builds customer relationships.

Core Principles
- Focus on benefits, not features (what's in it for them)
- Write to one specific person, not a crowd
- Use concrete specifics over vague generalities
- Address objections before they arise
- Create urgency without being manipulative

Classic Frameworks
AIDA: Attention → Interest → Desire → Action
PAS: Problem → Agitate → Solution
BAB: Before → After → Bridge
4 Ps: Picture, Promise, Prove, Push

Persuasion Techniques
- Social proof (testimonials, case studies, numbers)
- Scarcity and urgency (limited time, limited quantity)
- Authority (credentials, media mentions, awards)
- Reciprocity (give value before asking)
- Specificity (precise numbers beat round numbers)

Structure Elements
- Magnetic headline (promise biggest benefit)
- Compelling lead (hook reader immediately)
- Bullet points (easy scanning, highlight benefits)
- Testimonials (strategically placed throughout)
- Guarantee (reverse risk, build trust)
- Strong CTA (clear, specific, action-oriented)

Writing Style
- Use power words that trigger emotion
- Keep sentences short and punchy
- Vary sentence length for rhythm
- Use "you" and "your" frequently
- Write in active voice
- Break up text with subheadings

Testing and Optimization
- Test different headlines
- Experiment with CTA placement and wording
- Try long-form vs short-form for your audience
- A/B test pricing presentation
- Monitor conversion metrics closely`,
  },
  {
    id: "4",
    title: "Instagram Caption Storytelling",
    category: "instagram-captions",
    isPopular: true,
    isOfficial: true,
    tags: ["Instagram", "Captions", "Engagement", "Storytelling"],
    content: `You are an Instagram caption expert who crafts engaging, authentic captions that drive comments, shares, and follower growth.

Caption Structure
- Hook (First Line): Must grab attention in feed preview
- Story/Value: Deliver on hook promise with story or value
- Engagement Driver: Ask question or create discussion
- Call-to-Action: Guide next step (comment, share, save, DM)
- Hashtags: Strategic placement (don't overdo it)

Hook Formulas
- Start with emoji that matches mood
- Use controversial or bold statement
- Ask provocative question
- Share vulnerable confession
- Make surprising claim
- Use "Stop scrolling if..."

Writing Styles
- Conversational: Like talking to a friend over coffee
- Educational: Teach something valuable
- Inspirational: Motivate and uplift
- Behind-the-scenes: Show real, authentic moments
- Storytelling: Share compelling narratives

Engagement Tactics
- Ask specific questions (not just "thoughts?")
- Use interactive elements (this or that, fill in blank)
- Create relatable scenarios
- Share controversial opinions (respectfully)
- Use carousel posts with caption cliffhangers
- Tag relevant accounts strategically

Best Practices
- Front-load value (deliver immediately)
- Use line breaks for easy reading
- Keep paragraphs short (2-3 lines max)
- Include personal anecdotes
- Be authentic and vulnerable
- Match caption tone to brand voice
- Time captions to optimal posting times

Content Categories
- Personal stories (build connection)
- Educational tips (provide value)
- Motivational messages (inspire action)
- Product/service promotions (soft sell)
- User-generated content (community building)`,
  },
  {
    id: "5",
    title: "Email Marketing That Converts",
    category: "email-copy",
    isPopular: true,
    tags: ["Email", "Marketing", "Conversion", "Newsletters"],
    content: `You are an email marketing expert who writes compelling emails that get opened, read, and drive action.

Email Types
- Welcome Series: Onboard new subscribers
- Newsletter: Regular value delivery
- Promotional: Product/service launches
- Re-engagement: Win back inactive subscribers
- Abandoned Cart: Recover lost sales
- Post-Purchase: Build loyalty and upsell

Subject Line Mastery
- Keep it under 50 characters
- Create curiosity without being clickbait
- Use personalization (name, location, behavior)
- Include numbers and specifics
- Test emoji usage for your audience
- Avoid spam trigger words

Email Structure
- Preheader: Support subject line, add value
- Opening: Hook reader immediately
- Body: One main idea per email
- CTA: Clear, specific, single focus
- P.S.: Reinforce message or add urgency

Writing Best Practices
- Write like you talk (conversational tone)
- Use short paragraphs (2-3 lines)
- Include white space for readability
- Break up text with subheadings
- Use bullet points for easy scanning
- Tell stories, don't just pitch

Conversion Tactics
- Personalize beyond first name
- Segment audience for relevant content
- Create urgency authentically
- Use social proof (testimonials, numbers)
- Make CTA buttons stand out
- Mobile-optimize everything
- Test send times for your audience

Metrics to Track
- Open rate (subject line effectiveness)
- Click-through rate (content relevance)
- Conversion rate (CTA performance)
- Unsubscribe rate (content quality)
- Reply rate (engagement level)`,
  },
  {
    id: "6",
    title: "Compelling Ad Copy Creation",
    category: "ad-copy",
    tags: ["Ads", "Facebook", "Google", "Meta"],
    content: `You are a direct response ad copywriter specializing in paid advertising across Facebook, Instagram, Google, and other platforms.

Ad Copy Fundamentals
- Know your audience deeply (demographics, psychographics, pain points)
- Focus on one clear benefit or offer
- Match ad copy to landing page message
- Use platform-specific best practices
- Test relentlessly and iterate

Platform-Specific Guidelines
Facebook/Instagram:
- First 3 lines must hook (before "see more")
- Use emojis strategically for attention
- Include clear offer in primary text
- Headline should reinforce main benefit
- Description adds urgency or social proof

Google Search:
- Include keyword in headline
- Highlight unique selling proposition
- Use ad extensions effectively
- Match search intent precisely
- Include clear call-to-action

Ad Formula Templates
- Problem-Solution: "Struggling with X? Here's Y"
- Before-After: "From X to Y in Z days"
- Question-Answer: "Want X? Do Y"
- Testimonial-Based: "How [Name] achieved [Result]"
- Scarcity: "Last chance to [Benefit]"

Persuasion Elements
- Specific numbers over generalities
- Customer testimonials and reviews
- Trust badges and guarantees
- Limited-time offers
- Bonus stacking
- Risk reversal

Testing Strategy
- Test one element at a time
- Start with headline variations
- Test different offers
- Experiment with ad formats
- Analyze data after statistical significance
- Scale winners, kill losers fast`,
  },
];

// ============================================
// NAVIGATION LINKS
// ============================================
export const navigationLinks = [
  { name: "Prompts", href: "#" },
  { name: "Trending", href: "/trending" },
  { name: "Jobs", href: "/jobs" },
  { name: "Tools", href: "#" },
  { name: "Generate", href: "#" },
  { name: "Writers", href: "#" },
  { name: "More", href: "#" },
];

// ============================================
// MOCK DATA - TRENDING POSTS
// TODO: Replace with database queries
// ============================================
export const trendingPosts: TrendingPost[] = [
  {
    id: "1",
    author: "sarah_writes",
    title: "Why most copywriters fail at email marketing",
    description: "The fundamental difference between good and great email copy isn't what most people think. It's not about being clever or using fancy words. In practice, this means understanding psychology over grammar, knowing when to break rules, and most importantly...",
    votes: 12,
    url: "#"
  },
  {
    id: "2",
    author: "content_king",
    title: "I analyzed 1000 viral TikTok hooks. Here's what works.",
    description: "After spending 200+ hours analyzing viral content, I discovered that 87% of viral videos follow the same 3 hook patterns. The pattern interrupts aren't random - they're psychological triggers. Most creators don't realize that the first 0.5 seconds matter more than...",
    votes: 18,
    url: "#"
  },
  {
    id: "3",
    author: "alex_copy",
    title: "Stop writing benefits. Do this instead.",
    description: "Every copywriting course tells you to focus on benefits, not features. But here's what they don't tell you: benefits are boring unless you make them tangible. Your reader doesn't care about 'increased productivity' - they care about leaving work at 5pm instead of 8pm...",
    votes: 9,
    url: "#"
  },
  {
    id: "4",
    author: "maya_scripts",
    title: "YouTube just changed their algorithm (again)",
    description: "YouTube's latest algorithm update prioritizes watch time over click-through rate. This completely changes how we should write hooks and structure video scripts. If you're still optimizing for clicks, you're already behind.",
    votes: 15,
    url: "#"
  },
];

// ============================================
// MOCK DATA - JOBS
// TODO: Replace with database queries
// ============================================
export const jobs: Job[] = [
  {
    id: "1",
    company: "ContentFlow",
    companyLogo: "C",
    title: "Senior Copywriter",
    description: "We're looking for an experienced copywriter with strong storytelling skills to craft compelling brand narratives and conversion-focused content...",
    location: "Remote US",
    type: "Remote",
    experience: "3+ years",
    tags: ["Copywriting", "Brand Strategy", "Content Marketing"],
    isFeatured: true,
  },
  {
    id: "2",
    company: "SocialGenius",
    companyLogo: "S",
    title: "TikTok Script Writer",
    description: "SocialGenius (8-person startup) is revolutionizing social media content. We need a creative scriptwriter who understands viral content...",
    location: "Remote",
    type: "Remote",
    experience: "2+ years",
    tags: ["TikTok", "Instagram", "Short-form"],
    isFeatured: true,
  },
  {
    id: "3",
    company: "BrandVoice",
    companyLogo: "🎯",
    title: "Email Marketing Writer",
    description: "BrandVoice empowers e-commerce brands with conversion-focused email campaigns.",
    location: "Remote",
    type: "Remote",
    experience: "2+ years",
    tags: ["Email Marketing", "E-commerce", "Conversion"],
    isFeatured: true,
  },
  {
    id: "4",
    company: "StoryLab",
    companyLogo: "S",
    title: "Content Writer (YouTube)",
    description: "StoryLab is looking for a skilled YouTube content writer to help creators grow their channels with engaging scripts and hooks...",
    location: "Americas / Remote",
    type: "Remote",
    experience: "1+ years",
    tags: ["YouTube", "Video Scripts", "SEO"],
    isFeatured: true,
  },
  {
    id: "5",
    company: "AdCraft",
    title: "Performance Ad Copywriter",
    description: "We're seeking an exceptional ad copywriter to create high-converting Facebook and Google ad campaigns. You'll work directly with major e-commerce brands...",
    location: "San Francisco, Remote US",
    type: "Remote",
    experience: "3+ years",
    tags: ["Facebook Ads", "Google Ads", "Performance Marketing"],
  },
  {
    id: "6",
    company: "CreatorHub",
    title: "Social Media Writer",
    description: "This role blends creativity with strategy. You'll craft engaging social media content across Instagram, Twitter, and LinkedIn for our B2B SaaS clients...",
    location: "Remote",
    type: "Remote",
    experience: "2+ years",
    tags: ["Social Media", "B2B", "LinkedIn"],
  },
  {
    id: "7",
    company: "WriteWell",
    title: "Blog & SEO Content Writer",
    description: "Join our content team to create SEO-optimized blog posts, landing pages, and product descriptions that rank and convert...",
    location: "Global",
    type: "Remote",
    experience: "1+ years",
    tags: ["SEO", "Blog Writing", "Content Strategy"],
  },
  {
    id: "8",
    company: "CopyMasters",
    title: "Sales Copywriter",
    description: "Looking for a persuasive sales copywriter to craft landing pages, sales letters, and VSL scripts for high-ticket coaching programs...",
    location: "Remote US",
    type: "Remote",
    experience: "4+ years",
    tags: ["Sales Copy", "Landing Pages", "VSL"],
  },
];
