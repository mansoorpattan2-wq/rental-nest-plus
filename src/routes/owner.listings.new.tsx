import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame, TopBar } from "@/components/AppShell";
import { Upload, Video, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/owner/listings/new")({
  component: NewListing,
});

const steps = ["Basics", "Media", "Terms", "Publish"];

function NewListing() {
  const [step, setStep] = useState(0);
  const nav = useNavigate();
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-6">
        <TopBar back="/owner/listings" subtitle={`Step ${step + 1} of ${steps.length}`} title="New listing" />
        <div className="px-5 flex gap-1 mb-6">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1 rounded-full ${i <= step ? "bg-forest" : "bg-border"}`} />
              <p className={`text-[10px] uppercase tracking-widest mt-1.5 ${i === step ? "text-forest font-medium" : "text-muted-foreground"}`}>{s}</p>
            </div>
          ))}
        </div>

        <div className="px-5 space-y-4">
          {step === 0 && (
            <>
              <Field label="Title" placeholder="e.g. The Arches Loft" />
              <Field label="Address" placeholder="Street, city" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Monthly rent" placeholder="$" />
                <Field label="Deposit" placeholder="$" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Type</p>
                <div className="grid grid-cols-4 gap-2">
                  {["Home", "Room", "Office", "Store"].map((t) => (
                    <button key={t} className="py-2.5 rounded-xl border border-border text-xs hover:bg-secondary">{t}</button>
                  ))}
                </div>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center">
                <Upload className="h-6 w-6 mx-auto text-forest" />
                <p className="mt-3 text-sm font-medium">Add photos</p>
                <p className="text-xs text-muted-foreground">JPG or PNG · up to 20 images</p>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center">
                <Video className="h-6 w-6 mx-auto text-ochre" />
                <p className="mt-3 text-sm font-medium">Upload a video walkthrough</p>
                <p className="text-xs text-muted-foreground">MP4 up to 200MB · powers virtual tour</p>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <Field label="Available from" placeholder="e.g. Aug 1, 2026" />
              <Field label="Lease duration" placeholder="e.g. 12 months" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {["Wi-Fi", "Laundry", "Elevator", "Parking", "Heating", "A/C", "Pets", "Furnished"].map((a) => (
                    <button key={a} className="px-3 py-1.5 rounded-full border border-border text-xs hover:bg-forest hover:text-cream hover:border-forest transition">{a}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">House rules</p>
                <textarea rows={3} className="w-full rounded-2xl bg-secondary p-4 text-sm outline-none" placeholder="No smoking, quiet hours…" />
              </div>
            </>
          )}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-forest text-cream grid place-items-center mx-auto"><Check className="h-6 w-6" /></div>
              <h3 className="display text-2xl mt-4">Ready to publish</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">We'll review your listing within 24h and notify you when it goes live.</p>
            </div>
          )}
        </div>

        <div className="px-5 pt-6 flex gap-2">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="flex-1 py-3.5 rounded-full border border-border text-sm">Back</button>
          )}
          <button
            onClick={() => {
              if (step === steps.length - 1) {
                toast.success("Listing submitted for review");
                nav({ to: "/owner/listings" });
              } else setStep(step + 1);
            }}
            className="flex-1 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
          >
            {step === steps.length - 1 ? "Publish" : "Continue"}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input placeholder={placeholder} className="mt-1.5 w-full h-12 rounded-2xl bg-secondary px-4 text-sm outline-none focus:bg-background focus:ring-1 focus:ring-ring" />
    </div>
  );
}
