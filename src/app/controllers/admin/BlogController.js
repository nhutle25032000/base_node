const { ObjectId } = require("mongodb");
const { createPost } = require("../../helper/validation");
const createError = require("http-errors");
const Post = require("../../models/post");
const User = require("../../models/user");
const PostStatus = require("../../enum/postStatus");
const { updatePostStatusValidate } = require('../../helper/validation')
const BaseController = require('./BaseController')

class BlogController {
  async index(req, res, next) {
    const pageNumber = req.query.page ?? 1;
		const pageSize = 10
    const skipAmount = (pageNumber - 1) * pageSize;
		const documentTotal = await Post.countDocuments();
    const posts = await Post.find({})
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .exec();

    res.json(await BaseController.responseSuccess(posts, pageSize, documentTotal, pageNumber));
  }

  async getPostBySlug(req, res, next) {
    try {
      let slug = req.params.slug;
      const post = await Post.findOne({ slug }).exec();

      res.json({
        status: 200,
        data: post,
      });
    } catch (error) {
      next(createError(error));
    }
  }

  async updatePostStatus(req, res, next) {
    try {
      const { error } = updatePostStatusValidate(req.body);
      if (error) {
        throw createError[403](error.details[0].message);
      }

      let slug = req.params.slug;
      let status = req.body.status;
      const post = await Post.findOne({ slug }).exec();
      post.set({
          status: status,
        }).save();

      res.json({
        status: 200,
        data: post,
      });
    } catch (error) {
      next(createError(error));
    }
  }
}

module.exports = new BlogController();
