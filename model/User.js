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

    BiggestKnowWord: {
        type: Number,
        default: -1,
    },

    lastAsk: {
        type: Number,
        default: -1,
    },

    lastAnswer: {
        type: Number,
        default: -1,
    },

    knowWords: {  // the words indexes that the user know for sure (x right answers in a row)
        type: Map,
        of: Boolean,
        default: {},
    },

    answers: {  // index to answers
        type: Map,
        of: [answerSchema],
        default: {},
    },
})

module.exports = mongoose.model('User', userSchema);