// Import any necessary models or modules
const { Post } = require('../models');

// Function to show the homepage
exports.showHomepage = (req, res) => {
  // Retrieve posts from the database and render the homepage
  Post.findAll()
    .then(posts => {
      res.render('home', { posts });
    })
    .catch(err => {
      console.error('Error retrieving posts:', err);
      res.status(500).send('Internal Server Error');
    });
};

// Function to show a single post
exports.showPost = (req, res) => {
  const postId = req.params.id;
  // Retrieve a single post from the database and render it
  Post.findByPk(postId)
    .then(post => {
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.render('post', { post });
    })
    .catch(err => {
      console.error('Error retrieving post:', err);
      res.status(500).send('Internal Server Error');
    });
};
