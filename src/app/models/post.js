const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: { type: String },
    content: { type: String },
    subject: { type: String },
});

module.exports = mongoose.model('Post', Post);
