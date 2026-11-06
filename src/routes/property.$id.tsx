import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/AppShell";
import { getProperty, type Property } from "@/lib/mock-data";
import { ArrowLeft, Heart, Share2, Star, MapPin, BedDouble, Bath, Ruler, ShieldCheck, PlayCircle, Calendar, MessageCircle, ChevronRight, Wifi } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/property/$id")({
  component: PropertyDetail,
  loader: ({ params }): { property: Property } => {
    const p = getProperty(params.id);
    if (!p) throw notFound();
    return { property: p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.property.title} · NestSphere` : "Property · NestSphere" },
      { name: "description", content: loaderData?.property.description ?? "Property details on NestSphere." },
      ...(loaderData ? [{ property: "og:image", content: loaderData.property.images[0] }] : []),
    ],
  }),
  notFoundComponent: () => (
    <div className="p-10 text-center">Property not found. <Link to="/home" className="underline">Back home</Link></div>
  ),
});

function PropertyDetail() {
  const { property: p } = Route.useLoaderData() as { property: Property };
  const [tab, setTab] = useState<"overview" | "amenities" | "rules" | "reviews">("overview");
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-32 relative">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img src={p.images[imgIdx]} alt={p.title} className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
            <Link to="/home" className="h-10 w-10 rounded-full bg-background/90 backdrop-blur grid place-items-center">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex gap-2">
              <button className="h-10 w-10 rounded-full bg-background/90 backdrop-blur grid place-items-center"><Share2 className="h-4 w-4" /></button>
              <button className="h-10 w-10 rounded-full bg-background/90 backdrop-blur grid place-items-center"><Heart className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="absolute bottom-5 left-5 flex gap-1.5">
            {p.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-8 bg-cream" : "w-1.5 bg-cream/60"}`}
              />
            ))}
          </div>
          <button className="absolute bottom-5 right-5 flex items-center gap-2 bg-background/90 backdrop-blur rounded-full px-3 py-2 text-xs font-medium">
            <PlayCircle className="h-4 w-4 text-ochre" /> Virtual tour
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {p.address}, {p.city}
              </p>
              <h1 className="display text-3xl mt-1 leading-tight">{p.title}</h1>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-ochre text-ochre" />
              <span className="font-medium">{p.rating}</span>
              <span className="text-muted-foreground">({p.reviews})</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Fact icon={BedDouble} label={p.beds > 0 ? `${p.beds} beds` : "Open plan"} />
            <Fact icon={Bath} label={`${p.baths} bath`} />
            <Fact icon={Ruler} label={`${p.area} sqft`} />
          </div>

          <div className="mt-6 flex items-center gap-3 p-3 rounded-2xl bg-secondary">
            <div className="h-11 w-11 rounded-full bg-forest text-cream grid place-items-center font-serif">{p.owner.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-medium flex items-center gap-1">
                {p.owner.name}
                {p.owner.verified && <ShieldCheck className="h-3.5 w-3.5 text-forest" />}
              </p>
              <p className="text-xs text-muted-foreground">Owner · usually replies in 1h</p>
            </div>
            <Link to="/chat/$id" params={{ id: "c1" }} className="text-xs rounded-full bg-background px-3 py-2 font-medium border border-border">
              Message
            </Link>
          </div>

          <div className="mt-6 flex gap-1 border-b border-border">
            {(["overview", "amenities", "rules", "reviews"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 pb-2.5 text-xs capitalize transition ${tab === t ? "border-b-2 border-forest text-forest font-semibold" : "text-muted-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {tab === "overview" && (
              <div className="space-y-5">
                <p className="text-sm leading-relaxed text-foreground/85">{p.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Meta k="Rent" v={`$${p.rent}/mo`} />
                  <Meta k="Deposit" v={`$${p.deposit}`} />
                  <Meta k="Available" v={p.available} />
                  <Meta k="Lease" v={p.lease} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Utilities</p>
                  <ul className="text-sm space-y-1">
                    {p.utilities.map((u) => <li key={u} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-forest" />{u}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Nearby</p>
                  <div className="space-y-2">
                    {p.nearby.map((n) => (
                      <div key={n.name} className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0">
                        <div><p>{n.name}</p><p className="text-xs text-muted-foreground">{n.type}</p></div>
                        <span className="text-xs text-muted-foreground">{n.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {tab === "amenities" && (
              <div className="grid grid-cols-2 gap-2">
                {p.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm p-3 rounded-xl bg-secondary">
                    <Wifi className="h-4 w-4 text-forest" /> {a}
                  </div>
                ))}
              </div>
            )}
            {tab === "rules" && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">House rules</p>
                <ul className="text-sm space-y-2">
                  {p.rules.map((r) => <li key={r} className="p-3 rounded-xl border border-border">{r}</li>)}
                </ul>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-5 mb-2">Terms & conditions</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Standard {p.lease} residential lease. First month + deposit due at signing. 30-day notice period. Full terms included with application.
                </p>
              </div>
            )}
            {tab === "reviews" && (
              <div className="space-y-4">
                {[
                  { n: "Sofia R.", t: "Everything as advertised. Marta is a wonderful host.", r: 5 },
                  { n: "Jonas B.", t: "Quiet, warm, and beautifully finished. Would rent again.", r: 5 },
                  { n: "Camille L.", t: "Great light, close to the metro. Only wish the elevator was faster.", r: 4 },
                ].map((rv) => (
                  <div key={rv.n} className="p-4 rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{rv.n}</p>
                      <span className="flex text-ochre">{Array.from({ length: rv.r }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rv.t}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 border-t border-border bg-background/95 backdrop-blur p-4 flex items-center gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Monthly</p>
          <p className="display text-xl">${p.rent}</p>
        </div>
        <Link to="/schedule" search={{ property: p.id }} className="flex-1 rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium text-center flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4" /> Schedule visit
        </Link>
      </div>
    </PhoneFrame>
  );
}

function Fact({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="rounded-2xl border border-border p-3 text-center">
      <Icon className="h-4 w-4 mx-auto text-forest" />
      <p className="text-xs mt-1.5">{label}</p>
    </div>
  );
}
function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-secondary p-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</p>
      <p className="font-medium mt-0.5">{v}</p>
    </div>
  );
}
