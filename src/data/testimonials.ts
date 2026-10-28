// Testimonials render as chat threads in the Messages app.
// IMPORTANT: replace these placeholders with real quotes from real people before going live.
// Entries with `placeholder: true` show a "sample" badge so they're never mistaken for real ones.

export type Testimonial = {
  id: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  color: string;
  quote: string[];
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Your founder here",
    title: "CEO",
    company: "MealCondo",
    initials: "MC",
    color: "#ff7a1a",
    quote: [
      "Placeholder — ask a MealCondo co-founder for one or two sentences about working with you.",
      "Short bubbles read best. Split a longer quote into 2–3 messages like this.",
    ],
    placeholder: true,
  },
  {
    id: "t2",
    name: "Your client here",
    title: "Founder",
    company: "PassOncology",
    initials: "PO",
    color: "#e5486b",
    quote: ["Placeholder — a quote about the two-week migration or the support agent would land well here."],
    placeholder: true,
  },
  {
    id: "t3",
    name: "Your teammate here",
    title: "Engineering Lead",
    company: "DevotionHub",
    initials: "DH",
    color: "#2f9e8f",
    quote: ["Placeholder — a technical peer's view balances the founder quotes."],
    placeholder: true,
  },
];
