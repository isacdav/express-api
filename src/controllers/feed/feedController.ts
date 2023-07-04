import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { Post } from '../../models';

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const currentPage: number = Number(req.query.page) || 1;
    const perPage = 2;

    const totalItems = await Post.find().countDocuments();

    const posts = await Post.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({ posts, totalItems });
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

export const updatePost: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    }

    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.body.imageUrl;

    const post = await Post.findById(id);

    if (!post) {
      const error: any = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      post: updatedPost,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
      const error: any = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
