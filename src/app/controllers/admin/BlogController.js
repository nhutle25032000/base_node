class BlogController {
    index (req, res) {
        res.render('indexBlog');
    }

    create(req, res) {
        res.send('create').status(200);
    }

    edit(req,res) {

    }
}

module.exports = new BlogController();