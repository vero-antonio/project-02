const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
