const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  poster_image_url: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  added_by: {
    type: String,
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;