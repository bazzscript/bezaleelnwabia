// Everything personal lives here. Edit this file to update the site.

export const site = {
  name: "Bezaleel Nwabia",
  fullName: "Chukwuemeka Bezaleel Nwabia",
  firstName: "Bezaleel",
  role: "Forward Deployed Engineer",
  tagline: "I embed with your team, find the real problem, and ship the software that fixes it.",
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
    label: "Taking new deployments",
    detail: "1 consulting slot open · open to full-time & part-time roles",
  },
  engagementModes: ["Consulting", "Part-time", "Full-time"],
};

export function age(now = new Date()) {
  const { year, month } = site.birth;
  let a = now.getFullYear() - year;
  if (now.getMonth() + 1 < month) a -= 1;
  return a;
}

export const stats = [
  { value: "5M+", label: "payment cycles a month on a wallet system I built" },
  { value: "99.9%", label: "uptime on a serverless platform I scaled" },
  { value: "2 wks", label: "to move a live, paying product to a new database" },
  { value: "4", label: "mobile apps shipped as a startup CTO" },
];

export const stack = {
  "AI & data": ["RAG pipelines", "LangChain", "Embeddings & ranking", "OpenAI", "AI agents", "Vector search"],
  Backend: ["TypeScript", "Python", "NestJS", "FastAPI", "Hono", "Node.js", "Go (familiar)"],
  "Web & mobile": ["Next.js", "React", "React Native", "Expo"],
  Data: ["PostgreSQL", "Redis", "MongoDB", "Supabase", "Firebase"],
  Cloud: ["AWS (Lambda, S3, RDS)", "SST", "Docker", "Railway", "Azure", "GitHub Actions"],
};
