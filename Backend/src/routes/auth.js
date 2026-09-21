const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const handleValidation =require('../middleware/handleValidation');
const { registerValidation, loginValidation } = require('../validators/authValidators');





/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Registration, login and current-user info
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
  *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Aicha Kone
 *               email:
 *                 type: string
 *                 example: aicha@contactbook.test
 *               password:
 *                 type: string
 *                 example: SecurePass123
 *     responses:
 *       201:
  *         description: Account created successfully
 *       400:
 *         description: Validation error (missing name, invalid email, weak password)
 *       409:
 *         description: Email is already registered
 */
router.post('/register', registerValidation, handleValidation, authController.register);




/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 * 
 *                 example: aicha@contactbook.test
 *               password:
 *                 type: string
 *                 example: SecurePass123
 *     responses:
 *       200:
 *         description: Returns a JWT token (expires in 24h) and the user's info
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginValidation, handleValidation, authController.login);







/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get the currently authenticated user's info
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The current user's info
 *       401:
 *         description: Missing or invalid token
 */
router.get('/me', authenticate, authController.me);

module.exports = router;