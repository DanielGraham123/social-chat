import { Router } from 'express';
import { registerUser } from '../controllers/Auth.js';
import { loginUser } from '../controllers/Auth.js';

const router = Router();

/**
*  @openapi
* /api/auth/register:
*  post:
*   description: Register a new user
*   parameters:
*    - name: username
*      description: Username of the user
*      in: formData
*      required: true
*      type: string
*    - name: email
*      description: Email of the user
*      in: formData
*      required: true
*      type: string
*    - name: password
*      description: Password of the user
*      in: formData
*      required: true
*      type: string
*    - name: firstname
*      description: First name of the user
*      in: formData
*      required: true
*      type: string
*    - name: lastname
*      description: Last name of the user
*      in: formData
*      required: true
*      type: string
*   responses:
*    200:
*     description: User registered successfully
*    500:
*     description: Some server error
 */
router.post('/register', registerUser);

/**
*  @openapi
* /api/auth/login:
*  post:
*   description: Login a user
*   parameters:
*    - name: username
*      description: Username of the user
*      in: formData
*      required: true
*    - name: password
*      in: formData
*      required: true
*      description: Password of the user
*   responses:
*    200:
*     description: User logged in successfully
*    500:
*     description: Some server error
*/
router.post('/login', loginUser);

export default router;