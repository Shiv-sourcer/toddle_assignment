const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
require('dotenv').config();

exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  let user = await User.findOne({ where: { username } });

  if (!user) {
    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ username, password: hashed, role });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};
