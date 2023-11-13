const { ObjectId } = require("mongodb");
const { createPost } = require("../../helper/validation");
const createError = require("http-errors");
const Post = require("../../models/post");

class BlogController {
  async index(req, res, next) {
    try {
      const pageNumber = req.query.page ?? 1;
      const pageSize = 10;
      const skipAmount = (pageNumber - 1) * pageSize;
      const posts = await Post.find({ forUser: req.payload.user_id })
        .skip(skipAmount)
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .exec();

      res.json({
        status: 200,
        data: posts,
      });
    } catch (error) {
      next(createError(error));
    }
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

  async create(req, res, next) {
    try {
      let params = req.body;
      const { error } = createPost(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }

      let slug = params.title.replace(/\s+/g, "_");
      let exists = await Post.findOne({ slug }).exec();

      if (!!exists) {
        return next(createError[403]("Slug already exists !!!"));
      }

      let post = new Post({
        title: params.title,
        slug: params.title.replace(/\s+/g, "_"),
        content: params.content,
        subject: params.subject,
        forUser: req.payload.user_id,
      });

      post.save();

      res.json({
        status: 200,
        post,
      });
    } catch (error) {
      next(createError(error));
    }
  }

  async edit(req, res, next) {
    let slug = req.params.slug
    let post = await Post.findOne({slug}).exec()
    if (!post) {
      return next(createError[403]('Post not found !!!'))
    }

    let params = req.body

    post.set({
      'title': params.title ?? post.title,
      'content': params.content ?? post.content,
      'subject': params.subject ?? post.subject,
    }).save()

    res.json({
      status: 200,
      post
    })
  }
}

module.exports = new BlogController();
