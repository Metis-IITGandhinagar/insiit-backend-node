// lostfoundmodel.js
const mongoose = require('mongoose');

const lostFoundItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image_urls: { 
    type: [String],
    default: []
  },
  lost_date: { 
    type: Date,
    required: true
  },
  lost_location: {
    type: String,
    required: true
  },
  uploader_email: { 
    type: String,
    required: true
  },
  uploader_contact: { 
    type: String
  },

  status: {
    type: String,
    enum: ['lost', 'found'], 
    default: 'lost',
    required: true
  },
  finder_email: { 
    type: String,
    default: null 
  },
  found_date: { 
    type: Date,
    default: null 
  },

  
  date_posted: { 
    type: Date,
    default: Date.now,
    required: true
  }
  
});

module.exports = mongoose.model('LostFoundItem', lostFoundItemSchema);
