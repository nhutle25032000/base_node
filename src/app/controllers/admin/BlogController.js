class BlogController {
    index (req, res) {
        console.log(123);
        res.send('ok').status(200);
    }

    create(req, res) {
        res.send('create').status(200);
    }

    edit(req,res) {
        
    }
}

module.exports = new BlogController();