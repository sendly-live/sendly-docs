import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  Search,
  Zap,
  Settings,
  Book,
  Code2,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const TOP_NAV = [
  { name: "Guides", href: "/docs" },
  { name: "Development", href: "/docs/development" },
  { name: "API reference", href: "/docs/api" },
];

const SIDE_NAV = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs" },
      { name: "Quickstart", href: "/docs/quickstart" },
      { name: "Authentication", href: "/docs/auth" },
    ]
  },
  {
    title: "Messaging API",
    items: [
      { name: "Send SMS", href: "/docs/sms" },
      { name: "Receive SMS", href: "/docs/receive-sms" },
      { name: "Message Status", href: "/docs/status" },
    ]
  },
  {
    title: "AI & Assistants",
    items: [
      { name: "List Assistants", href: "/docs/ai/assistants" },
      { name: "Create Assistant", href: "/docs/ai/create" },
      { name: "Embeddings", href: "/docs/ai/embeddings" },
    ]
  },
  {
    title: "Voice API",
    items: [
      { name: "Make a Call", href: "/docs/voice" },
      { name: "Call Control", href: "/docs/call-control" },
      { name: "Webhooks", href: "/docs/webhooks" },
    ]
  },
];

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="px-4 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search docs..." 
            className="pl-9 bg-sidebar-accent border-sidebar-border focus:border-primary text-sm h-10"
          />
          <kbd className="absolute right-3 top-2.5 text-[10px] text-muted-foreground border border-sidebar-border rounded px-1.5 py-0.5 bg-sidebar">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
        {SIDE_NAV.map((section, i) => (
          <div key={i}>
            <h4 className="mb-3 text-sm font-mono font-semibold text-primary uppercase tracking-wider">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link key={item.href} href={item.href} className={cn(
                    "block px-3 py-2 text-sm rounded-md transition-colors",
                    location === item.href 
                      ? "bg-sidebar-accent text-primary font-medium border-l-2 border-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                  )}>
                    {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
            <span className="font-bold text-xs">JS</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Logged in as Dev</p>
            <p className="text-xs text-muted-foreground truncate">Free Tier</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:opacity-80 transition-opacity">
            <Zap className="w-6 h-6 text-primary fill-primary" />
            <span>DevDocs</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {TOP_NAV.map((item) => (
              <Link key={item.name} href={item.href} className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                location.startsWith(item.href) && item.href !== "/" 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button className="hidden md:flex bg-primary text-black hover:bg-primary/90 font-bold h-9 px-4 text-sm">
            Sign Up
          </Button>
          <div className="lg:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80 bg-sidebar border-r border-sidebar-border">
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
        <main className="flex-1 lg:pl-72 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
