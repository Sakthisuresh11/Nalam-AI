const mongoose = require("mongoose");

const caregiverSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    relationship: {
        type: String,
        default: ""
    },

    notificationsEnabled: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model(
    "Caregiver",
    caregiverSchema
);