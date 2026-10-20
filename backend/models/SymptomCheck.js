const mongoose = require("mongoose");

const symptomCheckSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    symptoms: {
        type: String,
        required: true
    },

    analysis: {
        type: String,
        default: ""
    },

    urgency: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(
    "SymptomCheck",
    symptomCheckSchema
);