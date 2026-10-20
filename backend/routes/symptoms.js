const express = require("express");
const SymptomCheck = require("../models/SymptomCheck");

const router = express.Router();

// Save a symptom check
router.post("/", async (req, res) => {
    try {
        const symptomCheck = new SymptomCheck(req.body);
        const savedCheck = await symptomCheck.save();

        res.status(201).json(savedCheck);
    } catch (error) {
        res.status(400).json({
            message: "Error saving symptom check",
            error: error.message
        });
    }
});

// AI symptom analysis
router.post("/analyze", async (req, res) => {
    try {
        const { symptoms } = req.body;

        if (!symptoms) {
            return res.status(400).json({
                message: "Symptoms are required"
            });
        }

        res.json({
            symptoms: symptoms,
            analysis: "Based on the symptoms provided, you may have a common viral illness. Please rest, stay hydrated, monitor your symptoms, and consult a doctor if symptoms become severe or persist.",
            urgency: "medium"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error analyzing symptoms",
            error: error.message
        });
    }
});

// Get symptom checks for a user
router.get("/:userId", async (req, res) => {
    try {
        const checks = await SymptomCheck.find({
            user: req.params.userId
        }).sort({ createdAt: -1 });

        res.json(checks);
    } catch (error) {
        res.status(400).json({
            message: "Error fetching symptom checks",
            error: error.message
        });
    }
});

module.exports = router;