
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const swaggerFile = require('./swagger_output.json')



const app = express();
const PORT = process.env.PORT || 3000;
// const MONGODB_URI = process.env.MongoDBlocal
const MONGODB_URI = process.env.MongoDBAtlas


// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(cors());
// app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))


// Routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;
