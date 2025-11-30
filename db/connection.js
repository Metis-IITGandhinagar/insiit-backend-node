const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MongoDBAtlas;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

module.exports = mongoose;
