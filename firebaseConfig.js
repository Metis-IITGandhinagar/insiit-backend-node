const admin = require('firebase-admin');
const serviceAccount = require('./laundry.json'); // Ensure the path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
