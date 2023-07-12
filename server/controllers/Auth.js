import User from '../models/User.js';
import bcrypt from 'bcrypt';

// register user
export const registerUser = async (req, res) => {
    const { username, password, email, firstname, lastname } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword, firstname, lastname });

    try {

        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) return res.status(409).json({ message: 'User with username or email already exists' });

        await newUser.save();

        const { password: _, ...user_ } = newUser._doc;

        res.status(201).json(user_);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// login user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const { password: _, ...user_ } = user._doc;

        res.status(200).json(user_);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
