const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    event: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
    },
}, {timestamps: true});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
