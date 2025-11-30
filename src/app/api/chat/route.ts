import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Cache for combined content
let contentCache: string | null = null;

// Experience data from landing page
const experiences = [
  {
    role: "Co-Founder & CTO",
    company: "Intelligent Food Solutions",
    companyUrl: "https://www.intelligentfoodsolutions.com/",
    date: "Sep 2025 - Present",
    description: "Building intelligent technology to redefine the food ecosystem. Leading development of MealCondo — an AI kitchen assistant designed for the modern home that transforms how people interact with food and cooking.",
    tags: ["Next.js", "React Native", "Expo", "NestJS", "FastAPI", "Python", "LLMs", "AWS S3", "Product Development"],
    products: [{ name: "MealCondo Android & iOS App", url: "https://onelink.to/wdckht" }, { name: "MealCondo Chef ", url: "https://www.mealcondo.com/chef" }],
  },
  {
    role: "Senior Backend Engineer",
    company: "MESiERE",
    companyUrl: "https://www.mesiere.com/",
    date: "Jul 2025 - Present",
    description: "Own and deliver end-to-end features across the stack. Architect scalable serverless backend systems powering high-traffic applications. Manage OpenAI API integrations for AI-powered features and AWS S3 for media storage infrastructure. Work cross-functionally with product, frontend, mobile, and QA teams to ship production-grade solutions.",
    tags: ["Serverless", "Hono.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS Lambda", "OpenAI API", "AWS S3"],
    products: [{ name: "DevotionHub", url: "https://devotionhub.com" }],
  },
  {
    role: "Chief Technology Officer",
    company: "Quick Leap",
    companyUrl: "https://www.quickleap.co/",
    date: "Jul 2024 - Present",
    description: "Lead technology strategy and engineering team. Built entire backend infrastructure and APIs from scratch. Manage cloud architecture, deployment pipelines, and operations ensuring 99.9% uptime. Drive technical vision while aligning engineering efforts with business objectives. Currently building blockchain-based token infrastructure.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Azure", "Solidity", "Hardhat"],
    products: [{ name: "QuickLeap Collaborator", url: "https://collaborator.quickleap.co/" }, { name: "QuickLeap Grow-for-Life", url: "https://www.quickleap.co/grow-for-life" }, { name: "QuickLeap Logistics", url: "https://logistics.quickleap.co/" }],
  },
  {
    role: "Lead Backend Engineer",
    company: "Dado Food",
    date: "Aug 2022 - Jul 2025 · 3 yrs",
    description: "Led engineering across backend, infrastructure, and internal tools for a logistics and commerce platform. Architected core systems including: wallet infrastructure for vendor sales and rider earnings; customer APIs for location-based discovery, real-time ordering, and multi-gateway payments; smart order routing with proximity-based rider assignment; vendor management APIs; and admin dashboard systems. Drove platform reliability, delivery efficiency, and user experience improvements across all stakeholder groups.",
    tags: ["NestJS", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Express.js", "TypeScript", "AWS S3"],
    achievements: [
      "Built wallet service handling financial transactions for vendors and riders",
      "Designed smart routing algorithm optimizing delivery assignments",
      "Led team building SmartMenu.ai product",
    ],
  },
  {
    role: "Backend Engineer",
    company: "Forcythe",
    companyUrl: "https://forcythe.com/",
    date: "Jan 2024 - Sep 2024",
    description: "Designed, developed, and maintained APIs powering Perime.co—a platform enabling users to explore and engage with the unique rhythm of any city. Built scalable backend systems supporting location-based features and real-time user interactions.",
    tags: ["NestJS", "TypeScript", "PostgreSQL"],
    products: [{ name: "Perime", url: "https://perime.co/" }],
  },
];

// Projects data from landing page
const projects = [
  {
    title: "MealCondo",
    role: "Co-Founder & CTO",
    description: "An AI-powered kitchen assistant designed for the modern home. Transforms how people interact with food and cooking through intelligent recipe suggestions, smart meal planning, intelligent shopping list, personalized nutrition guidance, e.t.c.",
    tags: ["Next.js", "Expo - React Native", "NestJS", "FastAPI", "LLMs", "AWS S3"],
    liveUrl: "https://www.mealcondo.com/",
  },
  {
    title: "DevotionHub",
    role: "Senior Backend Engineer",
    description: "A faith-based mobile platform connecting users with daily devotionals, worship music, and prayer communities. Features include personalized ministry feeds, Bible reading streaks, Prayer Room and Prayer Bank, podcast streaming, and verse of the day. Built on serverless architecture to serve a growing community with seamless performance and AI-powered content recommendations.",
    tags: ["Serverless", "Hono.js", "TypeScript", "PostgreSQL", "AWS Lambda", "OpenAI API", "AWS S3"],
    liveUrl: "https://devotionhub.com",
  },
  {
    title: "QuickLeap Platform",
    role: "Chief Technology Officer",
    description: "A comprehensive food and agriculture supply chain platform connecting producers, processors, and consumers. Built entire backend infrastructure from scratch including inventory management, order processing, and delivery logistics. Includes blockchain-based token system for transparent transactions.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Azure", "Solidity", "Hardhat"],
    liveUrl: "https://www.quickleap.co/",
  },
];

function formatExperiences(): string {
  return experiences.map(exp => {
    let text = `${exp.role} at ${exp.company}${exp.companyUrl ? ` (${exp.companyUrl})` : ''} - ${exp.date}\n${exp.description}`;
    if (exp.products && exp.products.length > 0) {
      text += `\nProducts: ${exp.products.map(p => `${p.name} (${p.url})`).join(', ')}`;
    }
    if (exp.achievements && exp.achievements.length > 0) {
      text += `\nKey Achievements: ${exp.achievements.join('; ')}`;
    }
    text += `\nTechnologies: ${exp.tags.join(', ')}`;
    return text;
  }).join('\n\n');
}

function formatProjects(): string {
  return projects.map(proj => {
    return `${proj.title} (${proj.liveUrl}) - ${proj.role}\n${proj.description}\nTechnologies: ${proj.tags.join(', ')}`;
  }).join('\n\n');
}

async function getCombinedContent(): Promise<string> {
  if (contentCache) {
    return contentCache;
  }

  try {
    // Read resume text
    const resumePath = path.join(process.cwd(), 'public', 'resume.txt');
    
    if (!fs.existsSync(resumePath)) {
      throw new Error('resume.txt not found in public folder');
    }
    
    const resumeText = fs.readFileSync(resumePath, 'utf-8').trim();
    const experienceText = formatExperiences();
    const projectsText = formatProjects();
    
    // Combine all sources
    contentCache = `RESUME CONTENT:\n${resumeText}\n\n\nWORK EXPERIENCE (from landing page):\n${experienceText}\n\n\nFEATURED PROJECTS (from landing page):\n${projectsText}`;
    
    return contentCache;
    
  } catch (error) {
    console.error('Error loading content:', error);
    throw new Error('Failed to load content. Please ensure resume.txt exists in public/ folder.');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Get combined content from resume.txt, Experience section, and Projects section
    const combinedContent = await getCombinedContent();

    // Get the model - using gemini-2.5-flash-lite (best for free tier: ~1,000 requests/day)
    // Alternative: gemini-2.5-flash (more intelligent, still good free tier)
    // Note: gemini-1.5-flash is deprecated/retired
    // Official docs: https://ai.google.dev/gemini-api/docs/models
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // Build the prompt
    const systemPrompt = `You are Bazz AI Assistant, the executive-level representative for Bezaleel Nwabia. Your communication style appeals to corporate executives, hiring managers, and high-net-worth clients.

Complete Information About Bezaleel (from multiple sources):
${combinedContent}

Your Personality & Communication Style:
- **Executive-level professionalism**: Speak with authority, confidence, and strategic insight
- **Results-oriented**: Focus on business impact, ROI, and measurable outcomes
- **Concise and direct**: No fluff - every word adds value. Be brief but comprehensive
- **Trustworthy and credible**: Use specific data, metrics, and concrete examples
- **Strategic thinking**: Connect technical expertise to business value
- **Polished and refined**: Professional tone that commands respect
- **Value-driven**: Always emphasize ROI, impact, and business outcomes

Communication Principles:
- Lead with value, not features
- Use business language executives understand
- Be specific: mention companies, revenue impact, team sizes, scale
- Show strategic thinking: how his work drives business goals
- Demonstrate ROI: time saved, costs reduced, revenue generated
- Highlight leadership: team building, decision-making, vision

Key Value Propositions to Emphasize:
- **Senior AI & Full Stack Engineer** - 5+ years delivering production systems
- **C-Level Leadership** - CTO/Co-Founder who builds companies from ground up
- **Strategic Technical Vision** - Aligns engineering with business objectives
- **Scalable Architecture** - Builds systems that handle growth and scale
- **Full-Stack Expertise** - Mobile, web, backend, cloud, AI/ML - end-to-end capability
- **Production-Grade Delivery** - Ships real products used by real users
- **Team Leadership** - Builds and leads engineering teams effectively

Response Formatting (IMPORTANT - Use Markdown):
- Format responses using Markdown for readability
- Use **bold** for key metrics, achievements, and value propositions
- Use bullet points (-) for lists - keep them concise
- Format links as [Project Name](https://url.com)
- Keep paragraphs short (1-2 sentences) - executives value brevity
- Use headings (###) only when necessary

Answering Strategy:
- **Be concise**: 2-3 sentences max per point. Executives value brevity
- **Lead with impact**: Start with business value, then technical details
- **Use metrics**: Mention scale, users, revenue impact when available
- **Show leadership**: Emphasize decision-making, team building, strategic vision
- **Connect to business**: Always link technical work to business outcomes
- **Be specific**: Actual companies, projects, technologies, results
- **Use all sources**: Reference information from Resume Content, Work Experience section, AND Projects section

Special Instructions:
- When mentioning projects, format links as [Project Name](https://url.com)
- Use specific examples from ALL sources: resume.txt, Experience section, and Projects section
- The Projects section has detailed descriptions - use those for richer project details
- The Experience section has achievements and products - reference those for comprehensive answers
- If information isn't available, politely redirect to relevant experience
- Keep responses brief (1-3 paragraphs) - executives are busy
- Use professional language: "Bezaleel delivers..." "His expertise includes..." "He has demonstrated..."
- Focus on outcomes, not just activities
- Make every response reflect executive-level value and strategic thinking`;

    // Build conversation context
    const conversationContext = conversationHistory
      .slice(-5) // Keep last 5 exchanges for context
      .map((msg: { role: string; content: string }) => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      )
      .join('\n');

    const fullPrompt = conversationContext 
      ? `${systemPrompt}\n\nPrevious conversation:\n${conversationContext}\n\nUser: ${message}\nAssistant:`
      : `${systemPrompt}\n\nUser: ${message}\nAssistant:`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      message: text,
      success: true 
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process chat message',
        success: false 
      },
      { status: 500 }
    );
  }
}
