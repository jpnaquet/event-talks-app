# TechSummit 2026 - Event Talks App

A modern, responsive web application to manage and display a technical conference schedule. This app features real-time filtering, a dark mode toggle, and a clean UI for a seamless attendee experience.

## 🚀 Features

- **Live Schedule:** View all conference sessions chronologically.
- **Dynamic Search:** Filter talks instantly by category (e.g., frontend, security) or title.
- **Dark Mode:** User-selectable theme with persistence using `localStorage`.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views.
- **RESTful API:** Data is served via a Node.js/Express backend.

## 🛠️ Technology Stack

- **Frontend:** HTML5, Vanilla CSS3 (Custom Properties), Vanilla JavaScript.
- **Backend:** Node.js, Express.
- **Data Storage:** JSON-based flat file storage.

## 📂 Project Structure

```text
├── data/
│   └── talks.json      # The "database" containing talk details
├── public/
│   ├── css/
│   │   └── style.css   # Modern CSS with Dark Mode support
│   ├── js/
│   │   └── app.js      # Frontend logic (fetch, filtering, DOM)
│   └── index.html      # Main entry point
├── server.js           # Express server & API routes
├── package.json        # Dependencies & scripts
└── .gitignore          # Standard git ignore patterns
```

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jpnaquet/event-talks-app.git
   cd event-talks-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   *Note: If "npm start" isn't configured, you can run `node server.js`.*

4. Open your browser and visit:
   `http://localhost:3000`

## 📡 API Documentation

### Get All Talks
- **URL:** `/api/talks`
- **Method:** `GET`
- **Response:** Array of talk objects.

Example object:
```json
{
  "id": 1,
  "title": "Introduction to Web Accessibility",
  "speakers": ["Alice Johnson"],
  "category": ["accessibility", "frontend"],
  "duration": "60m",
  "startTime": "10:00 AM",
  "endTime": "11:00 AM"
}
```

## 📝 License
This project is licensed under the ISC License.
