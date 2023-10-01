const Post = require('../../models/post');

class BlogController {
    async index (req, res) {
        const posts = await Post.find({}).exec();
        console.log(posts);
        res.render('indexBlog');
    }

    create(req, res) {
        res.render('createBlog');
    }

    edit(req,res) {

    }
}

module.exports = new BlogController();