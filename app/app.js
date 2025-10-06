const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Read app name from package.json
const { name } = require('./package.json');

// Read version from environment variable, fallback if not set
const version = process.env.APP_VERSION || '0.0.0';

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.sendStatus(200);
});

// Index route
app.get('/', (req, res) => {
  res.send(`<h1>${name}</h1><p>Version: ${version}</p>`);
});

// Start server
app.listen(port, () => {
  console.log(`${name} v${version} listening on port ${port}`);
});
