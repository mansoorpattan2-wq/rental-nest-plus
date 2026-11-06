import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Map, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const slides = [
  {
    icon: Search,
    tag: "Discover",
    title: "Search that actually listens.",
    body: "Filter by neighborhood, budget, amenities, lease length — save what you love, skip the noise.",
  },
  {
    icon: Map,
    tag: "Explore",
    title: "Walk the block before you visit.",
    body: "Map view, virtual tours and full video walkthroughs — see what's around before you go.",
  },
  {
    icon: ShieldCheck,
    tag: "Trust",
    title: "Verified owners. Honest reviews.",
    body: "Every owner is ID-verified. Every review is from a real tenant. No games.",
  },
  {
    icon: Sparkles,
    tag: "Move in",
    title: "From first message to keys in hand.",
    body: "Chat, schedule visits, apply and sign — all inside NestSphere.",
  },
];

function Onboarding() {
  const [i, setI] = useState(0);
  const Slide = slides[i];
  const Icon = Slide.icon;
  const last = i === slides.length - 1;

  return (
    <div className="min-h-screen w-full bg-[oklch(0.94_0.02_85)] flex items-start md:items-center justify-center md:py-10">
      <div className="w-full max-w-[440px] min-h-screen md:min-h-[900px] md:h-[900px] md:rounded-[2.5rem] bg-background overflow-hidden relative flex flex-col md:shadow-lift md:border md:border-border p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-forest text-cream grid place-items-center font-serif">N</div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">NestSphere</p>
          </div>
          <Link to="/auth" search={{ mode: "signup" }} className="text-xs text-muted-foreground hover:text-foreground">Skip</Link>
        </div>

        <div className="flex-1 flex flex-col justify-center animate-fade-up" key={i}>
          <div className="h-14 w-14 rounded-2xl bg-secondary grid place-items-center">
            <Icon className="h-6 w-6 text-forest" />
          </div>
          <p className="mt-8 text-[11px] uppercase tracking-[0.24em] text-ochre">{Slide.tag}</p>
          <h2 className="display text-4xl mt-2 leading-tight">{Slide.title}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{Slide.body}</p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1 rounded-full transition-all ${idx === i ? "w-8 bg-forest" : "w-4 bg-border"}`}
              />
            ))}
          </div>
          {last ? (
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="block text-center rounded-full bg-primary text-primary-foreground py-3.5 font-medium"
            >
              Create your account
            </Link>
          ) : (
            <button
              onClick={() => setI(i + 1)}
              className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-medium"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
