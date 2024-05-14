const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Send main index.html file as a response for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});