import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { Post } from '../../models';

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({ posts });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getPostById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
      const error: any = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ post });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const createPost: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    }

    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.body.imageUrl;

    const post = new Post({ title, content, imageUrl });
    const savedPost = await post.save();

    res.status(200).json({
      success: true,
      post: savedPost,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
