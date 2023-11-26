const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserStatus = require('../enum/userStatus');
const { boolean } = require('joi');

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
    status: {
        type: Number,
        default: UserStatus.active,
    },
    posting_rights: {
        type: Boolean,
    },
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

