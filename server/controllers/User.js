import User from "../models/User.js";
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    try {

        if (!user) return res.status(404).json({ message: 'User not found' });

        const { password, __v, ...other } = user._doc;

        res.status(200).json(other);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { currentUserId, currentAdminStatus, password } = req.body;


    if (currentUserId === id || currentAdminStatus) {
        try {

            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

            res.status(200).json(updatedUser);


        } catch (error) {

            res.status(500).json({ message: error.message });

        }
    } else {
        res.status(403).json({ message: 'You can only update your account!' });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { currentUserId, currentAdminStatus } = req.body;

    if (currentUserId === id || currentAdminStatus) {
        try {

            await User.findByIdAndDelete(id);

            res.status(200).json({ message: 'User has been deleted...' });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(403).json({ message: 'You can only delete your account!' });
    }
}

export const getAllUsers = async (req, res) => {
    const { currentAdminStatus } = req.body;

    if (currentAdminStatus) {
        try {

            const users = await User.find({}, { password: 0, __v: 0 });

            res.status(200).json(users);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(403).json({ message: 'You are not allowed to see all users!' });
    }
}

// follow a user
export const followUser = async (req, res) => {
    const { followingUserId } = req.params;

    const { currentUserId } = req.body;

    if (currentUserId !== followingUserId) {
        try {

            const currentUser = await User.findById(currentUserId);
            const followingUser = await User.findById(followingUserId);

            if (currentUser.following.includes(followingUserId)) {
                res.status(403).json({ message: 'You already follow this user' });
            } else {
                await currentUser.updateOne({ $push: { following: followingUserId } })
                await followingUser.updateOne({ $push: { followers: currentUserId } })

                res.status(200).json({ message: 'User has been followed' });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });

        }
    } else {
        res.status(403).json({ message: 'You cannot follow yourself' });
    }
}

// unfollow a user
export const unfollowUser = async (req, res) => {
    const { followingUserId } = req.params;

    const { currentUserId } = req.body;

    if (currentUserId !== followingUserId) {
        try {

            const currentUser = await User.findById(currentUserId);
            const followingUser = await User.findById(followingUserId);

            if (!currentUser.following.includes(followingUserId)) {
                res.status(403).json({ message: 'You do not follow this user' });
            } else {
                await currentUser.updateOne({ $pull: { following: followingUserId } })
                await followingUser.updateOne({ $pull: { followers: currentUserId } })

                res.status(200).json({ message: 'User has been unfollowed' });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });

        }
    } else {
        res.status(403).json({ message: 'You cannot unfollow yourself' });
    }
}