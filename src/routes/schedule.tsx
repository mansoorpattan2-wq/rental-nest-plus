import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame, TopBar } from "@/components/AppShell";
import { getProperty } from "@/lib/mock-data";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Calendar, Clock, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/schedule")({
  component: Schedule,
  validateSearch: z.object({ property: z.string().default("loft-arches") }),
});

const days = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});
const times = ["10:00", "12:00", "14:00", "16:00", "18:00"];

function Schedule() {
  const { property } = Route.useSearch();
  const p = getProperty(property);
  const nav = useNavigate();
  const [day, setDay] = useState(1);
  const [time, setTime] = useState("12:00");

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto">
        <TopBar back="/home" subtitle="Book a visit" title="Choose a time" />
        {p && (
          <div className="mx-5 p-3 rounded-2xl bg-secondary flex items-center gap-3">
            <img src={p.images[0]} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <div>
              <p className="font-serif">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.neighborhood}, {p.city}</p>
            </div>
          </div>
        )}
        <div className="mt-6 px-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-1"><Calendar className="h-3 w-3" /> Day</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setDay(i)}
                className={`shrink-0 w-14 py-3 rounded-2xl border text-center transition ${day === i ? "bg-forest text-cream border-forest" : "border-border"}`}
              >
                <p className="text-[10px] uppercase">{d.toLocaleDateString(undefined, { weekday: "short" })}</p>
                <p className="text-lg font-serif">{d.getDate()}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 px-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-1"><Clock className="h-3 w-3" /> Time</p>
          <div className="grid grid-cols-3 gap-2">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`py-2.5 rounded-xl border text-sm ${time === t ? "bg-forest text-cream border-forest" : "border-border"}`}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="mt-6 px-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-1"><MessageSquare className="h-3 w-3" /> Note to owner (optional)</p>
          <textarea rows={3} placeholder="Anything they should know?" className="w-full rounded-2xl bg-secondary p-4 text-sm outline-none" />
        </div>

        <div className="p-5 mt-2">
          <button
            onClick={() => {
              toast.success("Visit requested", { description: `${days[day].toLocaleDateString()} at ${time}` });
              nav({ to: "/applications" });
            }}
            className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-medium"
          >
            Request visit
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
