const express = require("express");
const MedicalRecord = require("../models/MedicalRecord");

const router = express.Router();

// Add a medical record
router.post("/", async (req, res) => {
    try {
        const record = new MedicalRecord(req.body);
        const savedRecord = await record.save();

        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(400).json({
            message: "Error adding medical record",
            error: error.message
        });
    }
});

// Get medical records for a user
router.get("/:userId", async (req, res) => {
    try {
        const records = await MedicalRecord.find({
            user: req.params.userId
        });

        res.json(records);
    } catch (error) {
        res.status(400).json({
            message: "Error fetching medical records",
            error: error.message
        });
    }
});

// Delete a medical record
router.delete("/:id", async (req, res) => {
    try {
        await MedicalRecord.findByIdAndDelete(req.params.id);

        res.json({
            message: "Medical record deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error deleting medical record",
            error: error.message
        });
    }
});

module.exports = router;