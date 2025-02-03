const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Invalid credentials");
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Logout Route (optional, as JWT is stateless)
router.post("/logout", (req, res) => {
    res.status(200).send("Logged out successfully");
});

module.exports = router;