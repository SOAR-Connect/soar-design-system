"use client";

import * as React from "react";
import { User, Mail, Bell, Lock, Calendar, Hash, MessageSquare, BookUser, Phone, Users, CreditCard, Circle, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { user } from "../_data/shared";
import { cn } from "@/lib/utils";

const settingsNav = [
  { section: "Account", items: [
    { id: "personal",     label: "Personal info",  icon: User,         active: true },
    { id: "email",        label: "Email",          icon: Mail },
    { id: "notifications",label: "Notifications",  icon: Bell },
    { id: "security",     label: "Security",       icon: Lock },
  ]},
  { section: "Integrations", items: [
    { id: "calendar",     label: "Calendar",       icon: Calendar },
    { id: "socials",      label: "Socials",        icon: Hash },
    { id: "messaging",    label: "Messaging",      icon: MessageSquare },
    { id: "address-book", label: "Address book",   icon: BookUser },
    { id: "calls",        label: "Calls",          icon: Phone },
  ]},
  { section: "Workspace", items: [
    { id: "team",    label: "Team members", icon: Users },
    { id: "billing", label: "Billing",      icon: CreditCard },
  ]},
] as const;

export default function ProfilePage() {
  return (
    <div className="grid h-full flex-1 grid-cols-[256px_1fr] overflow-hidden">
      <aside className="flex h-screen flex-col gap-1 overflow-y-auto border-r border-border bg-background p-3">
        <header className="px-3 py-3">
          <h2 className="text-h3 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Settings</h2>
          <p className="text-caption text-muted-foreground">Manage your account</p>
        </header>
        {settingsNav.map((group) => (
          <div key={group.section} className="mb-2">
            <p className="px-3 py-1 text-overline text-muted-foreground">{group.section}</p>
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = "active" in item && item.active;
              return (
                <button key={item.id} className={cn("flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-body-sm transition-colors", active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                  {active ? <Circle className="size-3 fill-current" /> : <Icon className="size-4" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </aside>
      <main className="overflow-y-auto px-10 py-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <header className="flex items-end gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Personal information</h1>
              <p className="text-body-sm text-muted-foreground">Update your profile and how others see you on SOAR.</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost">Discard</Button>
              <Button>Save changes</Button>
            </div>
          </header>
          <Card className="flex items-center gap-4 rounded-2xl p-5">
            <Avatar size="xl" style={{ background: "var(--accent-indigo)" }}>
              <AvatarFallback className="bg-transparent text-h4 text-white">{user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-body-medium text-card-foreground">Profile photo</p>
              <p className="text-caption text-muted-foreground">JPG, PNG or SVG. Max 2MB. Square images work best.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Remove</Button>
              <Button>Upload new</Button>
            </div>
          </Card>
          <Card className="rounded-2xl p-6">
            <header className="mb-6">
              <h3 className="text-body-lg-medium text-card-foreground">Profile details</h3>
              <p className="text-caption text-muted-foreground">This information will be shown on your public profile.</p>
            </header>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="First name" defaultValue="Irene" />
              <FormField label="Last name" defaultValue="Stravinsky" />
              <div className="sm:col-span-2">
                <Label htmlFor="email" className="mb-1.5 block">Email</Label>
                <div className="relative">
                  <Input id="email" type="email" defaultValue="irene@soar.com" className="pr-9" />
                  <Check className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-status-success" />
                </div>
                <p className="mt-1 text-caption text-muted-foreground">Verified — used for sign-in and notifications</p>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="phone" className="mb-1.5 block">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+1 (415) 555-0142" />
                <p className="mt-1 text-caption text-muted-foreground">Used for SMS reminders only</p>
              </div>
              <FormField label="Title" defaultValue="Founder & CEO" />
              <FormField label="Company" defaultValue="Stravinsky & Co." />
              <FormField label="Location" defaultValue="New York, NY" />
              <FormField label="Website" defaultValue="stravinsky.co" />
              <div className="sm:col-span-2">
                <Label htmlFor="bio" className="mb-1.5 block">Bio</Label>
                <Input id="bio" defaultValue="Building tools for relationship-driven networks. Previously founded two B2B SaaS companies. Investor-backed by Sequoia and A16z." />
                <p className="mt-1 text-caption text-muted-foreground">240 characters · helps connections find you</p>
              </div>
            </div>
          </Card>
          <Card className="rounded-2xl p-6">
            <header className="mb-4 flex items-center gap-2">
              <h3 className="text-body-lg-medium text-card-foreground">Public profile preview</h3>
              <Button variant="outline" size="sm" className="ml-auto">View public profile</Button>
            </header>
            <div className="flex items-center gap-4">
              <Avatar size="xl" style={{ background: "var(--accent-indigo)" }}>
                <AvatarFallback className="bg-transparent text-h4 text-white">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-body-lg-medium text-card-foreground">{user.name}</p>
                <p className="text-body-sm text-muted-foreground">Founder &amp; CEO at Stravinsky &amp; Co. · New York, NY</p>
                <div className="flex gap-4 text-body-sm text-muted-foreground">
                  <span><strong className="font-medium text-foreground">320</strong> connections</span>
                  <span><strong className="font-medium text-foreground">96</strong> SOAR score</span>
                  <span><strong className="font-medium text-foreground">14</strong> mutual</span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="rounded-2xl border-destructive/50 p-6">
            <header className="mb-4">
              <h3 className="text-body-lg-medium text-destructive">Danger zone</h3>
              <p className="text-caption text-muted-foreground">Permanent actions. These cannot be undone.</p>
            </header>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <p className="text-body-sm-medium text-card-foreground">Delete account</p>
                <p className="text-caption text-muted-foreground">Permanently remove your account, asks, connections, and history.</p>
              </div>
              <Button variant="destructive" className="ml-auto">Delete account</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function FormField({ label, defaultValue }: { label: string; defaultValue: string }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block">{label}</Label>
      <Input id={id} defaultValue={defaultValue} />
    </div>
  );
}
