const express = require("express");
const Medicine = require("../models/Medicine");

const router = express.Router();

// Add a new medicine
router.post("/", async (req, res) => {
    try {
        const medicine = new Medicine(req.body);
        const savedMedicine = await medicine.save();

        res.status(201).json(savedMedicine);
    } catch (error) {
        res.status(400).json({
            message: "Error adding medicine",
            error: error.message
        });
    }
});

// Get medicines for a user
router.get("/:userId", async (req, res) => {
    try {
        const medicines = await Medicine.find({
            user: req.params.userId
        });

        res.json(medicines);
    } catch (error) {
        res.status(400).json({
            message: "Error fetching medicines",
            error: error.message
        });
    }
});

// Delete a medicine
router.delete("/:id", async (req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);

        res.json({
            message: "Medicine deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error deleting medicine",
            error: error.message
        });
    }
});

module.exports = router;