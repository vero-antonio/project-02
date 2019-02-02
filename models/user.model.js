const constants = require("../constants");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required",
        //se lo pedimos a fb
    },
    email: {
        type: String,
        required: "Email is required",
    },
    social: {
        facebookId: String,
    },
    photo: {
        type: String
    },
    interests: {
        type: [String],
        enum: constants.CATEGORIES.map(({ id }) => id)
        // middleware to check for interests
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
module.exports = User;

