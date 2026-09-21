const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authenticate = require('../middleware/authenticate');

// Applies to EVERY route in this file — no contact route is ever public.
router.use(authenticate);

router.get('/', contactController.getAll);
router.post('/', contactController.create);
router.get('/:id', contactController.getOne);
router.put('/:id', contactController.update);
router.delete('/:id', contactController.remove);

module.exports = router;