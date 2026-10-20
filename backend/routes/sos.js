const express = require("express");
const SOS = require("../models/SOS");

const router = express.Router();

// Activate SOS
router.post("/", async (req, res) => {
    try {
        const sos = new SOS(req.body);
        const savedSOS = await sos.save();

        res.status(201).json(savedSOS);
    } catch (error) {
        res.status(400).json({
            message: "Error activating SOS",
            error: error.message
        });
    }
});

// Get SOS records for a user
router.get("/:userId", async (req, res) => {
    try {
        const sosRecords = await SOS.find({
            user: req.params.userId
        }).sort({ createdAt: -1 });

        res.json(sosRecords);
    } catch (error) {
        res.status(400).json({
            message: "Error fetching SOS records",
            error: error.message
        });
    }
});

// Resolve an SOS
router.put("/:id/resolve", async (req, res) => {
    try {
        const sos = await SOS.findByIdAndUpdate(
            req.params.id,
            { status: "resolved" },
            { new: true }
        );

        if (!sos) {
            return res.status(404).json({
                message: "SOS record not found"
            });
        }

        res.json(sos);
    } catch (error) {
        res.status(400).json({
            message: "Error resolving SOS",
            error: error.message
        });
    }
});

module.exports = router;