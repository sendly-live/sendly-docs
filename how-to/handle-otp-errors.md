# How to Handle OTP Verification Errors

Handle common error scenarios in your OTP verification flow.

---

## Expired Codes

{% tabs %}
{% tab title="Node.js" %}
```javascript
const result = await sendly.verify.check(verificationId, { code });
if (result.status === 'expired') {
  const newVerification = await sendly.verify.resend(verificationId);
}
```
{% endtab %}
{% tab title="Python" %}
```python
result = sendly.verify.check(verification_id, code=code)
if result.status == "expired":
    new_verification = sendly.verify.resend(verification_id)
```
{% endtab %}
{% tab title="Go" %}
```go
result, _ := client.Verify.Check(ctx, verificationID, &sendly.CheckRequest{Code: code})
if result.Status == "expired" {
    newVerification, _ := client.Verify.Resend(ctx, verificationID)
}
```
{% endtab %}
{% tab title="Ruby" %}
```ruby
result = sendly.verify.check(verification_id, code: code)
if result.status == "expired"
  new_verification = sendly.verify.resend(verification_id)
end
```
{% endtab %}
{% tab title="PHP" %}
```php
$result = $sendly->verify->check($verificationId, ['code' => $code]);
if ($result['status'] === 'expired') {
    $newVerification = $sendly->verify->resend($verificationId);
}
```
{% endtab %}
{% tab title="Java" %}
```java
CheckResult result = sendly.verify().check(verificationId, code);
if (result.getStatus().equals("expired")) {
    Verification newVerification = sendly.verify().resend(verificationId);
}
```
{% endtab %}
{% tab title="C#" %}
```csharp
var result = await sendly.Verify.CheckAsync(verificationId, code);
if (result.Status == "expired") {
    var newVerification = await sendly.Verify.ResendAsync(verificationId);
}
```
{% endtab %}
{% tab title="Rust" %}
```rust
let result = client.verify().check(verification_id, &code).await?;
if result.status == "expired" {
    let new_verification = client.verify().resend(verification_id).await?;
}
```
{% endtab %}
{% endtabs %}

**User message:** "This code has expired. We've sent you a new one."

---

## Invalid Codes

{% tabs %}
{% tab title="Node.js" %}
```javascript
const result = await sendly.verify.check(verificationId, { code });
if (result.status === 'invalid') {
  if (result.remainingAttempts > 0) {
    // Show: "Incorrect code. X attempts remaining."
  } else {
    // Show: "Too many attempts. Please request a new code."
  }
}
```
{% endtab %}
{% tab title="Python" %}
```python
result = sendly.verify.check(verification_id, code=code)
if result.status == "invalid":
    if result.remaining_attempts > 0:
        # Show: "Incorrect code. X attempts remaining."
    else:
        # Show: "Too many attempts. Please request a new code."
```
{% endtab %}
{% tab title="Go" %}
```go
result, _ := client.Verify.Check(ctx, verificationID, &sendly.CheckRequest{Code: code})
if result.Status == "invalid" {
    if result.RemainingAttempts > 0 {
        // Show: "Incorrect code. X attempts remaining."
    } else {
        // Show: "Too many attempts. Please request a new code."
    }
}
```
{% endtab %}
{% tab title="Ruby" %}
```ruby
result = sendly.verify.check(verification_id, code: code)
if result.status == "invalid"
  if result.remaining_attempts > 0
    # Show: "Incorrect code. X attempts remaining."
  else
    # Show: "Too many attempts. Please request a new code."
  end
end
```
{% endtab %}
{% tab title="PHP" %}
```php
$result = $sendly->verify->check($verificationId, ['code' => $code]);
if ($result['status'] === 'invalid') {
    if ($result['remaining_attempts'] > 0) {
        // Show: "Incorrect code. X attempts remaining."
    } else {
        // Show: "Too many attempts. Please request a new code."
    }
}
```
{% endtab %}
{% tab title="Java" %}
```java
CheckResult result = sendly.verify().check(verificationId, code);
if (result.getStatus().equals("invalid")) {
    if (result.getRemainingAttempts() > 0) {
        // Show: "Incorrect code. X attempts remaining."
    } else {
        // Show: "Too many attempts. Please request a new code."
    }
}
```
{% endtab %}
{% tab title="C#" %}
```csharp
var result = await sendly.Verify.CheckAsync(verificationId, code);
if (result.Status == "invalid") {
    if (result.RemainingAttempts > 0) {
        // Show: "Incorrect code. X attempts remaining."
    } else {
        // Show: "Too many attempts. Please request a new code."
    }
}
```
{% endtab %}
{% tab title="Rust" %}
```rust
let result = client.verify().check(verification_id, &code).await?;
if result.status == "invalid" {
    if result.remaining_attempts > 0 {
        // Show: "Incorrect code. X attempts remaining."
    } else {
        // Show: "Too many attempts. Please request a new code."
    }
}
```
{% endtab %}
{% endtabs %}

---

## Max Attempts Exceeded

{% tabs %}
{% tab title="Node.js" %}
```javascript
try {
  await sendly.verify.check(verificationId, { code });
} catch (error) {
  if (error.code === 'max_attempts_exceeded') {
    const newVerification = await sendly.verify.send({ to: phone });
  }
}
```
{% endtab %}
{% tab title="Python" %}
```python
try:
    sendly.verify.check(verification_id, code=code)
except SendlyError as e:
    if e.code == "max_attempts_exceeded":
        new_verification = sendly.verify.send(to=phone)
```
{% endtab %}
{% tab title="Go" %}
```go
result, err := client.Verify.Check(ctx, verificationID, &sendly.CheckRequest{Code: code})
if err != nil {
    var apiErr *sendly.APIError
    if errors.As(err, &apiErr) && apiErr.Code == "max_attempts_exceeded" {
        newVerification, _ := client.Verify.Send(ctx, &sendly.SendRequest{To: phone})
    }
}
```
{% endtab %}
{% tab title="Ruby" %}
```ruby
begin
  sendly.verify.check(verification_id, code: code)
rescue Sendly::MaxAttemptsExceededError
  new_verification = sendly.verify.send(to: phone)
end
```
{% endtab %}
{% tab title="PHP" %}
```php
try {
    $sendly->verify->check($verificationId, ['code' => $code]);
} catch (SendlyException $e) {
    if ($e->getCode() === 'max_attempts_exceeded') {
        $newVerification = $sendly->verify->send(['to' => $phone]);
    }
}
```
{% endtab %}
{% tab title="Java" %}
```java
try {
    sendly.verify().check(verificationId, code);
} catch (MaxAttemptsExceededException e) {
    Verification newVerification = sendly.verify().send(phone);
}
```
{% endtab %}
{% tab title="C#" %}
```csharp
try {
    await sendly.Verify.CheckAsync(verificationId, code);
} catch (SendlyException e) when (e.Code == "max_attempts_exceeded") {
    var newVerification = await sendly.Verify.SendAsync(phone);
}
```
{% endtab %}
{% tab title="Rust" %}
```rust
match client.verify().check(verification_id, &code).await {
    Err(SendlyError::MaxAttemptsExceeded) => {
        let new_verification = client.verify().send(&phone).await?;
    }
    _ => {}
}
```
{% endtab %}
{% endtabs %}

---

## Rate Limits

{% tabs %}
{% tab title="Node.js" %}
```javascript
try {
  await sendly.verify.send({ to: phone });
} catch (error) {
  if (error.code === 'rate_limit_exceeded') {
    // Show: "Too many requests. Please try again later."
  }
}
```
{% endtab %}
{% tab title="Python" %}
```python
try:
    sendly.verify.send(to=phone)
except SendlyError as e:
    if e.code == "rate_limit_exceeded":
        # Show: "Too many requests. Please try again later."
```
{% endtab %}
{% tab title="Go" %}
```go
_, err := client.Verify.Send(ctx, &sendly.SendRequest{To: phone})
if err != nil {
    var apiErr *sendly.APIError
    if errors.As(err, &apiErr) && apiErr.Code == "rate_limit_exceeded" {
        // Show: "Too many requests. Please try again later."
    }
}
```
{% endtab %}
{% tab title="Ruby" %}
```ruby
begin
  sendly.verify.send(to: phone)
rescue Sendly::RateLimitExceededError
  # Show: "Too many requests. Please try again later."
end
```
{% endtab %}
{% tab title="PHP" %}
```php
try {
    $sendly->verify->send(['to' => $phone]);
} catch (RateLimitException $e) {
    // Show: "Too many requests. Please try again later."
}
```
{% endtab %}
{% tab title="Java" %}
```java
try {
    sendly.verify().send(phone);
} catch (RateLimitExceededException e) {
    // Show: "Too many requests. Please try again later."
}
```
{% endtab %}
{% tab title="C#" %}
```csharp
try {
    await sendly.Verify.SendAsync(phone);
} catch (SendlyException e) when (e.Code == "rate_limit_exceeded") {
    // Show: "Too many requests. Please try again later."
}
```
{% endtab %}
{% tab title="Rust" %}
```rust
match client.verify().send(&phone).await {
    Err(SendlyError::RateLimitExceeded) => {
        // Show: "Too many requests. Please try again later."
    }
    _ => {}
}
```
{% endtab %}
{% endtabs %}

Limits: 5 OTPs per phone per 10 minutes, 20 per 24 hours.

---

## Invalid Phone Numbers

{% tabs %}
{% tab title="Node.js" %}
```javascript
try {
  await sendly.verify.send({ to: phone });
} catch (error) {
  if (error.code === 'invalid_phone') {
    // Show: "Please enter a valid phone number with country code."
  }
}
```
{% endtab %}
{% tab title="Python" %}
```python
try:
    sendly.verify.send(to=phone)
except SendlyError as e:
    if e.code == "invalid_phone":
        # Show: "Please enter a valid phone number with country code."
```
{% endtab %}
{% tab title="Go" %}
```go
_, err := client.Verify.Send(ctx, &sendly.SendRequest{To: phone})
if err != nil {
    var apiErr *sendly.APIError
    if errors.As(err, &apiErr) && apiErr.Code == "invalid_phone" {
        // Show: "Please enter a valid phone number with country code."
    }
}
```
{% endtab %}
{% tab title="Ruby" %}
```ruby
begin
  sendly.verify.send(to: phone)
rescue Sendly::InvalidPhoneError
  # Show: "Please enter a valid phone number with country code."
end
```
{% endtab %}
{% tab title="PHP" %}
```php
try {
    $sendly->verify->send(['to' => $phone]);
} catch (InvalidPhoneException $e) {
    // Show: "Please enter a valid phone number with country code."
}
```
{% endtab %}
{% tab title="Java" %}
```java
try {
    sendly.verify().send(phone);
} catch (InvalidPhoneException e) {
    // Show: "Please enter a valid phone number with country code."
}
```
{% endtab %}
{% tab title="C#" %}
```csharp
try {
    await sendly.Verify.SendAsync(phone);
} catch (SendlyException e) when (e.Code == "invalid_phone") {
    // Show: "Please enter a valid phone number with country code."
}
```
{% endtab %}
{% tab title="Rust" %}
```rust
match client.verify().send(&phone).await {
    Err(SendlyError::InvalidPhone) => {
        // Show: "Please enter a valid phone number with country code."
    }
    _ => {}
}
```
{% endtab %}
{% endtabs %}

---

## See Also

- [OTP Verification API](/docs/otp-verification)
- [How to Resend OTP Codes](/docs/how-to/resend-otp)
