const express = require('express');
const connectDB = require('./config/connectDatabase');
const userRoutes = require('./app/routes/userRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
