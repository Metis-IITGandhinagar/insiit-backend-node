const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const fcmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fcmToken: {
    type: String,
    required: true
  },
  
});

const fcmStore = mongoose.model('fcmtokens', fcmSchema);

module.exports = fcmStore;