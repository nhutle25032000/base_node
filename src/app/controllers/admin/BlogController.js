class BlogController {
    index (req, res) {
        res.render('indexBlog');
    }

    create(req, res) {
        res.render('createBlog');
    }

    edit(req,res) {

    }
}

module.exports = new BlogController();