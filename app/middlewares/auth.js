const jwt = require('jsonwebtoken');
const secretKey = require('../../config/generateSecretKey');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired authentication token' });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
