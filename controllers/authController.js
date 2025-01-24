const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenUtils');
const { createUser, getUserByEmail } = require('../models/userModel');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = await createUser(name, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', userId });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.json({ message: 'Login successful', token });
};

module.exports = { registerUser, loginUser };
