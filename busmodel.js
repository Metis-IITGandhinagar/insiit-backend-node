const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const busScheduleSchema = new mongoose.Schema({
    BusName: {
        type: String,
        required: true
    },
    DepartureTime: {
        type: String,
        required: true
    },
    Destination: {
        type: String,
        required: true
    },
    Source: {
        type: String,
        required: true
    },
    Stops: {
        type: [String],
        required: true
    }
});

// Create a model using the schema
const BusSchedule = mongoose.model('BusSchedule', busScheduleSchema);

module.exports = BusSchedule;
