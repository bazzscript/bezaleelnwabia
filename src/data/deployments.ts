// Each deployment is written twice: once in plain English for clients,
// once in engineering terms for technical readers.

export type Deployment = {
  id: string;
  client: string;
  role: string;
  period: string;
  location: string;
  url?: string;
  image?: string;
  color: string;
  headline: string;
  problem: string;
  shipped: string[];
  outcome: string;
  tech: string[];
  engineering: string[];
};

export const deployments: Deployment[] = [
  {
    id: "seocondo",
    client: "Seocondo",
    role: "Co-founder · CTO · Product Engineer",
    period: "Present",
    location: "Remote",
    url: "https://seocondo.com/",
    color: "#7c5cff",
    headline: "Built Clara: an AI marketing agent that grows a brand across Google, AI search and app stores on her own.",
    problem:
      "Businesses know they need to show up on Google, in ChatGPT answers and in app stores, but writers are expensive, SEO is confusing, and nobody checks what's actually working. Tools either write content or report numbers — none do the work and learn from it.",
    shipped: [
      "\"Clara\" — an AI agent you can chat with, who plans the week, writes and fact-checks articles, fixes problems and reports back",
      "Autopilot: articles are researched, written and published on each brand's own schedule, with the owner approving Clara's plans",
      "Connects to Google Search Console, Analytics, Bing, Business Profile, Microsoft Clarity and page-speed data, then turns them into fixes",
      "Manages app stores and YouTube too: Play Console review replies and listing edits, App Store data and YouTube channel audits",
      "Tracks whether ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews mention the brand",
      "Links each brand's own products or recipes into articles, and remembers the owner's rules as \"lessons\"",
      "Credits and usage limits, subscriptions, an admin dashboard, and an npm package so customers show posts on their own website",
    ],
    outcome:
      "Live in production with active users. I designed and built the whole product, from the agent to billing, and MealCondo runs its own SEO on it.",
    tech: ["Next.js", "React", "Hono", "TypeScript", "Supabase", "Claude API", "Railway", "Paystack"],
    engineering: [
      "Next.js 16 dashboard as a thin client; all business logic in a standalone Hono API on Node, shared by web, mobile and third parties",
      "Clara as a tool-using agent on Claude (Opus/Sonnet/Haiku routed by task): server tools, a facts store, memory, a semantic index and prompt-cached deferred tools",
      "Multi-agent writing pipeline (keyword research → research → outline → writer → SEO → fact-check → images) run as async jobs with per-stage deadlines",
      "Channel framework: plan → execute → verify → measure, with per-channel autonomy and encrypted credentials for Play Console, App Store Connect, YouTube and Business Profile",
      "Search data: GSC + GA4 + Bing Webmaster + IndexNow + Clarity + CrUX/PageSpeed; indexing coverage, cannibalisation, pruning, redirects, schema and rank tracking",
      "Cost control: an AI meter priced from measured model costs, credits, daily limits and plan allowances; promptfoo evals for Clara",
      "In-process cron scheduler, Supabase Postgres with RLS, public site API with OpenAPI 3.1 and the @pengraph/node client; Paystack, Resend, Serper",
    ],
  },
  {
    id: "mealcondo",
    client: "MealCondo",
    role: "Co-founder · CTO · Product Engineer",
    period: "Sep 2025 — Present",
    location: "Abuja, Nigeria",
    url: "https://www.mealcondo.com/home",
    color: "#ff7a1a",
    headline: "MealCondo answers \"what should I cook today?\" for Nigerian homes. I built the whole product.",
    problem:
      "Most Nigerian home cooks lose time every day deciding what to cook, then shopping for it. Recipes are scattered across YouTube, TikTok and family WhatsApp chats, and the cooks and creators behind them rarely get paid.",
    shipped: [
      "Instant meal ideas: Nigerian and African recipes suggested by meal type, time, diet and what's already in your kitchen",
      "Step-by-step recipes with videos from chefs and creators, plus MealCondo's own studio kitchen",
      "Turn any cooking video into a recipe: share a TikTok, Instagram or YouTube link and get the ingredients and steps written out",
      "An AI kitchen assistant that answers cooking questions using only MealCondo's own recipes, so it doesn't make things up",
      "Weekly meal plans built around each person's diet and allergies, with a shopping list grouped by day, recipe or market aisle",
      "MealCondo Pro membership, with recipe creators paid a share of subscription revenue",
      "A separate app for chefs and creators, a website with news and guides, and an admin dashboard for the founders",
    ],
    outcome:
      "Live at mealcondo.com and on the App Store and Google Play with active users. As co-founder and CTO I designed and built all of it: the apps, the website, the backend and the AI.",
    tech: ["React Native", "Expo", "NestJS", "FastAPI", "Next.js", "PostgreSQL", "Redis", "LangChain", "RevenueCat", "AWS"],
    engineering: [
      "NestJS core API (Drizzle ORM, Postgres, Bull + Redis queues, Socket.io) with a separate import worker; FastAPI service for AI workloads",
      "Video-to-recipe pipeline: link ingestion, ffmpeg audio extraction, transcription and structured recipe extraction on queued workers",
      "Strict RAG with pgvector and context boundaries keeping the LLM on internal recipe data; manual AI-quality eval suite and budget guard",
      "FreshMeal: two-tower embedding recommender with weighted scoring, MMR diversity, session-based cold start and weekly retraining",
      "Constraint-bounded meal-plan generation (diet, allergens, spice, region, medical) with stage-by-stage pool diagnostics",
      "Subscriptions via RevenueCat + Paystack; creator royalty pools and payout batches; guest plans with idempotent claim on sign-up",
      "Expo apps with OTA updates, PostHog analytics + session replay; push campaigns via Expo; SES email; S3 media; Next.js site with ISR and structured data",
    ],
  },
  {
    id: "passoncology",
    client: "PassOncology",
    role: "Senior AI & Systems Engineer · Consultant",
    period: "2026",
    location: "London, UK (remote)",
    url: "https://passoncology.com/",
    color: "#e5486b",
    headline: "Rebuilt a paying product's foundations without switching it off.",
    problem:
      "A UK exam-prep company with paying users wanted mobile apps. Their web app was one tangled codebase, AI calls ran straight from the browser, and the support inbox was overflowing.",
    shipped: [
      "Split the product into clean pieces so web and mobile apps share one backend",
      "Moved all customer data to a new database while people were actively using and paying",
      "\"Michael\" — an AI support agent that reads incoming emails and drafts replies for a human to approve",
      "An AI study assistant that answers from verified oncology textbooks, with citations",
    ],
    outcome: "Tested and shipped to production in under two weeks, with no downtime for paying users.",
    tech: ["Hono", "FastAPI", "PostgreSQL", "Railway", "Supabase", "RAG", "Zoho Mail"],
    engineering: [
      "Monolithic Next.js → Hono core API + FastAPI AI microservice for multi-client support",
      "Supabase → Railway Postgres migration scripts preserving user state and transactions",
      "Email agent: intent parsing against skill files, draft-to-inbox, idempotent DB tracking",
      "Textbook RAG with metadata grounding and precise in-text citations",
      "End-to-end test suites across web, API and microservice layers",
    ],
  },
  {
    id: "devotionhub",
    client: "DevotionHub",
    role: "Senior Backend Engineer · Mesiere",
    period: "Jul 2025 — Jun 2026",
    location: "London, UK (remote)",
    url: "https://www.devotionhub.com/",
    color: "#2f9e8f",
    image: "/projects/devotionhub.png",
    headline: "Kept a growing content platform fast, safe and always on.",
    problem:
      "A content platform was growing quickly. Releases were slow, live features needed to feel instant, and user-submitted content needed checking before it went live.",
    shipped: [
      "Kept the platform running 99.9% of the time under heavy use",
      "Cut the time from idea to live feature by 30% in three months",
      "AI that turns text into audio and reviews documents automatically",
      "An AI gatekeeper that checks user content against the rules before it's saved",
    ],
    outcome: "Faster releases, real-time features, and automated content safety.",
    tech: ["SST", "AWS Lambda", "WebSockets", "OpenAI", "TypeScript"],
    engineering: [
      "Scaled SST/Lambda serverless backend at 99.9% uptime",
      "Modularised coupled service layers; 30% faster feature-to-prod",
      "WebSocket microservices for concurrent real-time sync",
      "OpenAI pipelines: TTS, metadata extraction, multi-doc review; async validation layer pre-insert",
    ],
  },
  {
    id: "dadofood",
    client: "Dadofood",
    role: "Backend Engineer",
    period: "Aug 2022 — Jul 2025",
    location: "Enugu, Nigeria",
    url: "https://dado.ng/",
    color: "#1f8f4e",
    headline: "Built the money and delivery engine for a food delivery company.",
    problem:
      "A delivery business needed orders sent to the nearest rider, wallets and payouts for many parties, and a system that didn't slow down at lunchtime rush.",
    shipped: [
      "Automatic dispatch that sends each order to the closest available rider",
      "A wallet and payments ledger handling over 5 million transaction cycles a month",
      "Fixed rush-hour slowdowns — database response spikes dropped by 60%",
      "Backends for the customer app, vendor dashboards and the internal admin panel",
    ],
    outcome: "Reliable money movement and faster deliveries at peak volume.",
    tech: ["PostgreSQL", "Node.js", "Geospatial", "Ledgers"],
    engineering: [
      "Proximity-based geospatial routing engine for real-time dispatch",
      "Multi-party wallet ledger; 5M+ monthly transaction cycles",
      "Composite indexes removing row-level lock contention; −60% latency spikes",
    ],
  },
  {
    id: "quickleap",
    client: "Quickleap",
    role: "Lead Software Engineer",
    period: "Jul 2024 — Jan 2026",
    location: "Lagos, Nigeria",
    color: "#2f6bff",
    image: "/projects/quickleap.png",
    headline: "Led engineering across three businesses at once.",
    problem:
      "One team was running logistics, fintech and B2B commerce products, on cloud hosting that cost more than it should.",
    shipped: [
      "Set the technical direction for all three product lines",
      "Moved everything from Azure to Railway with automated deployments",
    ],
    outcome: "Lower hosting costs and a team that could ship on its own.",
    tech: ["Azure", "Railway", "CI/CD", "Node.js"],
    engineering: [
      "Technical direction for 3 business categories aligned to 6-month growth targets",
      "Azure → Railway platform migration with automated CI/CD",
    ],
  },
  {
    id: "forcythe",
    client: "Forcythe · Perime",
    role: "Backend Engineer",
    period: "Jan 2024 — Sep 2024",
    location: "Lagos, Nigeria",
    url: "https://perime.co/",
    color: "#c2410c",
    headline: "Location and ticketing backends for a city events platform.",
    problem: "An events app needed map-based search, venue routing and a safe way to hold ticket money.",
    shipped: [
      "Location search and routing APIs for the Perime platform",
      "Wallets that store and pay out ticket revenue cleanly to each party",
    ],
    outcome: "People could find events nearby, and organisers got paid correctly.",
    tech: ["REST APIs", "Geospatial", "Wallets"],
    engineering: ["High-volume geospatial REST APIs", "Ticket wallet microservices with role-based accounting separation"],
  },
];
