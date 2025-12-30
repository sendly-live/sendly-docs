import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, Search, Zap, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { DocsSearch, useDocsSearch } from "@/components/docs/DocsSearch";

const TOP_NAV = [
  { name: "Guides", href: "/docs" },
  { name: "API Reference", href: "/docs/api" },
];

const SIDE_NAV = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs" },
      { name: "Quickstart", href: "/docs/quickstart" },
      { name: "Going Live", href: "/docs/going-live" },
      { name: "Authentication", href: "/docs/auth" },
      { name: "SDKs", href: "/docs/sdks" },
    ],
  },
  {
    title: "Messaging",
    items: [
      { name: "Send SMS", href: "/docs/sms" },
      { name: "List Messages", href: "/docs/messages" },
      { name: "Scheduled Messages", href: "/docs/scheduled" },
      { name: "Batch Messages", href: "/docs/batch" },
      { name: "Webhooks", href: "/docs/webhooks" },
    ],
  },
  {
    title: "Credits & Billing",
    items: [
      { name: "Get Balance", href: "/docs/credits" },
      { name: "Credit Packages", href: "/docs/packages" },
    ],
  },
  {
    title: "API Keys",
    items: [{ name: "Manage Keys", href: "/docs/keys" }],
  },
  {
    title: "Reference",
    items: [
      { name: "Rate Limits", href: "/docs/rate-limits" },
      { name: "Error Codes", href: "/docs/errors" },
      { name: "Sandbox Testing", href: "/docs/sandbox" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "CLI", href: "/docs/cli" },
      { name: "LLM Integration", href: "/docs/llms" },
    ],
  },
];

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useUser();
  const { open: searchOpen, setOpen: setSearchOpen } = useDocsSearch();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="px-4 py-6">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center gap-2 px-3 h-10 text-sm text-muted-foreground bg-sidebar-accent border border-sidebar-border rounded-md hover:border-primary/50 hover:text-foreground transition-colors"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search docs...</span>
          <kbd className="text-[10px] border border-sidebar-border rounded px-1.5 py-0.5 bg-sidebar">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
        {SIDE_NAV.map((section, i) => (
          <div key={i}>
            <h4 className="mb-3 text-sm font-mono font-semibold text-primary uppercase tracking-wider">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-md transition-colors",
                    location === item.href
                      ? "bg-sidebar-accent text-primary font-medium border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/10">
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserButton
              afterSignOutUrl="/docs"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.firstName ||
                  user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
                  "Developer"}
              </p>
              <Link
                href="/dashboard"
                className="text-xs text-primary hover:underline"
              >
                Go to Dashboard
              </Link>
            </div>
            <Link href="/settings">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Sign In to Get API Key
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-foreground hover:opacity-80 transition-opacity"
          >
            <Zap className="w-6 h-6 text-primary fill-primary" />
            <span>Sendly</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {TOP_NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  location.startsWith(item.href) && item.href !== "/"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="hidden md:flex hover:text-primary hover:bg-primary/10"
              >
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-9 px-4 text-sm">
                Get API Key <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="hidden md:flex hover:text-primary hover:bg-primary/10"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton
              afterSignOutUrl="/docs"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>
          <div className="lg:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-full sm:w-80 bg-sidebar border-r border-sidebar-border"
              >
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 fixed inset-y-0 top-16 z-40 bg-sidebar border-r border-sidebar-border">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-72 w-full">{children}</main>
      </div>

      {/* Search Dialog */}
      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
