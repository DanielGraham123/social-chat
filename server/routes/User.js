import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/User.js';

const router = express.Router();

/**
* @openapi
* /api/users/all:
*  get:
*   description: Get all users
*   responses:
*    200:
*     description: Success
*    403:
*     description: You are not allowed to see all users!
*    500:
*     description: Some server error
*/
router.get('/all', getAllUsers);
/**
* @openapi
* /api/users/{id}: 
*  get: 
*   description: Get user by id
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*   responses:
*    200:
*     description: Success 
*    404:
*     description: User not found
*    500:
*     description: Some server error
*/
router.get('/:id', getUser);
/**
* @openapi
* /api/users/{id}:
*  put:
*   description: Update user by id
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        currentUserId:
*         type: string
*        currentAdminStatus:
*         type: boolean
*        username:
*         type: string
*        email:
*         type: string
*        password:
*         type: string
*        firstname:
*         type: string
*        lastname:
*         type: string
*   responses:
*    200:
*     description: Success
*    403:
*     description: You can only update your account!
*    500:
*     description: Some server error
*/
router.put('/:id', updateUser);
/**
* @openapi
* /api/users/{id}:
*  delete:
*   description: Delete user by id
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*   responses:
*    200:
*     description: Success
*    403:
*     description: You can only delete your account!
*    500:
*     description: Some server error
*/
router.delete('/:id', deleteUser);

export default router;