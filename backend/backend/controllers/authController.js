const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup = (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err });

    User.createUser(username, email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'User registered!' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.getUserByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) return res.status(401).json({ message: 'Incorrect password' });

      const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key');
      res.json({ token });
    });
  });
};
