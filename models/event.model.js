const constants = require("../constants");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
    },
    dateStart: {
        type: Date,
        validate: {
            validator: function(date) {
                return date > Date.now();
            },
            message: "Date invalid. Please don't select a date in the past!"
        },
        required: 'Start date & time is required',
    },
    dateEnd: {
        type: Date,
        validate: {
            validator: function(date) {
                return date > Date.now();
            },
            message: "Date invalid. Please don't select a date in the past!"
        },
        required: 'End date & time is required',
    },
    location: {
        type: { 
            type: String,
            default: 'Point'
         }, 
        coordinates: {
            type: [Number],
            required: true
        }
    },
    picture: {
        type: String,
        default: 'https://res.cloudinary.com/ddby3wqlo/image/upload/v1549447636/event-pics/calendar.jpg'
    },
    description: {
        type: String,
        required: 'A description of the group is required'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    interests: {
        type: [String],
        enum: constants.CATEGORIES.map(({ id }) => id),
        required: 'At least 1 topic is required'
    },
    maxUsers: {
        type: Number,
        required: 'Max number of participants is required'
    }
}, {timestamps: true});

eventSchema.index({ location: '2dsphere'});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
