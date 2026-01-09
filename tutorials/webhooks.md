# Tutorial: Set Up Webhooks

By the end of this tutorial, you'll have a working webhook endpoint that receives real-time notifications when your SMS messages are delivered.

**Time required:** 10 minutes

---

## Before You Start

You'll need:
- A [Sendly account](https://sendly.live) (free)
- A web server you can deploy to (we'll use a simple Express app)
- The [Sendly CLI](/docs/how-to/test-webhooks-locally) installed for local testing

---

## Step 1: Create a Webhook Endpoint

{% tabs %}
{% tab title="Node.js" %}
```bash
mkdir sendly-webhooks && cd sendly-webhooks
npm init -y && npm install express
```

Create `server.js`:
```javascript
import express from 'express';

const app = express();
app.use(express.json());

app.post('/webhooks/sendly', (req, res) => {
  const event = req.body;
  console.log('Received event:', event.type);
  console.log('Message ID:', event.data.object.id);
  res.status(200).json({ received: true });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

Run: `node server.js`
{% endtab %}
{% tab title="Python" %}
```bash
mkdir sendly-webhooks && cd sendly-webhooks
pip install flask
```

Create `server.py`:
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhooks/sendly', methods=['POST'])
def webhook():
    event = request.json
    print(f"Received event: {event['type']}")
    print(f"Message ID: {event['data']['object']['id']}")
    return jsonify({'received': True})

if __name__ == '__main__':
    app.run(port=3000)
```

Run: `python server.py`
{% endtab %}
{% tab title="Go" %}
```bash
mkdir sendly-webhooks && cd sendly-webhooks
go mod init sendly-webhooks
```

Create `main.go`:
```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Event struct {
    Type string `json:"type"`
    Data struct {
        Object struct {
            ID string `json:"id"`
        } `json:"object"`
    } `json:"data"`
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    var event Event
    json.NewDecoder(r.Body).Decode(&event)
    fmt.Printf("Received event: %s\n", event.Type)
    fmt.Printf("Message ID: %s\n", event.Data.Object.ID)
    json.NewEncoder(w).Encode(map[string]bool{"received": true})
}

func main() {
    http.HandleFunc("/webhooks/sendly", webhookHandler)
    fmt.Println("Server running on http://localhost:3000")
    http.ListenAndServe(":3000", nil)
}
```

Run: `go run main.go`
{% endtab %}
{% tab title="Ruby" %}
```bash
mkdir sendly-webhooks && cd sendly-webhooks
gem install sinatra
```

Create `server.rb`:
```ruby
require 'sinatra'
require 'json'

set :port, 3000

post '/webhooks/sendly' do
  event = JSON.parse(request.body.read)
  puts "Received event: #{event['type']}"
  puts "Message ID: #{event['data']['object']['id']}"
  content_type :json
  { received: true }.to_json
end
```

Run: `ruby server.rb`
{% endtab %}
{% tab title="PHP" %}
Create `webhook.php`:
```php
<?php
header('Content-Type: application/json');

$payload = file_get_contents('php://input');
$event = json_decode($payload, true);

error_log("Received event: " . $event['type']);
error_log("Message ID: " . $event['data']['object']['id']);

echo json_encode(['received' => true]);
```

Run: `php -S localhost:3000`
{% endtab %}
{% tab title="Java" %}
Using Spring Boot:
```java
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class WebhookController {
    @PostMapping("/webhooks/sendly")
    public Map<String, Boolean> handleWebhook(@RequestBody Map<String, Object> event) {
        System.out.println("Received event: " + event.get("type"));
        Map<String, Object> data = (Map<String, Object>) event.get("data");
        Map<String, Object> object = (Map<String, Object>) data.get("object");
        System.out.println("Message ID: " + object.get("id"));
        return Map.of("received", true);
    }
}
```

Run: `./mvnw spring-boot:run`
{% endtab %}
{% tab title="C#" %}
Using ASP.NET Core minimal API:
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/webhooks/sendly", async (HttpContext context) => {
    var event = await context.Request.ReadFromJsonAsync<WebhookEvent>();
    Console.WriteLine($"Received event: {event.Type}");
    Console.WriteLine($"Message ID: {event.Data.Object.Id}");
    return Results.Json(new { received = true });
});

app.Run("http://localhost:3000");

record WebhookEvent(string Type, WebhookData Data);
record WebhookData(WebhookObject Object);
record WebhookObject(string Id);
```

Run: `dotnet run`
{% endtab %}
{% tab title="Rust" %}
Using Axum:
```rust
use axum::{routing::post, Router, Json};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Event { r#type: String, data: Data }
#[derive(Deserialize)]
struct Data { object: Object }
#[derive(Deserialize)]
struct Object { id: String }
#[derive(Serialize)]
struct Response { received: bool }

async fn webhook(Json(event): Json<Event>) -> Json<Response> {
    println!("Received event: {}", event.r#type);
    println!("Message ID: {}", event.data.object.id);
    Json(Response { received: true })
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/webhooks/sendly", post(webhook));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Server running on http://localhost:3000");
    axum::serve(listener, app).await.unwrap();
}
```

Run: `cargo run`
{% endtab %}
{% endtabs %}

You should see: `Server running on http://localhost:3000`

---

## Step 2: Test Locally with the CLI

Open a new terminal and start the webhook listener:

```bash
sendly webhooks listen --forward http://localhost:3000/webhooks/sendly
```

You'll see output showing the listener is connected.

---

## Step 3: Trigger a Test Event

Open a third terminal and trigger a test event:

```bash
sendly trigger message.delivered
```

Check your server terminal. You should see:

```
Received event: message.delivered
Message ID: msg_test_abc123
```

**Your webhook endpoint is working!**

---

## Step 4: Handle Different Event Types

Update your server to handle specific events:

{% tabs %}
{% tab title="Node.js" %}
```javascript
app.post('/webhooks/sendly', (req, res) => {
  const event = req.body;
  switch (event.type) {
    case 'message.delivered':
      console.log('Delivered to:', event.data.object.to);
      break;
    case 'message.failed':
      console.log('Failed:', event.data.object.errorMessage);
      break;
    case 'verification.verified':
      console.log('Phone verified:', event.data.object.phone);
      break;
  }
  res.status(200).json({ received: true });
});
```
{% endtab %}
{% tab title="Python" %}
```python
@app.route('/webhooks/sendly', methods=['POST'])
def webhook():
    event = request.json
    if event['type'] == 'message.delivered':
        print(f"Delivered to: {event['data']['object']['to']}")
    elif event['type'] == 'message.failed':
        print(f"Failed: {event['data']['object']['errorMessage']}")
    elif event['type'] == 'verification.verified':
        print(f"Phone verified: {event['data']['object']['phone']}")
    return jsonify({'received': True})
```
{% endtab %}
{% tab title="Go" %}
```go
func webhookHandler(w http.ResponseWriter, r *http.Request) {
    var event Event
    json.NewDecoder(r.Body).Decode(&event)
    switch event.Type {
    case "message.delivered":
        fmt.Printf("Delivered to: %s\n", event.Data.Object.To)
    case "message.failed":
        fmt.Printf("Failed: %s\n", event.Data.Object.ErrorMessage)
    case "verification.verified":
        fmt.Printf("Phone verified: %s\n", event.Data.Object.Phone)
    }
    json.NewEncoder(w).Encode(map[string]bool{"received": true})
}
```
{% endtab %}
{% tab title="Ruby" %}
```ruby
post '/webhooks/sendly' do
  event = JSON.parse(request.body.read)
  case event['type']
  when 'message.delivered'
    puts "Delivered to: #{event['data']['object']['to']}"
  when 'message.failed'
    puts "Failed: #{event['data']['object']['errorMessage']}"
  when 'verification.verified'
    puts "Phone verified: #{event['data']['object']['phone']}"
  end
  content_type :json
  { received: true }.to_json
end
```
{% endtab %}
{% tab title="PHP" %}
```php
$event = json_decode(file_get_contents('php://input'), true);
switch ($event['type']) {
    case 'message.delivered':
        error_log("Delivered to: " . $event['data']['object']['to']);
        break;
    case 'message.failed':
        error_log("Failed: " . $event['data']['object']['errorMessage']);
        break;
    case 'verification.verified':
        error_log("Phone verified: " . $event['data']['object']['phone']);
        break;
}
echo json_encode(['received' => true]);
```
{% endtab %}
{% tab title="Java" %}
```java
@PostMapping("/webhooks/sendly")
public Map<String, Boolean> handleWebhook(@RequestBody Map<String, Object> event) {
    Map<String, Object> data = (Map<String, Object>) event.get("data");
    Map<String, Object> object = (Map<String, Object>) data.get("object");
    switch ((String) event.get("type")) {
        case "message.delivered" -> System.out.println("Delivered to: " + object.get("to"));
        case "message.failed" -> System.out.println("Failed: " + object.get("errorMessage"));
        case "verification.verified" -> System.out.println("Phone verified: " + object.get("phone"));
    }
    return Map.of("received", true);
}
```
{% endtab %}
{% tab title="C#" %}
```csharp
app.MapPost("/webhooks/sendly", async (HttpContext context) => {
    var evt = await context.Request.ReadFromJsonAsync<WebhookEvent>();
    switch (evt.Type) {
        case "message.delivered":
            Console.WriteLine($"Delivered to: {evt.Data.Object.To}");
            break;
        case "message.failed":
            Console.WriteLine($"Failed: {evt.Data.Object.ErrorMessage}");
            break;
        case "verification.verified":
            Console.WriteLine($"Phone verified: {evt.Data.Object.Phone}");
            break;
    }
    return Results.Json(new { received = true });
});
```
{% endtab %}
{% tab title="Rust" %}
```rust
async fn webhook(Json(event): Json<Event>) -> Json<Response> {
    match event.r#type.as_str() {
        "message.delivered" => println!("Delivered to: {}", event.data.object.to),
        "message.failed" => println!("Failed: {}", event.data.object.error_message),
        "verification.verified" => println!("Phone verified: {}", event.data.object.phone),
        _ => {}
    }
    Json(Response { received: true })
}
```
{% endtab %}
{% endtabs %}

Restart your server and trigger different events:

```bash
sendly trigger message.failed
```

You should see the failure message logged.

---

## Step 5: Register for Production

Once your endpoint is deployed to a public URL:

1. Go to [Dashboard → Webhooks](https://sendly.live/dashboard/webhooks)
2. Click **Create Webhook**
3. Enter your endpoint URL (e.g., `https://yourapp.com/webhooks/sendly`)
4. Select the events you want: `message.delivered`, `message.failed`
5. Click **Create**

Save the webhook secret—you'll use it to verify signatures in production.

---

## What You Built

- A webhook endpoint that receives Sendly events
- Local testing using the Sendly CLI
- Event handling for different message states

---

## Next Steps

- [Handle OTP Errors](/docs/how-to/handle-otp-errors) — Handle verification edge cases
- [Local Development](/docs/concepts/local-development) — Understand how webhook tunneling works
