const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');

// Example API route for fetching all posts
router.get('/posts', (req, res) => {
  Post.findAll()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      console.error('Error retrieving posts:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Example API route for creating a new post
router.post('/posts', (req, res) => {
  const { title, content, userId } = req.body;
  Post.create({ title, content, userId })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.error('Error creating post:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Example API route for fetching comments of a specific post
router.get('/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  Comment.findAll({ where: { postId } })
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      console.error('Error retrieving comments:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Example API route for creating a new comment on a post
router.post('/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const { content, userId } = req.body;
  Comment.create({ content, userId, postId })
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(err => {
      console.error('Error creating comment:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
