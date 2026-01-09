# Local Development

When building SMS integrations, you face a fundamental tension: you need to test your code thoroughly, but sending real SMS messages during development is expensive, slow, and annoying to recipients. This is why Sendly provides a complete local development environment that mirrors production behavior without the costs or side effects.

## Why Sandbox Mode Exists

Every Sendly API key comes in two flavors: test keys (`sk_test_...`) and live keys (`sk_live_...`). This isn't just a naming convention—it represents two entirely separate environments.

When you use a test key, Sendly's servers recognize this and route your requests through a simulation layer. Messages are validated exactly as they would be in production (phone number format, message length, rate limits), but instead of being handed off to carrier networks, they're marked as "delivered" instantly. The response you receive is structurally identical to a real message—same fields, same timing characteristics—so your code can't tell the difference.

This approach is fundamentally different from mocking. With mocks, you're testing your assumptions about how an API behaves. With sandbox mode, you're testing against the actual API; only the final delivery step is simulated.

## The Magic Test Number

The number `+15005550000` has special meaning in sandbox mode. While you can send test messages to any phone number, this specific number is guaranteed to succeed in every scenario. It's useful for automated tests where you need predictable behavior without worrying about phone number validation edge cases.

In production, this number would be rejected as invalid. The separation is intentional—code that accidentally uses the magic number in production will fail loudly rather than silently sending nowhere.

## Environment Variable Patterns

API keys should never appear in source code. This isn't just a security best practice; it's essential for the test/live separation to work correctly.

When your application reads `SENDLY_API_KEY` from the environment, you can swap between test and production by changing a single value in your deployment configuration. Your CI pipeline uses a test key. Your staging environment might use a test key with live-like data. Production uses a live key. The same code runs everywhere, behaving appropriately in each context.

This pattern also enables key rotation without code changes, and allows different team members to use their own test keys during development.

## Webhooks and the Localhost Problem

Webhooks present a unique challenge for local development. Sendly needs to send HTTP requests to your server, but your laptop isn't accessible from the public internet.

Traditional solutions involve tunneling services like ngrok, which expose a local port through a public URL. This works but introduces external dependencies and requires managing tunnel sessions.

Sendly's CLI takes a different approach: instead of making your machine publicly accessible, it establishes an outbound WebSocket connection to Sendly's servers. When events occur, they're pushed through this existing connection to your local machine, which then forwards them to your local server. The connection is initiated from your side, so no firewall configuration is needed.

This matters because it means local webhook testing is as simple as running a single command. No account creation with third-party services, no URL management, no wondering if your tunnel is still active.

## Test vs Live: The Complete Picture

The test/live separation runs deeper than just "no real SMS sent." Webhook payloads include a `livemode` field indicating which environment generated them. Your webhook handlers can use this to route test events differently—perhaps to a logging system rather than your production database.

API rate limits are more generous in test mode, allowing rapid iteration without hitting throttling. Error messages may be more verbose, exposing debugging information that would be hidden in production for security reasons.

This two-environment model isn't unique to Sendly—it follows patterns established by payment processors like Stripe, where the consequences of accidental production calls are similarly significant. If you've worked with Stripe's test mode, Sendly's approach will feel immediately familiar.

## See Also

- [Test Webhooks Locally](/docs/how-to/test-webhooks-locally) — Set up the CLI for local webhook testing
- [Send Your First SMS](/docs/tutorials/send-sms) — Get started with sandbox mode
