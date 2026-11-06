import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Map as MapIcon, Grid3x3, X } from "lucide-react";
import { PhoneFrame, BottomNav, TopBar } from "@/components/AppShell";
import { PropertyCard } from "@/components/PropertyCard";
import { properties, type PropertyType } from "@/lib/mock-data";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({ meta: [{ title: "Search · NestSphere" }, { name: "description", content: "Advanced filters, map view, saved searches." }] }),
});

function SearchPage() {
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "map">("grid");
  const [budget, setBudget] = useState(3500);
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [beds, setBeds] = useState(0);

  const toggle = (t: PropertyType) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const list = properties.filter((p) => {
    if (types.length && !types.includes(p.type)) return false;
    if (p.rent > budget) return false;
    if (beds && p.beds < beds) return false;
    if (q && !`${p.title} ${p.city} ${p.neighborhood}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto">
        <TopBar subtitle="Explore" title="Find your space" back="/home" />

        <div className="px-5 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-full bg-secondary px-4 h-11">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Lisbon, loft, terrace…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
            {q && <button onClick={() => setQ("")}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>}
          </div>
          <button
            onClick={() => setView(view === "grid" ? "map" : "grid")}
            className="h-11 w-11 rounded-full border border-border grid place-items-center"
            aria-label="Toggle view"
          >
            {view === "grid" ? <MapIcon className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-5 px-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Budget</p>
            <p className="text-sm font-medium">up to ${budget}/mo</p>
          </div>
          <input
            type="range"
            min={300}
            max={5000}
            step={50}
            value={budget}
            onChange={(e) => setBudget(+e.target.value)}
            className="w-full accent-forest"
          />
        </div>

        <div className="mt-4 px-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Space type</p>
          <div className="flex gap-2 flex-wrap">
            {(["home", "room", "office", "store"] as PropertyType[]).map((t) => {
              const on = types.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  className={`px-4 py-1.5 rounded-full text-sm capitalize border transition ${on ? "bg-forest text-cream border-forest" : "border-border text-muted-foreground"}`}
                >
                  {t}s
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 px-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Bedrooms</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setBeds(n)}
                className={`flex-1 py-2 rounded-xl text-sm border ${beds === n ? "bg-forest text-cream border-forest" : "border-border"}`}
              >
                {n === 0 ? "Any" : `${n}+`}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 px-5 flex items-baseline justify-between">
          <h2 className="display text-xl">{list.length} results</h2>
          <button className="text-xs text-muted-foreground underline">Save search</button>
        </div>

        {view === "grid" ? (
          <div className="mt-3 px-5 grid grid-cols-2 gap-4 pb-6">
            {list.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        ) : (
          <MapView />
        )}
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}

function MapView() {
  return (
    <div className="mt-4 mx-5 rounded-3xl overflow-hidden bg-secondary aspect-[4/5] relative">
      {/* Stylized map tiles */}
      <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="oklch(0.88 0.02 85)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="125" fill="oklch(0.94 0.02 85)" />
        <rect width="100" height="125" fill="url(#grid)" />
        <path d="M0 50 Q40 40 60 55 T100 60" fill="none" stroke="oklch(0.82 0.05 195)" strokeWidth="2" opacity="0.5" />
        <path d="M10 0 L15 40 L30 50 L45 90 L60 125" fill="none" stroke="oklch(0.85 0.02 85)" strokeWidth="1" />
        <path d="M50 0 L55 30 L75 60 L90 100" fill="none" stroke="oklch(0.85 0.02 85)" strokeWidth="1" />
        <circle cx="30" cy="70" r="18" fill="oklch(0.85 0.06 150)" opacity="0.3" />
        <circle cx="70" cy="30" r="14" fill="oklch(0.85 0.06 60)" opacity="0.3" />
      </svg>
      {properties.map((p) => (
        <Link
          key={p.id}
          to="/property/$id"
          params={{ id: p.id }}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
        >
          <div className="rounded-full bg-forest text-cream px-3 py-1.5 text-xs font-semibold shadow-lift whitespace-nowrap">
            ${p.rent}
          </div>
          <div className="h-2 w-2 bg-forest rotate-45 mx-auto -mt-1" />
        </Link>
      ))}
      <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-background/95 backdrop-blur p-3 shadow-soft">
        <div className="flex items-center gap-3">
          <img src={properties[0].images[0]} className="h-14 w-14 rounded-xl object-cover" alt="" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Highlighted</p>
            <p className="font-serif text-sm truncate">{properties[0].title}</p>
            <p className="text-xs text-muted-foreground">${properties[0].rent}/mo · {properties[0].neighborhood}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
