const constants = require("../constants");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
    },
    dateStart: {
        type: Date,
        required: 'Date start is required',
    },
    dateEnd: {
        type: Date,
        required: 'Date finish is required'
    },
    location: {
        type: { type: String }, 
        coordinates: [Number]
    },
    picture: {
        //buscar cómo se monta 
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
        enum: constants.CATEGORIES
        // do the list of categories
        // middleware to check for interests
    },
    maxUsers: {
        type: Number,
        
    }
}, {timestamps: true});

eventSchema.index({ location: '2dsphere'});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
