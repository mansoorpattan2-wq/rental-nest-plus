import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame, BottomNav, TopBar } from "@/components/AppShell";
import { ShieldCheck, ClipboardList, Heart, Settings, HelpCircle, LogOut, Sparkles, Bell } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile · NestSphere" }] }),
});

const items = [
  { to: "/applications", icon: ClipboardList, label: "Applications", meta: "3 active" },
  { to: "/saved", icon: Heart, label: "Saved & searches" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
  { to: "/settings", icon: Settings, label: "Settings" },
  { to: "/help", icon: HelpCircle, label: "Help & support" },
] as const;

function Profile() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto">
        <TopBar subtitle="You" title="Profile" />
        <div className="px-5">
          <div className="rounded-3xl bg-forest text-cream p-5 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-ochre/30" />
            <div className="relative flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-ochre text-forest grid place-items-center font-serif text-2xl">A</div>
              <div>
                <p className="font-serif text-2xl">Ana Duarte</p>
                <p className="text-xs opacity-80 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Verified tenant</p>
              </div>
            </div>
            <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
              <Stat n="12" l="Saved" />
              <Stat n="3" l="Applications" />
              <Stat n="4.9" l="Rating" />
            </div>
          </div>

          <Link to="/owner" className="mt-4 flex items-center justify-between p-4 rounded-2xl bg-ochre/20 border border-ochre/40">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-ochre" />
              <div>
                <p className="text-sm font-medium">Have a space to rent?</p>
                <p className="text-xs text-muted-foreground">Switch to owner mode</p>
              </div>
            </div>
            <span className="text-forest">→</span>
          </Link>

          <div className="mt-4 divide-y divide-border rounded-2xl border border-border overflow-hidden">
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <Link key={it.to} to={it.to} className="flex items-center gap-3 px-4 py-4 hover:bg-secondary transition">
                  <Icon className="h-4 w-4 text-forest" />
                  <span className="flex-1 text-sm">{it.label}</span>
                  {"meta" in it && it.meta && <span className="text-xs text-muted-foreground">{it.meta}</span>}
                  <span className="text-muted-foreground">›</span>
                </Link>
              );
            })}
          </div>

          <button className="mt-4 mb-4 w-full flex items-center justify-center gap-2 py-3 rounded-full border border-border text-sm text-muted-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl bg-cream/10 p-3">
      <p className="font-serif text-xl">{n}</p>
      <p className="text-[10px] uppercase tracking-widest opacity-70">{l}</p>
    </div>
  );
}
