const { ObjectId } = require('mongodb');
const { createPost } = require('../../helper/validation');
const createError = require('http-errors');
const Post = require('../../models/post');
const User = require('../../models/user');

class BlogController {
    async index (req, res) {
        const posts = await Post.find({})
            .select('subject _id title')
            .exec();

        res.json({
            status: 200,
            data: posts
        });
    }

    async create(req, res, next) {
        try {
            let params = req.body
            const { error } = createPost(req.body);
            if ( error ) {
                throw createError(error.details[0].message);
            }

            User.findOneAndUpdate({ _id: req.payload.user_id }, {
            $push: { posts: {
                _id: new ObjectId(),
                title: params.title,
                content: params.content,
                subject: params.subject,
            }}}).exec()

            res.json({
                status: 200,
            });
        } catch (error) {
            next(createError(error));
        }
    }

    edit(req,res) {

    }
}

module.exports = new BlogController();