import { useRef, useEffect, useState } from "react";
import { DocsLayout } from "@/components/layout/DocsLayout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Lock,
  ToggleLeft,
  ToggleRight,
  Check,
} from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { docsContent } from "@/data/docsContent";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Docs() {
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");
  const [smartScrollEnabled, setSmartScrollEnabled] = useState(false);
  const [aiCopied, setAiCopied] = useState(false);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  // Get content based on current path
  const currentPath = location === "/docs/" ? "/docs" : location;
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
    if (!smartScrollEnabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);

            const codeBlock = codeRefs.current[id];
            if (codeBlock && rightColumnRef.current) {
              // Using scrollIntoView with smooth behavior can sometimes be jumpy if
              // multiple intersections happen quickly.
              // For smoother experience, we can use a custom smooth scroll or ensure
              // we debounce these calls, but the native API is usually fine if not spamming.
              codeBlock.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" },
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [pageContent, smartScrollEnabled]);

  const handleAiCopy = () => {
    if (!pageContent) return;

    const extractTextFromReactNode = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (typeof node === "number") return String(node);
      if (!node) return "";
      if (Array.isArray(node))
        return node.map(extractTextFromReactNode).join("");
      if (typeof node === "object" && "props" in node) {
        const element = node as React.ReactElement<{
          children?: React.ReactNode;
        }>;
        if (element.props?.children) {
          return extractTextFromReactNode(element.props.children);
        }
      }
      return "";
    };

    const sections = pageContent.sections
      .map((section) => {
        let sectionText = `## ${section.title}\n\n`;
        sectionText += extractTextFromReactNode(section.content) + "\n";

        if (section.codeBlocks && section.codeBlocks.length > 0) {
          section.codeBlocks.forEach((block) => {
            if (block.description) {
              sectionText += `\n${block.description}\n`;
            }
            sectionText += `\n\`\`\`${block.language}\n${block.code}\n\`\`\`\n`;
          });
        }
        return sectionText;
      })
      .join("\n---\n\n");

    const summary = `# ${pageContent.title}

${pageContent.subtitle}

Base URL: https://sendly.live/api

${sections}

---
Documentation: https://sendly.live/docs
`;

    navigator.clipboard.writeText(summary);
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2000);
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
                  <Badge
                    variant="outline"
                    className="text-primary border-primary/50 bg-primary/10 rounded-full px-3 py-1"
                  >
                    {pageContent.version || "v2.0"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Updated {pageContent.updatedAt}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden xl:flex items-center gap-2">
                    <Switch
                      id="smart-scroll"
                      checked={smartScrollEnabled}
                      onCheckedChange={setSmartScrollEnabled}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label
                      htmlFor="smart-scroll"
                      className="text-xs text-muted-foreground cursor-pointer"
                    >
                      Smart Scroll
                    </Label>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-2 border-primary/20 hover:bg-primary/10 ${aiCopied ? "text-green-500 border-green-500/20" : "text-primary hover:text-primary"}`}
                    onClick={handleAiCopy}
                  >
                    {aiCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        Copy for AI
                      </>
                    )}
                  </Button>
                </div>
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
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className={`space-y-6 scroll-mt-24 ${index !== 0 ? "pt-8 border-t border-border/50" : ""}`}
              >
                <h2 className="text-3xl font-bold text-foreground">
                  {section.title}
                </h2>
                <div className="text-foreground/90">{section.content}</div>
                {/* Inline code blocks for smaller screens (hidden on xl where right panel shows) */}
                {section.codeBlocks && section.codeBlocks.length > 0 && (
                  <div className="xl:hidden mt-6 space-y-4 bg-[#050505] rounded-lg p-4 border border-border">
                    {section.codeBlocks.map((block, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            {block.title}
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-primary/20 text-primary border-primary/20"
                          >
                            {block.language}
                          </Badge>
                        </div>
                        <CodeBlock
                          filename={block.filename}
                          language={block.language}
                          code={block.code}
                        />
                        {block.description && (
                          <p className="text-xs text-muted-foreground italic">
                            {block.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
                ref={(el) => {
                  codeRefs.current[section.id] = el;
                }}
                className={`space-y-4 transition-all duration-300 ${activeSection === section.id ? "opacity-100" : "opacity-40"}`}
              >
                {section.codeBlocks?.map((block, i) => (
                  <div key={i} className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {block.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-primary/20 text-primary border-primary/20"
                      >
                        {block.language}
                      </Badge>
                    </div>
                    <CodeBlock
                      filename={block.filename}
                      language={block.language}
                      code={block.code}
                    />
                    {block.description && (
                      <p className="text-xs text-muted-foreground italic">
                        {block.description}
                      </p>
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
