# How to Test Webhooks Locally

Receive Sendly webhook events on your local development machine.

---

## Install the CLI

```bash
npm install -g @sendly/cli
```

Or with Homebrew:

```bash
brew install SendlyHQ/tap/sendly
```

---

## Authenticate

```bash
sendly login
```

---

## Start the Listener

```bash
sendly webhooks listen --forward http://localhost:3000/webhook
```

Save the webhook secret displayed in the output—you'll need it to verify signatures.

---

## Trigger a Test Event

In a separate terminal:

```bash
sendly trigger message.delivered
```

You should see the event appear in both terminals.

---

## Filter to Specific Events

```bash
sendly webhooks listen --forward http://localhost:3000/webhook --events message.delivered,message.failed
```

---

## Use a Custom Port

```bash
sendly webhooks listen --forward http://localhost:8080/api/webhooks
```

---

## See Also

- [Set Up Webhooks](/docs/tutorials/webhooks) — Create production webhook endpoints
- [Local Development](/docs/concepts/local-development) — How the CLI tunneling works
