const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    index:
    {
        type: Number,
        unique: true,
        required: true,
        index: true,
    },
})

module.exports = mongoose.model('Word', wordSchema);