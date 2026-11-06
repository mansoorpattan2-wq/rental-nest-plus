import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const [phase, setPhase] = useState<0 | 1>(0);
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[oklch(0.94_0.02_85)] flex items-start md:items-center justify-center md:py-10">
      <div className="w-full max-w-[440px] min-h-screen md:min-h-[900px] md:h-[900px] md:rounded-[2.5rem] bg-forest overflow-hidden relative flex flex-col md:shadow-lift md:border md:border-border text-cream">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/60 to-forest" />

        <div className="relative flex-1 flex flex-col justify-between p-8">
          <div className={`transition-all duration-700 ${phase === 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-ochre grid place-items-center text-forest font-serif text-lg">N</div>
              <p className="text-[11px] uppercase tracking-[0.24em] opacity-80">NestSphere</p>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${phase === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-[11px] uppercase tracking-[0.24em] opacity-70 mb-3">A quieter way to rent</p>
            <h1 className="display text-5xl leading-[0.95]">
              Find the<br /><em className="not-italic text-ochre">space</em><br />that fits your life.
            </h1>
            <p className="mt-5 text-sm opacity-80 max-w-xs">
              Homes, rooms, offices and storefronts — with virtual tours, verified owners, and one honest place to talk.
            </p>

            <div className="mt-8 space-y-3">
              <Link
                to="/onboarding"
                className="block text-center rounded-full bg-ochre text-forest py-3.5 font-medium hover:opacity-95 transition"
              >
                Get started
              </Link>
              <Link
                to="/auth"
                search={{ mode: "signin" }}
                className="block text-center rounded-full border border-cream/30 py-3.5 text-sm hover:bg-cream/10 transition"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
