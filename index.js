// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World! MongoDB is connected.');
});

// Define a route to test MongoDB data storage
app.post('/add-data', async (req, res) => {
    const TestData = mongoose.model('TestData', new mongoose.Schema({ name: String }));
    const data = new TestData({ name: req.body.name });
    await data.save();
    res.send(`Data added: ${req.body.name}`);
});

// Set up the server to listen on the port from environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
