import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Apple, Mail, Lock, User as UserIcon } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup"]).default("signup"),
});

export const Route = createFileRoute("/auth")({
  component: Auth,
  validateSearch: searchSchema,
});

function Auth() {
  const { mode } = Route.useSearch();
  const nav = useNavigate();
  const [role, setRole] = useState<"tenant" | "owner">("tenant");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: role === "owner" ? "/owner" : "/home" });
  };

  return (
    <div className="min-h-screen w-full bg-[oklch(0.94_0.02_85)] flex items-start md:items-center justify-center md:py-10">
      <div className="w-full max-w-[440px] min-h-screen md:min-h-[900px] md:h-[900px] md:rounded-[2.5rem] bg-background overflow-hidden relative flex flex-col md:shadow-lift md:border md:border-border p-7">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-full bg-forest text-cream grid place-items-center font-serif">N</div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">NestSphere</p>
        </div>

        <h1 className="display text-4xl leading-tight">
          {mode === "signup" ? "Create your account." : "Welcome back."}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signup" ? "Two minutes. That's it." : "Sign in to continue."}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-1 p-1 rounded-full bg-secondary">
          {(["tenant", "owner"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`py-2 text-sm rounded-full transition-all ${role === r ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
            >
              I'm a {r}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-3">
          {mode === "signup" && (
            <Field icon={UserIcon} placeholder="Full name" />
          )}
          <Field icon={Mail} placeholder="Email address" type="email" />
          <Field icon={Lock} placeholder="Password" type="password" />

          <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-medium mt-2">
            {mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-full border border-border py-3 text-sm flex items-center justify-center gap-2 hover:bg-muted transition">
            <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="currentColor" d="M21.35 11.1H12v3.2h5.35c-.23 1.4-1.65 4.1-5.35 4.1-3.22 0-5.85-2.66-5.85-5.95S8.78 6.5 12 6.5c1.83 0 3.06.78 3.76 1.45l2.57-2.48C16.7 3.87 14.55 3 12 3 6.98 3 3 6.98 3 12s3.98 9 9 9c5.2 0 8.63-3.65 8.63-8.8 0-.59-.06-1.03-.13-1.1z"/></svg>
            Google
          </button>
          <button className="rounded-full border border-border py-3 text-sm flex items-center justify-center gap-2 hover:bg-muted transition">
            <Apple className="h-4 w-4" /> Apple
          </button>
        </div>

        <p className="mt-auto pt-6 text-center text-xs text-muted-foreground">
          {mode === "signup" ? (
            <>Already have an account? <Link to="/auth" search={{ mode: "signin" }} className="text-forest font-medium underline underline-offset-4">Sign in</Link></>
          ) : (
            <>New to NestSphere? <Link to="/auth" search={{ mode: "signup" }} className="text-forest font-medium underline underline-offset-4">Create an account</Link></>
          )}
        </p>
      </div>
    </div>
  );
}

function Field({ icon: Icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="relative">
      <Icon className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        {...props}
        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-secondary border border-transparent focus:border-ring focus:bg-background outline-none text-sm transition"
      />
    </div>
  );
}
