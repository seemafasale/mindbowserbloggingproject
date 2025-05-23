const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decodedkey = jwt.verify(token, 'secret_key');
    req.user = decodedkey;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
