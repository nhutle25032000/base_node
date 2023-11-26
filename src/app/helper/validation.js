const Joi = require('joi');
const PostStatus = require('../enum/postStatus')

/** admin */
const updatePostStatusValidate = (data) => {
    const schema = Joi.object({
        status: Joi.string()
            .valid(
                PostStatus.pending.toString(), 
                PostStatus.posted.toString(), 
                PostStatus.block.toString()
            ).required()
    });
    return schema.validate(data);
}

/** blogger */
const userValidation = (data) => {
    const userSchema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(4).max(32).required(),
        role: Joi.number(),
    });

    return userSchema.validate(data);
}

const createPost = (data) => {
    const postSchema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        subject: Joi.string().required(),
    });

    return postSchema.validate(data);
}

const updateUserStatus = (data) => {
    const updateUserStatus = Joi.object({
        status: Joi.string().valid('0', '1').required(),
    });

    return updateUserStatus.validate(data);
}

const updatePostingRights = (data) => {
    const updatePostingRights = Joi.object({
        posting_rights: Joi.string().valid('0', '1').required(),
    });

    return updatePostingRights.validate(data);
}

module.exports = {
    userValidation,
    createPost,
    updatePostStatusValidate,
    updateUserStatus,
    updatePostingRights,
}
