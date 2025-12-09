import { Lock, Sparkles, Zap, Code2, Globe, Shield, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type DocSection = {
  id: string;
  title: string;
  content: React.ReactNode;
  codeBlocks?: {
    title: string;
    filename?: string;
    language: string;
    code: string;
    description?: string;
  }[];
};

export type DocPage = {
  title: string;
  subtitle: string;
  updatedAt: string;
  version?: string;
  sections: DocSection[];
};

export const docsContent: Record<string, DocPage> = {
  // Getting Started
  "/docs": {
    title: "Introduction",
    subtitle: "Welcome to the DevDocs API. Build powerful communication and AI experiences with our unified platform.",
    updatedAt: "Dec 9, 2025",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: (
          <div className="space-y-4">
            <p className="text-xl text-muted-foreground leading-relaxed">
              DevDocs provides a modern, developer-friendly API for SMS, Voice, and AI services. 
              Our platform is designed to be composable, reliable, and easy to integrate.
            </p>
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
                  <Zap className="w-4 h-4 text-primary" />
                  Messaging
                </div>
                <p className="text-sm text-muted-foreground">Send and receive SMS/MMS globally with high deliverability.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                 <div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  AI Assistants
                </div>
                <p className="text-sm text-muted-foreground">Build conversational AI agents that can speak and text.</p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Install SDK",
            filename: "terminal",
            language: "bash",
            code: "npm install @devdocs/sdk\n# or\npip install devdocs",
            description: "Get started by installing our official SDKs."
          }
        ]
      },
      {
        id: "base-url",
        title: "Base URL",
        content: (
           <div className="space-y-4">
             <p className="text-muted-foreground">All API requests should be made to our base URL:</p>
             <div className="flex items-center gap-2 bg-secondary/50 p-3 rounded-md border border-border font-mono text-sm">
               <Globe className="w-4 h-4 text-muted-foreground" />
               <span className="text-primary">https://api.devdocs.com/v2</span>
             </div>
           </div>
        ),
        codeBlocks: [
           {
            title: "Health Check",
            language: "bash",
            code: "curl https://api.devdocs.com/v2/ping",
            description: "Verify connectivity to our API."
          }
        ]
      }
    ]
  },

  "/docs/auth": {
    title: "Authentication",
    subtitle: "Secure your API requests with API Keys.",
    updatedAt: "Dec 1, 2025",
    sections: [
      {
        id: "api-keys",
        title: "API Keys",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              DevDocs uses API keys to authenticate requests. You can view and manage your API keys in the Dashboard.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3">
              <Lock className="w-5 h-5 text-yellow-500 shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold text-yellow-500 text-sm">Keep your keys secret</p>
                <p className="text-sm text-yellow-500/80">Never share your API keys in client-side code or public repositories.</p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Authentication Header",
            language: "javascript",
            code: `const client = new DevDocs({
  apiKey: process.env.DEVDOCS_API_KEY
});`,
            description: "Initialize the client with your API key."
          },
          {
            title: "Raw HTTP",
            language: "http",
            code: `Authorization: Bearer YOUR_API_KEY`,
            description: "Pass the key in the Authorization header."
          }
        ]
      }
    ]
  },

  // Messaging
  "/docs/sms": {
    title: "Send SMS",
    subtitle: "Programmatically send text messages to any number worldwide.",
    updatedAt: "Nov 28, 2025",
    version: "v2.1",
    sections: [
      {
        id: "send-message",
        title: "Send a Message",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Send a message to a specific phone number. The message can be an SMS, MMS, or WhatsApp message depending on the content and sender.
            </p>
             <div className="flex items-center gap-2 my-4">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">POST</Badge>
                <code className="text-sm font-mono">/messages</code>
             </div>
             <h3 className="font-semibold text-foreground mt-6 mb-2">Parameters</h3>
             <ul className="space-y-4">
               <li className="grid grid-cols-[100px_1fr] gap-4 text-sm">
                 <code className="text-primary">to</code>
                 <span className="text-muted-foreground">The destination phone number in E.164 format (e.g., +15550001234).</span>
               </li>
               <li className="grid grid-cols-[100px_1fr] gap-4 text-sm">
                 <code className="text-primary">from</code>
                 <span className="text-muted-foreground">Your DevDocs phone number or Sender ID.</span>
               </li>
               <li className="grid grid-cols-[100px_1fr] gap-4 text-sm">
                 <code className="text-primary">text</code>
                 <span className="text-muted-foreground">The body of the message. Max 1600 characters.</span>
               </li>
             </ul>
          </div>
        ),
        codeBlocks: [
          {
            title: "Request",
            language: "javascript",
            code: `const message = await client.messages.create({
  to: '+15558675309',
  from: '+15017250604',
  text: 'Your verification code is 123456'
});

console.log(message.sid);`
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "sid": "SM8760542c864d1a92",
  "status": "queued",
  "to": "+15558675309",
  "from": "+15017250604",
  "body": "Your verification code is 123456"
}`
          }
        ]
      }
    ]
  },

  // Voice
  "/docs/voice": {
    title: "Make a Call",
    subtitle: "Initiate outbound phone calls with programmable voice control.",
    updatedAt: "Oct 15, 2025",
    sections: [
      {
        id: "create-call",
        title: "Create Call",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Start a new phone call to a destination number. You can control the call flow using our Call Control XML (CCXML) or by pointing to a webhook.
            </p>
             <div className="flex items-center gap-2 my-4">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">POST</Badge>
                <code className="text-sm font-mono">/calls</code>
             </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Initiate Call",
            language: "javascript",
            code: `const call = await client.calls.create({
  to: '+14155551212',
  from: '+15017122661',
  url: 'https://demo.devdocs.com/voice.xml'
});`
          }
        ]
      }
    ]
  },

  // AI
  "/docs/ai/assistants": {
    title: "List Assistants",
    subtitle: "Retrieve a list of all AI Assistants configured by the user.",
    updatedAt: "Dec 9, 2025",
    version: "AI v1.0",
    sections: [
      {
        id: "intro",
        title: "Overview",
        content: (
          <div className="space-y-4">
             <p className="text-muted-foreground leading-relaxed">
              Retrieve a list of all AI Assistants configured by the user. 
              This endpoint returns a paginated list of assistants sorted by creation date.
            </p>
            <div className="flex items-center gap-2 my-4">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">GET</Badge>
                <code className="text-sm font-mono">/ai/assistants</code>
             </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "List Request",
            language: "javascript",
            code: `const assistants = await client.ai.assistants.list({
  limit: 20
});

assistants.data.forEach(a => console.log(a.name));`
          }
        ]
      },
      {
        id: "response",
        title: "Response",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Returns a list of Assistant objects containing configuration, tools, and voice settings.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                  <div className="col-span-4">Field</div>
                  <div className="col-span-8">Description</div>
                </div>
                <div className="divide-y divide-border">
                  <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                    <div className="col-span-4 font-mono text-primary">id</div>
                    <div className="col-span-8 text-muted-foreground">Unique identifier for the assistant</div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                    <div className="col-span-4 font-mono text-primary">model</div>
                    <div className="col-span-8 text-muted-foreground">The LLM model ID (e.g. gpt-4)</div>
                  </div>
                   <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                    <div className="col-span-4 font-mono text-primary">tools</div>
                    <div className="col-span-8 text-muted-foreground">Array of enabled tools (webhooks, retrieval, etc)</div>
                  </div>
                </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
             title: "Response Schema",
             language: "json",
             code: `{
  "data": [
    {
      "id": "asst_123",
      "name": "Support Bot",
      "model": "gpt-4",
      "tools": [{"type": "retrieval"}]
    }
  ]
}`
          }
        ]
      }
    ]
  }
};
