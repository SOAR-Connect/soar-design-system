import { Users, Shield, Mail, Activity, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { accentVar, type AccentColor } from "../_data/shared";

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-8">
      <div className="flex flex-col gap-6">
        <header className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-overline text-muted-foreground">Admin · soar.com</p>
            <h1 className="text-h1 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Admin dashboard</h1>
          </div>
          <ThemeToggle />
        </header>
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Users",       value: "2,341", icon: Users },
            { label: "Beta access", value: "147",   icon: Shield },
            { label: "Active today",value: "892",   icon: Activity },
            { label: "Pending invites", value: "23",icon: Mail },
          ].map((s) => (
            <Card key={s.label} className="rounded-2xl p-5">
              <div className="flex items-center gap-2"><s.icon className="size-4 text-primary" /><p className="flex-1 text-small-medium text-muted-foreground">{s.label}</p></div>
              <p className="mt-2 text-h2 text-card-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{s.value}</p>
            </Card>
          ))}
        </div>
        <Card className="overflow-hidden rounded-2xl">
          <header className="flex items-center justify-between px-6 pt-5 pb-3">
            <h3 className="text-body-lg-medium text-card-foreground">Recent users</h3>
            <Button size="sm"><Plus /> Invite user</Button>
          </header>
          <ul className="divide-y divide-border/50">
            {([
              { initials: "JM", accent: "indigo" as AccentColor, name: "Jordan Maxwell", email: "jordan@sequoia.com", role: "Member", status: "Active" },
              { initials: "AK", accent: "rose"   as AccentColor, name: "Anya Krishnan",  email: "anya@reframe.io",   role: "Admin",  status: "Active" },
              { initials: "SP", accent: "green"  as AccentColor, name: "Sam Patel",      email: "sam@plaid.com",     role: "Member", status: "Pending" },
              { initials: "LV", accent: "amber"  as AccentColor, name: "Lena Voss",      email: "lena@notion.so",    role: "Member", status: "Active" },
            ]).map((u) => (
              <li key={u.email} className="flex items-center gap-3 px-6 py-3">
                <Avatar size="md" style={{ background: accentVar(u.accent) }}><AvatarFallback className="bg-transparent text-white">{u.initials}</AvatarFallback></Avatar>
                <div className="flex min-w-0 flex-1 flex-col"><p className="truncate text-body-sm-medium text-card-foreground">{u.name}</p><p className="truncate text-caption text-muted-foreground">{u.email}</p></div>
                <Badge variant="outline" className="rounded-full">{u.role}</Badge>
                <Badge variant={u.status === "Active" ? "success" : "warning"} className="rounded-full">{u.status}</Badge>
                <Button variant="ghost" size="sm">Manage</Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </main>
  );
}
