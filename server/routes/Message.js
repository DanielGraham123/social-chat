import express from "express";
import { addMessage, getPrivateMessages } from "../controllers/Message.js";

const router = express.Router();

/** 
* @openapi
* /api/message/{chatId}:
*  get:
*    tags:
*      - Message
*    description: Returns all messages of a chat
*    parameters:
*      - in: path
*        name: chatId
*        required: true
*        schema:
*          type: string
*    responses:
*      200:
*        description: All messages of a chat returned successfully
*      404:
*        description: Chat with chatId not found
*      500:
*        description: Some server error
*/
router.get("/:chatId", getPrivateMessages);
/** 
* @swagger
* /api/message/new:
*   post:
*     tags:
*       - Message
*     description: Creates a new message
*     requestBody:
*       required: true
*       content:
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             properties:
*               chatId:
*                 type: string
*               senderId:
*                 type: string
*               text:
*                 type: string
*     responses:
*       200:
*         description: Message created successfully
*       404:
*         description: id not found
*         content:
*           application/json:
*             schema:
*                type: array
*                items:
*                  - $ref: '#/definitions/UserIdNotFound'
*                  - $ref: '#/definitions/ChatIdNotFound'
*                example:
*                  message: User/Chat with senderId not found
*       500:
*         description: Some server error
*     definitions:
*       UserIdNotFound:
*         type: object
*         properties:
*           message:
*             type: string
*             description: User with senderId not found
*             example: User with senderId not found
*       ChatIdNotFound:
*         type: object
*         properties:
*           message:
*             type: string
*             description: Chat with chatId not found
*             example: Chat with chatId not found
*/
router.post("/new", addMessage);

export default router;