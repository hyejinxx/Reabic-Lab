const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Sign up a new user
router.post('/signup', async (req, res) => {
    const { username, email, password, age, gender } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = await User.create({ username, email, password, age, gender });
        const token = newUser.generateJWT();
        res.status(201).json({ message: 'User created successfully', token, userId: newUser._id });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Log in a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 4. Refresh Token 생성 (7일 유효)
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        User.refreshToken = refreshToken; 
        await user.save();
        res.json({ message: 'Login successful', user, token, refreshToken });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.post('/verify', async (req, res) => {
//     const { token } = req.body;
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         res.json({ message: 'Token is valid', userId: decoded.id });
//     } catch (error) {
//         console.error('Error verifying token:', error);
//         res.status(401).json({ message: 'Invalid token' });
//     }
// });

module.exports = router;
