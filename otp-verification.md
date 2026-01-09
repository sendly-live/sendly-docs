# OTP Verification API

Send and verify one-time passwords (OTPs) for phone number verification.

## Overview

The Verify API provides a complete solution for phone number verification:
- Send 4-10 digit OTP codes via SMS
- Automatic code expiration (configurable 60s - 1 hour)
- Rate limiting to prevent abuse
- Retry logic with attempt tracking
- Sandbox mode for testing

## Two Ways to Verify

| Approach | Best For | Code Required |
|----------|----------|---------------|
| **Hosted Flow** | Quick integration, no UI work | ~20 lines |
| **Direct API** | Full control over UX | ~300 lines |

---

## Hosted Flow (Recommended)

Let Sendly handle the entire verification UI. You just redirect users and validate the result.

### How It Works

```
Your App                    Sendly                     User
   │                           │                         │
   │  1. Create session        │                         │
   │  ─────────────────────►   │                         │
   │                           │                         │
   │  ◄── { url: /v/ses_xxx }  │                         │
   │                           │                         │
   │  2. Redirect user ────────────────────────────────► │
   │                           │                         │
   │                           │  3. User enters phone   │
   │                           │  4. SMS sent            │
   │                           │  5. User enters code    │
   │                           │  6. Verified ✓          │
   │                           │                         │
   │  7. Redirect back ◄───────────────────────────────  │
   │     ?token=tok_xxx        │                         │
   │                           │                         │
   │  8. Validate token        │                         │
   │  ─────────────────────►   │                         │
   │                           │                         │
   │  ◄── { valid, phone }     │                         │
```

### Quick Start

**1. Create a session and redirect:**

```javascript
// Your backend
app.get('/verify-phone', async (req, res) => {
  const session = await sendly.verify.sessions.create({
    successUrl: 'https://yourapp.com/verified',
    cancelUrl: 'https://yourapp.com/signup',
    brandName: 'YourApp',
    brandColor: '#f59e0b',
    metadata: { userId: req.user.id }
  });
  
  res.redirect(session.url);
});
```

**2. Handle the callback:**

```javascript
// Your backend
app.get('/verified', async (req, res) => {
  const { token } = req.query;
  
  const result = await sendly.verify.sessions.validate({ token });
  
  if (result.valid) {
    // Save verified phone to user record
    await db.users.update({
      where: { id: result.metadata.userId },
      data: { phone: result.phone, phoneVerified: true }
    });
    res.redirect('/dashboard');
  } else {
    res.redirect('/signup?error=verification_failed');
  }
});
```

**That's it.** ~20 lines total. Sendly handles phone input, country selection, code entry, error states, resend logic, and mobile responsiveness.

### API Reference

#### POST /api/v1/verify/sessions

Create a hosted verification session.

**Request:**

```bash
curl -X POST https://sendly.live/api/v1/verify/sessions \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "success_url": "https://yourapp.com/verified",
    "cancel_url": "https://yourapp.com/signup",
    "brand_name": "YourApp",
    "brand_color": "#f59e0b",
    "metadata": {"user_id": "123"}
  }'
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| success_url | string | Yes | Redirect URL after successful verification. Use `{TOKEN}` placeholder for auto-substitution. |
| cancel_url | string | No | Redirect URL if user cancels |
| phone | string | No | Pre-fill phone number (user can't change) |
| brand_name | string | No | Your app name (shown in UI) |
| brand_color | string | No | Hex color for primary buttons (e.g., #f59e0b) |
| brand_logo_url | string | No | URL to your logo image (recommended: 200x50px) |
| brand_background | string | No | Background color or gradient (e.g., #f3f4f6 or linear-gradient(...)) |
| brand_accent | string | No | Accent color for links and secondary elements |
| border_radius | string | No | Border radius for inputs/buttons (e.g., "8px", "full") |
| font_family | string | No | Font family (e.g., "Inter", "system-ui") |
| metadata | object | No | Pass-through data returned on validation |

**Response:**

```json
{
  "id": "ses_abc123def456",
  "url": "https://sendly.live/v/ses_abc123def456",
  "expires_at": "2025-01-05T12:30:00Z"
}
```

#### POST /api/v1/verify/sessions/validate

Validate the token returned after verification.

**Request:**

```bash
curl -X POST https://sendly.live/api/v1/verify/sessions/validate \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{"token": "tok_xyz123abc456"}'
```

**Response:**

```json
{
  "valid": true,
  "phone": "+15551234567",
  "verified_at": "2025-01-05T12:25:00Z",
  "metadata": {"user_id": "123"}
}
```

### SDK Examples

**Node.js:**
```javascript
const session = await sendly.verify.sessions.create({
  successUrl: 'https://yourapp.com/verified',
  metadata: { userId: '123' }
});
// Redirect to session.url

const result = await sendly.verify.sessions.validate({ token });
if (result.valid) { /* verified */ }
```

**Python:**
```python
session = sendly.verify.sessions.create(
    success_url="https://yourapp.com/verified",
    metadata={"user_id": "123"}
)
# Redirect to session.url

result = sendly.verify.sessions.validate(token=token)
if result.valid:
    # verified
```

**Go:**
```go
session, _ := client.Verify.Sessions.Create(ctx, &sendly.CreateSessionRequest{
    SuccessURL: "https://yourapp.com/verified",
    Metadata:   map[string]interface{}{"userId": "123"},
})
// Redirect to session.URL

result, _ := client.Verify.Sessions.Validate(ctx, &sendly.ValidateSessionRequest{
    Token: token,
})
if result.Valid { /* verified */ }
```

**Ruby:**
```ruby
session = sendly.verify.sessions.create(
  success_url: "https://yourapp.com/verified",
  metadata: { user_id: "123" }
)
# Redirect to session.url

result = sendly.verify.sessions.validate(token: token)
if result.valid?
  # verified
end
```

**PHP:**
```php
$session = $sendly->verify->sessions->create([
    'success_url' => 'https://yourapp.com/verified',
    'metadata' => ['user_id' => '123']
]);
// Redirect to $session['url']

$result = $sendly->verify->sessions->validate($token);
if ($result['valid']) {
    // verified
}
```

**Java:**
```java
VerifySession session = sendly.verify().sessions().create(
    new CreateSessionRequest()
        .successUrl("https://yourapp.com/verified")
        .metadata(Map.of("userId", "123"))
);
// Redirect to session.getUrl()

ValidateSessionResponse result = sendly.verify().sessions().validate(token);
if (result.isValid()) {
    // verified
}
```

**.NET (C#):**
```csharp
var session = await sendly.Verify.Sessions.CreateAsync(new CreateSessionRequest {
    SuccessUrl = "https://yourapp.com/verified",
    Metadata = new Dictionary<string, object> { ["userId"] = "123" }
});
// Redirect to session.Url

var result = await sendly.Verify.Sessions.ValidateAsync(new ValidateSessionRequest { Token = token });
if (result.Valid) {
    // verified
}
```

**Rust:**
```rust
let session = client.verify().sessions().create(
    CreateSessionRequest::new("https://yourapp.com/verified")
        .metadata(HashMap::from([("userId".into(), json!("123"))]))
).await?;
// Redirect to session.url

let result = client.verify().sessions().validate(&token).await?;
if result.valid {
    // verified
}
```

### Security

- **Sessions expire in 30 minutes** - users must complete verification promptly
- **Tokens are one-time use** - each token can only be validated once
- **Tokens are scoped** - can only be validated with the same API key that created the session
- **HTTPS required** - success_url must be HTTPS (localhost allowed for development)
- **Cryptographically secure** - tokens are 48 hex characters (192 bits of entropy)

---

## Direct API (Full Control)

Use the direct API when you need complete control over the verification UX.

### Quick Start

### 1. Send an OTP

```bash
curl -X POST https://sendly.live/api/v1/verify \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{"to": "+15551234567"}'
```

Response:
```json
{
  "id": "ver_abc123",
  "status": "pending",
  "phone": "+15551234567",
  "expires_at": "2025-01-05T12:05:00Z",
  "sandbox": false
}
```

### 2. Verify the Code

```bash
curl -X POST https://sendly.live/api/v1/verify/ver_abc123/check \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{"code": "123456"}'
```

Response:
```json
{
  "id": "ver_abc123",
  "status": "verified",
  "phone": "+15551234567",
  "verified_at": "2025-01-05T12:01:30Z"
}
```

## API Endpoints

### POST /api/v1/verify

Send an OTP verification code.

**Request Body:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| to | string | Yes | Phone number in E.164 format (+1234567890) |
| template_id | string | No | Template ID (default: tpl_preset_otp) |
| profile_id | string | No | Verify profile ID for custom settings |
| app_name | string | No | App name in message (default: your business name) |
| timeout_secs | integer | No | Code validity in seconds (60-3600, default: 300) |
| code_length | integer | No | OTP length (4-10, default: 6) |

**Response:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Verification ID (ver_xxx) |
| status | string | Always "pending" |
| phone | string | Phone number |
| expires_at | string | ISO 8601 expiry time |
| sandbox | boolean | Whether sandbox mode |
| sandbox_code | string | OTP code (sandbox only!) |

---

### POST /api/v1/verify/:id/check

Check an OTP code entered by the user.

**Request Body:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| code | string | Yes | The OTP code to verify |

**Response:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Verification ID |
| status | string | "verified", "invalid", "expired", or "failed" |
| phone | string | Phone number |
| verified_at | string | ISO 8601 timestamp (if verified) |
| remaining_attempts | integer | Attempts left (if invalid) |

**Status Codes:**
- `200` - Code checked (see status field for result)
- `400` - Invalid code format
- `404` - Verification not found
- `410` - Verification expired
- `429` - Max attempts exceeded

---

### POST /api/v1/verify/:id/resend

Resend an OTP code for failed or expired verifications.

**Request:**

```bash
curl -X POST https://sendly.live/api/v1/verify/ver_abc123/resend \
  -H "Authorization: Bearer sk_live_xxx"
```

**When to use:**
- SMS delivery failed
- Code expired before user entered it
- User requests new code

**Response:** Same as POST /api/v1/verify

**Note:** Credits are charged for each resend.

---

### GET /api/v1/verify/:id

Get verification status.

**Request:**

```bash
curl https://sendly.live/api/v1/verify/ver_abc123 \
  -H "Authorization: Bearer sk_live_xxx"
```

**Response:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Verification ID |
| status | string | "pending", "verified", "expired", "failed" |
| phone | string | Phone number |
| delivery_status | string | "queued", "sent", "delivered", "failed" |
| attempts | integer | Check attempts made |
| max_attempts | integer | Maximum allowed attempts (default: 3) |
| expires_at | string | ISO 8601 expiry time |
| verified_at | string | ISO 8601 (if verified) |
| created_at | string | ISO 8601 creation time |

---

### GET /api/v1/verify

List recent verifications.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| limit | integer | Max results (1-100, default: 20) |
| status | string | Filter by status |

---

## SDK Examples

### Node.js

```javascript
import Sendly from '@sendly/node';

const sendly = new Sendly('sk_live_xxx');

// Send OTP
const verification = await sendly.verify.send({
  to: '+15551234567',
  appName: 'MyApp',
  codeLength: 6,
  timeoutSecs: 300
});

// Check code (after user enters it)
const result = await sendly.verify.check(verification.id, {
  code: userEnteredCode
});

if (result.status === 'verified') {
  // Phone number verified!
}

// Resend if needed
const resent = await sendly.verify.resend(verification.id);
```

### Python

```python
from sendly import Sendly

sendly = Sendly("sk_live_xxx")

# Send OTP
verification = sendly.verify.send(
    to="+15551234567",
    app_name="MyApp"
)

# Check code (after user enters it)
result = sendly.verify.check(verification.id, code=user_entered_code)

if result.status == "verified":
    # Phone number verified!
    pass

# Resend if needed
resent = sendly.verify.resend(verification.id)
```

### Go

```go
client := sendly.New("sk_live_xxx")
ctx := context.Background()

// Send OTP
verification, _ := client.Verify.Send(ctx, &sendly.SendVerificationRequest{
    To:      "+15551234567",
    AppName: "MyApp",
})

// Check code (after user enters it)
result, _ := client.Verify.Check(ctx, verification.ID, &sendly.CheckVerificationRequest{
    Code: userEnteredCode,
})

if result.Status == "verified" {
    // Phone number verified!
}

// Resend if needed
resent, _ := client.Verify.Resend(ctx, verification.ID)
```

### Ruby

```ruby
sendly = Sendly::Client.new("sk_live_xxx")

# Send OTP
verification = sendly.verify.send(
  to: "+15551234567",
  app_name: "MyApp"
)

# Check code (after user enters it)
result = sendly.verify.check(verification.id, code: user_entered_code)

if result.status == "verified"
  # Phone number verified!
end

# Resend if needed
resent = sendly.verify.resend(verification.id)
```

### PHP

```php
$sendly = new Sendly\Client("sk_live_xxx");

// Send OTP
$verification = $sendly->verify->send([
    'to' => '+15551234567',
    'app_name' => 'MyApp'
]);

// Check code (after user enters it)
$result = $sendly->verify->check($verification['id'], [
    'code' => $userEnteredCode
]);

if ($result['status'] === 'verified') {
    // Phone number verified!
}

// Resend if needed
$resent = $sendly->verify->resend($verification['id']);
```

### Java

```java
Sendly sendly = new Sendly("sk_live_xxx");

// Send OTP
Verification verification = sendly.verify().send(
    new SendVerificationRequest()
        .to("+15551234567")
        .appName("MyApp")
);

// Check code (after user enters it)
CheckResult result = sendly.verify().check(verification.getId(), userEnteredCode);

if (result.getStatus().equals("verified")) {
    // Phone number verified!
}

// Resend if needed
Verification resent = sendly.verify().resend(verification.getId());
```

### C#

```csharp
var sendly = new SendlyClient("sk_live_xxx");

// Send OTP
var verification = await sendly.Verify.SendAsync(new SendVerificationRequest {
    To = "+15551234567",
    AppName = "MyApp"
});

// Check code (after user enters it)
var result = await sendly.Verify.CheckAsync(verification.Id, userEnteredCode);

if (result.Status == "verified") {
    // Phone number verified!
}

// Resend if needed
var resent = await sendly.Verify.ResendAsync(verification.Id);
```

### Rust

```rust
let client = sendly::Client::new("sk_live_xxx");

// Send OTP
let verification = client.verify().send(
    SendVerificationRequest::new("+15551234567")
        .app_name("MyApp")
).await?;

// Check code (after user enters it)
let result = client.verify().check(&verification.id, &user_entered_code).await?;

if result.status == "verified" {
    // Phone number verified!
}

// Resend if needed
let resent = client.verify().resend(&verification.id).await?;
```

---

## Sandbox Testing

Use test API keys (`sk_test_xxx`) for sandbox mode:
- **No SMS is actually sent** - saves credits during development
- **sandbox_code is returned** in the API response - use this to test your flow
- **Credits are not charged** in sandbox mode

Example sandbox response:
```json
{
  "id": "ver_test123",
  "status": "pending",
  "phone": "+15551234567",
  "expires_at": "2025-01-05T12:05:00Z",
  "sandbox": true,
  "sandbox_code": "123456"
}
```

---

## Pricing

OTP verification uses tiered pricing based on destination:

| Destination | Credits per OTP |
|-------------|-----------------|
| US/Canada (domestic) | 1 credit |
| Tier 1 (UK, Germany, France, etc.) | 8 credits |
| Tier 2 (Mexico, Brazil, India, etc.) | 12 credits |
| Tier 3 (Other countries) | 16 credits |

Resends are charged the same rate as the original send.

---

## Rate Limits

**API Rate Limits:**
- **Test keys:** 60 requests/minute
- **Live keys:** 600 requests/minute

**Per-Phone Limits:**
- **5 OTPs per phone number per 10 minutes** - prevents spam to single number
- **20 OTPs per phone number per 24 hours** - daily limit per phone
- **3 check attempts per verification** - configurable via max_attempts
- **5-minute expiry** by default - configurable via timeout_secs

---

## Security Best Practices

1. **Never expose OTP codes** - sandbox_code is only for testing
2. **Use HTTPS** - all API calls should be over HTTPS
3. **Store verification IDs securely** - tie them to user sessions
4. **Implement your own rate limiting** - add limits at your application level
5. **Use short expiry times** - 5 minutes is typical for OTPs
6. **Hash codes server-side** - Sendly uses bcrypt to hash all codes

---

## Verify Profiles

Verify profiles let you create reusable configurations for different verification flows (e.g., signup vs. login).

### What is a profile_id?

A `profile_id` references a Verify Profile that defines:
- **Template**: Which SMS template to use
- **Code length**: 4-10 digits
- **Timeout**: How long codes are valid
- **Max attempts**: How many check attempts allowed
- **App name**: Your brand name in messages

### Creating a Profile

```bash
curl -X POST https://sendly.live/api/v1/verify-profiles \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Signup Flow",
    "template_id": "tpl_preset_signup",
    "code_length": 6,
    "timeout_secs": 300,
    "max_attempts": 3,
    "app_name": "MyApp"
  }'
```

### Using a Profile

```bash
curl -X POST https://sendly.live/api/v1/verify \
  -H "Authorization: Bearer sk_live_xxx" \
  -d '{"to": "+15551234567", "profile_id": "vp_abc123"}'
```

### When to Use Profiles

- **Multiple flows**: Different settings for signup vs. 2FA
- **Team consistency**: Ensure all verifications use the same branding
- **Easy updates**: Change settings in one place, applies everywhere

---

## Webhook Events

Sendly can send webhooks for verification lifecycle events:

| Event | Description |
|-------|-------------|
| `verification.created` | OTP sent successfully |
| `verification.delivered` | SMS delivered to carrier |
| `verification.verified` | Code verified successfully |
| `verification.failed` | Max attempts exceeded |
| `verification.expired` | Code expired without verification |
| `verification.resent` | OTP resent successfully |
| `verification.delivery_failed` | SMS delivery failed |

Configure webhooks in your dashboard or via the Webhooks API.

### Webhook Payload Format

All verification webhooks follow this structure:

```json
{
  "id": "evt_abc123def456",
  "type": "verification.verified",
  "api_version": "2024-01",
  "created": 1704449250,
  "livemode": true,
  "data": {
    "object": {
      "id": "ver_xyz789",
      "phone": "+15551234567",
      "status": "verified",
      "delivery_status": "delivered",
      "attempts": 1,
      "max_attempts": 3,
      "expires_at": 1704449550,
      "verified_at": 1704449250,
      "created_at": 1704449000,
      "app_name": "MyApp",
      "template_id": "tpl_preset_otp",
      "profile_id": "vp_abc123"
    }
  }
}
```

### Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique event ID for idempotency |
| type | string | Event type (see table above) |
| api_version | string | API version (currently "2024-01") |
| created | integer | Unix timestamp when event occurred |
| livemode | boolean | `true` for production, `false` for sandbox |
| data.object | object | The verification object |

### Verification Object Fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Verification ID (ver_xxx) |
| phone | string | Phone number in E.164 format |
| status | string | pending, verified, expired, failed |
| delivery_status | string | queued, sent, delivered, failed |
| attempts | integer | Number of check attempts made |
| max_attempts | integer | Maximum allowed attempts |
| expires_at | integer | Unix timestamp when code expires |
| verified_at | integer | Unix timestamp when verified (if applicable) |
| created_at | integer | Unix timestamp when created |
| app_name | string | App name used in message (if set) |
| template_id | string | Template ID used (if set) |
| profile_id | string | Profile ID used (if set) |

### Example Payloads by Event Type

**verification.created** - OTP sent successfully:
```json
{
  "id": "evt_created_123",
  "type": "verification.created",
  "created": 1704449000,
  "livemode": true,
  "data": {
    "object": {
      "id": "ver_xyz789",
      "phone": "+15551234567",
      "status": "pending",
      "delivery_status": "sent",
      "attempts": 0,
      "max_attempts": 3,
      "expires_at": 1704449300
    }
  }
}
```

**verification.verified** - Code verified:
```json
{
  "id": "evt_verified_456",
  "type": "verification.verified",
  "created": 1704449120,
  "livemode": true,
  "data": {
    "object": {
      "id": "ver_xyz789",
      "phone": "+15551234567",
      "status": "verified",
      "delivery_status": "delivered",
      "attempts": 1,
      "verified_at": 1704449120
    }
  }
}
```

**verification.resent** - OTP resent:
```json
{
  "id": "evt_resent_789",
  "type": "verification.resent",
  "created": 1704449400,
  "livemode": true,
  "data": {
    "object": {
      "id": "ver_xyz789",
      "phone": "+15551234567",
      "status": "pending",
      "delivery_status": "sent",
      "attempts": 0,
      "expires_at": 1704449700
    }
  }
}
```

**verification.delivery_failed** - SMS delivery failed:
```json
{
  "id": "evt_delivery_failed_101",
  "type": "verification.delivery_failed",
  "created": 1704449050,
  "livemode": true,
  "data": {
    "object": {
      "id": "ver_xyz789",
      "phone": "+15551234567",
      "status": "pending",
      "delivery_status": "failed"
    }
  }
}
```

### Handling Webhooks

```javascript
app.post('/webhooks/sendly', (req, res) => {
  const event = req.body;
  
  switch (event.type) {
    case 'verification.verified':
      // Mark user's phone as verified
      await markPhoneVerified(event.data.object.phone);
      break;
      
    case 'verification.delivery_failed':
      // Alert user to retry with different number
      await notifyDeliveryFailed(event.data.object.id);
      break;
      
    case 'verification.expired':
      // Clean up pending verification
      await cleanupExpiredVerification(event.data.object.id);
      break;
  }
  
  res.status(200).json({ received: true });
});
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| invalid_request | 400 | Missing or invalid parameters |
| invalid_phone | 400 | Phone number format is invalid |
| insufficient_credits | 402 | Not enough credits |
| verification_required | 403 | Business verification required for live keys |
| not_found | 404 | Verification ID not found |
| expired | 410 | Verification code has expired |
| max_attempts_exceeded | 429 | Too many failed check attempts |
| rate_limit_exceeded | 429 | Too many OTPs to this phone number |
| unsupported_destination | 400 | Country not supported |

---

## FAQ

**Q: How long does an OTP code last?**
A: 5 minutes by default. Configurable from 60 seconds to 1 hour via `timeout_secs`.

**Q: How many attempts does the user get?**
A: 3 attempts by default. After that, they need to request a new code.

**Q: Can I customize the SMS message?**
A: Yes! Use templates to customize the message. See the Templates API.

**Q: What phone number does the SMS come from?**
A: For domestic US/Canada, we use toll-free numbers from our pool. For international, we use your alphanumeric sender ID (e.g., "MYAPP").

**Q: Is the OTP code stored in plain text?**
A: No. All codes are hashed using bcrypt before storage. We never store or log plain text codes.
