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
    role: "Co-founder · CTO · Lead Engineer",
    period: "Present",
    location: "Remote",
    url: "https://seocondo.com/",
    color: "#7c5cff",
    headline: "Building a company from the first line of code.",
    problem:
      "A new company needs one person who can turn the founders' idea into a product, pick the right technology, and keep it running.",
    shipped: [
      "Own the product's technical direction as co-founder",
      "Lead engineering from architecture to launch",
    ],
    outcome: "Case study coming soon.",
    tech: ["Leadership", "Architecture", "Product"],
    engineering: ["Details coming soon."],
  },
  {
    id: "mealcondo",
    client: "MealCondo",
    role: "Co-founder · CTO · Intelligent Food Solutions",
    period: "Sep 2025 — Present",
    location: "Abuja, Nigeria",
    url: "https://www.mealcondo.com/home",
    color: "#ff7a1a",
    headline: "Built a whole food-tech company's software as its only engineer.",
    problem:
      "A food startup needed everything at once: apps for customers and chefs, a website, an admin portal, and an AI assistant that wouldn't make things up.",
    shipped: [
      "4 iPhone & Android apps — one experience for home cooks, another for professional chefs",
      "An AI kitchen assistant that only answers from MealCondo's own recipes and market data",
      "Personalised weekly meal plans for paying members, built around each person's diet",
      "A recommendation engine that learns what each user likes, even before they sign up",
      "A leadership dashboard so the founders can see what's happening on the platform live",
    ],
    outcome: "The full product is live at mealcondo.com, run end to end by one engineer.",
    tech: ["React Native", "Expo", "NestJS", "FastAPI", "LangChain", "AWS S3", "Cloudinary"],
    engineering: [
      "NestJS core for transactional logic + isolated FastAPI service for async AI workloads",
      "Deterministic RAG with context boundaries restricting the LLM to internal recipe/market data",
      "FreshMeal: two-tower embedding recommender, weighted scoring + MMR diversity, session-based cold start",
      "Constraint-bounded meal-plan generation from platform-wide nutrition metadata",
      "S3 + Cloudinary CDN media pipeline; RBAC admin API with audit logs",
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
