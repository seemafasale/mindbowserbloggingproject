const db = require('../config/db');

exports.createPost = (title, content, userId, callback) => {
  db.query(
    'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
    [title, content, userId],
    callback
  );
};

exports.getAllPosts = callback => {
  db.query('SELECT * FROM posts', callback);
};

exports.getPostById = (id, callback) => {
  db.query('SELECT * FROM posts WHERE id = ?', [id], callback);
};

exports.updatePost = (id, title, content, callback) => {
  db.query(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
    callback
  );
};

exports.deletePost = (id, callback) => {
  db.query('DELETE FROM posts WHERE id = ?', [id], callback);
};

exports.getPostOwner = (id, callback) => {
  db.query('SELECT user_id FROM posts WHERE id = ?', [id], callback);
};
