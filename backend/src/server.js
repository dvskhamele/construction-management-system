const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Changed to 3001 to match what's in the apiService

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import main routes index
const apiRoutes = require('./routes');

// Mount all routes under /api
app.use('/api', apiRoutes);

// Serve frontend for all other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Construction Management Server running on http://localhost:${PORT}`);
});

module.exports = app;