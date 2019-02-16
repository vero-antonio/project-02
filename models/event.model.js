const constants = require("../constants");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
    },
    dateRange: {
        required: 'Dates are required',
        type: {
            start: {
                type: Date,
                validate: {
                    validator: function(date) {
                        return date > Date.now();
                    },
                    message: "Date invalid. Please don't select a date in the past!"
                },
                required: 'Start is required',
            },
            end: {
                type: Date,
                validate: {
                    validator: function(date) {
                        return date > Date.now();
                    },
                    message: "Date invalid. Please don't select a date in the past!"
                },
                required: 'End is required',
            },
        },
        validate: {
            validator: function(dateRange) {
                console.log({ dateRange });
                return new Date(dateRange.start).getTime() < new Date(dateRange.end).getTime() && new Date(dateRange.start).getTime() > Date.now();
            },
            message: "Start date must be earlier than end date and later than now"
        },
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
    direction: {
        type: String
    },
    maxUsers: {
        type: Number,
        required: 'Max number of participants is required'
    }
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    } 
});

eventSchema.index({ location: '2dsphere'});

eventSchema.virtual('participants', {
    ref: 'Schedule',
    localField: '_id',
    foreignField: 'event',
    justOne: false,
    options: { sort: { createdAt: -1 } }
});


eventSchema.pre('save', function(next) {
    console.log(typeof(this.dateRange.start))
    if (typeof this.dateRange.start !== Date) {
        this.dateRange.start = new Date(this.dateRange.start);
    }
    if (typeof this.dateRange.end !== Date) {
        this.dateRange.end = new Date(this.dateRange.end);
    }
    next();
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
