import express from 'express';
import { deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser } from '../controllers/User.js';

const router = express.Router();

/**
* @openapi
* /api/user/all:
*  get:
*   description: Get all users
*   tags: [User]
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
* /api/user/{id}: 
*  get: 
*   description: Get user by id
*  tags: [User]
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
* /api/user/{id}:
*  put:
*   description: Update user by id
*   tags: [User]
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
* /api/user/{followingUserId}/follow:
*  put:
*   description: Follow a user
*   tags: [User]
*   parameters:
*    - in: path
*      name: followingUserId
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
*   responses:
*    200:
*     description: Success
*    500:
*     description: Some server error
*/
router.put('/:followingUserId/follow', followUser);
/**
* @openapi
* /api/user/{followingUserId}/unfollow:
*  put:
*   description: Unfollow a user
*   tags: [User]
*   parameters:
*    - in: path
*      name: followingUserId
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
*   responses:
*    200:
*     description: Success
*    500:
*     description: Some server error
*/
router.put('/:followingUserId/unfollow', unfollowUser);
/**
* @openapi
* /api/user/{id}:
*  delete:
*   description: Delete user by id
*   tags: [User]
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