import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const createChat = async (req, res) => {
    const { receiverId, senderId } = req.body;
    const newChat = new Chat({ members: [senderId, receiverId] });

    try {

        const chat = await newChat.save();

        res.status(200).json(chat);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
}

export const getUserChats = async (req, res) => {
    const { currentUserId } = req.params;

    try {

        const currentUser = await User.findById(currentUserId);

        if (!currentUser) return res.status(404).json({ message: "User with Id not found" });

        const chats = await Chat.find({ members: { $in: [currentUserId] } });

        res.status(200).json(chats);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

export const getPrivateChat = async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) return res.status(404).json({ message: "Users with Ids not found" });

        const chat = await Chat.findOne({ members: { $all: [senderId, receiverId] } })

        res.status(200).json(chat);

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}