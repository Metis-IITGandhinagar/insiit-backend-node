
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const db = require('./firebaseConfig');


const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MongoDBlocal 
// const MONGODB_URI = process.env.MongoDBAtlas
//It uses mongoAtlas

app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(cors());
// app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send(' Go to /api-docs for API Documentation');
});

app.get('/laundry/:laundryCode', async (req, res) => {
  try {
    const laundryCode = req.params.laundryCode;
    if (!laundryCode) {
      return res.status(400).send('laundryCode path parameter is required');
    }
    console.log(`Fetching document with laundryCode: ${laundryCode}`);

    const querySnapshot = await db.collection('laundryDetails')
                                  .where('laundryCode', '==', laundryCode)
                                  .get();

    console.log(`Query completed. Found ${querySnapshot.size} documents`);

    if (querySnapshot.empty) {
      console.log('No matching documents found');
      return res.status(404).send('No matching documents found');
    }

    const results = [];
    querySnapshot.forEach(doc => {
      console.log(`Document found: ${doc.id} =>`, doc.data());
      results.push(doc.data());
    });

    res.status(200).send(results);
  } catch (error) {
    console.error('Error getting document:', error);
    res.status(500).send('Error getting document: ' + error.message);
  }
});

app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api-docs.html'));
});

// Routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


module.exports = app;
