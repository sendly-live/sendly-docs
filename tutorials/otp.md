# Tutorial: Build Phone Verification in 15 Minutes

In this tutorial, you'll build a complete phone verification system using Sendly's OTP API. By the end, you'll have a working app where users can:

1. Enter their phone number
2. Receive a 6-digit code via SMS
3. Enter the code to verify their phone

**What you'll build:**

![Phone verification flow](https://sendly.live/docs/images/otp-flow.png)

---

## Prerequisites

Before starting, make sure you have:

- **Node.js 18+** installed ([download here](https://nodejs.org))
- A **Sendly account** ([sign up free](https://sendly.live))
- Your **Sendly API key** (find it in your [dashboard](https://sendly.live/dashboard/api-keys))

No prior experience with Sendly is required.

---

## Step 1: Create a New Project

Open your terminal and create a new Next.js app:

```bash
npx create-next-app@latest phone-verification --typescript --tailwind --app --no-src-dir
cd phone-verification
```

When prompted, accept the defaults.

Install the Sendly SDK:

```bash
npm install @sendly/node
```

You should see output like:

```
added 1 package in 2s
```

---

## Step 2: Add Your API Key

Create a file called `.env.local` in your project root:

```bash
echo "SENDLY_API_KEY=sk_test_v1_your_key_here" > .env.local
```

Replace `sk_test_v1_your_key_here` with your actual test API key from the Sendly dashboard.

> **Important:** Use a test key (`sk_test_...`) for this tutorial. Test keys enable sandbox mode where no real SMS is sent and no credits are charged.

---

## Step 3: Build the Send OTP Endpoint

Create a new file at `app/api/send-otp/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Sendly from '@sendly/node';

const sendly = new Sendly(process.env.SENDLY_API_KEY!);

export async function POST(request: NextRequest) {
  const { phone } = await request.json();

  // Validate phone number exists
  if (!phone) {
    return NextResponse.json(
      { error: 'Phone number is required' },
      { status: 400 }
    );
  }

  try {
    // Send the OTP
    const verification = await sendly.verify.send({
      to: phone,
      appName: 'My App',
    });

    // Return the verification ID (and sandbox code for testing)
    return NextResponse.json({
      verificationId: verification.id,
      sandboxCode: verification.sandboxCode, // Only present in test mode
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
```

**What this does:**
- Receives a phone number from the frontend
- Calls `sendly.verify.send()` to send an OTP
- Returns the verification ID needed for the next step

---

## Step 4: Build the Verify OTP Endpoint

Create a new file at `app/api/verify-otp/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Sendly from '@sendly/node';

const sendly = new Sendly(process.env.SENDLY_API_KEY!);

export async function POST(request: NextRequest) {
  const { verificationId, code } = await request.json();

  // Validate inputs
  if (!verificationId || !code) {
    return NextResponse.json(
      { error: 'Verification ID and code are required' },
      { status: 400 }
    );
  }

  try {
    // Check the OTP
    const result = await sendly.verify.check(verificationId, { code });

    if (result.status === 'verified') {
      // Success! The phone number is verified
      return NextResponse.json({
        success: true,
        phone: result.phone,
      });
    } else {
      // Code was wrong
      return NextResponse.json({
        success: false,
        error: 'Invalid code',
        remainingAttempts: result.remainingAttempts,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
```

**What this does:**
- Receives the verification ID and the code the user entered
- Calls `sendly.verify.check()` to validate the code
- Returns success if the code matches, or an error with remaining attempts

---

## Step 5: Build the Phone Input Page

Replace the contents of `app/page.tsx` with:

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Store verification ID and redirect to verify page
      sessionStorage.setItem('verificationId', data.verificationId);
      sessionStorage.setItem('phone', phone);
      
      // In sandbox mode, store the code for easy testing
      if (data.sandboxCode) {
        sessionStorage.setItem('sandboxCode', data.sandboxCode);
      }

      router.push('/verify');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Phone Verification
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your phone number to receive a verification code
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4 text-gray-800"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Standard SMS rates may apply
        </p>
      </div>
    </main>
  );
}
```

---

## Step 6: Build the OTP Verification Page

Create a new file at `app/verify/page.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [sandboxCode, setSandboxCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if we have a verification in progress
    const verificationId = sessionStorage.getItem('verificationId');
    if (!verificationId) {
      router.push('/');
      return;
    }
    
    // Show sandbox code if available
    const storedSandboxCode = sessionStorage.getItem('sandboxCode');
    if (storedSandboxCode) {
      setSandboxCode(storedSandboxCode);
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const verificationId = sessionStorage.getItem('verificationId');

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationId, code }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Clear session storage
        sessionStorage.removeItem('verificationId');
        sessionStorage.removeItem('sandboxCode');
        sessionStorage.removeItem('phone');
      } else {
        setError(
          data.remainingAttempts !== undefined
            ? `Invalid code. ${data.remainingAttempts} attempts remaining.`
            : data.error
        );
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Verified!
          </h1>
          <p className="text-gray-600 mb-6">
            Your phone number has been successfully verified.
          </p>
          <button
            onClick={() => router.push('/')}
            className="text-purple-600 font-semibold hover:underline"
          >
            ← Back to start
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Enter Verification Code
        </h1>
        <p className="text-gray-600 mb-6">
          We sent a 6-digit code to your phone
        </p>

        {sandboxCode && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg mb-4">
            <span className="font-semibold">Sandbox Mode:</span> Use code{' '}
            <code className="bg-amber-100 px-2 py-1 rounded font-mono">
              {sandboxCode}
            </code>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4 text-center text-2xl tracking-widest font-mono text-gray-800"
            maxLength={6}
            required
            autoFocus
          />
          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <button
          onClick={() => router.push('/')}
          className="w-full text-gray-500 mt-4 hover:text-gray-700"
        >
          ← Back to phone input
        </button>
      </div>
    </main>
  );
}
```

---

## Step 7: Test Your App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Test the flow:**

1. Enter any phone number (e.g., `+15551234567`)
2. Click "Send Verification Code"
3. You'll see the sandbox code displayed in a yellow box
4. Enter that code and click "Verify Code"
5. You'll see the success screen!

> **Note:** In sandbox mode (test API keys), no real SMS is sent. The code is returned in the API response for testing purposes.

---

## Step 8: Go Live

When you're ready for production:

1. **Get a live API key** from your [Sendly dashboard](https://sendly.live/dashboard/api-keys)

2. **Update your environment variable:**
   ```bash
   # In .env.local (for local testing)
   SENDLY_API_KEY=sk_live_v1_your_live_key
   
   # In your hosting platform (Vercel, etc.)
   # Add SENDLY_API_KEY as an environment variable
   ```

3. **Remove the sandbox code display** from your verify page (the `sandboxCode` state and yellow box)

4. **Deploy your app** to Vercel:
   ```bash
   npx vercel
   ```

That's it! Users will now receive real SMS messages with their verification codes.

---

## What You Learned

In this tutorial, you:

- ✅ Created API endpoints to send and verify OTP codes
- ✅ Built a phone input form that calls your send endpoint
- ✅ Built an OTP input form that validates codes
- ✅ Tested the complete flow in sandbox mode
- ✅ Learned how to switch to production

---

## SDK Examples for Other Languages

While this tutorial uses Next.js, the Sendly SDK is available for all major languages. Here are equivalent backend implementations:

{% tabs %}
{% tab title="Python (Flask)" %}
```python
from sendly import Sendly

sendly = Sendly("sk_live_xxx")

# Send verification
verification = sendly.verify.send(to="+15551234567", app_name="My App")

# Check verification
result = sendly.verify.check(verification.id, code=user_entered_code)
if result.status == "verified":
    print(f"Phone {result.phone} verified successfully")
```
{% endtab %}

{% tab title="Go" %}
```go
client := sendly.New("sk_live_xxx")

// Send verification
verification, err := client.Verify.Send(ctx, &sendly.SendVerificationRequest{
    To: "+15551234567",
    AppName: "My App",
})

// Check verification
result, err := client.Verify.Check(ctx, verification.ID, &sendly.CheckVerificationRequest{
    Code: userEnteredCode,
})
if result.Status == "verified" {
    fmt.Printf("Phone %s verified successfully", result.Phone)
}
```
{% endtab %}

{% tab title="Ruby" %}
```ruby
client = Sendly::Client.new('sk_live_xxx')

# Send verification
verification = client.verify.send(to: '+15551234567', app_name: 'My App')

# Check verification
result = client.verify.check(verification.id, code: code)
if result.status == 'verified'
  puts "Phone #{result.phone} verified successfully"
end
```
{% endtab %}

{% tab title="PHP" %}
```php
$client = new Sendly('sk_live_xxx');

// Send verification
$verification = $client->verify->send('+15551234567', ['appName' => 'My App']);

// Check verification
$result = $client->verify->check($verification->id, $code);
if ($result->status === 'verified') {
    echo "Phone {$result->phone} verified successfully";
}
```
{% endtab %}

{% tab title="Java" %}
```java
Sendly client = new Sendly("sk_live_xxx");

// Send verification
Verification verification = client.verify().send(
    new SendVerificationRequest()
        .to("+15551234567")
        .appName("My App")
);

// Check verification
CheckResponse result = client.verify().check(verification.getId(), code);
if (result.getStatus().equals("verified")) {
    System.out.println("Phone " + result.getPhone() + " verified successfully");
}
```
{% endtab %}

{% tab title="C#" %}
```csharp
var client = new SendlyClient("sk_live_xxx");

// Send verification
var verification = await client.Verify.SendAsync(new SendVerificationRequest 
{
    To = "+15551234567",
    AppName = "My App"
});

// Check verification
var result = await client.Verify.CheckAsync(verification.Id, new CheckRequest { Code = code });
if (result.Status == "verified")
{
    Console.WriteLine($"Phone {result.Phone} verified successfully");
}
```
{% endtab %}

{% tab title="Rust" %}
```rust
let client = Sendly::new("sk_live_xxx");

// Send verification
let verification = client.verify()
    .send(SendVerificationRequest::new("+15551234567").app_name("My App"))
    .await?;

// Check verification
let result = client.verify().check(&verification.id, &code).await?;
if result.status == "verified" {
    println!("Phone {} verified successfully", result.phone);
}
```
{% endtab %}
{% endtabs %}

---

## Next Steps

Now that you have phone verification working, you might want to:

- **[Add resend functionality](/docs/how-to/resend-otp)** - Let users request a new code
- **[Handle edge cases](/docs/how-to/handle-otp-errors)** - Expired codes, rate limits, etc.
- **[View the API reference](/docs/otp-verification)** - See all available options and templates

---

## Troubleshooting

**"Invalid phone number" error**

Phone numbers must be in E.164 format: `+` followed by country code and number.
- ✅ `+15551234567` (US)
- ✅ `+447700900123` (UK)
- ❌ `555-123-4567` (missing country code)

**"Verification not found" error**

The verification ID expired (default: 5 minutes). Have the user request a new code.

**"Max attempts exceeded" error**

The user entered the wrong code 3 times. They need to request a new code.

**Need help?**

- Check the [API reference](/docs/otp-verification) for detailed documentation
- View [example repositories](https://github.com/sendly-examples) for all 8 languages
- [Contact support](https://sendly.live/support) for additional help

---

## Complete Code

The complete code for this tutorial is available at:

```bash
git clone https://github.com/sendly-examples/sendly-nextjs-otp-example
cd sendly-nextjs-otp-example
npm install
echo "SENDLY_API_KEY=your_key" > .env.local
npm run dev
```

We also have examples in [Python](/examples/python), [Go](/examples/go), [Ruby](/examples/ruby), [PHP](/examples/php), [Rust](/examples/rust), [C#](/examples/dotnet), and [Java](/examples/java).
