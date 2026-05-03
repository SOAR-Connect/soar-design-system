import { ShowcaseSidebar } from "./_components/sidebar";

/**
 * Showcase route group layout — wraps every /dashboard-v2, /asks,
 * /connections, /inbox, /notifications, /profile route with the persistent
 * sidebar. Pages just render their main content.
 */
export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <ShowcaseSidebar />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
