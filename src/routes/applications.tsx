import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame, BottomNav, TopBar } from "@/components/AppShell";
import { applications } from "@/lib/mock-data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/applications")({
  component: Applications,
  head: () => ({ meta: [{ title: "Applications · NestSphere" }] }),
});

const steps = ["Applied", "Reviewed", "Visit", "Signed"];

function Applications() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto">
        <TopBar subtitle="Tracking" title="Your applications" />
        <div className="px-5 space-y-4 pb-4">
          {applications.map((a) => (
            <div key={a.id} className="rounded-2xl border border-border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-serif text-lg">{a.property}</p>
                  <p className="text-xs text-muted-foreground">{a.city} · Updated {a.updated}</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest bg-ochre/20 text-forest px-2 py-1 rounded-full">{a.status}</span>
              </div>
              <div className="mt-5 flex items-center">
                {steps.map((s, i) => {
                  const done = i <= a.step;
                  return (
                    <div key={s} className="flex-1 flex items-center">
                      <div className={`h-7 w-7 rounded-full grid place-items-center text-[10px] font-bold shrink-0 ${done ? "bg-forest text-cream" : "bg-secondary text-muted-foreground"}`}>
                        {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                      {i < steps.length - 1 && <div className={`h-0.5 flex-1 ${i < a.step ? "bg-forest" : "bg-border"}`} />}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                {steps.map((s) => <span key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
