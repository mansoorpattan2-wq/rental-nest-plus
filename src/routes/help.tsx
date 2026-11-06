import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame, TopBar } from "@/components/AppShell";
import { MessageCircle, Mail, Phone, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/help")({
  component: Help,
  head: () => ({ meta: [{ title: "Help · NestSphere" }] }),
});

const faqs = [
  { q: "How does the application process work?", a: "Send a request from any listing. The owner reviews your profile, may schedule a visit, and you can sign the lease in-app." },
  { q: "Are owners verified?", a: "Yes. Every owner completes ID verification and property proof before their first listing goes live." },
  { q: "Can I cancel a scheduled visit?", a: "Yes — cancel from Applications up to 6 hours before, no fees." },
  { q: "How do payments work?", a: "Rent and deposits are handled through secure escrow. You'll never send funds directly to an owner." },
  { q: "What if there's a dispute?", a: "Our support team mediates within 48 hours. All chat history is retained as evidence." },
];

function Help() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-6">
        <TopBar back="/profile" subtitle="Support" title="How can we help?" />
        <div className="px-5 grid grid-cols-3 gap-2">
          {[
            { icon: MessageCircle, label: "Live chat" },
            { icon: Mail, label: "Email us" },
            { icon: Phone, label: "Call" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <button key={c.label} className="rounded-2xl border border-border p-4 flex flex-col items-center gap-2 hover:bg-secondary transition">
                <Icon className="h-5 w-5 text-forest" />
                <span className="text-xs">{c.label}</span>
              </button>
            );
          })}
        </div>
        <div className="px-5 mt-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Frequently asked</p>
          <div className="rounded-2xl border border-border divide-y divide-border overflow-hidden">
            {faqs.map((f, i) => (
              <div key={i}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center gap-2 p-4 text-left">
                  <span className="flex-1 text-sm font-medium">{f.q}</span>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && <p className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
