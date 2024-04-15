const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queueSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    treatmentType: {
        type: String,
        required: true
    },
    treatmentLong: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
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

queueSchema.index({ date: 1, startTime: 1 });

module.exports = mongoose.model('Queue', queueSchema);