import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame, BottomNav, TopBar } from "@/components/AppShell";
import { conversations } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/chat/")({
  component: ChatList,
  head: () => ({ meta: [{ title: "Messages · NestSphere" }] }),
});

function ChatList() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto">
        <TopBar subtitle="Inbox" title="Messages" />
        <div className="px-5">
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 h-11">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search conversations" className="flex-1 bg-transparent outline-none text-sm" />
          </div>
        </div>
        <div className="mt-4 divide-y divide-border">
          {conversations.map((c) => (
            <Link
              to="/chat/$id"
              params={{ id: c.id }}
              key={c.id}
              className="flex items-center gap-3 px-5 py-4 hover:bg-secondary/60 transition"
            >
              <div className="h-12 w-12 rounded-full bg-forest text-cream grid place-items-center font-serif text-lg shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-medium truncate">{c.name}</p>
                  <span className="text-[11px] text-muted-foreground shrink-0">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.property}</p>
                <p className={`text-sm truncate mt-0.5 ${c.unread ? "font-medium" : "text-muted-foreground"}`}>{c.last}</p>
              </div>
              {c.unread > 0 && (
                <span className="h-5 min-w-5 px-1.5 rounded-full bg-ochre text-forest text-[10px] font-bold grid place-items-center">
                  {c.unread}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
