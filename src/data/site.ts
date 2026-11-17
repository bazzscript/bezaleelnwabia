// Everything personal lives here. Edit this file to update the site.

export const site = {
  name: "Bezaleel Nwabia",
  fullName: "Chukwuemeka Bezaleel Nwabia",
  firstName: "Bezaleel",
  role: "AI Engineer · AI Solutions · Forward Deployed",
  tagline: "I build AI agents, voice assistants and RAG systems that run in production, working with your team until they solve the real problem.",
  location: "Enugu, Nigeria",
  timezone: "Africa/Lagos",
  timezoneLabel: "WAT · GMT+1",
  email: "bez.nwabia@gmail.com",
  phone: "+234 906 114 7343",
  url: "https://bezaleelnwabia.vercel.app",
  birth: { year: 2000, month: 2 }, // February 2000
  links: {
    linkedin: "https://www.linkedin.com/in/bezaleel-nwabia",
    github: "https://github.com/bazzscript",
    x: "", // add your X/Twitter URL to show it
  },
  // Your cal.com link, e.g. "bezaleel/intro". Leave empty to show the email fallback.
  calLink: "",
  availability: {
    open: true,
    label: "Open to full-time AI roles",
    detail: "AI, forward deployed and AI solutions engineering · 1 consulting slot open",
  },
  engagementModes: ["Full-time", "Consulting", "Part-time"],
};

export function age(now = new Date()) {
  const { year, month } = site.birth;
  let a = now.getFullYear() - year;
  if (now.getMonth() + 1 < month) a -= 1;
  return a;
}

export const stats = [
  { value: "3", label: "AI products I co-founded and built, all running in production" },
  { value: "24/7", label: "AI chat and voice agents booking real guests on WhatsApp and phone calls" },
  { value: "525", label: "behaviour tests proving a live product rebuilt into Go and Python works the same" },
  { value: "2 wks", label: "to move a live, paying product to a new database without downtime" },
];

export const stack = {
  "AI & data": ["AI agents & tool calling", "Voice agents", "Claude API", "OpenAI", "RAG pipelines", "LangChain", "Embeddings & ranking", "Vector search", "Evals"],
  Backend: ["TypeScript", "Python", "NestJS", "FastAPI", "Hono", "Node.js", "Go"],
  "Web & mobile": ["Next.js", "React", "React Native", "Expo"],
  Data: ["PostgreSQL", "pgvector", "Redis", "MongoDB", "Supabase"],
  Cloud: ["AWS (Lambda, S3, RDS)", "SST", "Docker", "Railway", "Vercel", "GitHub Actions"],
};
