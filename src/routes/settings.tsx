import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame, TopBar } from "@/components/AppShell";
import { Bell, Moon, Globe, Lock, CreditCard, Trash2, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  component: Settings,
  head: () => ({ meta: [{ title: "Settings · NestSphere" }] }),
});

function Settings() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-6">
        <TopBar back="/profile" subtitle="Preferences" title="Settings" />
        <Section title="Notifications">
          <Toggle icon={Bell} label="Push notifications" v={push} onV={setPush} />
          <Toggle icon={Bell} label="Email digest" v={email} onV={setEmail} />
        </Section>
        <Section title="Appearance">
          <Toggle icon={Moon} label="Dark mode" v={dark} onV={setDark} />
          <Row icon={Globe} label="Language" meta="English" />
          <Row icon={Globe} label="Currency" meta="USD" />
        </Section>
        <Section title="Account">
          <Row icon={Lock} label="Password & security" />
          <Row icon={CreditCard} label="Payment methods" meta="•••• 4242" />
        </Section>
        <Section title="Danger">
          <Row icon={Trash2} label="Delete account" danger />
        </Section>
      </div>
    </PhoneFrame>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 mt-5">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{title}</p>
      <div className="rounded-2xl border border-border divide-y divide-border overflow-hidden">{children}</div>
    </div>
  );
}
function Row({ icon: Icon, label, meta, danger }: { icon: React.ComponentType<{ className?: string }>; label: string; meta?: string; danger?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary transition ${danger ? "text-destructive" : ""}`}>
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-left text-sm">{label}</span>
      {meta && <span className="text-xs text-muted-foreground">{meta}</span>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
function Toggle({ icon: Icon, label, v, onV }: { icon: React.ComponentType<{ className?: string }>; label: string; v: boolean; onV: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-sm">{label}</span>
      <button
        onClick={() => onV(!v)}
        className={`h-6 w-11 rounded-full p-0.5 transition ${v ? "bg-forest" : "bg-border"}`}
      >
        <span className={`block h-5 w-5 rounded-full bg-background transition ${v ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}
