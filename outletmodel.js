const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    latitude: String,
    longitude: String
});

const outletMenuItems = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    rating: Number,
    size: String,
    cal: Number,
    image: String
});

const outletSchema = new mongoose.Schema({
    name: String,
    location: locationSchema,
    landmark: String,
    open_time: String,
    close_time: String,
    rating: Number,
    menu: {
        type: [outletMenuItems],
        default: []
    },
  image: String
});

// Create the Outlet model
const Outlet = mongoose.model('Outlet', outletSchema);

module.exports = Outlet;
