const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Contact schema
const ContactSchema = new Schema({
    mobile: { type: String, required: true },
    email: { type: String, required: true }
});

const StudentBodySchema = new Schema({
    position: { type: String, required: true },
    name: { type: String, required: true },
    contacts: { type: ContactSchema, required: true }
});

const StudentBody = mongoose.model('StudentBody', StudentBodySchema);

module.exports = StudentBody;
