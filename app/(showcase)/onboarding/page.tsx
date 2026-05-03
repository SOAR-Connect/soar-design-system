"use client";

import * as React from "react";
import { ArrowRight, Check, Mail, Calendar, MessageSquare, Users, Phone, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const steps = [
  { id: "welcome",   label: "Welcome" },
  { id: "personal",  label: "Personal info" },
  { id: "email",     label: "Email" },
  { id: "calendar",  label: "Calendar" },
  { id: "socials",   label: "Socials" },
  { id: "messaging", label: "Messaging" },
  { id: "contacts",  label: "Contacts" },
  { id: "calls",     label: "Calls" },
  { id: "done",      label: "Done" },
] as const;

export default function OnboardingPage() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const step = steps[stepIndex];
  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-8 py-8">
      <div className="mb-8 flex items-center gap-2">
        <ThemeToggle />
        <p className="ml-auto text-caption text-muted-foreground">Step {stepIndex + 1} of {steps.length}</p>
      </div>
      <div className="mb-8 flex gap-1">
        {steps.map((s, i) => (
          <div key={s.id} className={cn("h-1 flex-1 rounded-full transition-colors", i <= stepIndex ? "bg-primary" : "bg-muted")} />
        ))}
      </div>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-overline text-muted-foreground">{step.label}</p>
        <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{stepCopy[step.id].title}</h1>
        <p className="text-body text-muted-foreground">{stepCopy[step.id].subtitle}</p>
      </div>
      <div className="flex-1">{renderStep(step.id)}</div>
      <footer className="mt-8 flex items-center gap-3">
        <Button variant="ghost" onClick={back} disabled={stepIndex === 0}>Back</Button>
        <div className="ml-auto flex gap-2">
          {step.id !== "welcome" && step.id !== "done" && <Button variant="outline" onClick={next}>Skip for now</Button>}
          <Button onClick={next} disabled={step.id === "done"}>
            {step.id === "welcome" ? "Get started" : step.id === "done" ? "Finish" : "Continue"} <ArrowRight />
          </Button>
        </div>
      </footer>
    </main>
  );
}

const stepCopy = {
  welcome:   { title: "Welcome to SOAR",            subtitle: "We'll walk you through onboarding and explain why each step matters." },
  personal:  { title: "Tell us about you",          subtitle: "Helps us match you with the right connections and asks." },
  email:     { title: "Connect your email",         subtitle: "We learn from your patterns to surface the most relevant intros." },
  calendar:  { title: "Sync your calendar",         subtitle: "Auto-track meetings and refresh your network proactively." },
  socials:   { title: "Bring in your social graph", subtitle: "Twitter / LinkedIn / GitHub help us recognize who's important to you." },
  messaging: { title: "Connect messaging",          subtitle: "WhatsApp, iMessage, Telegram — the channels where you actually talk." },
  contacts:  { title: "Import your address book",   subtitle: "We dedupe and never reach out without your approval." },
  calls:     { title: "Hook up call history",       subtitle: "Optional — improves recency scoring for inactive connections." },
  done:      { title: "You're set",                 subtitle: "Everything is wired up. Your dashboard is ready." },
} as const;

function renderStep(id: typeof steps[number]["id"]) {
  if (id === "welcome") {
    return (
      <Card className="rounded-2xl p-8 text-center">
        <p className="text-body text-card-foreground">SOAR turns your scattered relationship data into a private, queryable network. You'll never lose another connection.</p>
      </Card>
    );
  }
  if (id === "personal") {
    return (
      <Card className="rounded-2xl p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" placeholder="Irene" />
          <Field label="Last name" placeholder="Stravinsky" />
          <Field label="Email" placeholder="you@company.com" colSpan />
          <Field label="Title" placeholder="Founder & CEO" />
          <Field label="Company" placeholder="Stravinsky & Co." />
        </div>
      </Card>
    );
  }
  if (id === "done") {
    return (
      <Card className="rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-status-success text-primary-foreground"><Check className="size-8" /></div>
        <p className="text-h3 text-card-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>You're set, Irene</p>
        <p className="mt-2 text-body text-muted-foreground">Your network is being indexed. We'll notify you when your dashboard is ready.</p>
      </Card>
    );
  }
  const Icon = { email: Mail, calendar: Calendar, socials: Hash, messaging: MessageSquare, contacts: Users, calls: Phone }[id]!;
  const providers = {
    email:     ["Gmail", "Outlook", "Fastmail", "Other IMAP"],
    calendar:  ["Google Calendar", "Outlook", "iCloud", "Cal.com"],
    socials:   ["LinkedIn", "X (Twitter)", "GitHub", "Bluesky"],
    messaging: ["WhatsApp", "iMessage", "Telegram", "Signal"],
    contacts:  ["Google Contacts", "iCloud Contacts", "CSV upload", "Salesforce"],
    calls:     ["Aircall", "Dialpad", "Zoom Phone", "Skip"],
  }[id]!;
  return (
    <Card className="rounded-2xl p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {providers.map((p) => (
          <button key={p} className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-muted">
            <Icon className="size-5 text-muted-foreground" />
            <span className="flex-1 text-body-medium text-foreground">{p}</span>
            <ArrowRight className="size-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </Card>
  );
}

function Field({ label, placeholder, colSpan }: { label: string; placeholder: string; colSpan?: boolean }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={colSpan ? "sm:col-span-2" : ""}>
      <Label htmlFor={id} className="mb-1.5 block">{label}</Label>
      <Input id={id} placeholder={placeholder} />
    </div>
  );
}
