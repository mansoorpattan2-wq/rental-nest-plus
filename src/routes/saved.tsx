import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame, BottomNav, TopBar } from "@/components/AppShell";
import { PropertyCard } from "@/components/PropertyCard";
import { properties, savedIds } from "@/lib/mock-data";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/saved")({
  component: Saved,
  head: () => ({ meta: [{ title: "Saved · NestSphere" }, { name: "description", content: "Your saved listings and searches." }] }),
});

function Saved() {
  const saved = properties.filter((p) => savedIds.includes(p.id));
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto">
        <TopBar subtitle="Your list" title="Saved for later" />
        <div className="px-5 mt-2">
          <div className="rounded-2xl bg-secondary p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-forest text-cream grid place-items-center">
              <Heart className="h-4 w-4 fill-current" />
            </div>
            <div className="text-sm">
              <p className="font-medium">{saved.length} homes on your shortlist</p>
              <p className="text-muted-foreground text-xs">We'll ping you if prices drop.</p>
            </div>
          </div>
        </div>
        <div className="mt-6 px-5 grid grid-cols-2 gap-4 pb-4">
          {saved.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>

        <div className="mt-2 px-5">
          <h2 className="display text-xl mb-3">Saved searches</h2>
          <div className="space-y-2">
            {[
              { name: "Lofts in Lisbon", meta: "Under $2000 · 2+ bd", n: 12 },
              { name: "Le Marais rooms", meta: "Furnished · Short-term", n: 5 },
              { name: "Shoreditch offices", meta: "Under $4000", n: 8 },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between p-4 rounded-2xl border border-border">
                <div>
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.meta}</p>
                </div>
                <span className="text-xs bg-ochre/20 text-forest px-3 py-1 rounded-full font-medium">{s.n} new</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
