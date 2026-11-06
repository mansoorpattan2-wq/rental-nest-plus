import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame, BottomNav, TopBar } from "@/components/AppShell";
import { analyticsData } from "@/lib/mock-data";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, LineChart, Line, CartesianGrid } from "recharts";

export const Route = createFileRoute("/owner/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-4">
        <TopBar back="/owner" subtitle="Insights" title="Performance" />
        <div className="px-5 grid grid-cols-2 gap-3">
          <Metric label="Total views" value="6,430" delta="+34%" />
          <Metric label="Conversion" value="8.7%" delta="+1.2%" />
          <Metric label="Avg. response" value="42m" delta="-8m" />
          <Metric label="NPS" value="72" delta="+4" />
        </div>

        <div className="mx-5 mt-5 p-4 rounded-2xl border border-border">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Views by month</p>
          <div className="h-40 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <XAxis dataKey="month" stroke="oklch(0.48 0.02 150)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.32 0.055 155)", border: "none", borderRadius: 12, color: "white", fontSize: 12 }} />
                <Bar dataKey="views" fill="oklch(0.32 0.055 155)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mx-5 mt-5 p-4 rounded-2xl border border-border">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Leads trend</p>
          <div className="h-40 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.015 85)" />
                <XAxis dataKey="month" stroke="oklch(0.48 0.02 150)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.32 0.055 155)", border: "none", borderRadius: 12, color: "white", fontSize: 12 }} />
                <Line type="monotone" dataKey="leads" stroke="oklch(0.72 0.14 60)" strokeWidth={2.5} dot={{ fill: "oklch(0.72 0.14 60)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mx-5 mt-5 p-4 rounded-2xl bg-forest text-cream">
          <p className="text-[11px] uppercase tracking-widest opacity-70">Recommendation</p>
          <p className="display text-lg mt-1 leading-snug">Add a video tour to Corner Retail. Listings with video convert 2.3× better.</p>
          <button className="mt-3 px-4 py-2 rounded-full bg-ochre text-forest text-xs font-medium">Do it now</button>
        </div>
      </div>
      <BottomNav role="owner" />
    </PhoneFrame>
  );
}

function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-serif text-2xl mt-1">{value}</p>
      <p className="text-[11px] text-forest font-medium mt-0.5">{delta}</p>
    </div>
  );
}
