const createError = require("http-errors");
const BaseController = require('./BaseController')
const PostStatus = require('../../enum/postStatus')
const Post = require("../../models/post");

class BlogController {
  async index(req, res, next) {
    try {
      let query = {
        status: PostStatus.posted,
      }

      if(req.query.title) {
        let titleQuery = `.*${req.query.title}.*`
        query.title = { $regex: new RegExp(titleQuery, 'i') }
      }

      if(req.query.subject) {
        query.subject = req.query.subject
      }

      const pageNumber = req.query.page ?? 1;
      const pageSize = 10
      const skipAmount = (pageNumber - 1) * pageSize;
      const documentTotal = await Post.find(query)
        .countDocuments();

      const posts = await Post.find(query)
        .select('_id title slug subject createdAt')
        .skip(skipAmount)
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .exec();
  
      res.json(await BaseController.responseSuccess(posts, pageSize, documentTotal, pageNumber));
    } catch (error) {
      next(createError(error))
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
}

module.exports =  new BlogController();