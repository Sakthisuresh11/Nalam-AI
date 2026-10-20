const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    dosage: {
        type: String,
        default: ""
    },

    time: {
        type: String,
        required: true
    },

    frequency: {
        type: String,
        default: "daily"
    },

    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Medicine", medicineSchema);