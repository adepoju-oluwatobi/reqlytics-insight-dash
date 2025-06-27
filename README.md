# 📊 Reqlytics – Real-Time API Analytics Middleware for API backend

**Reqlytics** is a plug-and-play API analytics middleware for backend API.  
It automatically tracks incoming API requests and logs them to your personal Reqlytics dashboard in real-time — without changing your existing routes.

---

## 🚀 Features

- ✅ Easy integration with Express
- 📈 Tracks endpoint, method, response time & status
- 🛠️ Works with both ESM and CommonJS
- 🔐 Secured with your unique API Key
- 📊 Visual analytics dashboard
- ⚡ Lightweight & production ready

---

## 📦 Installation

Install via npm:

```bash
npm install reqlytics
```

---

## 📌 Basic Usage

### 1. Import the middleware

#### For ESM (e.g., `index.js`, `server.js`):
```js
import { apiAnalytics } from "reqlytics";
```

#### For CommonJS (e.g., `app.js`, older Node.js versions):
```js
const apiAnalytics = require("reqlytics");
```

---

### 2. Use it in your Express app

```js
const express = require("express");
const app = express();

const apiAnalytics = require("reqlytics"); // or import { apiAnalytics } from "reqlytics"
const API_KEY = "your_api_key_here"; // Replace with your Reqlytics API key

// Add the middleware
app.use(apiAnalytics(API_KEY, { debug: true }));

// Define routes
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Reqlytics!" });
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

---

## ⚙️ Middleware Options

The `apiAnalytics` function accepts a second argument (optional config):

| Option      | Type     | Default                                              | Description                                |
|-------------|----------|------------------------------------------------------|--------------------------------------------|
| `endpoint`  | `string` | `https://reqlytics-api.onrender.com/api/v1/track`   | Tracking API endpoint                       |
| `timeout`   | `number` | `2000` (ms)                                          | Request timeout when sending analytics     |
| `debug`     | `boolean`| `false`                                              | Enable console logs for debugging          |

### Example:
```js
app.use(apiAnalytics("your_api_key", {debug: true,}));
```

---

## 🔐 How to Get Your API Key

1. Visit 👉 [https://reqlytics-insight-dash.vercel.app](https://reqlytics-insight-dash.vercel.app/)
2. Sign up for free
3. After logging in, go to your dashboard
4. Click **"Show API Key"** to copy your unique key
5. Use this key in your backend as shown above

---

## 📊 Dashboard Preview

Once integrated, you'll be able to:

- View requests by endpoint
- Track error rates
- Analyze daily usage trends
- Monitor server/client error distribution
- Get average response time stats

---

## 📌 Example Middleware Code (Under the Hood)

Here’s a look at how the middleware works internally:

```js
const axios = require("axios");

const url = 'https://reqlytics-api.onrender.com';

function apiAnalytics(apiKey, options = {}) {
  const {
    endpoint = `${url}/api/v1/track`,
  ...
        if (debug) console.error("[Reqlytics] Error:", error.message);
      }
    });

    next();
  };
}

module.exports = apiAnalytics;
```

You don’t need to copy this — it’s already bundled in the package!

---

## 💬 Support

Need help or want to report an issue?  
Reach out at: **kunletobi@gmail.com** or open an issue on GitHub.

---

## 📝 License

MIT License © 2025 – Reqlytics Team

---

Build with ❤️ for developers who care about insights.