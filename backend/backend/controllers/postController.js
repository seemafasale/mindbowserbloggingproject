const Post = require('../models/postModel');

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  Post.createPost(title, content, userId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Post created' });
  });
};

exports.getAllPosts = (req, res) => {
  Post.getAllPosts((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getPost = (req, res) => {
  Post.getPostById(req.params.id, (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.json(results[0]);
  });
};

exports.updatePost = (req, res) => {
  const { title, content } = req.body;
  Post.getPostOwner(req.params.id, (err, results) => {
    if (results[0]?.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    Post.updatePost(req.params.id, title, content, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Post updated' });
    });
  });
};

exports.deletePost = (req, res) => {
  Post.getPostOwner(req.params.id, (err, results) => {
    if (results[0]?.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    Post.deletePost(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Post deleted' });
    });
  });
};
