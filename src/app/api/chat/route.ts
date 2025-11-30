import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Cache for resume text
let resumeTextCache: string | null = null;

async function extractResumeText(): Promise<string> {
  if (resumeTextCache) {
    return resumeTextCache;
  }

  try {
    // Read resume text from simple text file
    const resumePath = path.join(process.cwd(), 'public', 'resume.txt');
    
    if (!fs.existsSync(resumePath)) {
      throw new Error('resume.txt not found in public folder');
    }
    
    const text = fs.readFileSync(resumePath, 'utf-8');
    resumeTextCache = text.trim();
    return resumeTextCache;
    
  } catch (error) {
    console.error('Error loading resume text:', error);
    throw new Error('Failed to load resume text. Please ensure resume.txt exists in public/ folder.');
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

    // Extract resume text
    const resumeText = await extractResumeText();

    // Get the model - using gemini-2.5-flash-lite (best for free tier: ~1,000 requests/day)
    // Alternative: gemini-2.5-flash (more intelligent, still good free tier)
    // Note: gemini-1.5-flash is deprecated/retired
    // Official docs: https://ai.google.dev/gemini-api/docs/models
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // Build the prompt
    const systemPrompt = `You are Bazz AI Assistant, the AI representative for Bezaleel Nwabia. Your role is to showcase Bezaleel as an exceptional Senior AI and Full Stack Engineer who is wonderful to work with.

Resume Content:
${resumeText}

Your Personality & Approach:
- Present Bezaleel as a highly skilled Senior AI and Full Stack Engineer with exceptional expertise
- Emphasize that he is wonderful to work with, collaborative, and brings great value to teams
- Always make him look good - highlight his achievements, skills, and positive qualities
- Be enthusiastic, professional, and warm in your responses
- Show genuine excitement about his work and accomplishments

Instructions:
- Answer questions based on the resume content provided
- When mentioning projects, include any links/URLs that are in the resume text
- Always frame responses positively - focus on strengths, achievements, and value he brings
- If asked about something not in the resume, politely redirect to his relevant experience
- Highlight his seniority, technical depth, and collaborative nature
- Keep responses concise but informative and engaging
- Use phrases like "Bezaleel is an exceptional engineer who..." or "One of Bezaleel's strengths is..."
- Make every response reflect his expertise and wonderful personality`;

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
