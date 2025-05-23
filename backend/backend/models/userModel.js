const db = require('../config/db');

exports.createUser = (username, email, hashedPassword, callback) => {
  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    callback
  );
};

exports.getUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};
