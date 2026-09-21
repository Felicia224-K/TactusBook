const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authenticate = require('../middleware/authenticate');
const handleValidation = require('../middleware/handleValidation');

const { 
    createContactValidation, 
    updateContactValidation, 
} = require('../validators/contactValidators');

// Applies to EVERY route in this file — no contact route is ever public.
router.use(authenticate);



/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: CRUD operations on the authenticated user's own contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: List the authenticated user's contacts
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filters contacts whose name OR company contains this text
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [lead, prospect, client, inactif]
 *         description: Filters contacts by exact status
 *     responses:
 *       200:
  *         description: An array of the user's contacts
 *       401:
 *         description: Missing or invalid token
 */
router.get('/', contactController.getAll);




/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact owned by the authenticated user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
  *               name: { type: string, example: Jean Client }
 *               email: { type: string, example: jean@acme.ci }
 *               phone: { type: string, example: "0700000000" }
 *               company: { type: string, example: Acme CI }
 *               status: { type: string, enum: [lead, prospect, client, inactif], example: lead }
 *               notes: { type: string, example: "Rencontre au salon" }
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Validation error (missing name, invalid email/status)
 *       401:
 *         description: Missing or invalid token
 */
router.post('/', createContactValidation, handleValidation, contactController.create);



/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a single contact by id
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: The contact }
 *       403: { description: The contact belongs to another user }
 *       404: { description: Contact not found }
 */
router.get('/:id', contactController.getOne);



/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact owned by the authenticated user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               phone: { type: string }
 *               company: { type: string }
 *               status: { type: string, enum: [lead, prospect, client, inactif] }
 *               notes: { type: string }
 *     responses:
 *       200: { description: Updated contact }
 *       400: { description: Validation error }
 *       403: { description: The contact belongs to another user }
 *       404: { description: Contact not found }
 */
router.put('/:id', updateContactValidation, handleValidation, contactController.update);



/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact owned by the authenticated user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Contact deleted successfully }
 *       403: { description: The contact belongs to another user }
 *       404: { description: Contact not found }
 */
router.delete('/:id', contactController.remove);

module.exports = router;