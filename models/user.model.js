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
        //se lo pedimos a fb
    },
    social: {
        facebookId: String,
    },
    photo: {
        type: String
        // se lo pedimos a fb
    },
    interests: {
        type: [String],
        enum: constants.CATEGORIES
        // do the list of categories
        // middleware to check for interests
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
module.exports = User;

