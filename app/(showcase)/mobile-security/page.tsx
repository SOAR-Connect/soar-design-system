import { Fingerprint, Bell, Contact, Lock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MobileSecurityPage() {
  return (
    <main className="mx-auto w-full max-w-md flex-1 px-6 py-8">
      <div className="mb-6 flex justify-end"><ThemeToggle /></div>
      <Card className="rounded-3xl p-8 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"><Fingerprint className="size-8" /></div>
        <h1 className="mb-2 text-h2 text-foreground" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>Activate Face ID</h1>
        <p className="mb-6 text-body-sm text-muted-foreground">Unlock SOAR with Face ID for instant, secure access without typing your password.</p>
        <div className="flex flex-col gap-2"><Button>Activate</Button><Button variant="ghost">Maybe later</Button></div>
      </Card>
      <p className="mt-8 mb-3 text-overline text-muted-foreground">Other primers</p>
      <div className="flex flex-col gap-3">
        {[
          { icon: Lock,    title: "Biometric lock screen",  body: "Re-prompt Face ID after 5 minutes inactive." },
          { icon: Bell,    title: "Push permission",        body: "Real-time alerts when responses arrive." },
          { icon: Contact, title: "Contacts permission",    body: "Auto-import your address book to seed your network." },
        ].map((p) => (
          <Card key={p.title} className="flex items-center gap-3 rounded-2xl p-4">
            <p.icon className="size-5 text-primary" />
            <div className="flex min-w-0 flex-1 flex-col"><p className="text-body-sm-medium text-card-foreground">{p.title}</p><p className="text-caption text-muted-foreground">{p.body}</p></div>
            <ArrowRight className="size-4 text-muted-foreground" />
          </Card>
        ))}
      </div>
    </main>
  );
}
