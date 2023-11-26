const User = require("../../models/user");
const createError = require("http-errors");
const BaseController = require('./BaseController')
const { updateUserStatus, updatePostingRights } = require('../../helper/validation');
const userRole = require("../../enum/userRole");

class UserController {
    async index(req, res, next) {
        try {
            let query = {}
            req.query.role ? (query.role = req.query.role) : ''

            const pageNumber = req.query.page ?? 1;
            const pageSize = 10
            const skipAmount = (pageNumber - 1) * pageSize;
            const documentTotal = await User.find(query).countDocuments();
            const users = await User.find(query)
                .select('id email')
                .skip(skipAmount)
                .limit(pageSize)
                .sort({ createdAt: -1 })
                .exec();

            return res.json(await BaseController.responseSuccess(users, pageSize, documentTotal, pageNumber));
        } catch (error) {
            next(createError(error))
        }
    }

    async updateUserStatus(req, res, next) {
        try {
            const { error } = updateUserStatus(req.body);
            if (error) {
                return next(createError[403](error.details[0].message))
            }
            const userId = req.params.id
            const status = req.body.status

            let user = await User.findById(userId).exec();

            if (!user) {
                return next(createError[403]('User not found!!!'))
            }

            user.set({
                status: status
            }).save()

            return res.json({
                status: 200,
                data: user
            })
        } catch (error) {
            next(createError(error))
        }
    }

    async updatePostingRights(req, res, next) {
        try {
            const { error } = updatePostingRights(req.body);
            if (error) {
                return next(createError[403](error.details[0].message))
            }

            const userId = req.params.id
            const postingRights = req.body.posting_rights

            let user = await User.findById(userId).exec();

            if (!user) {
                return next(createError[403]('User not found!!!'))
            }
            if (user.role != userRole.blogger) {
                return next(createError[403]('User is not blogger!!!'))
            }

            user.set({
                posting_rights: postingRights ?? false
            }).save()

            return res.json({
                status: 200,
                data: user
            })
        } catch (error) {
            next(createError(error))
        }
    }
}

module.exports = new UserController
