const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req) => {
  const token = req.headers.authorization || '';
  if (!token) {
    throw new Error('Authentication token is missing!');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    throw new Error('Invalid or expired token!');
  }
};

module.exports = { authenticate };
