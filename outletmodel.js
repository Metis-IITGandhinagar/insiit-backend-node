const mongoose = require('mongoose');

// Define the location schema
const locationSchema = new mongoose.Schema({
  latitude: String,
  longitude: String
});

// Define the menu item schema
const outletMenuItems = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  rating: Number,
  size: String,
  cal: Number,
  image: String
});

// Define the outlet schema
const outletSchema = new mongoose.Schema({
  name: String,
  location: locationSchema,
  landmark: String,
  open_time: String,
  close_time: String,
  rating: Number,
  menu: [outletMenuItems],
  image: String
});

// Create the Outlet model
const Outlet = mongoose.model('Outlet', outletSchema);

module.exports = Outlet;
