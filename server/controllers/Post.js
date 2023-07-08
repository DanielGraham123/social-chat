import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
    const newPost = new Post(req.body);
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {

        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json({ message: 'Post has been updated' });
        } else {
            res.status(403).json({ message: 'You can only update your own post' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const { userId, currentAdminStatus } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.userId === userId || currentAdminStatus) {
            await post.deleteOne();
            res.status(200).json({ message: 'Post has been deleted' });
        } else {
            res.status(401).json({ message: 'You are not authorized to delete this post' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllPosts = async (req, res) => {

    try {
        const posts = await Post.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}