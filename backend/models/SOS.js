const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message: {
        type: String,
        default: "Emergency SOS activated"
    },

    latitude: {
        type: Number,
        default: null
    },

    longitude: {
        type: Number,
        default: null
    },

    status: {
        type: String,
        enum: ["active", "resolved"],
        default: "active"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SOS", sosSchema);