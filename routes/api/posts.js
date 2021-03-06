const express = require('express');
const { body, param } = require('express-validator');

const { wrapAsync, handleValidationErrors } = require('../../util');
const { isAuth } = require('../../middleware/auth');
const AppError = require('../../AppError');

const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user');
    res.status(200).json(posts);
  })
);

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id).populate('user');
    if (!post) throw new AppError(400, "post doesn't exist");
    res.status(200).json(post);
  })
);

router.post(
  '/',
  isAuth,
  wrapAsync(async (req, res) => {
    const { text } = req.body;
    const post = new Post({ text, user: req.user._id, likes: [] });
    const savedPost = await post.save();

    const foundPost = await Post.findById(savedPost._id).populate('user');
    res.status(200).json(foundPost);
  })
);

// like post
router.patch(
  '/:id/like',
  isAuth,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (post.likes.includes(req.user._id)) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    const savedPost = await post.save();
    res.status(200).json(savedPost);
  })
);

router.delete(
  '/:id',
  isAuth,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) throw new AppError(400, 'post does not exist');
    if (!req.user._id.equals(post.user))
      throw new AppError(401, 'user is not authorized to delete post');

    const deletedPost = await post.deleteOne();
    res.status(200).json(deletedPost);
  })
);

module.exports = router;
