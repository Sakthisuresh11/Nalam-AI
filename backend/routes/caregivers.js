const express = require("express");
const Caregiver = require("../models/Caregiver");

const router = express.Router();

// Add a caregiver
router.post("/", async (req, res) => {
    try {
        const caregiver = new Caregiver(req.body);
        const savedCaregiver = await caregiver.save();

        res.status(201).json(savedCaregiver);
    } catch (error) {
        res.status(400).json({
            message: "Error adding caregiver",
            error: error.message
        });
    }
});

// Get caregivers for a user
router.get("/:userId", async (req, res) => {
    try {
        const caregivers = await Caregiver.find({
            user: req.params.userId
        });

        res.json(caregivers);
    } catch (error) {
        res.status(400).json({
            message: "Error fetching caregivers",
            error: error.message
        });
    }
});

// Delete a caregiver
router.delete("/:id", async (req, res) => {
    try {
        await Caregiver.findByIdAndDelete(req.params.id);

        res.json({
            message: "Caregiver deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error deleting caregiver",
            error: error.message
        });
    }
});

module.exports = router;