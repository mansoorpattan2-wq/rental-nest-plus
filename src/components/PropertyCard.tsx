import { Link } from "@tanstack/react-router";
import { Heart, Star, MapPin } from "lucide-react";
import type { Property } from "@/lib/mock-data";

const typeLabel: Record<Property["type"], string> = {
  home: "Home",
  room: "Room",
  office: "Office",
  store: "Store",
};

export function PropertyCard({ p, wide = false }: { p: Property; wide?: boolean }) {
  return (
    <Link
      to="/property/$id"
      params={{ id: p.id }}
      className={`group block ${wide ? "w-[280px] shrink-0" : ""}`}
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
        <img
          src={p.images[0]}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex justify-between items-start p-3">
          <span className="text-[10px] uppercase tracking-[0.18em] bg-background/90 text-foreground px-2.5 py-1 rounded-full backdrop-blur">
            {typeLabel[p.type]}
          </span>
          <button className="h-9 w-9 grid place-items-center rounded-full bg-background/90 backdrop-blur">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="flex items-end justify-between gap-2 text-primary-foreground">
            <div className="min-w-0">
              <p className="text-[11px] tracking-wide opacity-90 flex items-center gap-1"><MapPin className="h-3 w-3" />{p.neighborhood}, {p.city}</p>
              <h3 className="display text-lg leading-tight truncate">{p.title}</h3>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl font-semibold leading-none">${p.rent}</p>
              <p className="text-[10px] opacity-80">/ month</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent -z-0 pointer-events-none" />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground px-1">
        <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-ochre text-ochre" />{p.rating} · {p.reviews} reviews</span>
        <span>{p.beds > 0 ? `${p.beds} bd · ` : ""}{p.area} sqft</span>
      </div>
    </Link>
  );
}
