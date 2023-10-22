const Post = require('../../models/post');

class BlogController {
    async index (req, res) {
        const posts = await Post.find({}).exec();

        res.json({
            status: 200,
            data: posts
        });
    }

    create(req, res) {
        res.render('createBlog');
    }

    edit(req,res) {

    }
}

module.exports = new BlogController();