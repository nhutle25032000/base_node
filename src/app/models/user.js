const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
    createdAt: { 
        type: Date,
        default: Date.now,
        required: true,
    },
}, {
    timestamps: true
});

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
    },
    role: {
        type: Number
    },
    createdAt: { type: Date, default: Date.now },
    posts: {
        type: Post,
        ref: 'post'
    }
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
})

UserSchema.methods.isCheckPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        
    }
}

module.exports = new mongoose.model('User', UserSchema);

