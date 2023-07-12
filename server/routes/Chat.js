import express from 'express';
import { createChat, getPrivateChat, getUserChats } from '../controllers/Chat.js';

const router = express.Router();

/** 
* @openapi
* /api/chat/new:
*   post:
*     tags:
*       - Chat
*     description: Creates a new chat
*     requestBody:
*       required: true
*       content:
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             properties:
*               receiverId:
*                 type: string
*               senderId:
*                 type: string
*     responses:
*       200:
*         description: Chat created successfully
*       500:
*         description: Some server error
*/
router.post('/new', createChat);
/** 
* @openapi
* /api/chat/all/{currentUserId}:
*   get:
*     tags:
*       - Chat
*     description: Returns all chats of current user
*     parameters:
*       - in: path
*         name: currentUserId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: All chats of current user returned successfully
*       404:
*         description: User with Id not found
*       500:
*         description: Some server error
*/
router.get("/all/:currentUserId", getUserChats);
/** 
* @openapi
* /api/chat/private/{senderId}/{receiverId}:
*   get:
*     tags:
*       - Chat
*     description: Returns private chat between two users
*     parameters:
*       - in: path
*         name: senderId
*         required: true
*         schema:
*           type: string
*       - in: path
*         name: receiverId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Private chat returned successfully
*       404:
*         description: Users with Ids not found
*       500:
*         description: Some server error
*/
router.get("/private/:senderId/:receiverId", getPrivateChat);

export default router;