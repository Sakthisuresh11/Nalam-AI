const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    details: {
        type: String,
        default: ""
    },

    doctor: {
        type: String,
        default: ""
    },

    recordDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(
    "MedicalRecord",
    medicalRecordSchema
);