import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame, BottomNav, TopBar } from "@/components/AppShell";
import { ownerListings, properties } from "@/lib/mock-data";
import { Plus, Eye, MessageCircle, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/owner/listings/")({
  component: OwnerListings,
});

function OwnerListings() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-4">
        <TopBar
          back="/owner"
          subtitle="Owner"
          title="Listings"
          right={
            <Link to="/owner/listings/new" className="h-10 px-4 rounded-full bg-forest text-cream text-sm font-medium flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> New
            </Link>
          }
        />
        <div className="px-5 space-y-3">
          {ownerListings.map((l) => {
            const img = properties.find((p) => p.id === l.id)?.images[0];
            return (
              <div key={l.id} className="rounded-2xl border border-border overflow-hidden">
                <div className="flex gap-3 p-3">
                  {img && <img src={img} alt="" className="h-24 w-24 rounded-xl object-cover" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-serif text-lg leading-tight">{l.title}</p>
                        <p className="text-xs text-muted-foreground">{l.city}</p>
                      </div>
                      <button className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
                    </div>
                    <p className="mt-1 text-sm font-medium">${l.rent}<span className="text-xs text-muted-foreground">/mo</span></p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{l.views}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{l.leads}</span>
                      <span className={`ml-auto text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${l.status === "Occupied" ? "bg-forest/10 text-forest" : "bg-ochre/20 text-forest"}`}>
                        {l.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 border-t border-border divide-x divide-border text-xs">
                  <button className="py-2.5 hover:bg-secondary">Edit</button>
                  <Link to="/property/$id" params={{ id: l.id }} className="py-2.5 text-center hover:bg-secondary">Preview</Link>
                  <button className="py-2.5 hover:bg-secondary">Pause</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav role="owner" />
    </PhoneFrame>
  );
}
