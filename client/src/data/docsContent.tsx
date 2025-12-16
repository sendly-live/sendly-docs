import {
  Lock,
  Sparkles,
  Zap,
  Code2,
  Globe,
  Shield,
  Terminal,
  Book,
  Cpu,
  ArrowRight,
  MessageSquare,
  Phone,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
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
  // ============================================
  // GETTING STARTED
  // ============================================
  "/docs": {
    title: "Introduction",
    subtitle:
      "Welcome to Sendly - the developer-first SMS API platform. Send SMS globally with simple, reliable APIs.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: (
          <div className="space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sendly provides a modern, developer-friendly API for sending SMS
              messages worldwide. Built for developers who need reliable,
              scalable messaging infrastructure.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-2 mb-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <Zap className="w-5 h-5 text-primary" />
                  Simple API
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Send SMS with a single API call. Clean, RESTful design with
                  SDKs in 8 languages.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-2 mb-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <Globe className="w-5 h-5 text-primary" />
                  Global Reach
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Send to 50+ countries including US, Canada, and international
                  destinations.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-2 mb-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <Shield className="w-5 h-5 text-primary" />
                  Sandbox Testing
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Test your integration risk-free with our sandbox environment.
                  No credits needed.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-2 mb-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <Webhook className="w-5 h-5 text-primary" />
                  Webhooks
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get real-time delivery status updates with secure webhook
                  notifications.
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
            code: `# Install the SDK
npm install @sendly/sdk

# Send your first message
curl -X POST https://api.sendly.dev/v1/messages \\
  -H "Authorization: Bearer sk_test_v1_..." \\
  -H "Content-Type: application/json" \\
  -d '{"to": "+15551234567", "text": "Hello from Sendly!"}'`,
            description: "Get started in under a minute.",
          },
        ],
      },
      {
        id: "base-url",
        title: "Base URL",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              All API requests should be made to our base URL. Our SDKs handle
              this automatically.
            </p>
            <div className="flex items-center gap-2 bg-secondary/50 p-4 rounded-md border border-border font-mono text-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary">https://api.sendly.dev/v1</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The API supports HTTPS only. All requests must be encrypted.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Health Check",
            language: "bash",
            code: "curl https://api.sendly.dev/v1/health",
            description: "Verify connectivity to our API.",
          },
        ],
      },
    ],
  },

  "/docs/quickstart": {
    title: "Quickstart",
    subtitle: "Send your first SMS in under 5 minutes.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "step-1",
        title: "Step 1: Create Account",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Sign up for a free Sendly account at{" "}
              <a
                href="https://sendly.dev"
                className="text-primary hover:underline"
              >
                sendly.dev
              </a>
              . No credit card required to get started.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
              <div>
                <p className="font-semibold text-green-500 text-sm">
                  Free Sandbox Access
                </p>
                <p className="text-sm text-green-500/80 mt-1">
                  Your account includes instant access to the sandbox
                  environment for testing.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "step-2",
        title: "Step 2: Get Your API Key",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              After signing up, you'll receive a test API key that starts with{" "}
              <code className="bg-secondary px-1 rounded">sk_test_v1_</code>.
              This key works in sandbox mode without requiring credits.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Key Type</div>
                <div className="col-span-3">Prefix</div>
                <div className="col-span-6">Use Case</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 text-primary font-semibold">
                    Test
                  </div>
                  <div className="col-span-3 font-mono">sk_test_v1_*</div>
                  <div className="col-span-6 text-muted-foreground">
                    Development, sandbox testing
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 text-primary font-semibold">
                    Live
                  </div>
                  <div className="col-span-3 font-mono">sk_live_v1_*</div>
                  <div className="col-span-6 text-muted-foreground">
                    Production messaging (requires verification + credits)
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "step-3",
        title: "Step 3: Install SDK",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Install the Sendly SDK for your programming language.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "bash",
            code: "npm install @sendly/sdk",
          },
          {
            title: "Python",
            language: "bash",
            code: "pip install sendly",
          },
          {
            title: "Go",
            language: "bash",
            code: "go get github.com/sendly/sendly-go",
          },
          {
            title: "Java (Maven)",
            language: "xml",
            code: `<dependency>
  <groupId>com.sendly</groupId>
  <artifactId>sendly-java</artifactId>
  <version>1.0.0</version>
</dependency>`,
          },
        ],
      },
      {
        id: "step-4",
        title: "Step 4: Send a Message",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Use your test API key to send a message. In sandbox mode, messages
              are simulated.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex gap-3">
              <MessageSquare className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="font-semibold text-blue-500 text-sm">
                  Sandbox Test Numbers
                </p>
                <p className="text-sm text-blue-500/80 mt-1">
                  Use{" "}
                  <code className="bg-blue-500/20 px-1 rounded">
                    +15551234567
                  </code>{" "}
                  (success) or{" "}
                  <code className="bg-blue-500/20 px-1 rounded">
                    +15559999999
                  </code>{" "}
                  (failure) for testing.
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js Example",
            language: "typescript",
            code: `import { Sendly } from '@sendly/sdk';

const sendly = new Sendly('sk_test_v1_your_api_key');

const message = await sendly.messages.send({
  to: '+15551234567',
  text: 'Hello from Sendly!'
});

console.log('Message ID:', message.id);
console.log('Status:', message.status);`,
          },
          {
            title: "Python Example",
            language: "python",
            code: `from sendly import Sendly

sendly = Sendly('sk_test_v1_your_api_key')

message = sendly.messages.send(
    to='+15551234567',
    text='Hello from Sendly!'
)

print(f'Message ID: {message.id}')
print(f'Status: {message.status}')`,
          },
        ],
      },
    ],
  },

  "/docs/auth": {
    title: "Authentication",
    subtitle: "Secure your API requests with API Keys.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "api-keys",
        title: "API Keys",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Sendly uses API keys to authenticate requests. Pass your API key
              in the{" "}
              <code className="bg-secondary px-1 rounded">Authorization</code>{" "}
              header as a Bearer token.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3">
              <Lock className="w-5 h-5 text-yellow-500 shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold text-yellow-500 text-sm">
                  Security Best Practices
                </p>
                <ul className="text-sm text-yellow-500/80 list-disc list-inside space-y-1 mt-1">
                  <li>
                    Never expose API keys in client-side code (browsers, mobile
                    apps).
                  </li>
                  <li>Do not commit API keys to version control (git).</li>
                  <li>Use environment variables to store keys securely.</li>
                  <li>Rotate your keys periodically from the dashboard.</li>
                </ul>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Using the SDK",
            language: "typescript",
            code: `import { Sendly } from '@sendly/sdk';

const sendly = new Sendly(process.env.SENDLY_API_KEY);`,
            description:
              "Initialize the client with your API key from environment variables.",
          },
          {
            title: "Raw HTTP Request",
            language: "bash",
            code: `curl -X POST https://api.sendly.dev/v1/messages \\
  -H "Authorization: Bearer sk_test_v1_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"to": "+15551234567", "text": "Hello!"}'`,
            description:
              "Pass the key in the Authorization header as a Bearer token.",
          },
        ],
      },
      {
        id: "key-types",
        title: "Key Types",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Sendly provides two types of API keys with different capabilities.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-2">Type</div>
                <div className="col-span-3">Prefix</div>
                <div className="col-span-3">Credits</div>
                <div className="col-span-4">Verification</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-semibold text-primary">
                    Test
                  </div>
                  <div className="col-span-3 font-mono">sk_test_v1_*</div>
                  <div className="col-span-3 text-muted-foreground">
                    Not required
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    Not required
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-semibold text-primary">
                    Live
                  </div>
                  <div className="col-span-3 font-mono">sk_live_v1_*</div>
                  <div className="col-span-3 text-muted-foreground">
                    Required
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    Required
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "errors",
        title: "Authentication Errors",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              If authentication fails, the API returns one of these error
              responses.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-2">Code</div>
                <div className="col-span-4">Error</div>
                <div className="col-span-6">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-mono text-red-400">401</div>
                  <div className="col-span-4 font-mono text-muted-foreground">
                    unauthorized
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    Invalid or missing API key.
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-mono text-red-400">403</div>
                  <div className="col-span-4 font-mono text-muted-foreground">
                    verification_required
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    Business verification required for this action.
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 font-mono text-red-400">402</div>
                  <div className="col-span-4 font-mono text-muted-foreground">
                    insufficient_credits
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    Not enough credits to send message.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Error Response",
            language: "json",
            code: `{
  "error": "unauthorized",
  "message": "Invalid API key provided. Check your key and try again.",
  "helpUrl": "https://docs.sendly.dev/docs/auth"
}`,
          },
        ],
      },
    ],
  },

  "/docs/credits": {
    title: "Credits & Billing",
    subtitle: "Understanding Sendly's credit-based pricing system.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "how-credits-work",
        title: "How Credits Work",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Sendly uses a credit-based system for sending messages. Each SMS
              segment costs a certain number of credits based on the destination
              country.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
                  <CreditCard className="w-4 h-4 text-primary" />
                  Purchase
                </div>
                <p className="text-sm text-muted-foreground">
                  Add credits to your account via the dashboard. Credits never
                  expire.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Send
                </div>
                <p className="text-sm text-muted-foreground">
                  Credits are deducted when you send messages based on
                  destination pricing.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  Track
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitor usage in real-time via dashboard or API.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "pricing-tiers",
        title: "Pricing Tiers",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Countries are grouped into pricing tiers based on carrier costs.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Tier</div>
                <div className="col-span-3">Credits/SMS</div>
                <div className="col-span-6">Example Countries</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold text-green-500">
                    Tier 1
                  </div>
                  <div className="col-span-3 font-mono">1 credit</div>
                  <div className="col-span-6 text-muted-foreground">
                    US, Canada, UK
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold text-blue-500">
                    Tier 2
                  </div>
                  <div className="col-span-3 font-mono">2 credits</div>
                  <div className="col-span-6 text-muted-foreground">
                    Germany, France, Australia
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold text-yellow-500">
                    Tier 3
                  </div>
                  <div className="col-span-3 font-mono">3 credits</div>
                  <div className="col-span-6 text-muted-foreground">
                    Brazil, India, Mexico
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold text-orange-500">
                    Tier 4
                  </div>
                  <div className="col-span-3 font-mono">4 credits</div>
                  <div className="col-span-6 text-muted-foreground">
                    Other international
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "segments",
        title: "Message Segments",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              SMS messages are split into segments of 160 characters (or 70 for
              Unicode). Each segment is billed separately.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex gap-3">
              <MessageSquare className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="font-semibold text-blue-500 text-sm">
                  Segment Calculation
                </p>
                <p className="text-sm text-blue-500/80 mt-1">
                  A 200-character message = 2 segments. Tier 1 country = 2
                  credits total.
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Check Credits Used",
            language: "typescript",
            code: `const message = await sendly.messages.send({
  to: '+15551234567',
  text: 'A longer message that might span multiple segments...'
});

console.log('Segments:', message.segments);
console.log('Credits used:', message.creditsUsed);`,
          },
        ],
      },
    ],
  },

  "/docs/verification": {
    title: "Business Verification",
    subtitle: "Requirements for sending live SMS messages.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "why-verify",
        title: "Why Verification?",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Business verification is required to send live SMS messages. This
              ensures compliance with carrier regulations and prevents spam,
              protecting both senders and recipients.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/5">
                <div className="font-semibold text-green-500 mb-2">
                  International (48 Countries)
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Instant approval</li>
                  <li>• Just provide Sender ID</li>
                  <li>• No carrier review needed</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/5">
                <div className="font-semibold text-blue-500 mb-2">
                  US & Canada
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Carrier review (3-7 days)</li>
                  <li>• Business information required</li>
                  <li>• Toll-free number assigned</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "verification-types",
        title: "Verification Types",
        content: (
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Type</div>
                <div className="col-span-3">Approval</div>
                <div className="col-span-6">Destinations</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold text-primary">
                    International
                  </div>
                  <div className="col-span-3 text-green-500">Instant</div>
                  <div className="col-span-6 text-muted-foreground">
                    48 countries (excludes US/Canada)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold text-primary">
                    Toll-Free (US/CA)
                  </div>
                  <div className="col-span-3 text-yellow-500">3-7 days</div>
                  <div className="col-span-6 text-muted-foreground">
                    United States & Canada
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-semibold text-primary">
                    Global (Both)
                  </div>
                  <div className="col-span-3 text-blue-500">Mixed</div>
                  <div className="col-span-6 text-muted-foreground">
                    International instant, US/CA pending
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "requirements",
        title: "Information Required",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The following information is required for US/Canada verification:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">
                  Business Details
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Legal business name</li>
                  <li>• Business address</li>
                  <li>• Business type (LLC, Corp, etc.)</li>
                  <li>• Website URL</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Use Case</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Message use case (OTP, marketing, etc.)</li>
                  <li>• Sample messages</li>
                  <li>• Expected volume</li>
                  <li>• Opt-in process description</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  // ============================================
  // MESSAGING
  // ============================================
  "/docs/sms": {
    title: "Send SMS",
    subtitle:
      "Send text messages programmatically to any phone number worldwide.",
    updatedAt: "Dec 13, 2025",
    version: "v1",
    sections: [
      {
        id: "send-message",
        title: "Send a Message",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Send an SMS message to a specific phone number. Messages are
              queued and sent asynchronously.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 font-bold"
              >
                POST
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /v1/messages
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
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-white/5 transition-colors">
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
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-white/5 transition-colors">
                  <div className="col-span-3 font-mono text-primary">text</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    The message content. Max 1600 characters.
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] uppercase font-bold">
                      Required
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm hover:bg-white/5 transition-colors">
                  <div className="col-span-3 font-mono text-primary">from</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Sender ID or phone number. Uses your default if not
                    specified.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "typescript",
            code: `import { Sendly } from '@sendly/sdk';

const sendly = new Sendly('sk_test_v1_...');

const message = await sendly.messages.send({
  to: '+15551234567',
  text: 'Your verification code is 123456'
});

console.log(message.id);     // "msg_abc123..."
console.log(message.status); // "queued"`,
          },
          {
            title: "Python",
            language: "python",
            code: `from sendly import Sendly

sendly = Sendly('sk_test_v1_...')

message = sendly.messages.send(
    to='+15551234567',
    text='Your verification code is 123456'
)

print(message.id)      # "msg_abc123..."
print(message.status)  # "queued"`,
          },
          {
            title: "cURL",
            language: "bash",
            code: `curl -X POST https://api.sendly.dev/v1/messages \\
  -H "Authorization: Bearer sk_test_v1_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+15551234567",
    "text": "Your verification code is 123456"
  }'`,
          },
        ],
      },
      {
        id: "response",
        title: "Response",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              A successful request returns a Message object with the following
              fields.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Field</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">id</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Unique message identifier
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">to</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Destination phone number
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">from</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Sender ID or phone number
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">text</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Message content
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    status
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    queued | sending | sent | delivered | failed
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    segments
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    number
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Number of SMS segments
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    creditsUsed
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    number
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Credits deducted for this message
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    isSandbox
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    boolean
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    True if sent with test API key
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    createdAt
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    ISO 8601 timestamp
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Response Example",
            language: "json",
            code: `{
  "id": "msg_abc123def456",
  "to": "+15551234567",
  "from": "SENDLY",
  "text": "Your verification code is 123456",
  "status": "queued",
  "segments": 1,
  "creditsUsed": 1,
  "isSandbox": false,
  "createdAt": "2025-12-13T10:30:00Z"
}`,
          },
        ],
      },
      {
        id: "errors",
        title: "Error Handling",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The API returns typed errors that you can handle in your code.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Error Handling Example",
            language: "typescript",
            code: `import {
  Sendly,
  SendlyError,
  AuthenticationError,
  InsufficientCreditsError,
  RateLimitError,
  ValidationError
} from '@sendly/sdk';

try {
  const message = await sendly.messages.send({
    to: '+15551234567',
    text: 'Hello!'
  });
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof InsufficientCreditsError) {
    console.error(\`Need \${error.creditsNeeded} credits, have \${error.currentBalance}\`);
  } else if (error instanceof RateLimitError) {
    console.error(\`Rate limited. Retry after \${error.retryAfter}s\`);
  } else if (error instanceof ValidationError) {
    console.error('Invalid phone number or message');
  }
}`,
          },
        ],
      },
    ],
  },

  "/docs/messages/list": {
    title: "List Messages",
    subtitle: "Retrieve a list of sent messages with pagination.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "list",
        title: "List Messages",
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
                /v1/messages
              </code>
            </div>

            <h3 className="font-semibold text-foreground mt-8 mb-4 text-lg">
              Query Parameters
            </h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Parameter</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">limit</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    number
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Number of messages to return (1-100, default 50)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    offset
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    number
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Number of messages to skip (default 0)
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "List Messages",
            language: "typescript",
            code: `// List recent messages
const response = await sendly.messages.list({ limit: 20 });

for (const message of response.data) {
  console.log(\`\${message.id}: \${message.status}\`);
}

// Auto-paginate through all messages
for await (const message of sendly.messages.listAll()) {
  console.log(message.id);
}`,
          },
        ],
      },
    ],
  },

  "/docs/messages/get": {
    title: "Get Message",
    subtitle: "Retrieve details of a specific message by ID.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "get",
        title: "Get Message",
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
                /v1/messages/:id
              </code>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Get Message by ID",
            language: "typescript",
            code: `const message = await sendly.messages.get('msg_abc123def456');

console.log('Status:', message.status);
console.log('Delivered at:', message.deliveredAt);`,
          },
        ],
      },
    ],
  },

  "/docs/messages/schedule": {
    title: "Schedule Messages",
    subtitle: "Schedule SMS messages for future delivery.",
    updatedAt: "Dec 16, 2025",
    sections: [
      {
        id: "schedule",
        title: "Schedule a Message",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Schedule messages to be sent at a specific time in the future.
              Useful for reminders, appointments, and time-sensitive
              notifications.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 font-bold"
              >
                POST
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /v1/messages/schedule
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
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">to</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Destination phone number in E.164 format (required)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">text</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Message content, 1-1600 characters (required)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    scheduledAt
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    ISO 8601 timestamp for when to send (required, must be at
                    least 1 minute in the future)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">from</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Sender ID or phone number (optional)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 mt-6">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
              <div>
                <p className="font-semibold text-yellow-500 text-sm">
                  Credits Reserved
                </p>
                <p className="text-sm text-yellow-500/80 mt-1">
                  Credits are reserved when you schedule a message. If the
                  message fails or is cancelled, credits are refunded to your
                  account.
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "typescript",
            code: `import Sendly from '@sendly/sdk';

const sendly = new Sendly('sk_test_v1_...');

// Schedule a message for tomorrow at 9 AM
const scheduled = await sendly.messages.schedule({
  to: '+15551234567',
  text: 'Reminder: Your appointment is in 1 hour!',
  scheduledAt: '2025-01-20T09:00:00Z',
  from: 'SENDLY'
});

console.log('Scheduled:', scheduled.id);
console.log('Will send at:', scheduled.scheduledAt);`,
          },
          {
            title: "Python",
            language: "python",
            code: `from sendly import Sendly

sendly = Sendly("sk_test_v1_...")

# Schedule a message for tomorrow at 9 AM
scheduled = sendly.messages.schedule(
    to="+15551234567",
    text="Reminder: Your appointment is in 1 hour!",
    scheduled_at="2025-01-20T09:00:00Z",
    sender="SENDLY"
)

print(f"Scheduled: {scheduled.id}")
print(f"Will send at: {scheduled.scheduled_at}")`,
          },
          {
            title: "Go",
            language: "go",
            code: `package main

import (
    "fmt"
    "github.com/sendly/sendly-go"
)

func main() {
    client := sendly.New("sk_test_v1_...")

    // Schedule a message for tomorrow at 9 AM
    scheduled, err := client.Messages.Schedule(&sendly.ScheduleMessageRequest{
        To:          "+15551234567",
        Text:        "Reminder: Your appointment is in 1 hour!",
        ScheduledAt: "2025-01-20T09:00:00Z",
        From:        "SENDLY",
    })
    if err != nil {
        panic(err)
    }

    fmt.Printf("Scheduled: %s\\n", scheduled.ID)
    fmt.Printf("Will send at: %s\\n", scheduled.ScheduledAt)
}`,
          },
          {
            title: "CLI",
            language: "bash",
            code: `# Schedule a message for a specific time
sendly sms schedule --to +15551234567 \\
  --text "Reminder: Your appointment is in 1 hour!" \\
  --at "2025-01-20T09:00:00Z" \\
  --from SENDLY

# Output:
# ✓ Message scheduled
#   ID:           msg_abc123
#   Scheduled At: 2025-01-20T09:00:00Z
#   Status:       scheduled`,
          },
        ],
      },
      {
        id: "list-scheduled",
        title: "List Scheduled Messages",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Retrieve a list of all scheduled messages that haven't been sent
              yet.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /v1/messages/scheduled
              </code>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "typescript",
            code: `// List all scheduled messages
const scheduled = await sendly.messages.listScheduled();

for (const msg of scheduled.data) {
  console.log(\`\${msg.id}: scheduled for \${msg.scheduledAt}\`);
}`,
          },
          {
            title: "CLI",
            language: "bash",
            code: `# List all scheduled messages
sendly sms scheduled

# With JSON output
sendly sms scheduled --json`,
          },
        ],
      },
      {
        id: "cancel-scheduled",
        title: "Cancel Scheduled Message",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Cancel a scheduled message before it's sent. Credits will be
              refunded to your account.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-red-500/10 text-red-500 border-red-500/20 font-bold"
              >
                DELETE
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /v1/messages/scheduled/:id
              </code>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex gap-3 mt-6">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
              <div>
                <p className="font-semibold text-green-500 text-sm">
                  Automatic Refund
                </p>
                <p className="text-sm text-green-500/80 mt-1">
                  When you cancel a scheduled message, reserved credits are
                  automatically refunded to your account balance.
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "typescript",
            code: `// Cancel a scheduled message
const cancelled = await sendly.messages.cancelScheduled('msg_abc123');

console.log('Cancelled:', cancelled.id);
console.log('Credits refunded:', cancelled.creditsRefunded);`,
          },
          {
            title: "CLI",
            language: "bash",
            code: `# Cancel a scheduled message
sendly sms cancel msg_abc123

# Output:
# ✓ Message cancelled
#   ID:              msg_abc123
#   Credits Refunded: 1`,
          },
        ],
      },
    ],
  },

  "/docs/messages/batch": {
    title: "Batch Messages",
    subtitle: "Send SMS messages to multiple recipients in a single API call.",
    updatedAt: "Dec 16, 2025",
    sections: [
      {
        id: "send-batch",
        title: "Send Batch Messages",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Send the same or different messages to multiple recipients
              efficiently. Batch sending is ideal for notifications, alerts, and
              marketing campaigns.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 font-bold"
              >
                POST
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /v1/messages/batch
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
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    messages
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    array
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Array of message objects with `to` and `text` fields
                    (required, max 1000)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">from</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Default sender ID for all messages (optional)
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-foreground mt-8 mb-4 text-lg">
              Response
            </h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Field</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    batchId
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    string
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Unique identifier for tracking the batch
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">total</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    number
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Total number of messages in the batch
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    queued
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    number
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Number of messages successfully queued
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    failed
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    number
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Number of messages that failed validation
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    creditsUsed
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    number
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Total credits used for successfully queued messages
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "typescript",
            code: `import Sendly from '@sendly/sdk';

const sendly = new Sendly('sk_test_v1_...');

// Send batch messages
const batch = await sendly.messages.sendBatch({
  messages: [
    { to: '+15551234567', text: 'Hello Alice!' },
    { to: '+15559876543', text: 'Hello Bob!' },
    { to: '+15555555555', text: 'Hello Charlie!' },
  ],
  from: 'SENDLY'
});

console.log(\`Batch ID: \${batch.batchId}\`);
console.log(\`Queued: \${batch.queued}/\${batch.total}\`);
console.log(\`Credits used: \${batch.creditsUsed}\`);`,
          },
          {
            title: "Python",
            language: "python",
            code: `from sendly import Sendly

sendly = Sendly("sk_test_v1_...")

# Send batch messages
batch = sendly.messages.send_batch(
    messages=[
        {"to": "+15551234567", "text": "Hello Alice!"},
        {"to": "+15559876543", "text": "Hello Bob!"},
        {"to": "+15555555555", "text": "Hello Charlie!"},
    ],
    sender="SENDLY"
)

print(f"Batch ID: {batch.batch_id}")
print(f"Queued: {batch.queued}/{batch.total}")
print(f"Credits used: {batch.credits_used}")`,
          },
          {
            title: "Go",
            language: "go",
            code: `package main

import (
    "fmt"
    "github.com/sendly/sendly-go"
)

func main() {
    client := sendly.New("sk_test_v1_...")

    batch, err := client.Messages.SendBatch(&sendly.BatchMessageRequest{
        Messages: []sendly.BatchMessage{
            {To: "+15551234567", Text: "Hello Alice!"},
            {To: "+15559876543", Text: "Hello Bob!"},
            {To: "+15555555555", Text: "Hello Charlie!"},
        },
        From: "SENDLY",
    })
    if err != nil {
        panic(err)
    }

    fmt.Printf("Batch ID: %s\\n", batch.BatchID)
    fmt.Printf("Queued: %d/%d\\n", batch.Queued, batch.Total)
    fmt.Printf("Credits used: %d\\n", batch.CreditsUsed)
}`,
          },
          {
            title: "CLI (from file)",
            language: "bash",
            code: `# Create a JSON file with recipients
cat > recipients.json << 'EOF'
[
  { "to": "+15551234567", "text": "Hello Alice!" },
  { "to": "+15559876543", "text": "Hello Bob!" },
  { "to": "+15555555555", "text": "Hello Charlie!" }
]
EOF

# Send batch from file
sendly sms batch --file recipients.json --from SENDLY

# Output:
# ✓ Batch sent
#   Batch ID:     batch_xyz789
#   Total:        3
#   Queued:       3
#   Failed:       0
#   Credits Used: 3`,
          },
          {
            title: "CLI (inline)",
            language: "bash",
            code: `# Send same message to multiple recipients
sendly sms batch \\
  --to "+15551234567,+15559876543,+15555555555" \\
  --text "Hello everyone!" \\
  --from SENDLY`,
          },
        ],
      },
      {
        id: "get-batch",
        title: "Get Batch Status",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Check the status of a batch and see individual message delivery
              results.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /v1/messages/batch/:batchId
              </code>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "typescript",
            code: `// Get batch status
const status = await sendly.messages.getBatch('batch_xyz789');

console.log(\`Status: \${status.status}\`);
console.log(\`Delivered: \${status.delivered}/\${status.total}\`);

// Check individual message statuses
for (const msg of status.messages) {
  console.log(\`\${msg.to}: \${msg.status}\`);
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
              Retrieve a list of all batches you've sent.
            </p>
            <div className="flex items-center gap-2 my-4 p-3 bg-secondary/30 rounded-md border border-border w-fit">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold"
              >
                GET
              </Badge>
              <code className="text-sm font-mono text-foreground">
                /v1/messages/batches
              </code>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js",
            language: "typescript",
            code: `// List all batches
const batches = await sendly.messages.listBatches();

for (const batch of batches.data) {
  console.log(\`\${batch.batchId}: \${batch.total} messages\`);
}`,
          },
        ],
      },
    ],
  },

  // ============================================
  // CLI
  // ============================================
  "/docs/cli": {
    title: "CLI Reference",
    subtitle: "Sendly command-line interface for developers.",
    updatedAt: "Dec 16, 2025",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Install the Sendly CLI globally using npm, yarn, or pnpm.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
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
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Verify Installation",
            language: "bash",
            code: `sendly --version
# sendly/1.0.0 darwin-arm64 node-v20.0.0`,
          },
        ],
      },
      {
        id: "authentication",
        title: "Authentication",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Authenticate with your Sendly API key before using the CLI.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Login with API Key",
            language: "bash",
            code: `# Interactive login
sendly login

# Login with API key directly
sendly login --api-key sk_test_v1_...

# Check authentication status
sendly whoami

# Logout
sendly logout`,
          },
        ],
      },
      {
        id: "sms-send",
        title: "Send SMS",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Send an SMS message from the command line.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Flag</div>
                <div className="col-span-2">Short</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">--to</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -t
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Destination phone number in E.164 format (required)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    --text
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -m
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Message content (required)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    --from
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -f
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Sender ID (optional)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    --json
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Output in JSON format
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send SMS",
            language: "bash",
            code: `# Send a message
sendly sms send --to +15551234567 --text "Hello from CLI!"

# With sender ID
sendly sms send --to +15551234567 --text "Hello!" --from SENDLY

# JSON output for scripting
sendly sms send --to +15551234567 --text "Hello!" --json`,
          },
        ],
      },
      {
        id: "sms-schedule",
        title: "Schedule SMS",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Schedule messages to be sent at a specific time in the future.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Flag</div>
                <div className="col-span-2">Short</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">--to</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -t
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Destination phone number (required)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    --text
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -m
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Message content (required)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">--at</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -a
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    ISO 8601 timestamp for delivery (required)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    --from
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -f
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Sender ID (optional)
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Schedule a Message",
            language: "bash",
            code: `# Schedule for a specific time
sendly sms schedule \\
  --to +15551234567 \\
  --text "Reminder: Meeting in 1 hour" \\
  --at "2025-01-20T09:00:00Z"

# List scheduled messages
sendly sms scheduled

# Cancel a scheduled message
sendly sms cancel msg_abc123`,
          },
        ],
      },
      {
        id: "sms-batch",
        title: "Batch SMS",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Send messages to multiple recipients at once using a file or
              inline list.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-3">Flag</div>
                <div className="col-span-2">Short</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    --file
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -F
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    JSON or CSV file with recipients
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">--to</div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -t
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Comma-separated phone numbers
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    --text
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -m
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Message for all recipients (with --to)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-primary">
                    --from
                  </div>
                  <div className="col-span-2 font-mono text-muted-foreground">
                    -f
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Default sender ID
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Batch from File",
            language: "bash",
            code: `# JSON file format
cat > recipients.json << 'EOF'
[
  { "to": "+15551234567", "text": "Hello Alice!" },
  { "to": "+15559876543", "text": "Hello Bob!" }
]
EOF

# Send batch
sendly sms batch --file recipients.json --from SENDLY`,
          },
          {
            title: "Batch Inline",
            language: "bash",
            code: `# Send same message to multiple recipients
sendly sms batch \\
  --to "+15551234567,+15559876543,+15555555555" \\
  --text "Hello everyone!" \\
  --from SENDLY`,
          },
          {
            title: "CSV File Format",
            language: "bash",
            code: `# CSV file format
cat > recipients.csv << 'EOF'
to,text
+15551234567,Hello Alice!
+15559876543,Hello Bob!
EOF

# Send batch from CSV
sendly sms batch --file recipients.csv`,
          },
        ],
      },
      {
        id: "output-modes",
        title: "Output Modes",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              The CLI supports multiple output modes for different use cases.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  Human Mode (default)
                </div>
                <p className="text-sm text-muted-foreground">
                  Colored, formatted output for interactive use in terminals.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  JSON Mode (--json)
                </div>
                <p className="text-sm text-muted-foreground">
                  Machine-readable JSON output for scripting and automation.
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Output Examples",
            language: "bash",
            code: `# Human-readable output (default)
sendly sms send --to +15551234567 --text "Hello!"
# ✓ Message sent
#   ID:       msg_abc123
#   Status:   queued
#   Credits:  1

# JSON output for scripting
sendly sms send --to +15551234567 --text "Hello!" --json
# {"id":"msg_abc123","status":"queued","creditsUsed":1}

# Use with jq for processing
sendly sms send --to +15551234567 --text "Hello!" --json | jq '.id'`,
          },
        ],
      },
    ],
  },

  // ============================================
  // SDKs
  // ============================================
  "/docs/sdks": {
    title: "SDK Overview",
    subtitle: "Official Sendly SDKs for 8 programming languages.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "overview",
        title: "Available SDKs",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Sendly provides official SDKs for major programming languages. All
              SDKs follow consistent patterns and include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Full TypeScript/type definitions</li>
              <li>Automatic retry with exponential backoff</li>
              <li>Rate limit handling</li>
              <li>Comprehensive error types</li>
              <li>Webhook signature verification</li>
            </ul>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="p-4 border border-border rounded-lg bg-card hover:border-[#539e43]/50 transition-colors group">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2 group-hover:text-[#539e43] transition-colors">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                    alt="Node.js"
                    className="w-5 h-5"
                  />
                  Node.js
                </div>
                <code className="text-xs bg-secondary p-1 rounded block">
                  npm install @sendly/sdk
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card hover:border-[#3776ab]/50 transition-colors group">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2 group-hover:text-[#3776ab] transition-colors">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                    alt="Python"
                    className="w-5 h-5"
                  />
                  Python
                </div>
                <code className="text-xs bg-secondary p-1 rounded block">
                  pip install sendly
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card hover:border-[#00add8]/50 transition-colors group">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2 group-hover:text-[#00add8] transition-colors">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg"
                    alt="Go"
                    className="w-5 h-5"
                  />
                  Go
                </div>
                <code className="text-xs bg-secondary p-1 rounded block">
                  go get github.com/sendly/sendly-go
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card hover:border-[#e76f00]/50 transition-colors group">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2 group-hover:text-[#e76f00] transition-colors">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                    alt="Java"
                    className="w-5 h-5"
                  />
                  Java
                </div>
                <code className="text-xs bg-secondary p-1 rounded block">
                  com.sendly:sendly-java
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card hover:border-[#dea584]/50 transition-colors group">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2 group-hover:text-[#dea584] transition-colors">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg"
                    alt="Rust"
                    className="w-5 h-5"
                  />
                  Rust
                </div>
                <code className="text-xs bg-secondary p-1 rounded block">
                  cargo add sendly
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card hover:border-[#777bb3]/50 transition-colors group">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2 group-hover:text-[#777bb3] transition-colors">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
                    alt="PHP"
                    className="w-5 h-5"
                  />
                  PHP
                </div>
                <code className="text-xs bg-secondary p-1 rounded block">
                  composer require sendly/sendly
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card hover:border-[#cc342d]/50 transition-colors group">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2 group-hover:text-[#cc342d] transition-colors">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg"
                    alt="Ruby"
                    className="w-5 h-5"
                  />
                  Ruby
                </div>
                <code className="text-xs bg-secondary p-1 rounded block">
                  gem install sendly
                </code>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card hover:border-[#512bd4]/50 transition-colors group">
                <div className="font-bold mb-2 text-foreground flex items-center gap-2 group-hover:text-[#512bd4] transition-colors">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"
                    alt="C#"
                    className="w-5 h-5"
                  />
                  C# / .NET
                </div>
                <code className="text-xs bg-secondary p-1 rounded block">
                  dotnet add package Sendly
                </code>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "features",
        title: "SDK Features",
        content: (
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-4">Feature</div>
                <div className="col-span-8">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-primary">
                    Auto Retry
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Exponential backoff on 5xx errors and rate limits (max 3
                    retries)
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-primary">
                    Rate Limit Handling
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Respects Retry-After header, getRateLimitInfo() method
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-primary">
                    Typed Errors
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Specific error classes for each error type
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-primary">
                    Pagination
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Manual and auto-pagination with listAll() generators
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-primary">
                    Webhooks
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Signature verification and event parsing helpers
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-primary">
                    Validation
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    E.164 phone number and message length validation
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  "/docs/sdks/node": {
    title: "Node.js SDK",
    subtitle: "Official Sendly SDK for Node.js and TypeScript.",
    updatedAt: "Dec 13, 2025",
    version: "1.0.0",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Install the Sendly SDK using npm, yarn, or pnpm.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "npm",
            language: "bash",
            code: "npm install @sendly/sdk",
          },
          {
            title: "yarn",
            language: "bash",
            code: "yarn add @sendly/sdk",
          },
          {
            title: "pnpm",
            language: "bash",
            code: "pnpm add @sendly/sdk",
          },
        ],
      },
      {
        id: "quickstart",
        title: "Quick Start",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Initialize the client and send your first message.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send a Message",
            language: "typescript",
            code: `import { Sendly } from '@sendly/sdk';

// Initialize with your API key
const sendly = new Sendly(process.env.SENDLY_API_KEY);

// Send a message
const message = await sendly.messages.send({
  to: '+15551234567',
  text: 'Hello from Sendly!'
});

console.log('Message ID:', message.id);
console.log('Status:', message.status);
console.log('Segments:', message.segments);`,
          },
        ],
      },
      {
        id: "configuration",
        title: "Configuration",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Configure the SDK with custom options.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Configuration Options",
            language: "typescript",
            code: `const sendly = new Sendly('sk_test_v1_...', {
  // Custom base URL (for testing)
  baseUrl: 'https://api.sendly.dev',

  // Request timeout in milliseconds (default: 30000)
  timeout: 60000,

  // Maximum retry attempts (default: 3)
  maxRetries: 5,

  // Custom headers
  headers: {
    'X-Custom-Header': 'value'
  }
});`,
          },
        ],
      },
      {
        id: "methods",
        title: "Available Methods",
        content: (
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-5">Method</div>
                <div className="col-span-7">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-5 font-mono text-primary">
                    messages.send()
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Send an SMS message
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-5 font-mono text-primary">
                    messages.get(id)
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Get a message by ID
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-5 font-mono text-primary">
                    messages.list(options?)
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    List messages with pagination
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-5 font-mono text-primary">
                    messages.listAll(options?)
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Auto-paginate through all messages
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-5 font-mono text-primary">
                    isTestMode()
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Check if using test API key
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-5 font-mono text-primary">
                    getRateLimitInfo()
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    Get current rate limit status
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "errors",
        title: "Error Handling",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The SDK provides typed error classes for each error type.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Error Handling",
            language: "typescript",
            code: `import {
  SendlyError,
  AuthenticationError,
  InsufficientCreditsError,
  RateLimitError,
  ValidationError,
  ServerError
} from '@sendly/sdk';

try {
  await sendly.messages.send({ to, text });
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Invalid or expired API key
    console.error('Auth failed:', error.message);
  } else if (error instanceof InsufficientCreditsError) {
    // Not enough credits
    console.error(\`Need \${error.creditsNeeded} credits\`);
    console.error(\`Current balance: \${error.currentBalance}\`);
  } else if (error instanceof RateLimitError) {
    // Rate limited
    console.error(\`Retry after \${error.retryAfter} seconds\`);
  } else if (error instanceof ValidationError) {
    // Invalid input
    console.error('Validation failed:', error.message);
  } else if (error instanceof ServerError) {
    // Server error (will be retried automatically)
    console.error('Server error:', error.statusCode);
  }
}`,
          },
        ],
      },
      {
        id: "pagination",
        title: "Pagination",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Two ways to paginate through messages.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Manual Pagination",
            language: "typescript",
            code: `// Get first page
const page1 = await sendly.messages.list({ limit: 50 });
console.log(page1.data);

// Get next page
const page2 = await sendly.messages.list({ limit: 50, offset: 50 });
console.log(page2.data);`,
          },
          {
            title: "Auto Pagination",
            language: "typescript",
            code: `// Automatically iterate through all messages
for await (const message of sendly.messages.listAll()) {
  console.log(message.id, message.status);
}

// With options
for await (const message of sendly.messages.listAll({ limit: 100 })) {
  if (message.status === 'failed') {
    console.log('Failed:', message.id, message.error);
  }
}`,
          },
        ],
      },
      {
        id: "webhooks",
        title: "Webhook Verification",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Verify webhook signatures to ensure requests come from Sendly.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Express.js Example",
            language: "typescript",
            code: `import express from 'express';
import { Webhooks } from '@sendly/sdk';

const app = express();

app.post('/webhooks/sendly', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-sendly-signature'] as string;
  const payload = req.body.toString();
  const secret = process.env.SENDLY_WEBHOOK_SECRET;

  try {
    const event = Webhooks.parseEvent(payload, signature, secret);

    switch (event.type) {
      case 'message.delivered':
        console.log('Message delivered:', event.data.message_id);
        break;
      case 'message.failed':
        console.log('Message failed:', event.data.error);
        break;
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Invalid signature');
    res.sendStatus(403);
  }
});`,
          },
        ],
      },
    ],
  },

  "/docs/sdks/python": {
    title: "Python SDK",
    subtitle: "Official Sendly SDK for Python with async support.",
    updatedAt: "Dec 13, 2025",
    version: "1.0.0",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Install the Sendly SDK using pip.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "pip",
            language: "bash",
            code: "pip install sendly",
          },
        ],
      },
      {
        id: "quickstart",
        title: "Quick Start",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Initialize the client and send your first message.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Synchronous",
            language: "python",
            code: `from sendly import Sendly

# Initialize with your API key
sendly = Sendly(os.environ['SENDLY_API_KEY'])

# Send a message
message = sendly.messages.send(
    to='+15551234567',
    text='Hello from Sendly!'
)

print(f'Message ID: {message.id}')
print(f'Status: {message.status}')`,
          },
          {
            title: "Asynchronous",
            language: "python",
            code: `import asyncio
from sendly import AsyncSendly

async def main():
    sendly = AsyncSendly(os.environ['SENDLY_API_KEY'])

    message = await sendly.messages.send(
        to='+15551234567',
        text='Hello from Sendly!'
    )

    print(f'Message ID: {message.id}')

asyncio.run(main())`,
          },
        ],
      },
      {
        id: "errors",
        title: "Error Handling",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The SDK provides typed exception classes.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Error Handling",
            language: "python",
            code: `from sendly import Sendly
from sendly.exceptions import (
    SendlyError,
    AuthenticationError,
    InsufficientCreditsError,
    RateLimitError,
    ValidationError
)

try:
    message = sendly.messages.send(to=to, text=text)
except AuthenticationError as e:
    print(f'Auth failed: {e.message}')
except InsufficientCreditsError as e:
    print(f'Need {e.credits_needed} credits, have {e.current_balance}')
except RateLimitError as e:
    print(f'Retry after {e.retry_after} seconds')
except ValidationError as e:
    print(f'Validation failed: {e.message}')`,
          },
        ],
      },
      {
        id: "pagination",
        title: "Pagination",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Iterate through messages with auto-pagination.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Synchronous",
            language: "python",
            code: `# Auto-paginate through all messages
for message in sendly.messages.list_all():
    print(f'{message.id}: {message.status}')`,
          },
          {
            title: "Asynchronous",
            language: "python",
            code: `# Async auto-pagination
async for message in sendly.messages.list_all():
    print(f'{message.id}: {message.status}')`,
          },
        ],
      },
      {
        id: "webhooks",
        title: "Webhook Verification",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Verify webhook signatures with the Webhooks helper.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Flask Example",
            language: "python",
            code: `from flask import Flask, request
from sendly.webhooks import Webhooks

app = Flask(__name__)

@app.route('/webhooks/sendly', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Sendly-Signature')
    payload = request.data.decode('utf-8')
    secret = os.environ['SENDLY_WEBHOOK_SECRET']

    try:
        event = Webhooks.parse_event(payload, signature, secret)

        if event.type == 'message.delivered':
            print(f'Delivered: {event.data["message_id"]}')
        elif event.type == 'message.failed':
            print(f'Failed: {event.data["error"]}')

        return '', 200
    except ValueError:
        return 'Invalid signature', 403`,
          },
        ],
      },
    ],
  },

  "/docs/sdks/go": {
    title: "Go SDK",
    subtitle: "Official Sendly SDK for Go.",
    updatedAt: "Dec 13, 2025",
    version: "1.0.0",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Install the Sendly SDK using go get.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "go get",
            language: "bash",
            code: "go get github.com/sendly/sendly-go",
          },
        ],
      },
      {
        id: "quickstart",
        title: "Quick Start",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Initialize the client and send your first message.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send a Message",
            language: "go",
            code: `package main

import (
    "context"
    "fmt"
    "os"

    "github.com/sendly/sendly-go"
)

func main() {
    client := sendly.New(os.Getenv("SENDLY_API_KEY"))

    message, err := client.Messages.Send(context.Background(), &sendly.SendMessageRequest{
        To:   "+15551234567",
        Text: "Hello from Sendly!",
    })
    if err != nil {
        panic(err)
    }

    fmt.Printf("Message ID: %s\\n", message.ID)
    fmt.Printf("Status: %s\\n", message.Status)
}`,
          },
        ],
      },
      {
        id: "errors",
        title: "Error Handling",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Check error types using type assertions.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Error Handling",
            language: "go",
            code: `message, err := client.Messages.Send(ctx, req)
if err != nil {
    switch e := err.(type) {
    case *sendly.AuthenticationError:
        log.Fatalf("Auth failed: %s", e.Message)
    case *sendly.InsufficientCreditsError:
        log.Fatalf("Need %d credits, have %d", e.CreditsNeeded, e.CurrentBalance)
    case *sendly.RateLimitError:
        log.Fatalf("Retry after %d seconds", e.RetryAfter)
    case *sendly.ValidationError:
        log.Fatalf("Validation failed: %s", e.Message)
    default:
        log.Fatalf("Error: %v", err)
    }
}`,
          },
        ],
      },
    ],
  },

  "/docs/sdks/java": {
    title: "Java SDK",
    subtitle: "Official Sendly SDK for Java.",
    updatedAt: "Dec 13, 2025",
    version: "1.0.0",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Add the Sendly SDK to your project using Maven or Gradle.
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
    <version>1.0.0</version>
</dependency>`,
          },
          {
            title: "Gradle",
            language: "groovy",
            code: `implementation 'com.sendly:sendly-java:1.0.0'`,
          },
        ],
      },
      {
        id: "quickstart",
        title: "Quick Start",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Initialize the client and send your first message.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send a Message",
            language: "java",
            code: `import com.sendly.Sendly;
import com.sendly.models.Message;
import com.sendly.models.SendMessageRequest;

public class Main {
    public static void main(String[] args) {
        Sendly client = new Sendly(System.getenv("SENDLY_API_KEY"));

        Message message = client.messages().send(
            new SendMessageRequest()
                .to("+15551234567")
                .text("Hello from Sendly!")
        );

        System.out.println("Message ID: " + message.getId());
        System.out.println("Status: " + message.getStatus());
    }
}`,
          },
        ],
      },
    ],
  },

  "/docs/sdks/rust": {
    title: "Rust SDK",
    subtitle: "Official Sendly SDK for Rust.",
    updatedAt: "Dec 13, 2025",
    version: "1.0.0",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Add the Sendly SDK to your Cargo.toml.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Cargo",
            language: "bash",
            code: `cargo add sendly`,
          },
          {
            title: "Cargo.toml",
            language: "toml",
            code: `[dependencies]
sendly = "1.0"`,
          },
        ],
      },
      {
        id: "quickstart",
        title: "Quick Start",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Initialize the client and send your first message.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send a Message",
            language: "rust",
            code: `use sendly::{Sendly, SendMessageRequest};

#[tokio::main]
async fn main() -> Result<(), sendly::Error> {
    let client = Sendly::new(std::env::var("SENDLY_API_KEY")?);

    let message = client.messages().send(SendMessageRequest {
        to: "+15551234567".to_string(),
        text: "Hello from Sendly!".to_string(),
        from: None,
    }).await?;

    println!("Message ID: {}", message.id);
    println!("Status: {:?}", message.status);

    Ok(())
}`,
          },
        ],
      },
    ],
  },

  "/docs/sdks/php": {
    title: "PHP SDK",
    subtitle: "Official Sendly SDK for PHP.",
    updatedAt: "Dec 13, 2025",
    version: "1.0.0",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Install the Sendly SDK using Composer.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Composer",
            language: "bash",
            code: `composer require sendly/sendly-php`,
          },
        ],
      },
      {
        id: "quickstart",
        title: "Quick Start",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Initialize the client and send your first message.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send a Message",
            language: "php",
            code: `<?php
require 'vendor/autoload.php';

use Sendly\\Sendly;

$client = new Sendly(getenv('SENDLY_API_KEY'));

$message = $client->messages->send([
    'to' => '+15551234567',
    'text' => 'Hello from Sendly!'
]);

echo "Message ID: " . $message->id . "\\n";
echo "Status: " . $message->status . "\\n";`,
          },
        ],
      },
    ],
  },

  "/docs/sdks/ruby": {
    title: "Ruby SDK",
    subtitle: "Official Sendly SDK for Ruby.",
    updatedAt: "Dec 13, 2025",
    version: "1.0.0",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Install the Sendly SDK using gem or Bundler.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "gem",
            language: "bash",
            code: `gem install sendly`,
          },
          {
            title: "Gemfile",
            language: "ruby",
            code: `gem 'sendly'`,
          },
        ],
      },
      {
        id: "quickstart",
        title: "Quick Start",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Initialize the client and send your first message.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send a Message",
            language: "ruby",
            code: `require 'sendly'

client = Sendly::Client.new(ENV['SENDLY_API_KEY'])

message = client.messages.send(
  to: '+15551234567',
  text: 'Hello from Sendly!'
)

puts "Message ID: #{message.id}"
puts "Status: #{message.status}"`,
          },
        ],
      },
    ],
  },

  "/docs/sdks/csharp": {
    title: "C# / .NET SDK",
    subtitle: "Official Sendly SDK for C# and .NET.",
    updatedAt: "Dec 13, 2025",
    version: "1.0.0",
    sections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Install the Sendly SDK using NuGet.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: ".NET CLI",
            language: "bash",
            code: `dotnet add package Sendly`,
          },
          {
            title: "Package Manager",
            language: "bash",
            code: `Install-Package Sendly`,
          },
        ],
      },
      {
        id: "quickstart",
        title: "Quick Start",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Initialize the client and send your first message.
            </p>
          </div>
        ),
        codeBlocks: [
          {
            title: "Send a Message",
            language: "csharp",
            code: `using Sendly;

var client = new SendlyClient(Environment.GetEnvironmentVariable("SENDLY_API_KEY"));

var message = await client.Messages.SendAsync(new SendMessageRequest
{
    To = "+15551234567",
    Text = "Hello from Sendly!"
});

Console.WriteLine($"Message ID: {message.Id}");
Console.WriteLine($"Status: {message.Status}");`,
          },
        ],
      },
    ],
  },

  // ============================================
  // WEBHOOKS
  // ============================================
  "/docs/webhooks": {
    title: "Webhooks",
    subtitle: "Receive real-time delivery status notifications.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Webhooks allow your application to receive real-time notifications
              when message events occur, such as delivery confirmations or
              failures.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex gap-3">
              <Webhook className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="font-semibold text-blue-500 text-sm">
                  Setup in Dashboard
                </p>
                <p className="text-sm text-blue-500/80 mt-1">
                  Configure your webhook URL and secret in the Sendly dashboard
                  under Settings → Webhooks.
                </p>
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
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-4">Event Type</div>
                <div className="col-span-8">Description</div>
              </div>
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
                  <div className="col-span-4 font-mono text-primary">
                    message.delivered
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Message was delivered to the recipient
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-mono text-primary">
                    message.failed
                  </div>
                  <div className="col-span-8 text-muted-foreground">
                    Message delivery failed
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Webhook Payload",
            language: "json",
            code: `{
  "id": "evt_abc123",
  "type": "message.delivered",
  "data": {
    "message_id": "msg_xyz789",
    "status": "delivered",
    "delivered_at": "2025-12-13T10:35:00Z"
  },
  "created_at": "2025-12-13T10:35:01Z"
}`,
          },
        ],
      },
      {
        id: "verification",
        title: "Signature Verification",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Every webhook request includes an{" "}
              <code className="bg-secondary px-1 rounded">
                X-Sendly-Signature
              </code>{" "}
              header. Verify this signature to ensure the request came from
              Sendly.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
              <div>
                <p className="font-semibold text-yellow-500 text-sm">
                  Security
                </p>
                <p className="text-sm text-yellow-500/80 mt-1">
                  Always verify webhook signatures in production. Never trust
                  webhook data without verification.
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Signature Format",
            language: "text",
            code: `X-Sendly-Signature: sha256=<HMAC-SHA256-of-payload-with-secret>`,
          },
          {
            title: "Manual Verification",
            language: "typescript",
            code: `import crypto from 'crypto';

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(\`sha256=\${expected}\`)
  );
}`,
          },
        ],
      },
      {
        id: "handling",
        title: "Handling Webhooks",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Best practices for handling webhooks reliably.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <strong>Return 200 quickly</strong> - Process webhooks
                asynchronously to avoid timeouts
              </li>
              <li>
                <strong>Handle duplicates</strong> - Use message_id to
                deduplicate events
              </li>
              <li>
                <strong>Retry logic</strong> - We retry failed webhooks
                (non-2xx) up to 3 times
              </li>
              <li>
                <strong>Verify signatures</strong> - Always verify before
                processing
              </li>
            </ul>
          </div>
        ),
        codeBlocks: [
          {
            title: "Complete Example",
            language: "typescript",
            code: `import express from 'express';
import { Webhooks } from '@sendly/sdk';

const app = express();

// Use raw body for signature verification
app.post('/webhooks/sendly',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['x-sendly-signature'] as string;
    const payload = req.body.toString();

    // Verify signature
    try {
      const event = Webhooks.parseEvent(
        payload,
        signature,
        process.env.SENDLY_WEBHOOK_SECRET
      );

      // Return 200 immediately
      res.sendStatus(200);

      // Process async
      await processEvent(event);

    } catch (error) {
      console.error('Invalid webhook:', error);
      res.sendStatus(403);
    }
  }
);

async function processEvent(event) {
  switch (event.type) {
    case 'message.delivered':
      await markMessageDelivered(event.data.message_id);
      break;
    case 'message.failed':
      await handleFailedMessage(event.data.message_id, event.data.error);
      break;
  }
}`,
          },
        ],
      },
    ],
  },

  // ============================================
  // API REFERENCE
  // ============================================
  "/docs/api": {
    title: "API Reference",
    subtitle: "Complete reference for all Sendly API endpoints.",
    updatedAt: "Dec 13, 2025",
    sections: [
      {
        id: "endpoints",
        title: "Endpoints",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              All available API endpoints.
            </p>
            <div className="grid gap-2">
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-500 border-green-500/20"
                  >
                    POST
                  </Badge>
                  <span className="font-mono text-sm">/v1/messages</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Send a message
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">/v1/messages</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  List messages
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">/v1/messages/:id</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Get message by ID
                </span>
              </div>
              <div className="p-3 border border-border rounded flex items-center justify-between hover:bg-secondary/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    GET
                  </Badge>
                  <span className="font-mono text-sm">/v1/health</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Health check
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "rate-limits",
        title: "Rate Limits",
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              API requests are rate limited based on your API key type.
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-4">Key Type</div>
                <div className="col-span-4">Limit</div>
                <div className="col-span-4">Window</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-primary">
                    Test (sk_test_*)
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    60 requests
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    per minute
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-4 font-semibold text-primary">
                    Live (sk_live_*)
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    600 requests
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    per minute
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Rate limit headers are included in every response:{" "}
              <code className="bg-secondary px-1 rounded">
                X-RateLimit-Limit
              </code>
              ,
              <code className="bg-secondary px-1 rounded">
                X-RateLimit-Remaining
              </code>
              ,{" "}
              <code className="bg-secondary px-1 rounded">
                X-RateLimit-Reset
              </code>
            </p>
          </div>
        ),
      },
      {
        id: "errors",
        title: "Error Codes",
        content: (
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-mono font-bold">
                <div className="col-span-2">HTTP</div>
                <div className="col-span-4">Error Code</div>
                <div className="col-span-6">Description</div>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 text-yellow-500">400</div>
                  <div className="col-span-4 font-mono text-muted-foreground">
                    invalid_request
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    Invalid request body or parameters
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 text-red-500">401</div>
                  <div className="col-span-4 font-mono text-muted-foreground">
                    unauthorized
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    Invalid or missing API key
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 text-red-500">402</div>
                  <div className="col-span-4 font-mono text-muted-foreground">
                    insufficient_credits
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    Not enough credits to send
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 text-red-500">403</div>
                  <div className="col-span-4 font-mono text-muted-foreground">
                    verification_required
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    Business verification needed
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 text-orange-500">429</div>
                  <div className="col-span-4 font-mono text-muted-foreground">
                    rate_limit_exceeded
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    Too many requests
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4 text-sm">
                  <div className="col-span-2 text-red-500">500</div>
                  <div className="col-span-4 font-mono text-muted-foreground">
                    server_error
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    Internal server error
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  // ============================================
  // WEBHOOKS
  // ============================================
  "/docs/webhooks": {
    title: "Webhooks",
    subtitle:
      "Receive real-time notifications when SMS events occur in your application",
    updatedAt: "Dec 14, 2025",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: (
          <div className="space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Webhooks allow your application to receive real-time notifications
              when SMS events occur. Instead of polling our API for status
              updates, we'll send HTTP POST requests to your specified
              endpoints.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-3 font-semibold text-primary">
                  <Webhook className="w-5 h-5" />
                  Real-time Updates
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get instant notifications when messages are sent, delivered,
                  failed, or bounced.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-3 font-semibold text-primary">
                  <Shield className="w-5 h-5" />
                  Secure Delivery
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  HMAC signatures ensure webhook authenticity and prevent
                  tampering.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "getting-started",
        title: "Getting Started",
        content: (
          <div className="space-y-6">
            <p>
              Setting up webhooks is straightforward. Follow these steps to
              receive your first webhook:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Create an endpoint</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up an HTTPS endpoint in your application to receive
                    webhook events.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Configure webhook</h4>
                  <p className="text-sm text-muted-foreground">
                    Add your webhook URL and select which events you want to
                    receive.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Verify signatures</h4>
                  <p className="text-sm text-muted-foreground">
                    Implement signature verification to ensure webhook
                    authenticity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Test delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the test feature to verify your webhook is working
                    correctly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "event-types",
        title: "Event Types",
        content: (
          <div className="space-y-6">
            <p>
              Sendly supports four main event types that cover the SMS
              lifecycle:
            </p>
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-mono">
                    message.sent
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Fired when a message is successfully sent to the carrier. This
                  means the message has left our system and is on its way to the
                  recipient.
                </p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-mono">
                    message.delivered
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Fired when a message is successfully delivered to the
                  recipient's device. This is the final confirmation that the
                  message reached its destination.
                </p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-mono">
                    message.failed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Fired when a message fails to be delivered. This includes
                  carrier rejections, invalid numbers, and other delivery
                  failures.
                </p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-mono">
                    message.bounced
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Fired when a message bounces due to invalid destination
                  numbers or carrier-level rejections before delivery attempts.
                </p>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Example Payload: message.delivered",
            language: "json",
            code: `{
  "event": "message.delivered",
  "data": {
    "id": "msg_1234567890",
    "to": "+1234567890",
    "from": "+15551234567",
    "text": "Hello from Sendly!",
    "status": "delivered",
    "deliveredAt": "2024-01-15T10:31:30Z",
    "segments": 1,
    "cost": "0.0075"
  },
  "timestamp": "2024-01-15T10:31:30Z",
  "apiVersion": "v1"
}`,
            description:
              "All webhook payloads follow this structure with event-specific data",
          },
        ],
      },
      {
        id: "signatures",
        title: "Signature Verification",
        content: (
          <div className="space-y-6">
            <p>
              Every webhook request includes an{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                X-Sendly-Signature
              </code>{" "}
              header containing an HMAC SHA-256 signature of the request body
              using your webhook secret.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-yellow-500 mb-1">
                    Security Important
                  </p>
                  <p className="text-sm text-yellow-200/80">
                    Always verify webhook signatures in production to ensure
                    requests are actually from Sendly. Failing to do so could
                    allow attackers to spoof webhooks to your application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
        codeBlocks: [
          {
            title: "Node.js Signature Verification",
            language: "javascript",
            code: `const crypto = require('crypto');
const express = require('express');
const app = express();

app.use('/webhooks/sendly', express.raw({type: 'application/json'}));

app.post('/webhooks/sendly', (req, res) => {
  const signature = req.headers['x-sendly-signature'];
  const secret = process.env.SENDLY_WEBHOOK_SECRET;

  // Verify timestamp to prevent replay attacks
  const timestamp = req.headers['x-sendly-timestamp'];
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) { // 5 minute tolerance
    return res.status(400).send('Timestamp too old');
  }

  // Create expected signature
  const payload = timestamp + '.' + req.body;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  // Compare signatures
  const receivedSignature = signature.replace('sha256=', '');

  if (!crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(receivedSignature, 'hex')
  )) {
    return res.status(401).send('Invalid signature');
  }

  // Process the webhook
  const event = JSON.parse(req.body);
  console.log('Received event:', event.event);

  res.status(200).send('OK');
});`,
            description:
              "Always use timing-safe comparison and verify timestamps",
          },
          {
            title: "Python Signature Verification",
            language: "python",
            code: `import hmac
import hashlib
import time
from flask import Flask, request, abort

app = Flask(__name__)

@app.route('/webhooks/sendly', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Sendly-Signature')
    timestamp = request.headers.get('X-Sendly-Timestamp')
    secret = os.environ['SENDLY_WEBHOOK_SECRET']

    # Verify timestamp
    now = int(time.time())
    if abs(now - int(timestamp)) > 300:  # 5 minute tolerance
        abort(400, 'Timestamp too old')

    # Create expected signature
    payload = f"{timestamp}.{request.get_data(as_text=True)}"
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    # Compare signatures
    received_signature = signature.replace('sha256=', '')

    if not hmac.compare_digest(expected_signature, received_signature):
        abort(401, 'Invalid signature')

    # Process the webhook
    event = request.get_json()
    print(f"Received event: {event['event']}")

    return 'OK', 200`,
            description:
              "Use hmac.compare_digest() for constant-time comparison",
          },
          {
            title: "Go Signature Verification",
            language: "go",
            code: `package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "crypto/subtle"
    "encoding/hex"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "math"
    "net/http"
    "os"
    "strconv"
    "strings"
    "time"
)

type WebhookEvent struct {
    Event     string          \\json:"event"\\
    Data      json.RawMessage \\json:"data"\\
    Timestamp time.Time       \\json:"timestamp"\\
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    signature := r.Header.Get("X-Sendly-Signature")
    timestamp := r.Header.Get("X-Sendly-Timestamp")
    secret := os.Getenv("SENDLY_WEBHOOK_SECRET")

    // Verify timestamp
    ts, err := strconv.ParseInt(timestamp, 10, 64)
    if err != nil {
        http.Error(w, "Invalid timestamp", http.StatusBadRequest)
        return
    }

    now := time.Now().Unix()
    if math.Abs(float64(now-ts)) > 300 { // 5 minute tolerance
        http.Error(w, "Timestamp too old", http.StatusBadRequest)
        return
    }

    // Read body
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Cannot read body", http.StatusBadRequest)
        return
    }

    // Create expected signature
    payload := fmt.Sprintf("%s.%s", timestamp, string(body))
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write([]byte(payload))
    expectedSignature := hex.EncodeToString(mac.Sum(nil))

    // Compare signatures
    receivedSignature := strings.Replace(signature, "sha256=", "", 1)

    if subtle.ConstantTimeCompare([]byte(expectedSignature), []byte(receivedSignature)) != 1 {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }

    // Process webhook
    var event WebhookEvent
    if err := json.Unmarshal(body, &event); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    fmt.Printf("Received event: %s\\n", event.Event)
    w.WriteHeader(http.StatusOK)
}`,
            description:
              "Use subtle.ConstantTimeCompare for secure signature verification",
          },
        ],
      },
      {
        id: "best-practices",
        title: "Best Practices",
        content: (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Security
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li>
                    • Always use HTTPS endpoints - we reject HTTP webhooks
                  </li>
                  <li>
                    • Verify signatures on every request to prevent spoofing
                  </li>
                  <li>
                    • Implement timestamp validation to prevent replay attacks
                  </li>
                  <li>• Consider IP allowlisting for additional security</li>
                  <li>
                    • Use a dedicated webhook secret that's different from your
                    API key
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Reliability
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li>• Respond with 2xx status codes within 10 seconds</li>
                  <li>
                    • Implement idempotency - handle duplicate events gracefully
                  </li>
                  <li>• Use proper error handling and logging</li>
                  <li>
                    • Consider implementing a dead letter queue for failed
                    processing
                  </li>
                  <li>• Monitor your webhook endpoints for availability</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Performance
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li>• Keep webhook processing lightweight and fast</li>
                  <li>• Use background job queues for heavy processing</li>
                  <li>
                    • Avoid synchronous database writes in webhook handlers
                  </li>
                  <li>• Consider rate limiting your webhook endpoints</li>
                  <li>• Monitor response times and optimize bottlenecks</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting",
        content: (
          <div className="space-y-6">
            <p>Common issues and solutions when working with webhooks:</p>
            <div className="space-y-6">
              <div className="border border-red-500/20 bg-red-500/5 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">
                  Webhooks Not Received
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Check that your endpoint returns 2xx status codes</li>
                  <li>
                    • Verify your endpoint is accessible from the internet
                  </li>
                  <li>• Ensure you're using HTTPS, not HTTP</li>
                  <li>• Check your firewall and security group settings</li>
                </ul>
              </div>

              <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-500 mb-2">
                  Signature Verification Failing
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Ensure you're using the correct webhook secret</li>
                  <li>
                    • Verify timestamp format and replay attack protection
                  </li>
                  <li>• Check that you're reading the raw request body</li>
                  <li>• Make sure character encoding is consistent (UTF-8)</li>
                </ul>
              </div>

              <div className="border border-blue-500/20 bg-blue-500/5 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">
                  High Retry Attempts
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    • Check your endpoint response times (should be under 10s)
                  </li>
                  <li>• Verify you're returning proper HTTP status codes</li>
                  <li>• Monitor your application logs for errors</li>
                  <li>• Consider implementing circuit breakers if needed</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
};
