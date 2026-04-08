const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get the schedule
app.get('/api/talks', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'talks.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to load talk data.' });
    }
    res.json(JSON.parse(data));
  });
});

// Fallback to serve index.html for unknown routes
app.get('*path', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
