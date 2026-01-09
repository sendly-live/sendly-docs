# How to Resend OTP Codes

Let users request a new verification code when the original expires or doesn't arrive.

---

## Backend Endpoint

{% tabs %}
{% tab title="Node.js" %}
```javascript
app.post('/api/resend-otp', async (req, res) => {
  const { verificationId } = req.body;
  try {
    const verification = await sendly.verify.resend(verificationId);
    res.json({ verificationId: verification.id, sandboxCode: verification.sandboxCode });
  } catch (error) {
    if (error.code === 'not_found') {
      res.status(400).json({ error: 'Please start verification again' });
      return;
    }
    throw error;
  }
});
```
{% endtab %}
{% tab title="Python" %}
```python
@app.route('/api/resend-otp', methods=['POST'])
def resend_otp():
    verification_id = request.json['verificationId']
    try:
        verification = sendly.verify.resend(verification_id)
        return jsonify({
            'verificationId': verification.id,
            'sandboxCode': verification.sandbox_code
        })
    except SendlyError as e:
        if e.code == 'not_found':
            return jsonify({'error': 'Please start verification again'}), 400
        raise
```
{% endtab %}
{% tab title="Go" %}
```go
func resendOTP(w http.ResponseWriter, r *http.Request) {
    var req struct{ VerificationID string `json:"verificationId"` }
    json.NewDecoder(r.Body).Decode(&req)
    
    verification, err := client.Verify.Resend(ctx, req.VerificationID)
    if err != nil {
        var apiErr *sendly.APIError
        if errors.As(err, &apiErr) && apiErr.Code == "not_found" {
            w.WriteHeader(400)
            json.NewEncoder(w).Encode(map[string]string{"error": "Please start verification again"})
            return
        }
        panic(err)
    }
    json.NewEncoder(w).Encode(map[string]interface{}{
        "verificationId": verification.ID,
        "sandboxCode":    verification.SandboxCode,
    })
}
```
{% endtab %}
{% tab title="Ruby" %}
```ruby
post '/api/resend-otp' do
  verification_id = JSON.parse(request.body.read)['verificationId']
  begin
    verification = sendly.verify.resend(verification_id)
    content_type :json
    { verificationId: verification.id, sandboxCode: verification.sandbox_code }.to_json
  rescue Sendly::NotFoundError
    status 400
    { error: 'Please start verification again' }.to_json
  end
end
```
{% endtab %}
{% tab title="PHP" %}
```php
$app->post('/api/resend-otp', function ($request, $response) use ($sendly) {
    $data = json_decode($request->getBody(), true);
    try {
        $verification = $sendly->verify->resend($data['verificationId']);
        return $response->withJson([
            'verificationId' => $verification['id'],
            'sandboxCode' => $verification['sandbox_code']
        ]);
    } catch (NotFoundException $e) {
        return $response->withStatus(400)->withJson([
            'error' => 'Please start verification again'
        ]);
    }
});
```
{% endtab %}
{% tab title="Java" %}
```java
@PostMapping("/api/resend-otp")
public ResponseEntity<?> resendOtp(@RequestBody Map<String, String> body) {
    try {
        Verification verification = sendly.verify().resend(body.get("verificationId"));
        return ResponseEntity.ok(Map.of(
            "verificationId", verification.getId(),
            "sandboxCode", verification.getSandboxCode()
        ));
    } catch (NotFoundException e) {
        return ResponseEntity.badRequest().body(Map.of("error", "Please start verification again"));
    }
}
```
{% endtab %}
{% tab title="C#" %}
```csharp
app.MapPost("/api/resend-otp", async (ResendRequest req, SendlyClient sendly) => {
    try {
        var verification = await sendly.Verify.ResendAsync(req.VerificationId);
        return Results.Ok(new { verificationId = verification.Id, sandboxCode = verification.SandboxCode });
    } catch (SendlyException e) when (e.Code == "not_found") {
        return Results.BadRequest(new { error = "Please start verification again" });
    }
});
```
{% endtab %}
{% tab title="Rust" %}
```rust
async fn resend_otp(Json(req): Json<ResendRequest>) -> impl IntoResponse {
    match client.verify().resend(&req.verification_id).await {
        Ok(verification) => Json(json!({
            "verificationId": verification.id,
            "sandboxCode": verification.sandbox_code
        })).into_response(),
        Err(SendlyError::NotFound) => (
            StatusCode::BAD_REQUEST,
            Json(json!({"error": "Please start verification again"}))
        ).into_response(),
        Err(e) => panic!("{}", e),
    }
}
```
{% endtab %}
{% endtabs %}

---

## Frontend with Cooldown

```javascript
const [cooldown, setCooldown] = useState(0);

async function handleResend() {
  const verificationId = sessionStorage.getItem('verificationId');
  
  const response = await fetch('/api/resend-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ verificationId }),
  });

  if (response.ok) {
    const data = await response.json();
    sessionStorage.setItem('verificationId', data.verificationId);
    setCooldown(60);
  }
}

useEffect(() => {
  if (cooldown > 0) {
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }
}, [cooldown]);
```

```jsx
<button onClick={handleResend} disabled={cooldown > 0}>
  {cooldown > 0 ? `Resend in ${cooldown}s` : "Didn't receive code? Resend"}
</button>
```

---

## Rate Limits

- Each resend costs credits (same as original send)
- Sendly limits: 5 OTPs per phone per 10 minutes
- Add your own cooldown (60 seconds recommended)

---

## See Also

- [Handle OTP Errors](/docs/how-to/handle-otp-errors)
- [OTP Verification API](/docs/otp-verification)
