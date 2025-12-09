import { useRef, useEffect, useState } from "react";
import { DocsLayout } from "@/components/layout/DocsLayout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Lock } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { docsContent } from "@/data/docsContent";

export default function Docs() {
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");
  const rightColumnRef = useRef<HTMLDivElement>(null);
  
  // Get content based on current path
  // Handle /docs separately or as a key in the map
  const currentPath = location === "/docs/" ? "/docs" : location; 
  // Simple matching: find exact match or default to intro
  const pageContent = docsContent[currentPath] || docsContent["/docs"];

  // Refs for scroll syncing
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const codeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Reset active section when page changes
  useEffect(() => {
    if (pageContent.sections.length > 0) {
      setActiveSection(pageContent.sections[0].id);
    }
    // Scroll top on page change
    window.scrollTo(0, 0);
    if (rightColumnRef.current) rightColumnRef.current.scrollTo(0, 0);
  }, [currentPath, pageContent]);

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            
            const codeBlock = codeRefs.current[id];
            if (codeBlock && rightColumnRef.current) {
              codeBlock.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [pageContent]); // Re-run when content changes

  const handleAiCopy = () => {
    if (!pageContent) return;
    
    const summary = `
    Page: ${pageContent.title} - ${pageContent.subtitle}
    Sections:
    ${pageContent.sections.map(s => `- ${s.title}`).join('\n')}
    `;
    
    navigator.clipboard.writeText(summary);
  };

  if (!pageContent) return null;

  return (
    <DocsLayout>
      <div className="flex flex-col xl:flex-row min-h-[calc(100vh-4rem)]">
        
        {/* Left/Center Content Column */}
        <div className="flex-1 px-8 py-12 max-w-4xl mx-auto xl:mx-0 xl:max-w-none xl:w-[60%] border-r border-border/50">
          <div className="space-y-24">
            
            {/* Page Header */}
            <div className="space-y-6">
               <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10 rounded-full px-3 py-1">
                    {pageContent.version || "v2.0"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Updated {pageContent.updatedAt}</span>
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

              <h1 className="text-5xl font-bold tracking-tight text-foreground font-sans">
                {pageContent.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {pageContent.subtitle}
              </p>
            </div>

            {/* Sections */}
            {pageContent.sections.map((section, index) => (
              <section 
                key={section.id} 
                id={section.id} 
                ref={el => sectionRefs.current[section.id] = el}
                className={`space-y-6 scroll-mt-24 ${index !== 0 ? 'pt-8 border-t border-border/50' : ''}`}
              >
                <h2 className="text-3xl font-bold text-foreground">{section.title}</h2>
                <div className="text-foreground/90">
                  {section.content}
                </div>
              </section>
            ))}

          </div>
        </div>

        {/* Right Column - Sticky Code Panel */}
        <div className="hidden xl:block w-[40%] bg-[#050505] border-l border-border sticky top-16 h-[calc(100vh-4rem)]">
          <div 
            ref={rightColumnRef} 
            className="h-full overflow-y-auto custom-scrollbar p-8 space-y-32 scroll-smooth"
          >
             {pageContent.sections.map((section) => (
                <div 
                  key={section.id} 
                  ref={el => codeRefs.current[section.id] = el}
                  className="space-y-4"
                >
                  {section.codeBlocks?.map((block, i) => (
                    <div key={i} className="space-y-4 pt-4">
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            {block.title}
                          </span>
                          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">
                            {block.language}
                          </Badge>
                       </div>
                       <CodeBlock 
                         filename={block.filename}
                         language={block.language}
                         code={block.code}
                       />
                       {block.description && (
                         <p className="text-xs text-muted-foreground italic">{block.description}</p>
                       )}
                    </div>
                  ))}
                  {/* Empty state placeholder if no code blocks for this section to maintain spacing */}
                  {!section.codeBlocks && <div className="h-24"></div>}
                </div>
             ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
