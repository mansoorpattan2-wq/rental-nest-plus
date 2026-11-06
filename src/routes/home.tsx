import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Bell, SlidersHorizontal, Home as HomeIcon, DoorOpen, Briefcase, Store } from "lucide-react";
import { PhoneFrame, BottomNav } from "@/components/AppShell";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({ meta: [{ title: "Discover · NestSphere" }, { name: "description", content: "Editorially curated homes, rooms, offices and stores near you." }] }),
});

const cats = [
  { key: "all", label: "All", icon: SlidersHorizontal },
  { key: "home", label: "Homes", icon: HomeIcon },
  { key: "room", label: "Rooms", icon: DoorOpen },
  { key: "office", label: "Offices", icon: Briefcase },
  { key: "store", label: "Stores", icon: Store },
] as const;

function HomePage() {
  const [cat, setCat] = useState<(typeof cats)[number]["key"]>("all");
  const list = cat === "all" ? properties : properties.filter((p) => p.type === cat);
  const featured = properties[0];

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-5 pt-6 flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Good morning, Ana</p>
            <h1 className="display text-3xl leading-tight mt-1">Find a space<br /><em className="not-italic text-ochre">worth living in.</em></h1>
          </div>
          <Link to="/notifications" className="relative h-10 w-10 rounded-full border border-border grid place-items-center">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-ochre" />
          </Link>
        </div>

        <Link to="/search" className="mx-5 mt-5 flex items-center gap-3 rounded-full bg-secondary px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground flex-1">City, neighborhood, keyword…</span>
          <span className="h-7 w-7 rounded-full bg-primary grid place-items-center">
            <SlidersHorizontal className="h-3.5 w-3.5 text-primary-foreground" />
          </span>
        </Link>

        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar px-5">
          {cats.map((c) => {
            const Icon = c.icon;
            const active = cat === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition ${active ? "bg-forest text-cream border-forest" : "bg-background border-border text-muted-foreground"}`}
              >
                <Icon className="h-3.5 w-3.5" /> {c.label}
              </button>
            );
          })}
        </div>

        <section className="mt-7">
          <div className="px-5 flex items-baseline justify-between">
            <h2 className="display text-xl">Editor's pick</h2>
            <Link to="/search" className="text-xs text-muted-foreground">See all</Link>
          </div>
          <Link to="/property/$id" params={{ id: featured.id }} className="mx-5 mt-3 block relative aspect-[4/3] rounded-3xl overflow-hidden">
            <img src={featured.images[0]} alt={featured.title} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
              <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">This week in {featured.city}</p>
              <h3 className="display text-3xl mt-1 leading-tight">{featured.title}</h3>
              <p className="mt-2 text-sm opacity-90 max-w-xs">{featured.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xl font-semibold">${featured.rent}<span className="text-xs font-normal opacity-80">/mo</span></p>
                <span className="rounded-full bg-ochre text-forest px-4 py-2 text-xs font-medium">View listing →</span>
              </div>
            </div>
          </Link>
        </section>

        <section className="mt-8">
          <div className="px-5 flex items-baseline justify-between mb-3">
            <h2 className="display text-xl">Near you</h2>
            <Link to="/search" className="text-xs text-muted-foreground">Map view</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
            {list.map((p) => <PropertyCard key={p.id} p={p} wide />)}
          </div>
        </section>

        <section className="mt-8 px-5">
          <h2 className="display text-xl mb-3">Fresh listings</h2>
          <div className="grid grid-cols-2 gap-4">
            {list.slice(0, 4).map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        </section>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
