# bezaleelnwabia.vercel.app

Personal site for Bezaleel Nwabia, Forward Deployed Engineer. It looks like a macOS desktop (and an iOS home screen on phones).

## Edit content
Everything personal is in `src/data/`:

- `site.ts` has your name, links, availability, **cal.com link** (`calLink`) and stats
- `deployments.ts` has the case studies. Each one has a plain-English version for clients and an engineering version
- `services.ts` has the engagement types, process steps and FAQs
- `testimonials.ts` has the quotes shown in Messages. **Replace the placeholders with real quotes**

Resumes are in `public/resume/`.

## Run
```bash
npm install
npm run dev
```

Tip: add `?unlocked` to the URL to skip the lock screen.
