const { ObjectId } = require('mongodb');
const { createPost } = require('../../helper/validation');
const createError = require('http-errors');
const Post = require('../../models/post');
const User = require('../../models/user');
const UserRole = require('../../enum/userRole')

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

    async getPostBySlug(req, res, next) {
        try {
            let slug = req.params.slug
            const post = await User.aggregate([
                    {$unwind : "$posts"},
                    {$match : {"posts.slug" : slug, "role" : UserRole.blogger }},
                    {$project : {
                        _id : "$posts._id",
                        title : "$posts.title", 
                        subject : "$posts.subject", 
                        content : "$posts.content",
                        createdAt: "$posts.createdAt",
                    }}
                ])
                .exec();

            res.json({
                status: 200,
                data: post,
            });
        } catch (error) {
            next(createError(error))
        }
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
                slug: params.title.replace(' ', '_'),
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