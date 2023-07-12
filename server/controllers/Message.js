import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

export const addMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const newMessage = new Message({ chatId, senderId, text });

    try {

        const sender = await User.findById(senderId);

        if (!sender) return res.status(404).json({ message: 'User with senderId not found' });

        const chat = await Chat.findById(chatId);

        if (!chat) return res.status(404).json({ message: 'Chat with chatId not found' });

        newMessage.save();

        res.status(201).json(newMessage);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPrivateMessages = async (req, res) => {
    const { chatId } = req.params;

    try {

        const chat = await Chat.findById(chatId);

        if (!chat) return res.status(404).json({ message: 'Chat with chatId not found' });

        const messages = await Message.find({ chatId });

        messages.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}