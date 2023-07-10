import express from 'express';
import { createPost, deletePost, getAllPosts, getPost, getTimelinePosts, likePost, updatePost } from '../controllers/Post.js';

const router = express.Router();

/**
* @openapi
* /api/post/all:
*  get:
*   description: Get all posts
*   tags: [Post]
*   responses:
*    200:
*     description: Success
*    403:
*     description: You are not allowed to see all posts!
*    500:
*     description: Some server error
*/
router.get('/all', getAllPosts);
/** 
* @openapi
* /api/post/timeline:
*  get:
*   description: Get user's posts timeline
*   tags: [Post]
*   parameters:
*    - in: query
*      name: userId
*      required: true
*      schema:
*       type: string
*   responses:
*    200:
*     description: Success
*    403:
*     description: You are not allowed to see timeline posts!
*    500:
*     description: Some server error
*/
router.get('/timeline', getTimelinePosts);
/**
* @openapi
* /api/post/{id}:
*  get:
*   description: Get post by id
*   tags: [Post]
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
*     description: Post not found
*    500:
*     description: Some server error
*/
router.get('/:id', getPost);
/**
* @openapi
* /api/post/create:
*  post:
*   description: Create new post
*   tags: [Post]
*   requestBody:
*    content:
*     application/x-www-form-urlencoded:
*      schema:
*       type: object
*       properties:
*        userId:
*         type: string
*        images:
*         type: array
*         items:
*          type: string
*        description:
*         type: string
*        likes:
*         type: array
*         items:
*          type: string
*        comments:
*         type: array
*         items:
*          type: object
*          properties:
*           userId:
*            type: string
*           comment:
*            type: string
*      encoding:
*       images: form
*       likes: form
*       comments: form
*   responses:
*    200:
*     description: Success
*    500:
*     description: Some server error
*/
router.post('/create', createPost);
/** 
* @openapi
* /api/post/{postId}/like:
*  put:
*   description: Like post by id
*   tags: [Post]
*   parameters:
*    - in: path
*      name: postId
*      required: true
*      schema:
*       type: string
*   requestBody:
*    content:
*     application/x-www-form-urlencoded:
*      schema:
*       type: object
*       properties:
*        userId:
*         type: string
*   responses:
*    200:
*     description: Success
*    404:
*     description: Post not found
*    500:
*     description: Some server error
*/
router.put('/:postId/like', likePost);
/**
* @openapi
* /api/post/{id}:
*  put:
*   description: Update post by id
*   tags: [Post]
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*   requestBody:
*    content:
*     application/x-www-form-urlencoded:
*      schema:
*       type: object
*       properties:
*        userId:
*         type: string
*        images:
*         type: array
*         items:
*          type: string
*        description:
*         type: string
*        likes:
*         type: array
*         items:
*          type: string
*        comments:
*         type: array
*         items:
*          type: object
*          properties:
*           userId:
*            type: string
*           comment:
*            type: string
*      encoding:
*       images: form
*       likes: form
*       comments: form
*   responses:
*    200:
*     description: Success
*    404:
*     description: Post not found
*    403:
*     description: You can only update your own post
*    500:
*     description: Some server error
*/
router.put('/:id', updatePost);
/**
* @openapi
* /api/post/{id}:
*  delete:
*   description: Delete post by id
*   tags: [Post]
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*   requestBody:
*    content:
*     application/x-www-form-urlencoded:
*      schema:
*       type: object
*       properties:
*        userId:
*         type: string
*   responses:
*    200:
*     description: Success
*    404:
*     description: Post not found
*    401:
*     description: You are not authorized to delete this post
*    500:
*     description: Some server error
*/
router.delete('/:id', deletePost);

export default router;