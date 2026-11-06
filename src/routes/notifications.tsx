import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame, TopBar } from "@/components/AppShell";
import { notifications } from "@/lib/mock-data";
import { Bell, Home, Calendar } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  component: Notifs,
  head: () => ({ meta: [{ title: "Notifications · NestSphere" }] }),
});

function Notifs() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto">
        <TopBar back="/profile" subtitle="Updates" title="Notifications" />
        <div className="divide-y divide-border">
          {notifications.map((n) => {
            const Icon = n.title.includes("Visit") ? Calendar : n.title.includes("match") ? Home : Bell;
            return (
              <div key={n.id} className={`px-5 py-4 flex gap-3 ${n.unread ? "bg-ochre/5" : ""}`}>
                <div className={`h-10 w-10 rounded-full grid place-items-center shrink-0 ${n.unread ? "bg-ochre text-forest" : "bg-secondary text-forest"}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-sm font-medium">{n.title}</p>
                    <span className="text-[11px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                </div>
                {n.unread && <span className="h-2 w-2 rounded-full bg-ochre mt-2" />}
              </div>
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}
