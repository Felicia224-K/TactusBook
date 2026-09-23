const { Op } = require('sequelize');
const { Contact } = require('../models');

/**
 * Every handler below scopes its query by req.user.id, which the authenticate
 * middleware sets from the JWT. This is what guarantees a user can never read
 * or modify another user's contacts (prevents IDOR vulnerabilities).
 */

/**
 * GET /api/contacts
 * Returns ONLY the authenticated user's contacts.
 * Search and status filtering are added in the next stage.
 */
exports.getAll = async (req, res) => {
  try {
    const { search, status } = req.query;
    const  where = { userId: req.user.id };

     if (status) {
        where.status = status;
     }

     if (search) {
        where[Op.or] = [
            { name: { [Op.iLike]: `%${search}%` } },
            { company: { [Op.iLike]: `%${search}%` } },
        ];
     }
     const contacts = await Contact.findAll({
        where,
        order: [['createdAt', 'DESC']],
     });
      
    return res.status(200).json({ success: true, contacts });
  } catch (err) {
    console.error('Get contacts error:', err);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

/**
 * POST /api/contacts
 * Creates a contact owned by the authenticated user.
 * userId is taken from the JWT, never from the request body — otherwise a user
 * could create contacts under someone else's account.
 */
exports.create = async (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    const contact = await Contact.create({
      name,
      email: email || null,
      phone: phone || null,
      company: company || null,
      status: status || 'lead',
      notes: notes || null,
      userId: req.user.id,
    });

    return res.status(201).json({ success: true, contact });
  } catch (err) {
    // Sequelize model validation (isEmail, ENUM values) lands here
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        errors: err.errors.map((e) => ({ msg: e.message, param: e.path })),
      });
    }
    // Violation of the unique (email, userId) index
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        error: 'You already have a contact with this email',
      });
    }
    console.error('Create contact error:', err);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

/**
 * GET /api/contacts/:id
 * 404 if the contact does not exist at all.
 * 403 if it exists but belongs to another user.
 */
exports.getOne = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }

    if (contact.userId !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    return res.status(200).json({ success: true, contact });
  } catch (err) {
    console.error('Get contact error:', err);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

/**
 * PUT /api/contacts/:id
 * Same ownership rules as getOne, then applies the update.
 */
exports.update = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }

    if (contact.userId !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    const { name, email, phone, company, status, notes } = req.body;



    // Only overwrite fields that were actually sent
    await contact.update({
      name: name !== undefined ? name : contact.name,
      email: email !== undefined ? email : contact.email,
      phone: phone !== undefined ? phone : contact.phone,
      company: company !== undefined ? company : contact.company,
      status: status !== undefined ? status : contact.status,
      notes: notes !== undefined ? notes : contact.notes,
    });

    return res.status(200).json({ success: true, contact });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        errors: err.errors.map((e) => ({ msg: e.message, param: e.path })),
      });
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        error: 'You already have a contact with this email',
      });
    }
    console.error('Update contact error:', err);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

/**
 * DELETE /api/contacts/:id
 * Same ownership rules, then removes the row.
 */
exports.remove = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }

    if (contact.userId !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    await contact.destroy();

    return res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Delete contact error:', err);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};