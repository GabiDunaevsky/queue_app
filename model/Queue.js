const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queueSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Queue', queueSchema);