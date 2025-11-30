This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 AI Features

This portfolio includes impressive AI-powered features:

- **🤖 Resume Chat**: Interactive AI chat that allows visitors to ask questions about your resume
- More AI features coming soon!

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Google Gemini API Key (Free tier available)
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
```

**Getting a Free Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env.local` file

**Note:** The free tier includes 15 requests per minute, which is perfect for a portfolio site.

### 3. Set Up Resume Text for AI Chat

The AI chat feature reads from a simple text file for reliability and performance.

**Create `public/resume.txt` with your resume content:**
1. Open your resume PDF
2. Copy all the text (Ctrl+A / Cmd+A, then Ctrl+C / Cmd+C)
3. Create `public/resume.txt` and paste the text
4. Save the file

**Note:** The `resume.pdf` file is still used for downloads (via the Resume button), but the AI chat uses `resume.txt` for faster, more reliable text access.

That's it! The system will automatically use it when someone uses the chat feature. 🎉

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Test the AI Chat:**
- Click the "AI Chat" button in the header or "Chat with AI" in the hero section
- Ask questions like "What are your skills?" or "Tell me about your experience"

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
