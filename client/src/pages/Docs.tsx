import { useRef, useEffect, useState } from "react";
import { DocsLayout } from "@/components/layout/DocsLayout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Globe, Lock, Play, Bot, Copy, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Docs() {
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState("intro");
  const rightColumnRef = useRef<HTMLDivElement>(null);
  
  // Refs for scroll syncing
  const sectionRefs = {
    intro: useRef<HTMLElement>(null),
    auth: useRef<HTMLElement>(null),
    listAssistants: useRef<HTMLElement>(null),
  };

  const codeRefs = {
    intro: useRef<HTMLDivElement>(null),
    auth: useRef<HTMLDivElement>(null),
    listAssistants: useRef<HTMLDivElement>(null),
  };

  // Setup intersection observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            
            // Scroll the right column to the matching code block
            const codeBlock = codeRefs[id as keyof typeof codeRefs]?.current;
            if (codeBlock && rightColumnRef.current) {
              codeBlock.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleAiCopy = () => {
    const content = `
    Docs: List Assistants API
    Endpoint: GET /v2/ai/assistants
    Description: Retrieve a list of all AI Assistants configured by the user.
    Auth: Bearer Token required
    Response: JSON object containing list of assistants with id, name, model, tools, and settings.
    Example Code (Node.js):
    const client = new Telnyx({ apiKey: process.env.TELNYX_API_KEY });
    const list = await client.ai.assistants.list();
    `;
    navigator.clipboard.writeText(content);
    // You would typically show a toast here
  };

  return (
    <DocsLayout>
      <div className="flex flex-col xl:flex-row min-h-[calc(100vh-4rem)]">
        
        {/* Left/Center Content Column */}
        <div className="flex-1 px-8 py-12 max-w-4xl mx-auto xl:mx-0 xl:max-w-none xl:w-[60%] border-r border-border/50">
          <div className="space-y-24">
            
            {/* Header / Intro Section */}
            <section id="intro" ref={sectionRefs.intro} className="space-y-6 scroll-mt-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10 rounded-full px-3 py-1">AI v1.0</Badge>
                  <span className="text-sm text-muted-foreground">Updated Dec 9, 2025</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 text-primary border-primary/20 hover:bg-primary/10 hover:text-primary"
                  onClick={handleAiCopy}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Copy for AI
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>AI</span>
                  <ArrowRight className="w-3 h-3" />
                  <span>Assistants</span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight text-foreground font-sans">
                  List assistants
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Retrieve a list of all AI Assistants configured by the user. 
                  This endpoint returns a paginated list of assistants sorted by creation date.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2 bg-sidebar border border-border rounded-lg p-1.5 pr-4 w-full max-w-md">
                   <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20 rounded ml-1">GET</Badge>
                   <code className="text-sm font-mono text-foreground flex-1">/ai/assistants</code>
                   <Button size="sm" className="h-7 bg-primary text-black hover:bg-primary/90 font-bold">Try it</Button>
                </div>
              </div>
            </section>

            {/* Authorizations Section */}
            <section id="auth" ref={sectionRefs.auth} className="space-y-6 pt-8 border-t border-border/50 scroll-mt-24">
              <h2 className="text-3xl font-bold text-foreground">Authorizations</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                     <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                       <code className="text-primary font-mono font-bold">Authorization</code>
                       <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">header</span>
                       <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-400/20">required</span>
                     </div>
                     <p className="text-sm text-muted-foreground leading-relaxed">
                       Bearer authentication header of the form <code className="text-foreground bg-secondary px-1 py-0.5 rounded">Bearer &lt;token&gt;</code>, where <code className="text-foreground bg-secondary px-1 py-0.5 rounded">&lt;token&gt;</code> is your auth token.
                     </p>
                  </div>
                </div>
              </div>
            </section>

             {/* Response Schema Section */}
             <section id="listAssistants" ref={sectionRefs.listAssistants} className="space-y-8 pt-8 border-t border-border/50 scroll-mt-24">
              <h2 className="text-3xl font-bold text-foreground">Response</h2>
              <p className="text-muted-foreground">Successful Response returns a list of Assistant objects.</p>

              <div className="space-y-6">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
                     <span className="font-mono text-sm font-bold text-green-500">200 OK</span>
                     <span className="text-xs text-muted-foreground font-mono">application/json</span>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {[
                      { name: "data", type: "object[]", desc: "List of assistant objects", req: true },
                      { name: "data.id", type: "string", desc: "Unique identifier for the assistant", req: true },
                      { name: "data.name", type: "string", desc: "The user-friendly name of the assistant", req: true },
                      { name: "data.model", type: "string", desc: "ID of the model to use (e.g. gpt-4)", req: true },
                      { name: "data.tools", type: "array", desc: "List of tools enabled for this assistant", req: false },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 text-sm hover:bg-white/5 transition-colors">
                        <div className="col-span-4 font-mono text-primary truncate" title={row.name}>{row.name}</div>
                        <div className="col-span-3 font-mono text-muted-foreground text-xs">{row.type}</div>
                        <div className="col-span-5 text-muted-foreground flex items-start justify-between gap-2">
                          <span>{row.desc}</span>
                          {row.req && <span className="text-[10px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20">required</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column - Sticky Code Panel */}
        <div className="hidden xl:block w-[40%] bg-[#050505] border-l border-border sticky top-16 h-[calc(100vh-4rem)]">
          <div 
            ref={rightColumnRef} 
            className="h-full overflow-y-auto custom-scrollbar p-8 space-y-32 scroll-smooth"
          >
            
            {/* Intro / Request Code */}
            <div ref={codeRefs.intro} className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                   <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/30 cursor-pointer">JavaScript</Badge>
                   <Badge variant="outline" className="cursor-pointer hover:bg-white/10">Python</Badge>
                   <Badge variant="outline" className="cursor-pointer hover:bg-white/10">cURL</Badge>
                </div>
                <div className="flex gap-2">
                   <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><Copy className="w-3 h-3" /></Button>
                </div>
              </div>
              
              <CodeBlock 
                filename="list_assistants.js"
                language="javascript"
                code={`import Telnyx from 'telnyx';

const client = new Telnyx({
  apiKey: process.env.TELNYX_API_KEY
});

// Retrieve list of all assistants
const assistantsList = await client.ai.assistants.list();

console.log(assistantsList.data);`}
              />
            </div>

            {/* Auth Code Placeholders (if any specific auth code needed, usually handled globally) */}
             <div ref={codeRefs.auth} className="space-y-4 opacity-50 hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider font-mono">
                 <Lock className="w-3 h-3" /> Auth Header
               </div>
               <CodeBlock 
                 language="bash"
                 code={`Authorization: Bearer <YOUR_API_KEY>`}
               />
             </div>


             {/* Response Code */}
             <div ref={codeRefs.listAssistants} className="space-y-4">
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                  <span className="text-sm font-medium text-foreground">Response</span>
                </div>
                <span className="text-xs font-mono text-green-500 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">200 OK</span>
              </div>
              <CodeBlock 
                language="json"
                className="max-h-[600px] overflow-y-auto"
                code={`{
  "data": [
    {
      "id": "443e2645-8137-4d1a-8260-062402170327",
      "name": "Support Bot",
      "created_at": "2023-11-07T05:31:56Z",
      "model": "gpt-4",
      "instructions": "You are a helpful support assistant.",
      "description": "Tier 1 Customer Support",
      "tools": [
        {
          "type": "webhook",
          "webhook": {
            "name": "check_order",
            "url": "https://api.store.com/orders",
            "method": "GET"
          }
        }
      ],
      "voice_settings": {
        "voice": "alloy",
        "voice_speed": 1.0
      }
    }
  ]
}`}
              />
            </div>

          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
