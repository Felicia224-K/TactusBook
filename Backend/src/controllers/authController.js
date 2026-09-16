const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const BCRYPT_ROUNDS = 12;
const JWT_EXPIRES_IN = '24h';

/**
 * POST /api/auth/register
 * Creates an account. Per the assignment spec, this returns ONLY a success
 * message — no token, no user object. The user must log in separately.
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'name, email and password are all required' }],
      });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Email is already registered' });
    }

    // 12 rounds minimum, as required. Never store the plain password.
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ success: true, message: 'Account created successfully' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

/**
 * POST /api/auth/login
 * Returns { token, user } on success. The JWT expires in exactly 24h and is
 * signed with JWT_SECRET, so it is verifiable on jwt.io with the same secret.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'email and password are required' }],
      });
    }

    const user = await User.findOne({ where: { email } });

    // Same generic error whether the email doesn't exist or the password is
    // wrong — this avoids leaking which emails are registered.
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

/**
 * GET /api/auth/me
 * Protected by the authenticate middleware. Returns the currently logged-in
 * user's info based on the id decoded from their JWT.
 */
exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'createdAt'],
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Me error:', err);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};