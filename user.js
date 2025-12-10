const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection (no .env, direct credentials)
const mongoURI = 'mongodb+srv://Ashikmia63:Ashik2025@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

// Simple route
app.get('/', (req, res) => {
    res.send('Hello, MongoDB Atlas!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});