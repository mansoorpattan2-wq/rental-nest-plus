import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame, BottomNav, TopBar } from "@/components/AppShell";
import { ownerListings, analyticsData } from "@/lib/mock-data";
import { Plus, TrendingUp, Home, Users, DollarSign, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/owner/")({
  component: OwnerDash,
  head: () => ({ meta: [{ title: "Owner · NestSphere" }] }),
});

function OwnerDash() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-4">
        <TopBar
          subtitle="Owner mode"
          title="Good morning, Marta"
          right={
            <Link to="/owner/listings/new" className="h-10 w-10 rounded-full bg-forest text-cream grid place-items-center">
              <Plus className="h-4 w-4" />
            </Link>
          }
        />

        <div className="px-5 grid grid-cols-2 gap-3">
          <KPI icon={DollarSign} label="This month" value="$7,450" delta="+12%" />
          <KPI icon={Users} label="Active leads" value="18" delta="+4" />
          <KPI icon={Home} label="Listings" value="3" delta="1 vacant" />
          <KPI icon={TrendingUp} label="Occupancy" value="83%" delta="+5%" />
        </div>

        <div className="mx-5 mt-5 rounded-3xl bg-forest text-cream p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] uppercase tracking-widest opacity-70">Views · last 6 months</p>
              <p className="display text-3xl">6,430</p>
            </div>
            <span className="text-xs bg-ochre text-forest px-2 py-1 rounded-full font-semibold flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> 34%</span>
          </div>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.14 60)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="oklch(0.72 0.14 60)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ background: "oklch(0.22 0.03 155)", border: "none", borderRadius: 12, fontSize: 12, color: "white" }} />
                <Area type="monotone" dataKey="views" stroke="oklch(0.72 0.14 60)" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 px-5">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="display text-xl">Your listings</h2>
            <Link to="/owner/listings" className="text-xs text-muted-foreground">Manage</Link>
          </div>
          <div className="space-y-3">
            {ownerListings.map((l) => (
              <div key={l.id} className="flex items-center gap-3 p-3 rounded-2xl border border-border">
                <div className="h-12 w-12 rounded-xl bg-secondary grid place-items-center font-serif text-forest">{l.title[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.city} · ${l.rent}/mo</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${l.status === "Occupied" ? "bg-forest/10 text-forest" : "bg-ochre/20 text-forest"}`}>
                    {l.status}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-1">{l.leads} leads · {l.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 px-5">
          <h2 className="display text-xl mb-3">Recent activity</h2>
          <div className="rounded-2xl border border-border divide-y divide-border overflow-hidden">
            {[
              { t: "New application", d: "Ana Duarte applied for The Arches Loft.", time: "2h" },
              { t: "Visit scheduled", d: "Jonas W. booked a tour of Atelier Workspace.", time: "5h" },
              { t: "Review posted", d: "★★★★★ from Camille R. on Reader's Room.", time: "Yesterday" },
            ].map((a, i) => (
              <div key={i} className="p-4 flex justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{a.t}</p>
                  <p className="text-xs text-muted-foreground">{a.d}</p>
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav role="owner" />
    </PhoneFrame>
  );
}

function KPI({ icon: Icon, label, value, delta }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center"><Icon className="h-4 w-4 text-forest" /></div>
        <span className="text-[10px] text-forest font-medium">{delta}</span>
      </div>
      <p className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-serif text-2xl">{value}</p>
    </div>
  );
}
