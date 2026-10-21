# ZipLink - Modern URL Shortener

**Live Demo**: [https://url-shortner-psi-gray.vercel.app/](https://url-shortner-psi-gray.vercel.app/)

ZipLink is a lightweight, premium URL shortener web application. It features a stunning glassmorphism dark-themed user interface, instant URL generation, and server-side redirection.

## Features

- **Premium Dark Mode UI**: A beautiful dark-theme interface with custom neon glow backdrops, floating glass cards, and smooth hover effects.
- **Instant Shortening**: Converts long URLs into 8-character unique alphanumeric identifiers.
- **URL Normalization**: Automatically handles URLs lacking `http://` or `https://` prefixes to prevent relative redirect issues.
- **Dynamic Clipboard Interaction**: Copy short URLs with a single click, featuring a interactive success state indicator.
- **Atlas MongoDB Integration**: Automatically saves and manages link mappings in a remote cloud database.

---

## Tech Stack

- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Mongoose (MongoDB)](https://mongoosejs.com/), [nanoid](https://github.com/ai/nanoid)
- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Custom Grid/Flex layouts, animations, HSL variables), Vanilla ES6 JavaScript, [Lucide Icons](https://lucide.dev/)

---

## Project Structure

```text
├── controllers/
│   └── url.controller.js  # Logic for generating short IDs
├── models/
│   └── url.model.js       # MongoDB Schema using Mongoose
├── routes/
│   └── url.route.js       # Express routes for API generation & redirects
├── public/                # Static frontend assets
│   ├── index.html         # Main dashboard page
│   ├── style.css          # Customized styles, layout & animations
│   └── app.js             # Form handling & clipboard integration
├── connection.js          # MongoDB database connection configuration
├── index.js               # Application entry point
├── package.json           # Project metadata & dependencies
└── README.md              # Documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- MongoDB database connection (pre-configured via MongoDB Atlas in `connection.js`).

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd url_shortner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application server:
   ```bash
   node index.js
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3001
   ```

---

## API Endpoints

### 1. Generate Short URL
- **Path**: `POST /url`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "url": "https://github.com"
  }
  ```
- **Response** (Success):
  ```json
  {
    "id": "eTvrtw_e"
  }
  ```

### 2. Redirect Short URL
- **Path**: `GET /url/:shortId`
- **Description**: Automatically retrieves the long URL from the database and performs a 302 redirection to it.
