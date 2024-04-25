// Import any necessary models or modules
const { Post } = require('../models');

// Function to show the dashboard
exports.showDashboard = (req, res) => {
  // Assuming user is logged in and user object is available in req.user
  Post.findAll({ where: { userId: req.user.id } })
    .then(posts => {
      res.render('dashboard/index', { posts });
    })
    .catch(err => {
      console.error('Error retrieving posts:', err);
      res.status(500).send('Internal Server Error');
    });
};

// Function to show the form to add a new post
exports.showNewPostForm = (req, res) => {
  res.render('dashboard/new-post');
};

// Function to show the form to edit a post
exports.showEditPostForm = (req, res) => {
  const postId = req.params.id;
  Post.findByPk(postId)
    .then(post => {
      if (!post || post.userId !== req.user.id) {
        return res.status(404).send('Post not found');
      }
      res.render('dashboard/edit-post', { post });
    })
    .catch(err => {
      console.error('Error retrieving post:', err);
      res.status(500).send('Internal Server Error');
    });
};
