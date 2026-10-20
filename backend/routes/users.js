const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Invalid user ID",
            error: error.message
        });
    }
});

module.exports = router;