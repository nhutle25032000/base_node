const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: { 
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    content: { 
        type: String,
        required: true,
    },
    subject: { 
        type: String,
        required: true,
    },
    forUser: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('post', Post);
