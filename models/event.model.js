const constants = require("../constants");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: 'Name is required',
    },
    dateStart: {
        type: Date,
        // required: 'Date start is required',
    },
    dateEnd: {
        type: Date,
        // required: 'Date finish is required'
    },
    location: {
        type: { type: String }, 
        coordinates: [Number]
    },
    picture: {
        type: String,
        default: 'https://res.cloudinary.com/ddby3wqlo/image/upload/v1549447636/event-pics/calendar.jpg'
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: {
        type: [String],
        enum: constants.CATEGORIES.map(({ id }) => id)
        // middleware to check for interests
    },
    maxUsers: {
        type: Number,
        // required: 'Max number of participants is required'
    }
}, {timestamps: true});

eventSchema.index({ location: '2dsphere'});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
