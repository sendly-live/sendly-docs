# Tutorial: Send Your First SMS

By the end of this tutorial, you'll have sent an SMS message using Sendly. We'll use sandbox mode, so no real messages are sent and no credits are charged.

**Time required:** 5 minutes

---

## Before You Start

You'll need:
- A [Sendly account](https://sendly.live) (free)
- Your test API key from the [Dashboard](https://sendly.live/dashboard/api-keys)

---

## Step 1: Set Up Your API Key

Create a file called `.env` in your project folder:

```bash
SENDLY_API_KEY=sk_test_v1_your_key_here
```

Replace `sk_test_v1_your_key_here` with your actual test key from the dashboard.

---

## Step 2: Install the SDK

{% tabs %}
{% tab title="Node.js" %}
```bash
npm install @sendly/node
```
{% endtab %}
{% tab title="Python" %}
```bash
pip install sendly
```
{% endtab %}
{% tab title="Go" %}
```bash
go get github.com/SendlyHQ/sendly-go/sendly
```
{% endtab %}
{% tab title="Ruby" %}
```bash
gem install sendly
```
{% endtab %}
{% tab title="PHP" %}
```bash
composer require sendly/sendly-php
```
{% endtab %}
{% tab title="Java" %}
```xml
<dependency>
    <groupId>com.sendly</groupId>
    <artifactId>sendly-java</artifactId>
    <version>1.0.0</version>
</dependency>
```
{% endtab %}
{% tab title="C#" %}
```bash
dotnet add package Sendly
```
{% endtab %}
{% tab title="Rust" %}
```toml
[dependencies]
sendly = "1.0"
tokio = { version = "1", features = ["full"] }
```
{% endtab %}
{% endtabs %}

You should see the package install successfully.

---

## Step 3: Send a Message

Create a new file and add this code:

{% tabs %}
{% tab title="Node.js" %}
Create `send.js`:
```javascript
import Sendly from '@sendly/node';

const client = new Sendly(process.env.SENDLY_API_KEY);

const message = await client.messages.send({
  to: '+15005550000',
  text: 'Hello from Sendly!',
  messageType: 'transactional'
});

console.log('Message ID:', message.id);
console.log('Status:', message.status);
```

Run it:
```bash
node send.js
```
{% endtab %}
{% tab title="Python" %}
Create `send.py`:
```python
import os
from sendly import Sendly

client = Sendly(os.environ['SENDLY_API_KEY'])

message = client.messages.send(
    to='+15005550000',
    text='Hello from Sendly!',
    message_type='transactional'
)

print('Message ID:', message.id)
print('Status:', message.status)
```

Run it:
```bash
python send.py
```
{% endtab %}
{% tab title="Go" %}
Create `main.go`:
```go
package main

import (
    "context"
    "fmt"
    "os"
    "github.com/SendlyHQ/sendly-go/sendly"
)

func main() {
    client := sendly.NewClient(os.Getenv("SENDLY_API_KEY"))

    msg, err := client.Messages.Send(context.Background(), &sendly.SendMessageRequest{
        To:          "+15005550000",
        Text:        "Hello from Sendly!",
        MessageType: "transactional",
    })
    if err != nil {
        panic(err)
    }

    fmt.Println("Message ID:", msg.ID)
    fmt.Println("Status:", msg.Status)
}
```

Run it:
```bash
go run main.go
```
{% endtab %}
{% tab title="Ruby" %}
Create `send.rb`:
```ruby
require 'sendly'

client = Sendly::Client.new(ENV['SENDLY_API_KEY'])

message = client.messages.send(
  to: '+15005550000',
  text: 'Hello from Sendly!',
  message_type: 'transactional'
)

puts "Message ID: #{message.id}"
puts "Status: #{message.status}"
```

Run it:
```bash
ruby send.rb
```
{% endtab %}
{% tab title="PHP" %}
Create `send.php`:
```php
<?php
require 'vendor/autoload.php';

$sendly = new Sendly\Client(getenv('SENDLY_API_KEY'));

$message = $sendly->messages->send([
    'to' => '+15005550000',
    'text' => 'Hello from Sendly!',
    'message_type' => 'transactional'
]);

echo "Message ID: " . $message['id'] . "\n";
echo "Status: " . $message['status'] . "\n";
```

Run it:
```bash
php send.php
```
{% endtab %}
{% tab title="Java" %}
Create `Send.java`:
```java
import com.sendly.Sendly;
import com.sendly.model.Message;

public class Send {
    public static void main(String[] args) {
        Sendly sendly = new Sendly(System.getenv("SENDLY_API_KEY"));

        Message message = sendly.messages().send(
            new SendMessageRequest()
                .to("+15005550000")
                .text("Hello from Sendly!")
                .messageType("transactional")
        );

        System.out.println("Message ID: " + message.getId());
        System.out.println("Status: " + message.getStatus());
    }
}
```

Run it:
```bash
javac Send.java && java Send
```
{% endtab %}
{% tab title="C#" %}
Create `Send.cs`:
```csharp
using Sendly;

var client = new SendlyClient(Environment.GetEnvironmentVariable("SENDLY_API_KEY"));

var message = await client.Messages.SendAsync(new SendMessageRequest {
    To = "+15005550000",
    Text = "Hello from Sendly!",
    MessageType = "transactional"
});

Console.WriteLine($"Message ID: {message.Id}");
Console.WriteLine($"Status: {message.Status}");
```

Run it:
```bash
dotnet run
```
{% endtab %}
{% tab title="Rust" %}
Create `src/main.rs`:
```rust
use sendly::Client;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new(std::env::var("SENDLY_API_KEY")?);

    let message = client.messages().send(
        SendMessageRequest::new("+15005550000", "Hello from Sendly!")
            .message_type("transactional")
    ).await?;

    println!("Message ID: {}", message.id);
    println!("Status: {}", message.status);
    Ok(())
}
```

Run it:
```bash
cargo run
```
{% endtab %}
{% endtabs %}

---

## Step 4: Check the Output

You should see output like:

```
Message ID: msg_abc123def456
Status: sent
```

**Congratulations!** You've sent your first message with Sendly.

The status `sent` means the message was accepted. In sandbox mode, it's instantly marked as delivered. In production, you'd receive a webhook when delivery is confirmed.

---

## What You Learned

- How to set up the Sendly SDK
- How to send a message using sandbox mode
- What the message response looks like

---

## Next Steps

Now that you can send messages, try:

- [Phone Verification](/docs/tutorials/otp) — Build an OTP verification flow
- [Set Up Webhooks](/docs/tutorials/webhooks) — Get notified when messages are delivered
