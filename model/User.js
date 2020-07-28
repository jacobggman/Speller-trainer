const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    date:
    {
        type: Date,
        default: Date.now
    },
    isRight: {
        type: Boolean,
        require: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // TODO checks
    email:
    {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,
    },

    date:
    {
        type: Date,
        default: Date.now
    },

    knowWords: {  // the words indexes that the user know for sure (x right answers in a row)
        type: [Number]
    },

    answers: {  // index to answers
        type: Map,
        of: [answerSchema],
    },
})

module.exports = mongoose.model('User', userSchema);