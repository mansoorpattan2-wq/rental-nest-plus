import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Heart, MessageCircle, User, Map, LayoutDashboard, Building2, BarChart3, Users } from "lucide-react";
import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[oklch(0.94_0.02_85)] flex items-start md:items-center justify-center md:py-10">
      <div className="w-full max-w-[440px] min-h-screen md:min-h-[900px] md:h-[900px] md:rounded-[2.5rem] bg-background md:shadow-lift overflow-hidden relative flex flex-col md:border md:border-border">
        {children}
      </div>
    </div>
  );
}

const tenantNav = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/saved", icon: Heart, label: "Saved" },
  { to: "/chat", icon: MessageCircle, label: "Chat" },
  { to: "/profile", icon: User, label: "Profile" },
] as const;

const ownerNav = [
  { to: "/owner", icon: LayoutDashboard, label: "Dash" },
  { to: "/owner/listings", icon: Building2, label: "Listings" },
  { to: "/owner/analytics", icon: BarChart3, label: "Insights" },
  { to: "/owner/tenants", icon: Users, label: "Tenants" },
  { to: "/profile", icon: User, label: "Profile" },
] as const;

export function BottomNav({ role = "tenant" }: { role?: "tenant" | "owner" }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = role === "owner" ? ownerNav : tenantNav;
  return (
    <nav className="sticky bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5">
        {items.map((it) => {
          const active = path === it.to || (it.to !== "/home" && it.to !== "/owner" && path.startsWith(it.to));
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="flex flex-col items-center justify-center gap-1 py-2.5 relative"
            >
              <Icon className={`h-5 w-5 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`} strokeWidth={active ? 2.4 : 1.8} />
              <span className={`text-[10px] tracking-wide ${active ? "text-primary font-semibold" : "text-muted-foreground"}`}>{it.label}</span>
              {active && <span className="absolute top-0 h-[3px] w-8 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function TopBar({
  title,
  subtitle,
  right,
  back,
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  back?: string;
}) {
  return (
    <header className="flex items-center gap-3 px-5 pt-5 pb-3">
      {back && (
        <Link to={back} className="h-9 w-9 rounded-full border border-border grid place-items-center hover:bg-muted transition">
          <span className="rotate-180 text-lg">›</span>
        </Link>
      )}
      <div className="flex-1 min-w-0">
        {subtitle && <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{subtitle}</p>}
        {title && <h1 className="display text-2xl leading-tight truncate">{title}</h1>}
      </div>
      {right}
    </header>
  );
}
