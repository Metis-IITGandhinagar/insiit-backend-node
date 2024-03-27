const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');


// Define the schema for the mess menu
const messMenuSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    mess_name: {
        type: String,
        required: true
    },

    mess: [{
        day: {
            type: Number,
            required: true
        },
        breakfast: {
            type: String,
            required: true
        },
        lunch: {
            type: String,
            required: true
        },
        snacks: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        }
    }]
});

// Create a model for the mess menu schema
const MessMenu = mongoose.model('MessMenu', messMenuSchema);

module.exports = MessMenu;
