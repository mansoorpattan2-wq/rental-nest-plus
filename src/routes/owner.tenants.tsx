import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame, BottomNav, TopBar } from "@/components/AppShell";
import { ownerTenants } from "@/lib/mock-data";
import { ShieldCheck, ShieldAlert, FileText } from "lucide-react";

export const Route = createFileRoute("/owner/tenants")({
  component: Tenants,
});

function Tenants() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-4">
        <TopBar back="/owner" subtitle="People" title="Tenants" />
        <div className="px-5 space-y-3">
          {ownerTenants.map((t) => (
            <div key={t.id} className="rounded-2xl border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-forest text-cream grid place-items-center font-serif">{t.name[0]}</div>
                <div className="flex-1">
                  <p className="font-medium text-sm flex items-center gap-1.5">
                    {t.name}
                    {t.verified ? <ShieldCheck className="h-3.5 w-3.5 text-forest" /> : <ShieldAlert className="h-3.5 w-3.5 text-ochre" />}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.property}</p>
                </div>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${t.rent === "Paid" ? "bg-forest/10 text-forest" : "bg-secondary text-muted-foreground"}`}>
                  {t.rent}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-secondary py-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Since</p>
                  <p className="text-xs font-medium">{t.since}</p>
                </div>
                <button className="rounded-xl bg-secondary py-2 text-xs font-medium hover:bg-forest hover:text-cream transition">Message</button>
                <button className="rounded-xl bg-secondary py-2 text-xs font-medium flex items-center justify-center gap-1 hover:bg-forest hover:text-cream transition"><FileText className="h-3 w-3" /> Lease</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 mt-6 p-4 rounded-2xl bg-secondary">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Verification queue</p>
          <p className="text-sm mt-1">Lea Fischer submitted ID & proof of income.</p>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 py-2 rounded-full bg-forest text-cream text-xs font-medium">Verify</button>
            <button className="flex-1 py-2 rounded-full border border-border text-xs">Ask for more</button>
          </div>
        </div>
      </div>
      <BottomNav role="owner" />
    </PhoneFrame>
  );
}
