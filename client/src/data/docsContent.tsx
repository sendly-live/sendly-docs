import {
  Lock,
  Zap,
  Globe,
  Shield,
  ArrowRight,
  MessageSquare,
  CreditCard,
  Key,
  AlertTriangle,
  Clock,
  TestTube,
  Terminal,
  Info,
  Sparkles,
  Code2,
  Book,
  Cpu,
  Phone,
  CheckCircle,
  XCircle,
  Package,
  Webhook,
} from "lucide-react";
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
  "/docs": {
    title: "Introduction",
    subtitle:
      "Welcome to the Sendly SMS API. Send text messages globally with a simple, developer-friendly API.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: (
          <div className="space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sendly provides a modern, developer-friendly API for sending SMS
              messages worldwide. Our platform is designed to be simple,
              reliable, and easy to integrate.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-2 mb-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  SMS Messaging
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Send SMS to 50+ countries with high deliverability.
                  Alphanumeric sender IDs supported for international messaging.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-2 mb-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Pay As You Go
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Simple credit-based pricing. Buy credits and only pay for what
                  you use. No monthly fees.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-2 mb-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <Key className="w-5 h-5 text-primary" />
                  API Keys
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Separate test and live keys. Rotate keys with grace periods.
                  Full control over your integrations.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-2 mb-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <Shield className="w-5 h-5 text-primary" />
                  Sandbox Testing
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Test your integration without sending real messages. Special
                  test phone numbers for different scenarios.
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Quick Start",
            filename: "terminal",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"to": "+15551234567", "text": "Hello from Sendly!", "messageType": "marketing"}'`,
            description: "Send your first SMS in seconds.",
          },
        ],
      },
      {
        id: "base-url",
        title: "Base URL",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              All API requests should be made to our base URL. The API supports
              HTTPS only.
            </p>
            <div className="flex items-center gap-2 bg-secondary/50 p-4 rounded-md border border-border font-mono text-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary">https://sendly.live/api</span>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Example Request",
            language: "bash",
            code: 'curl https://sendly.live/api/credits \\\n  -H "Authorization: Bearer sk_live_YOUR_API_KEY"',
            description: "Check your credit balance.",
          },
        ],
      },
    ],
  },

  "/docs/auth": {
    title: "Authentication",
    subtitle: "Secure your API requests with API Keys.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "api-keys",
        title: "API Keys",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Sendly uses API keys to authenticate requests. Create and manage
              your API keys in the Dashboard.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Key Types</h4>
              <div className="grid gap-3">
                <div className="p-4 border border-border rounded-lg bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    >
                      TEST
                    </Badge>
                    <code className="text-sm font-mono text-muted-foreground">
                      sk_test_...
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For development and testing. Messages are simulated, no
                    credits charged.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-500 border-green-500/20"
                    >
                      LIVE
                    </Badge>
                    <code className="text-sm font-mono text-muted-foreground">
                      sk_live_...
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For production. Sends real SMS messages and deducts credits.
                    Requires business verification.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3">
              <Lock className="w-5 h-5 text-yellow-500 shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold text-yellow-500 text-sm">
                  Security Best Practices
                </p>
                <ul className="text-sm text-yellow-500/80 list-disc list-inside space-y-1 mt-1">
                  <li>Never expose API keys in client-side code</li>
                  <li>Use environment variables to store keys</li>
                  <li>
                    Rotate keys periodically using the key rotation feature
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Authorization Header",
            language: "http",
            code: `Authorization: Bearer sk_live_YOUR_API_KEY`,
            description: "Include your API key in every request.",
          },
          {
            title: "Example Request",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages \\
  -H "Authorization: Bearer sk_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{"to": "+15551234567", "text": "Hello!", "messageType": "marketing"}'`,
          },
        ],
      },
    ],
  },

  "/docs/sms": {
    title: "Send SMS",
    subtitle: "Send text messages to any phone number worldwide.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "send-message",
        title: "Send a Message",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Send an SMS message to a phone number. Messages can be up to 1600
              characters (10 segments).
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 font-bold"
              >
                POST
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/messages
              </code>
            </div>

            <h3 className="font-semibold text-foreground mt-8 mb-4 text-lg">
              Request Body
            </h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Parameter</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">to</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Destination phone number in E.164 format (e.g.,
                    +15551234567).
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] uppercase font-bold">
                      Required
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">text</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Message content. Max 1600 characters.
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] uppercase font-bold">
                      Required
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">from</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Alphanumeric sender ID (2-11 characters). Used for
                    international messages.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mt-6">
              <h4 className="font-semibold text-blue-400 mb-2">Sender ID Logic</h4>
              <div className="text-sm text-blue-300/80 space-y-2">
                <p><strong>International (non-US/CA):</strong> Uses your alphanumeric sender ID from the <code className="text-blue-400">from</code> field (e.g., "MYCOMPANY"). If not specified, defaults to "SENDLY".</p>
                <p><strong>US & Canada:</strong> Your verified toll-free number is used automatically. The <code className="text-blue-400">from</code> field is ignored for domestic messages.</p>
                <p><strong>Test mode:</strong> Any <code className="text-blue-400">from</code> value is accepted for sandbox testing.</p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Request",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+15551234567",
    "text": "Your verification code is 482910",
    "messageType": "transactional"
  }'`,
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "id": "msg_abc123def456",
  "to": "+15551234567",
  "from": "SENDLY",
  "text": "Your verification code is 482910",
  "status": "queued",
  "segments": 1,
  "creditsUsed": 0,
  "createdAt": "2025-12-11T10:30:00Z"
}`,
          },
        ],
      },
      {
        id: "message-status",
        title: "Message Status",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Messages go through the following status lifecycle:
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-yellow-500">
                    queued
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Message accepted and queued for delivery
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-blue-500">sent</div>
                  <div className="col-span-9 text-muted-foreground">
                    Message sent to carrier
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-green-500">
                    delivered
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Message delivered to recipient
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-red-500">
                    failed
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Message delivery failed
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  "/docs/messages": {
    title: "List Messages",
    subtitle: "Retrieve your sent messages with filtering and pagination.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "list",
        title: "List Messages",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Retrieve a paginated list of your sent messages.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/messages
              </code>
            </div>

            <h3 className="font-semibold text-foreground mt-8 mb-4 text-lg">
              Query Parameters
            </h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">limit</div>
                  <div className="col-span-9 text-muted-foreground">
                    Number of results (1-100, default 50)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    offset
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Pagination offset (default 0)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    status
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Filter by status: queued, sent, delivered, failed
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">to</div>
                  <div className="col-span-9 text-muted-foreground">
                    Filter by recipient phone number
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Request",
            language: "bash",
            code: `curl "https://sendly.live/api/v1/messages?limit=10&status=delivered" \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY"`,
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "data": [
    {
      "id": "msg_abc123",
      "to": "+15551234567",
      "from": "SENDLY",
      "text": "Your code is 482910",
      "status": "delivered",
      "segments": 1,
      "createdAt": "2025-12-11T10:30:00Z"
    }
  ],
  "count": 1
}`,
          },
        ],
      },
    ],
  },

  "/docs/credits": {
    title: "Credits",
    subtitle: "Check your credit balance and manage your account.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "balance",
        title: "Get Balance",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Retrieve your current credit balance.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/credits
              </code>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Request",
            language: "bash",
            code: `curl https://sendly.live/api/credits \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY"`,
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "balance": "5000",
  "lifetimeCredits": "15000"
}`,
          },
        ],
      },
      {
        id: "pricing",
        title: "SMS Pricing",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              SMS pricing varies by destination country. Credits are deducted
              per message segment.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-4">Tier</div>
                <div className="col-span-4">Price/SMS</div>
                <div className="col-span-4">Countries</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-foreground">
                    Domestic
                  </div>
                  <div className="col-span-4 text-green-500">Free</div>
                  <div className="col-span-4 text-muted-foreground">US, CA</div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-foreground">
                    Tier 1
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    $0.08 (8 credits)
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    GB, IN, PH + 9 more
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-foreground">
                    Tier 2
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    $0.12 (12 credits)
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    FR, AU, JP + 18 more
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-foreground">
                    Tier 3
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    $0.16 (16 credits)
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    DE, IT, MX + 13 more
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  "/docs/packages": {
    title: "Credit Packages",
    subtitle: "Available credit packages with bonus credits.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "packages",
        title: "Available Packages",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Purchase credits in bulk and get bonus credits on larger packages.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/credits/packages
              </code>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold">$5</div>
                  <div className="col-span-9 text-muted-foreground">
                    500 credits
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold">$50</div>
                  <div className="col-span-9 text-muted-foreground">
                    5,500 credits{" "}
                    <Badge className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">
                      +10% bonus
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold">$100</div>
                  <div className="col-span-9 text-muted-foreground">
                    12,000 credits{" "}
                    <Badge className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">
                      +20% bonus
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold">$250</div>
                  <div className="col-span-9 text-muted-foreground">
                    30,000 credits{" "}
                    <Badge className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">
                      +20% bonus
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Response",
            language: "json",
            code: `[
  {
    "id": "credits_500",
    "credits": 500,
    "priceInCents": 500,
    "bonusCredits": 0,
    "displayName": "$5 - 500 credits"
  },
  {
    "id": "credits_5500",
    "credits": 5500,
    "priceInCents": 5000,
    "bonusCredits": 500,
    "bonusPercent": 10,
    "displayName": "$50 - 5,500 credits (10% bonus)"
  }
]`,
          },
        ],
      },
    ],
  },

  "/docs/keys": {
    title: "API Keys",
    subtitle: "Create, list, and manage your API keys.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "list-keys",
        title: "List Keys",
        content: (
          <div className="space-y-6">
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/keys
              </code>
            </div>
            <p className="text-muted-foreground">
              List all API keys for your account. Keys are returned with masked
              values for security.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Response",
            language: "json",
            code: `[
  {
    "id": "key_abc123",
    "name": "Production",
    "type": "live",
    "keyPrefix": "sk_live_xxxx",
    "createdAt": "2025-12-01T10:00:00Z",
    "lastUsedAt": "2025-12-11T14:22:00Z"
  }
]`,
          },
        ],
      },
      {
        id: "create-key",
        title: "Create Key",
        content: (
          <div className="space-y-6">
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 font-bold"
              >
                POST
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/keys
              </code>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
              <p className="text-sm text-yellow-500">
                The full API key is only shown once when created. Store it
                securely.
              </p>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Request",
            language: "json",
            code: `{
  "type": "live",
  "name": "Production API Key"
}`,
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "id": "key_abc123",
  "name": "Production API Key",
  "type": "live",
  "key": "sk_live_abc123def456ghi789...",
  "keyPrefix": "sk_live_abc1",
  "warning": "This key will only be shown once."
}`,
          },
        ],
      },
      {
        id: "rotate-key",
        title: "Rotate Key",
        content: (
          <div className="space-y-6">
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 font-bold"
              >
                POST
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/keys/:id/rotate
              </code>
            </div>
            <p className="text-muted-foreground">
              Generate a new key while keeping the old key active during a grace
              period (24-168 hours).
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Request",
            language: "json",
            code: `{
  "gracePeriodHours": 24
}`,
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "newKey": {
    "key": "sk_live_new_abc123...",
    "keyPrefix": "sk_live_new_"
  },
  "oldKey": {
    "expiresAt": "2025-12-12T10:00:00Z"
  },
  "message": "Old key will expire in 24 hours"
}`,
          },
        ],
      },
    ],
  },

  "/docs/rate-limits": {
    title: "Rate Limits",
    subtitle: "API rate limits and how to handle them.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "limits",
        title: "Rate Limits",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              API requests are rate limited based on your API key type.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" /> Test Keys
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    60 requests per minute
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-500" /> Live Keys
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    600 requests per minute
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-foreground mt-8 mb-4">
              Response Headers
            </h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-5 font-mono text-primary">
                    X-RateLimit-Limit
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Max requests per minute
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-5 font-mono text-primary">
                    X-RateLimit-Remaining
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Requests left in current window
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-5 font-mono text-primary">
                    X-RateLimit-Reset
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Seconds until window resets
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "429 Response",
            language: "json",
            code: `{
  "error": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Limit: 600 requests per minute.",
  "retryAfter": 45
}`,
          },
        ],
      },
    ],
  },

  "/docs/errors": {
    title: "Error Codes",
    subtitle: "API error responses and how to handle them.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "errors",
        title: "Error Responses",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              All errors return a JSON object with an error code and message.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-2">Status</div>
                <div className="col-span-3">Code</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-mono text-yellow-500">
                    400
                  </div>
                  <div className="col-span-3 font-mono text-primary">
                    invalid_request
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Missing or invalid parameters
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-mono text-red-500">401</div>
                  <div className="col-span-3 font-mono text-primary">
                    unauthorized
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Missing or invalid API key
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-mono text-red-500">401</div>
                  <div className="col-span-3 font-mono text-primary">
                    invalid_api_key
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    API key not found or invalid
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-mono text-orange-500">
                    402
                  </div>
                  <div className="col-span-3 font-mono text-primary">
                    insufficient_credits
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Not enough credits to send message
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-mono text-red-500">403</div>
                  <div className="col-span-3 font-mono text-primary">
                    verification_required
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Business verification not approved
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-mono text-red-500">429</div>
                  <div className="col-span-3 font-mono text-primary">
                    rate_limit_exceeded
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Too many requests
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Error Format",
            language: "json",
            code: `{
  "error": "insufficient_credits",
  "message": "This message requires 12 credits. Current balance: 5",
  "creditsNeeded": 12,
  "currentBalance": 5
}`,
          },
        ],
      },
    ],
  },

  "/docs/sandbox": {
    title: "Sandbox Testing",
    subtitle: "Test your integration without sending real messages.",
    updatedAt: "Dec 11, 2025",
    sections: [
      {
        id: "sandbox",
        title: "Test Mode",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Use test API keys (
              <code className="text-primary">sk_test_...</code>) to simulate
              sending messages without actually delivering them. No credits are
              charged.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex gap-3">
              <TestTube className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-sm text-blue-500">
                Test keys work with any phone number. Use magic numbers below to
                test specific scenarios.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "magic-numbers",
        title: "Magic Phone Numbers",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Use these special phone numbers to test different delivery
              scenarios:
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-green-500">
                    +15005550000
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Instant success - message delivered immediately
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-red-500">
                    +15005550001
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Invalid number - fails validation
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-red-500">
                    +15005550002
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Cannot route - fails after 2 seconds
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-red-500">
                    +15005550003
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Queue full - fails immediately
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-red-500">
                    +15005550004
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Rate limited - returns 429
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-red-500">
                    +15005550006
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Carrier violation - blocked by carrier
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Test Request",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages \\
  -H "Authorization: Bearer sk_test_YOUR_TEST_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+15005550000",
    "text": "Test message",
    "messageType": "marketing"
  }'`,
          },
        ],
      },
    ],
  },

  "/docs/scheduled": {
    title: "Scheduled Messages",
    subtitle: "Schedule SMS messages to be sent at a future time.",
    updatedAt: "Dec 19, 2025",
    sections: [
      {
        id: "schedule",
        title: "Schedule a Message",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Schedule an SMS message to be sent at a specific time in the
              future. Messages must be scheduled at least 5 minutes ahead (max 5
              days).
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 font-bold"
              >
                POST
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/v1/messages/schedule
              </code>
            </div>

            <h3 className="font-semibold text-foreground mt-8 mb-4 text-lg">
              Request Body
            </h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Parameter</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">to</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Destination phone number in E.164 format.
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] uppercase font-bold">
                      Required
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">text</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Message content. Max 1600 characters.
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] uppercase font-bold">
                      Required
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">
                    scheduledAt
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    ISO 8601 timestamp for when to send (must be 5 min - 5 days
                    in future).
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] uppercase font-bold">
                      Required
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">from</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Alphanumeric sender ID (2-11 characters). For international
                    messages.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Request",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages/schedule \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+15551234567",
    "text": "Your appointment reminder!",
    "scheduledAt": "2025-12-20T10:00:00Z",
    "messageType": "transactional"
  }'`,
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "id": "sched_abc123def456",
  "to": "+15551234567",
  "text": "Your appointment reminder!",
  "scheduledAt": "2025-12-20T10:00:00Z",
  "status": "scheduled",
  "creditsReserved": 1,
  "createdAt": "2025-12-19T10:30:00Z"
}`,
          },
        ],
      },
      {
        id: "list-scheduled",
        title: "List Scheduled Messages",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Retrieve a paginated list of your scheduled messages.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/v1/messages/scheduled
              </code>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Response",
            language: "json",
            code: `{
  "data": [
    {
      "id": "sched_abc123",
      "to": "+15551234567",
      "text": "Reminder!",
      "scheduledAt": "2025-12-20T10:00:00Z",
      "status": "scheduled",
      "creditsReserved": 1
    }
  ],
  "count": 1
}`,
          },
        ],
      },
      {
        id: "cancel-scheduled",
        title: "Cancel Scheduled Message",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Cancel a scheduled message before it's sent. Reserved credits will
              be refunded.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-red-500/10 text-red-500 border-red-500/20 font-bold"
              >
                DELETE
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/v1/messages/scheduled/:id
              </code>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Response",
            language: "json",
            code: `{
  "id": "sched_abc123",
  "status": "cancelled",
  "creditsRefunded": 1,
  "cancelledAt": "2025-12-19T12:00:00Z"
}`,
          },
        ],
      },
      {
        id: "scheduled-status",
        title: "Scheduled Message Status",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Scheduled messages go through the following status lifecycle:
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-blue-500">
                    scheduled
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Message is scheduled and waiting to be sent
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-green-500">
                    sent
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Message was sent at the scheduled time
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-yellow-500">
                    cancelled
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Message was cancelled before sending
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-red-500">
                    failed
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Message failed to send
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  "/docs/batch": {
    title: "Batch Messages",
    subtitle: "Send multiple SMS messages in a single API call.",
    updatedAt: "Dec 24, 2025",
    sections: [
      {
        id: "send-batch",
        title: "Send Batch Messages",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Send up to 1000 messages in a single API call. Messages are
              processed asynchronously.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 font-bold"
              >
                POST
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/v1/messages/batch
              </code>
            </div>

            <h3 className="font-semibold text-foreground mt-8 mb-4 text-lg">
              Request Body
            </h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">
                    messages
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    array
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Array of message objects with <code>to</code> and{" "}
                    <code>text</code> fields. Max 1000.
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] uppercase font-bold">
                      Required
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">from</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Sender ID applied to all messages (for international).
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Request",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages/batch \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      {"to": "+15551234567", "text": "Hello User 1!"},
      {"to": "+15559876543", "text": "Hello User 2!"},
      {"to": "+15551112222", "text": "Hello User 3!"}
    ],
    "messageType": "marketing"
  }'`,
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "batchId": "batch_abc123def456",
  "status": "processing",
  "total": 3,
  "queued": 3,
  "sent": 0,
  "failed": 0,
  "creditsUsed": 3,
  "createdAt": "2025-12-19T10:30:00Z"
}`,
          },
        ],
      },
      {
        id: "preview-batch",
        title: "Preview Batch (Dry Run)",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Preview a batch before sending to validate access, check costs,
              and identify blocked messages. This is a read-only operation with
              no side effects.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 font-bold"
              >
                POST
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/v1/messages/batch/preview
              </code>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
              <p className="text-sm text-blue-400">
                <strong>Scope Required:</strong> <code>sms:read</code> — Preview
                only requires read access, not send permissions.
              </p>
            </div>

            <h3 className="font-semibold text-foreground mt-8 mb-4 text-lg">
              Preview Response Includes
            </h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">
                    sendable / blocked
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Count of messages that can be sent vs blocked (access
                    denied, unsupported country)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">
                    creditsNeeded
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Exact credit cost including international pricing tiers
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">
                    byCountry
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Per-country breakdown with message count, credits, and
                    pricing tier
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">
                    messagingProfile
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Your sending permissions (domestic, international access)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-muted/50 transition-colors">
                  <div className="col-span-3 font-mono text-primary">
                    blockedMessages
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Details on which messages would be blocked and why
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Request",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages/batch/preview \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      {"to": "+15551234567", "text": "Hello US!"},
      {"to": "+447700900123", "text": "Hello UK!"},
      {"to": "+61412345678", "text": "Hello Australia!"}
    ],
    "messageType": "marketing"
  }'`,
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "total": 3,
  "sendable": 3,
  "blocked": 0,
  "duplicates": 0,
  "creditsNeeded": 5,
  "creditBalance": 100,
  "hasSufficientCredits": true,
  "keyType": "live",
  "messagingProfile": {
    "canSendDomestic": true,
    "canSendInternational": true
  },
  "byCountry": {
    "US": {"count": 1, "credits": 1, "tier": "domestic", "allowed": true},
    "GB": {"count": 1, "credits": 2, "tier": "tier1", "allowed": true},
    "AU": {"count": 1, "credits": 2, "tier": "tier1", "allowed": true}
  },
  "blockedMessages": [],
  "warnings": []
}`,
          },
        ],
      },
      {
        id: "get-batch",
        title: "Get Batch Status",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Check the status of a batch and see individual message results.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/v1/messages/batch/:batchId
              </code>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Response",
            language: "json",
            code: `{
  "batchId": "batch_abc123",
  "status": "completed",
  "total": 3,
  "queued": 0,
  "sent": 3,
  "failed": 0,
  "creditsUsed": 3,
  "messages": [
    {"id": "msg_1", "to": "+15551234567", "status": "queued"},
    {"id": "msg_2", "to": "+15559876543", "status": "queued"},
    {"id": "msg_3", "to": "+15551112222", "status": "queued"}
  ],
  "completedAt": "2025-12-19T10:30:05Z"
}`,
          },
        ],
      },
      {
        id: "list-batches",
        title: "List Batches",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Retrieve a paginated list of your message batches.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /api/v1/messages/batches
              </code>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Response",
            language: "json",
            code: `{
  "data": [
    {
      "batchId": "batch_abc123",
      "status": "completed",
      "total": 100,
      "sent": 98,
      "failed": 2,
      "createdAt": "2025-12-19T10:00:00Z"
    }
  ],
  "count": 1
}`,
          },
        ],
      },
      {
        id: "batch-status",
        title: "Batch Status",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Batches have the following status values:
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-yellow-500">
                    processing
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Batch is being processed
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-green-500">
                    completed
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    All messages have been processed
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-orange-500">
                    partial_failure
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Some messages failed to send
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-red-500">
                    failed
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Batch processing failed
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  "/docs/api": {
    title: "API Reference",
    subtitle: "Complete reference for all Sendly API endpoints.",
    updatedAt: "Dec 19, 2025",
    sections: [
      {
        id: "endpoints",
        title: "All Endpoints",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Quick reference for all available API endpoints.
            </p>
            <div className="grid gap-2">
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-500 border-green-500/20"
                  >
                    POST
                  </Badge>
                  <span className="font-mono text-sm">/api/v1/messages</span>
                </div>
                <span className="text-sm text-muted-foreground">Send SMS</span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">/api/v1/messages</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  List messages
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">/api/v1/credits</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Get balance
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">
                    /api/v1/credits/packages
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  List packages
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">/api/v1/keys</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  List API keys
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-500 border-green-500/20"
                  >
                    POST
                  </Badge>
                  <span className="font-mono text-sm">/api/v1/keys</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Create API key
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-500 border-green-500/20"
                  >
                    POST
                  </Badge>
                  <span className="font-mono text-sm">
                    /api/v1/keys/:id/rotate
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Rotate key
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-red-500/10 text-red-500 border-red-500/20"
                  >
                    DELETE
                  </Badge>
                  <span className="font-mono text-sm">/api/keys/:id</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Delete key
                </span>
              </div>

              {/* Scheduled Messages */}
              <div className="mt-6 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Scheduled Messages
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-500 border-green-500/20"
                  >
                    POST
                  </Badge>
                  <span className="font-mono text-sm">
                    /api/v1/messages/schedule
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Schedule message
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">
                    /api/v1/messages/scheduled
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  List scheduled
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">
                    /api/v1/messages/scheduled/:id
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Get scheduled
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-red-500/10 text-red-500 border-red-500/20"
                  >
                    DELETE
                  </Badge>
                  <span className="font-mono text-sm">
                    /api/v1/messages/scheduled/:id
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Cancel scheduled
                </span>
              </div>

              {/* Batch Messages */}
              <div className="mt-6 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Batch Messages
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-500 border-green-500/20"
                  >
                    POST
                  </Badge>
                  <span className="font-mono text-sm">
                    /api/v1/messages/batch
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Send batch
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">
                    /api/v1/messages/batch/:id
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Get batch status
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">
                    /api/v1/messages/batches
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  List batches
                </span>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  "/docs/quickstart": {
    title: "Quickstart",
    subtitle: "Send your first SMS in under 5 minutes.",
    updatedAt: "Dec 19, 2025",
    sections: [
      {
        id: "step-1",
        title: "Step 1: Get Your API Key",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Sign up for Sendly and get your test API key instantly. No credit
              card required.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">
                    Go to the{" "}
                    <a
                      href="/dashboard"
                      className="text-primary hover:underline"
                    >
                      Dashboard
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sign in or create a free account
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Navigate to API Keys</p>
                  <p className="text-sm text-muted-foreground">
                    Your test key is created automatically
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Copy your test key</p>
                  <p className="text-sm text-muted-foreground">
                    Starts with <code className="text-primary">sk_test_</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "step-2",
        title: "Step 2: Install an SDK",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Choose your language and install the official SDK:
            </p>
            <div className="grid gap-2">
              <div className="p-3 border border-border rounded-lg bg-card font-mono text-sm">
                <span className="text-muted-foreground"># Node.js</span>
                <br />
                npm install @sendly/node
              </div>
              <div className="p-3 border border-border rounded-lg bg-card font-mono text-sm">
                <span className="text-muted-foreground"># Python</span>
                <br />
                pip install sendly
              </div>
              <div className="p-3 border border-border rounded-lg bg-card font-mono text-sm">
                <span className="text-muted-foreground"># Go</span>
                <br />
                go get github.com/SendlyHQ/sendly-go
              </div>
              <div className="p-3 border border-border rounded-lg bg-card font-mono text-sm">
                <span className="text-muted-foreground"># Ruby</span>
                <br />
                gem install sendly
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              See all 8 SDKs on the{" "}
              <a href="/docs/sdks" className="text-primary hover:underline">
                SDKs page
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "step-3",
        title: "Step 3: Send Your First Message",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Use your test key to send a simulated SMS. No credits needed for
              testing!
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex gap-3">
              <TestTube className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-sm text-blue-500">
                Test keys (<code>sk_test_</code>) simulate sending without
                delivering real messages. Use magic number{" "}
                <code>+15005550000</code> for instant success.
              </p>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "javascript",
            code: `import Sendly from '@sendly/node';

const sendly = new Sendly('sk_test_v1_your_key');

const message = await sendly.messages.send({
  to: '+15005550000',
  text: 'Hello from Sendly!',
  messageType: 'transactional'
});

console.log('Sent:', message.id);`,
          },
          {
            title: "Python",
            language: "python",
            code: `from sendly import Sendly

client = Sendly('sk_test_v1_your_key')

message = client.messages.send(
    to='+15005550000',
    text='Hello from Sendly!',
    message_type='transactional'
)

print(f'Sent: {message.id}')`,
          },
          {
            title: "cURL",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages \\
  -H "Authorization: Bearer sk_test_v1_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+15005550000",
    "text": "Hello from Sendly!",
    "messageType": "transactional"
  }'`,
          },
        ],
      },
      {
        id: "next-steps",
        title: "Next Steps",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Ready to send real messages? Here's what to do next:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/docs/sandbox"
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="font-semibold group-hover:text-primary transition-colors">
                  Sandbox Testing
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn about test phone numbers and scenarios
                </p>
              </a>
              <a
                href="/dashboard/onboarding"
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="font-semibold group-hover:text-primary transition-colors">
                  Get Verified
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete verification to send live messages
                </p>
              </a>
              <a
                href="/docs/sdks"
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="font-semibold group-hover:text-primary transition-colors">
                  Explore SDKs
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Official SDKs for 8 programming languages
                </p>
              </a>
              <a
                href="/docs/webhooks"
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="font-semibold group-hover:text-primary transition-colors">
                  Setup Webhooks
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Get delivery status notifications
                </p>
              </a>
            </div>
          </div>
        ),
      },
    ],
  },

  "/docs/going-live": {
    title: "Going Live",
    subtitle: "Move from sandbox testing to production messaging.",
    updatedAt: "Dec 30, 2025",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Ready to send real SMS messages? This guide walks you through the
              steps to go from sandbox testing to production.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-500 mb-2">Before You Start</h4>
              <p className="text-sm text-yellow-500/80">
                Make sure you've tested your integration using sandbox mode with
                test API keys (<code>sk_test_</code>) and magic numbers.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "verification-options",
        title: "Step 1: Choose Your Coverage",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Sendly offers different verification paths based on where you need
              to send messages:
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-500">International Only</h4>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                      Instant Approval
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send to 50+ countries outside US/Canada using alphanumeric sender IDs.
                    No business verification required. Go live immediately after purchasing credits.
                  </p>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-500">US & Canada (Toll-Free)</h4>
                    <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                      1-3 Business Days
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send to US/Canada phone numbers using a verified toll-free number.
                    Requires business verification with use case description, opt-in workflow,
                    and sample messages. A toll-free number is provisioned upon approval.
                  </p>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-primary">Global (Both)</h4>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Full global coverage. International is enabled immediately while
                    your toll-free verification is reviewed. Best for worldwide reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "purchase-credits",
        title: "Step 2: Purchase Credits",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Live API keys require a positive credit balance. Purchase credits
              from your dashboard.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
              <p className="text-sm text-blue-400">
                <strong>Why credits first?</strong> This ensures you have funds
                available before creating production keys, preventing accidental
                message failures due to insufficient balance.
              </p>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Check Credit Balance",
            language: "bash",
            code: `# Via CLI
sendly credits balance

# Via API
curl https://sendly.live/api/v1/credits \\
  -H "Authorization: Bearer sk_live_YOUR_KEY"`,
          },
        ],
      },
      {
        id: "create-live-key",
        title: "Step 3: Create Live API Key",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Once you have credits, create a live API key from the dashboard or CLI.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Create Live Key",
            language: "bash",
            code: `# Via CLI
sendly keys create --name "Production" --type live

# Switch CLI to use live environment
sendly config set environment live

# Verify current mode
sendly config get environment`,
          },
        ],
      },
      {
        id: "switch-environment",
        title: "Step 4: Switch to Production",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Update your application to use the live API key.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Environment Configuration",
            language: "bash",
            code: `# Set your live API key as environment variable
export SENDLY_API_KEY=sk_live_v1_your_key

# CLI: Switch between environments
sendly config set environment live   # Use live key
sendly config set environment test   # Use test key

# Your code automatically uses the environment variable
# No code changes needed if using SENDLY_API_KEY`,
          },
        ],
      },
      {
        id: "checklist",
        title: "Go-Live Checklist",
        content: (
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border text-sm">
                <div className="p-3 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Tested with sandbox mode and magic numbers</span>
                </div>
                <div className="p-3 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Purchased credits (required for live keys)</span>
                </div>
                <div className="p-3 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Created live API key</span>
                </div>
                <div className="p-3 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Completed verification (if sending to US/CA)</span>
                </div>
                <div className="p-3 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Updated environment variables in production</span>
                </div>
                <div className="p-3 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Set up webhooks for delivery notifications</span>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  "/docs/sdks": {
    title: "SDKs",
    subtitle: "Official SDKs for 8 programming languages.",
    updatedAt: "Dec 19, 2025",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Sendly provides official SDKs for all major programming languages.
              Each SDK provides type-safe access to the full Sendly API with
              built-in error handling and automatic retries.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="font-semibold mb-2">Features</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Full API coverage</li>
                  <li>• Type-safe interfaces</li>
                  <li>• Automatic retries</li>
                  <li>• Comprehensive error handling</li>
                  <li>• Sandbox/test mode support</li>
                </ul>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="font-semibold mb-2">Requirements</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sendly API key</li>
                  <li>• Language runtime (see below)</li>
                  <li>• HTTPS support</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "nodejs",
        title: "Node.js",
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Node.js 18+</Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
            <p className="text-muted-foreground">
              The official Node.js SDK with full TypeScript support.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Installation",
            language: "bash",
            code: `npm install @sendly/node
# or
yarn add @sendly/node
# or
pnpm add @sendly/node`,
          },
          {
            title: "Usage",
            language: "typescript",
            code: `import Sendly from '@sendly/node';

const sendly = new Sendly('sk_live_v1_your_api_key');

// Send an SMS
const message = await sendly.messages.send({
  to: '+15551234567',
  text: 'Hello from Sendly!'
});

// Schedule a message
const scheduled = await sendly.messages.schedule({
  to: '+15551234567',
  text: 'Scheduled message',
  scheduledAt: new Date('2025-12-25T10:00:00Z')
});

// Send batch messages
const batch = await sendly.messages.sendBatch({
  messages: [
    { to: '+15551234567', text: 'Hello User 1!' },
    { to: '+15559876543', text: 'Hello User 2!' }
  ]
});`,
          },
        ],
      },
      {
        id: "python",
        title: "Python",
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Python 3.8+</Badge>
              <Badge variant="outline">Type Hints</Badge>
            </div>
            <p className="text-muted-foreground">
              The official Python SDK with type hints and async support.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Installation",
            language: "bash",
            code: `pip install sendly`,
          },
          {
            title: "Usage",
            language: "python",
            code: `from sendly import Sendly

client = Sendly('sk_live_v1_your_api_key')

# Send an SMS
message = client.messages.send(
    to='+15551234567',
    text='Hello from Sendly!'
)

# Schedule a message
from datetime import datetime
scheduled = client.messages.schedule(
    to='+15551234567',
    text='Scheduled message',
    scheduled_at=datetime(2025, 12, 25, 10, 0, 0)
)

# Send batch messages
batch = client.messages.send_batch(messages=[
    {'to': '+15551234567', 'text': 'Hello User 1!'},
    {'to': '+15559876543', 'text': 'Hello User 2!'}
])`,
          },
        ],
      },
      {
        id: "go",
        title: "Go",
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Go 1.21+</Badge>
            </div>
            <p className="text-muted-foreground">
              The official Go SDK with context support and strong typing.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Installation",
            language: "bash",
            code: `go get github.com/SendlyHQ/sendly-go`,
          },
          {
            title: "Usage",
            language: "go",
            code: `package main

import (
    "context"
    "fmt"
    "github.com/SendlyHQ/sendly-go/sendly"
)

func main() {
    client := sendly.NewClient("sk_live_v1_your_api_key")
    ctx := context.Background()

    // Send an SMS
    message, err := client.Messages.Send(ctx, &sendly.SendMessageRequest{
        To:   "+15551234567",
        Text: "Hello from Sendly!",
    })
    if err != nil {
        panic(err)
    }
    fmt.Printf("Sent: %s\\n", message.ID)
}`,
          },
        ],
      },
      {
        id: "ruby",
        title: "Ruby",
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Ruby 3.0+</Badge>
            </div>
            <p className="text-muted-foreground">
              The official Ruby SDK with idiomatic Ruby patterns.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Installation",
            language: "bash",
            code: `gem install sendly
# or add to Gemfile
gem 'sendly'`,
          },
          {
            title: "Usage",
            language: "ruby",
            code: `require 'sendly'

client = Sendly::Client.new('sk_live_v1_your_api_key')

# Send an SMS
message = client.messages.send(
  to: '+15551234567',
  text: 'Hello from Sendly!'
)

puts "Sent: #{message.id}"`,
          },
        ],
      },
      {
        id: "java",
        title: "Java",
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Java 17+</Badge>
              <Badge variant="outline">Maven/Gradle</Badge>
            </div>
            <p className="text-muted-foreground">
              The official Java SDK with builder patterns and async support.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Maven",
            language: "xml",
            code: `<dependency>
    <groupId>com.sendly</groupId>
    <artifactId>sendly-java</artifactId>
    <version>3.0.1</version>
</dependency>`,
          },
          {
            title: "Gradle",
            language: "groovy",
            code: `implementation 'com.sendly:sendly-java:3.0.1'`,
          },
          {
            title: "Usage",
            language: "java",
            code: `import com.sendly.Sendly;
import com.sendly.models.Message;

public class Example {
    public static void main(String[] args) {
        Sendly client = new Sendly("sk_live_v1_your_api_key");

        // Send an SMS
        Message message = client.messages().send(
            "+15551234567",
            "Hello from Sendly!"
        );

        System.out.println("Sent: " + message.getId());
    }
}`,
          },
        ],
      },
      {
        id: "php",
        title: "PHP",
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">PHP 8.1+</Badge>
              <Badge variant="outline">Composer</Badge>
            </div>
            <p className="text-muted-foreground">
              The official PHP SDK with modern PHP features.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Installation",
            language: "bash",
            code: `composer require sendly/sendly-php`,
          },
          {
            title: "Usage",
            language: "php",
            code: `<?php
use Sendly\\Sendly;

$client = new Sendly('sk_live_v1_your_api_key');

// Send an SMS
$message = $client->messages()->send(
    '+15551234567',
    'Hello from Sendly!'
);

echo "Sent: " . $message->id;`,
          },
        ],
      },
      {
        id: "rust",
        title: "Rust",
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Rust 1.70+</Badge>
              <Badge variant="outline">Async/Tokio</Badge>
            </div>
            <p className="text-muted-foreground">
              The official Rust SDK with async/await support.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Cargo.toml",
            language: "toml",
            code: `[dependencies]
sendly = "0.9"
tokio = { version = "1", features = ["full"] }`,
          },
          {
            title: "Usage",
            language: "rust",
            code: `use sendly::{Sendly, SendMessageRequest};

#[tokio::main]
async fn main() -> sendly::Result<()> {
    let client = Sendly::new("sk_live_v1_your_api_key");

    // Send an SMS
    let message = client.messages().send(SendMessageRequest {
        to: "+15551234567".to_string(),
        text: "Hello from Sendly!".to_string(),
    }).await?;

    println!("Sent: {}", message.id);
    Ok(())
}`,
          },
        ],
      },
      {
        id: "dotnet",
        title: ".NET",
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">.NET 8.0+</Badge>
              <Badge variant="outline">C#</Badge>
            </div>
            <p className="text-muted-foreground">
              The official .NET SDK with async support.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Installation",
            language: "bash",
            code: `dotnet add package Sendly
# or via Package Manager
Install-Package Sendly`,
          },
          {
            title: "Usage",
            language: "csharp",
            code: `using Sendly;

using var client = new SendlyClient("sk_live_v1_your_api_key");

// Send an SMS
var message = await client.Messages.SendAsync(
    "+15551234567",
    "Hello from Sendly!"
);

Console.WriteLine($"Sent: {message.Id}");`,
          },
        ],
      },
    ],
  },

  "/docs/webhooks": {
    title: "Webhooks",
    subtitle: "Receive real-time delivery status notifications.",
    updatedAt: "Dec 19, 2025",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Webhooks allow you to receive real-time notifications about
              message delivery status. Instead of polling the API, Sendly will
              send HTTP POST requests to your server when events occur.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="font-semibold mb-2">Benefits</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Real-time status updates</li>
                  <li>• No polling required</li>
                  <li>• Automatic retries on failure</li>
                  <li>• Secure signature verification</li>
                </ul>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="font-semibold mb-2">Limits</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Maximum 10 webhooks per account</li>
                  <li>• 5 retry attempts on failure</li>
                  <li>• 30 second timeout per request</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "events",
        title: "Event Types",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Subscribe to the following events:
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    message.sent
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Message was sent to the carrier
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-green-500">
                    message.delivered
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Message was delivered to the recipient
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-red-500">
                    message.failed
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Message delivery failed
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-yellow-500">
                    message.bounced
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Message bounced (invalid number, etc.)
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "modes",
        title: "Webhook Modes",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Webhooks can be configured to receive events from test messages,
              live messages, or both. This allows you to separate development
              and production webhook handling.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-semibold bg-secondary/30">
                  <div className="col-span-3">Mode</div>
                  <div className="col-span-9">Description</div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-blue-500">all</div>
                  <div className="col-span-9 text-muted-foreground">
                    Receives events from both test and live messages (default)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-yellow-500">
                    test
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Only receives events from sandbox/test messages
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-green-500">
                    live
                  </div>
                  <div className="col-span-9 text-muted-foreground">
                    Only receives events from production messages
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "create",
        title: "Create a Webhook",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Create webhooks via the Dashboard or API. Each webhook needs a
              URL, selected events, and optionally a mode.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Create Webhook",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/webhooks \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-server.com/webhooks/sendly",
    "events": ["message.sent", "message.delivered", "message.failed"],
    "mode": "all",
    "description": "Production webhook"
  }'`,
          },
          {
            title: "Response",
            language: "json",
            code: `{
  "id": "whk_abc123",
  "url": "https://your-server.com/webhooks/sendly",
  "events": ["message.sent", "message.delivered", "message.failed"],
  "mode": "all",
  "secret": "whsec_xyz789...",
  "is_active": true,
  "created_at": "2025-12-19T10:00:00Z"
}`,
          },
        ],
      },
      {
        id: "payload",
        title: "Webhook Payload",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              When an event occurs, Sendly sends a POST request to your webhook
              URL with the following payload:
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Example Payload",
            language: "json",
            code: `{
  "id": "evt_abc123",
  "type": "message.delivered",
  "timestamp": "2025-12-19T10:30:00Z",
  "data": {
    "messageId": "msg_xyz789",
    "to": "+15551234567",
    "status": "delivered",
    "deliveredAt": "2025-12-19T10:30:00Z"
  }
}`,
          },
        ],
      },
      {
        id: "security",
        title: "Signature Verification",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Every webhook request includes a signature in the{" "}
              <code className="text-primary">X-Sendly-Signature</code> header.
              Verify this signature to ensure the request came from Sendly.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
              <p className="text-sm text-yellow-500">
                Always verify webhook signatures in production to prevent
                spoofed requests.
              </p>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js Verification",
            language: "javascript",
            code: `import crypto from 'crypto';

function verifyWebhook(payload, signature, secret) {
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSig)
  );
}

// In your webhook handler
app.post('/webhooks/sendly', (req, res) => {
  const signature = req.headers['x-sendly-signature'];
  const isValid = verifyWebhook(
    JSON.stringify(req.body),
    signature,
    process.env.WEBHOOK_SECRET
  );

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // Process the webhook
  console.log('Event:', req.body.type);
  res.status(200).send('OK');
});`,
          },
          {
            title: "Python Verification",
            language: "python",
            code: `import hmac
import hashlib

def verify_webhook(payload: str, signature: str, secret: str) -> bool:
    expected_sig = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected_sig)

# In your webhook handler (Flask example)
@app.route('/webhooks/sendly', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Sendly-Signature')
    is_valid = verify_webhook(
        request.data.decode(),
        signature,
        os.environ['WEBHOOK_SECRET']
    )

    if not is_valid:
        return 'Invalid signature', 401

    event = request.json
    print(f"Event: {event['type']}")
    return 'OK', 200`,
          },
        ],
      },
      {
        id: "retries",
        title: "Retries & Failures",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              If your endpoint returns a non-2xx status code or times out,
              Sendly will retry the webhook with exponential backoff:
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-semibold bg-secondary/30">
                  <div className="col-span-4">Attempt</div>
                  <div className="col-span-8">Delay</div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4">1st retry</div>
                  <div className="col-span-8 text-muted-foreground">
                    1 minute
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4">2nd retry</div>
                  <div className="col-span-8 text-muted-foreground">
                    5 minutes
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4">3rd retry</div>
                  <div className="col-span-8 text-muted-foreground">
                    30 minutes
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4">4th retry</div>
                  <div className="col-span-8 text-muted-foreground">
                    2 hours
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4">5th retry (final)</div>
                  <div className="col-span-8 text-muted-foreground">
                    24 hours
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              After 5 failed attempts, the webhook enters a circuit breaker
              state. Test webhooks or rotate the secret to reset.
            </p>
          </div>
        ),
      },
      {
        id: "testing",
        title: "Testing Webhooks",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Send a test event to verify your webhook is working correctly:
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send Test Event",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/webhooks/wh_abc123/test \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY"`,
          },
        ],
      },
    ],
  },

  "/docs/cli": {
    title: "CLI Reference",
    subtitle: "Sendly command-line interface for developers.",
    updatedAt: "Dec 24, 2025",
    version: "v3.5.0",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-6">
            <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 dark:text-green-200 font-semibold mb-2">
                <CheckCircle className="w-4 h-4" />
                Latest Release: v3.5.0
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm">
                CLI v3.5.0 uploads batch CSVs to cloud storage for audit trail,
                adds --history and --reuse flags, and enhanced status command
                with account tier and verification info.
              </p>
            </div>
            <p className="text-muted-foreground">
              Install the Sendly CLI globally using npm, yarn, pnpm, or
              Homebrew.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="font-bold mb-2 text-foreground">npm</div>
                <code className="text-xs bg-secondary p-2 rounded block">
                  npm install -g @sendly/cli
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="font-bold mb-2 text-foreground">yarn</div>
                <code className="text-xs bg-secondary p-2 rounded block">
                  yarn global add @sendly/cli
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="font-bold mb-2 text-foreground">pnpm</div>
                <code className="text-xs bg-secondary p-2 rounded block">
                  pnpm add -g @sendly/cli
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="font-bold mb-2 text-foreground">Homebrew</div>
                <code className="text-xs bg-secondary p-2 rounded block">
                  brew tap SendlyHQ/tap
                  <br />
                  brew install sendly
                </code>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Verify Installation",
            language: "bash",
            code: `sendly --version
# @sendly/cli/3.5.0 darwin-arm64 node-v20.0.0`,
          },
        ],
      },
      {
        id: "authentication",
        title: "Authentication",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              CLI v3.0.0 introduces secure OAuth device flow authentication
              alongside traditional API key authentication.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Recommended
                  </span>
                </div>
                <div className="font-bold mb-2 text-foreground">
                  OAuth Login
                </div>
                <p className="text-xs text-muted-foreground">
                  Secure browser-based authentication with session tokens
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="font-bold mb-2 text-foreground">
                  API Key Login
                </div>
                <p className="text-xs text-muted-foreground">
                  Traditional API key authentication for CI/CD and automation
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "OAuth Authentication (Recommended)",
            language: "bash",
            code: `# Interactive OAuth login (opens browser)
sendly login

# Check authentication status
sendly whoami

# Logout
sendly logout`,
          },
          {
            title: "API Key Authentication",
            language: "bash",
            code: `# Set API key manually
sendly config set api-key sk_test_your_key

# Or use environment variable
export SENDLY_API_KEY=sk_test_your_key
sendly whoami`,
          },
        ],
      },
      {
        id: "authentication",
        title: "Authentication",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              The CLI supports two authentication methods: browser-based login
              and API key authentication.
            </p>
            <h4 className="font-semibold text-foreground">
              Browser Login (Recommended)
            </h4>
            <p className="text-sm text-muted-foreground">
              Opens your browser to authenticate with your Sendly account:
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Browser Login",
            language: "bash",
            code: `# Login via browser
sendly login

# Check authentication status
sendly whoami

# Logout
sendly logout`,
          },
          {
            title: "API Key Authentication",
            language: "bash",
            code: `# Set API key via environment variable
export SENDLY_API_KEY=sk_live_v1_your_api_key

# Or configure directly
sendly config set apiKey sk_live_v1_your_api_key

# View current config
sendly config list`,
          },
        ],
      },
      {
        id: "sms-commands",
        title: "SMS Commands",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Send, list, and manage SMS messages from the command line.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send SMS",
            language: "bash",
            code: `# Send a message
sendly sms send --to "+15551234567" --text "Hello from CLI!"

# Send with sender ID (international)
sendly sms send --to "+447700900000" --text "Hello UK!" --from "MyApp"

# Interactive mode
sendly sms send`,
          },
          {
            title: "List Messages",
            language: "bash",
            code: `# List recent messages
sendly sms list

# Filter by status with pagination
sendly sms list --status delivered --limit 20

# Pagination options
sendly sms list --page 2 --limit 10
sendly sms list --offset 50 --limit 25

# Show sandbox/test messages (live keys only)
sendly sms list --sandbox

# Get specific message
sendly sms get msg_abc123`,
          },
          {
            title: "Batch Messages",
            language: "bash",
            code: `# Send batch from JSON file
sendly sms batch --file messages.json

# Send batch from CSV (phone-only with shared text)
sendly sms batch --file phones.csv --text "Hello everyone!"

# Preview batch before sending (dry run)
sendly sms batch --file messages.json --dry-run

# Dry run shows:
# - Per-country breakdown with credit costs
# - Blocked messages and reasons
# - Your messaging access (domestic/international)
# - Credit balance check

# Batch sends return a batchId for tracking via API
# GET /api/v1/messages/batch/:batchId`,
          },
          {
            title: "CSV Format",
            language: "csv",
            code: `# Full format (with per-recipient text)
to,text
+15551234567,Hello Alice!
+15559876543,Hello Bob!

# Phone-only format (use with --text flag)
to
+15551234567
+15559876543

# Supported column headers:
# to, phone, number, recipient, mobile, cell`,
            description: "CSV files must have headers. Use 'to' or 'phone' for the phone column.",
          },
          {
            title: "Scheduled Messages",
            language: "bash",
            code: `# Schedule a message
sendly sms schedule --to "+15551234567" \\
  --text "Reminder!" \\
  --at "2025-12-25T10:00:00Z"

# List scheduled messages
sendly sms scheduled

# Cancel scheduled message
sendly sms cancel sched_abc123`,
          },
        ],
      },
      {
        id: "keys-credits",
        title: "Keys & Credits",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Manage API keys and check your credit balance.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "API Keys",
            language: "bash",
            code: `# List all API keys
sendly keys list

# Create a new key
sendly keys create --name "CI/CD Key" --type live

# Revoke a key
sendly keys revoke key_abc123`,
          },
          {
            title: "Credits",
            language: "bash",
            code: `# Check balance
sendly credits balance

# View credit history
sendly credits history --limit 10`,
          },
        ],
      },
      {
        id: "webhooks",
        title: "Webhook Commands",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Manage webhooks and test them locally. The CLI includes a built-in
              webhook listener that creates a public tunnel for local
              development.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex gap-3">
              <Zap className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-sm text-blue-500">
                The webhook listener automatically creates a secure tunnel using
                localtunnel, registers it with Sendly, and forwards events to
                your local port.
              </p>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Local Listener",
            language: "bash",
            code: `# Forward webhooks to localhost:3000
sendly webhooks listen --forward http://localhost:3000/webhook

# Custom path and specific events
sendly webhooks listen --forward http://localhost:3000/api/webhooks \\
  --events message.delivered,message.failed

# Output:
# Webhook listener ready!
#   Tunnel URL: https://xyz.loca.lt
#   Forwarding to: http://localhost:3000/webhook
# Waiting for events...`,
          },
          {
            title: "List & Filter Webhooks",
            language: "bash",
            code: `# List all webhooks
sendly webhooks list

# Filter by mode (test, live, or all)
sendly webhooks list --mode test
sendly webhooks list --mode live`,
          },
          {
            title: "Test & Debug",
            language: "bash",
            code: `# Send a test event to a webhook
sendly webhooks test whk_abc123

# View delivery history
sendly webhooks deliveries whk_abc123
sendly webhooks deliveries whk_abc123 --limit 20

# Rotate webhook secret
sendly webhooks rotate-secret whk_abc123`,
          },
          {
            title: "Create Webhook",
            language: "bash",
            code: `# Create a new webhook
sendly webhooks create \\
  --url "https://your-server.com/webhooks" \\
  --events message.sent,message.delivered \\
  --mode all`,
          },
        ],
      },
      {
        id: "logs",
        title: "Logs",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Tail your API logs in real-time for debugging.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Tail Logs",
            language: "bash",
            code: `# Stream logs in real-time
sendly logs tail

# Filter by status
sendly logs tail --status error

# Filter by endpoint
sendly logs tail --path /api/messages`,
          },
        ],
      },
      {
        id: "config",
        title: "Configuration",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Configure CLI settings and defaults.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Config Commands",
            language: "bash",
            code: `# View all settings
sendly config list

# Get specific setting
sendly config get apiKey

# Set a value
sendly config set defaultFrom "MyApp"

# Switch between test and live environments
sendly config set environment test   # Use test API key (sandbox)
sendly config set environment live   # Use live API key (production)
sendly config get environment        # Check current mode`,
          },
          {
            title: "Environment Variables",
            language: "bash",
            code: `# API key (required for most commands)
export SENDLY_API_KEY=sk_live_v1_your_key

# Use test mode
export SENDLY_TEST_MODE=true

# Custom API URL (for self-hosted)
export SENDLY_API_URL=https://api.example.com`,
          },
        ],
      },
      {
        id: "doctor",
        title: "Diagnostics",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The <code className="text-primary">doctor</code> command checks
              your CLI installation and configuration.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Run Diagnostics",
            language: "bash",
            code: `sendly doctor

# Output:
# Sendly CLI Diagnostics
# ----------------------
# CLI Version: 1.0.0
# Node.js: v20.10.0
# OS: darwin arm64
#
# Configuration:
# [OK] Config file exists
# [OK] API key configured
# [OK] API connection successful
#
# All checks passed!`,
          },
        ],
      },
      {
        id: "cicd",
        title: "CI/CD Usage",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Use the CLI in CI/CD pipelines for automated notifications.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "GitHub Actions",
            language: "yaml",
            code: `name: Deploy Notification
on:
  push:
    branches: [main]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Install Sendly CLI
        run: npm install -g @sendly/cli

      - name: Send Deploy Notification
        env:
          SENDLY_API_KEY: \${{ secrets.SENDLY_API_KEY }}
        run: |
          sendly sms send \\
            --to "+15551234567" \\
            --text "Deploy complete: \${{ github.sha }}"`,
          },
        ],
      },
      {
        id: "reference",
        title: "Command Reference",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Quick reference for all available commands:
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm bg-secondary/30 font-semibold">
                  <div className="col-span-4">Command</div>
                  <div className="col-span-8">Description</div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">login</div>
                  <div className="col-span-8 text-muted-foreground">
                    Authenticate via browser
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    logout
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Clear stored credentials
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    whoami
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Show current user/key info
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    sms send
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Send an SMS message
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    sms list
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    List sent messages
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    sms batch
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Send batch messages from file
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    sms schedule
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Schedule a message
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    keys list
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    List API keys
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    keys create
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Create new API key
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    credits balance
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Check credit balance
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    webhooks listen
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Start local webhook listener
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    logs tail
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Stream API logs
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    config list
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    View configuration
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    doctor
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Run diagnostics
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  "/docs/llms": {
    title: "LLM Integration",
    subtitle:
      "Complete API reference optimized for AI assistants and code generation tools.",
    updatedAt: "Dec 25, 2025",
    version: "v3.4",
    sections: [
      {
        id: "overview",
        title: "For AI Assistants",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              This page provides a complete, structured reference for LLMs and
              AI coding assistants to integrate with the Sendly SMS API.
            </p>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-primary font-medium">
                Tip: Use the "Copy for AI" button on any docs page to copy that
                page's content with full API context for your AI assistant.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 border border-border rounded-lg">
                <div className="font-semibold mb-2">llms.txt</div>
                <p className="text-sm text-muted-foreground mb-3">
                  Structured sitemap for AI crawlers
                </p>
                <a
                  href="/llms.txt"
                  target="_blank"
                  className="text-sm text-primary hover:underline"
                >
                  View /llms.txt →
                </a>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="font-semibold mb-2">OpenAPI Spec</div>
                <p className="text-sm text-muted-foreground mb-3">
                  Full API specification (coming soon)
                </p>
                <span className="text-sm text-muted-foreground">
                  /openapi.json
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "quick-reference",
        title: "Quick Reference",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Essential information for generating Sendly API integrations.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 pr-4 font-medium whitespace-nowrap">
                      Base URL
                    </td>
                    <td className="py-3 font-mono text-primary">
                      https://sendly.live/api/v1
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium whitespace-nowrap">
                      Auth Header
                    </td>
                    <td className="py-3 font-mono text-muted-foreground">
                      Authorization: Bearer sk_live_...
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium whitespace-nowrap">
                      Content-Type
                    </td>
                    <td className="py-3 font-mono text-muted-foreground">
                      application/json
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium whitespace-nowrap">
                      Phone Format
                    </td>
                    <td className="py-3 font-mono text-muted-foreground">
                      E.164 (+15551234567)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium whitespace-nowrap">
                      Test Key Prefix
                    </td>
                    <td className="py-3 font-mono text-muted-foreground">
                      sk_test_* (sandbox mode)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium whitespace-nowrap">
                      Live Key Prefix
                    </td>
                    <td className="py-3 font-mono text-muted-foreground">
                      sk_live_* (production)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Minimal Send Example",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+15551234567",
    "text": "Hello from Sendly!",
    "messageType": "transactional"
  }'`,
          },
        ],
      },
      {
        id: "endpoints",
        title: "Core Endpoints",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Primary API endpoints for SMS messaging.
            </p>
            <div className="space-y-3">
              <div className="p-3 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    POST
                  </Badge>
                  <code className="text-sm font-mono">/messages</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send a single SMS message
                </p>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    POST
                  </Badge>
                  <code className="text-sm font-mono">/messages/batch</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send up to 1000 messages
                </p>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    POST
                  </Badge>
                  <code className="text-sm font-mono">/messages/schedule</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Schedule message for future delivery
                </p>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    GET
                  </Badge>
                  <code className="text-sm font-mono">/messages</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  List messages with pagination
                </p>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    GET
                  </Badge>
                  <code className="text-sm font-mono">/credits/balance</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get current credit balance
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send Message Request",
            language: "json",
            code: `{
  "to": "+15551234567",
  "text": "Your verification code is 123456",
  "messageType": "transactional"
}`,
          },
          {
            title: "Send Message Response",
            language: "json",
            code: `{
  "id": "msg_abc123",
  "to": "+15551234567",
  "text": "Your verification code is 123456",
  "status": "sent",
  "segments": 1,
  "creditsUsed": 1,
  "createdAt": "2025-12-25T10:30:00Z"
}`,
          },
        ],
      },
      {
        id: "message-types",
        title: "Message Types",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The <code className="text-primary">messageType</code> parameter is
              required for compliance.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="font-semibold text-primary mb-2">
                  transactional
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Non-promotional messages. Allowed 24/7.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• OTP / verification codes</li>
                  <li>• Order confirmations</li>
                  <li>• Appointment reminders</li>
                  <li>• Account alerts</li>
                </ul>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="font-semibold text-primary mb-2">marketing</div>
                <p className="text-sm text-muted-foreground mb-2">
                  Promotional content. Subject to quiet hours (9pm-8am).
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Sales announcements</li>
                  <li>• Promotional offers</li>
                  <li>• Newsletters</li>
                  <li>• Product updates</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "sandbox",
        title: "Sandbox Testing",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Use <code className="text-primary">sk_test_*</code> keys with
              magic phone numbers for testing.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium">Phone Number</th>
                    <th className="text-left py-2 font-medium">Behavior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-2 font-mono text-primary">
                      +15005550000
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Always succeeds
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary">
                      +15005550001
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Invalid number error
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary">
                      +15005550002
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Cannot route error
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary">
                      +15005550003
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Queue full error
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary">
                      +15005550004
                    </td>
                    <td className="py-2 text-muted-foreground">Rate limited</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary">
                      +15005550006
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Carrier rejected
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Sandbox Request",
            language: "bash",
            code: `curl -X POST https://sendly.live/api/v1/messages \\
  -H "Authorization: Bearer sk_test_YOUR_TEST_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+15005550000",
    "text": "Test message",
    "messageType": "transactional"
  }'`,
          },
        ],
      },
      {
        id: "sdks",
        title: "SDK Installation",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Official SDKs for all major languages.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="font-mono text-sm text-primary">Node.js</div>
                <div className="text-xs text-muted-foreground mt-1">
                  @sendly/node
                </div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="font-mono text-sm text-primary">Python</div>
                <div className="text-xs text-muted-foreground mt-1">sendly</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="font-mono text-sm text-primary">Go</div>
                <div className="text-xs text-muted-foreground mt-1">
                  sendly-go
                </div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="font-mono text-sm text-primary">Ruby</div>
                <div className="text-xs text-muted-foreground mt-1">sendly</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="font-mono text-sm text-primary">Java</div>
                <div className="text-xs text-muted-foreground mt-1">
                  sendly-java
                </div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="font-mono text-sm text-primary">.NET</div>
                <div className="text-xs text-muted-foreground mt-1">Sendly</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="font-mono text-sm text-primary">Rust</div>
                <div className="text-xs text-muted-foreground mt-1">sendly</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="font-mono text-sm text-primary">CLI</div>
                <div className="text-xs text-muted-foreground mt-1">
                  @sendly/cli
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "javascript",
            code: `import Sendly from '@sendly/node';

const client = new Sendly('sk_live_YOUR_API_KEY');

const message = await client.messages.send({
  to: '+15551234567',
  text: 'Hello!',
  messageType: 'transactional'
});`,
          },
          {
            title: "Python",
            language: "python",
            code: `from sendly import Sendly

client = Sendly('sk_live_YOUR_API_KEY')

message = client.messages.send(
    to='+15551234567',
    text='Hello!',
    message_type='transactional'
)`,
          },
        ],
      },
      {
        id: "errors",
        title: "Error Handling",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Common error codes to handle in your integration.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium">Code</th>
                    <th className="text-left py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-2 font-mono text-red-400">
                      invalid_api_key
                    </td>
                    <td className="py-2 text-muted-foreground">
                      API key is invalid or revoked
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-red-400">
                      invalid_phone_number
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Phone number format invalid
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-red-400">
                      insufficient_credits
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Not enough credits
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-red-400">
                      rate_limit_exceeded
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Too many requests
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-red-400">
                      quiet_hours_violation
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Marketing outside 8am-9pm
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Error Response",
            language: "json",
            code: `{
  "error": "insufficient_credits",
  "message": "Not enough credits to send message",
  "required": 2,
  "available": 0
}`,
          },
        ],
      },
    ],
  },
};
