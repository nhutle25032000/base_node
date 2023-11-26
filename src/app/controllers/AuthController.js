const createError = require('http-errors');
const { userValidation } = require('../helper/validation');
const User = require('../models/user');
const userStatus = require('../enum/userStatus')
const { signAccessToken, verifyRefreshToken, signRefreshToken } = require('../helper/jwt_service');
const userRole = require('../enum/userRole');

class AuthController {
    async signIn(req, res, next) {
        res.render('signIn', {layout: false});
    }

    async signUp(req, res, next) {
        res.render('signUp', {layout: false});
    }

    async register(req, res, next) {
        try {
            const {email, password, role} = req.body;
            const { error } = userValidation(req.body);
            if ( error ) {
                throw createError(error.details[0].message);
            }

            const exists = await User.findOne({
                email
            }).exec();

            if (exists) {
                throw createError.Conflict(`${email} is ready been registed !!!`);
            }

            let userInfo = {
                email,
                password,
                role
            }
            if (role == userRole.blogger) {
                userInfo.posting_rights = false
            }

            const user = new User(userInfo);

            const userSaved = await user.save();

            return res.json({
                status: 200,
                access_token: userSaved,
            })
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.body;
            if (!refreshToken) {
                throw createError.BadRequest();
            }

            const {userId, role} = verifyRefreshToken(refreshToken);
            const accessToken = signAccessToken({ user_id: userId, role: role, status: status });
            const refToken = signRefreshToken({ user_id: userId });

            res.json({
                access_token: accessToken,
                refresh_token: refToken,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const { error } = userValidation(req.body);
            if ( error ) {
                throw createError(error.details[0].message);
            }
            
            const user = await User.findOne({email}).exec();
            if (!user) {
                throw createError.NotFound('User not registed.');
            }

            if (user.status != userStatus.active) {
                return next(createError[401]('Account status is invalid !!!'))
            }
    
            const isValid = await user.isCheckPassword(password);
            if (!isValid) {
                throw createError.Unauthorized();
            }
    
            const token = await signAccessToken({
                user_id: user._id,
                role: user.role,
            })

            return res.send({
                access_token: token
            });
        } catch (error) {
           next(createError(error)); 
        }
    }

    logout(req, res, next) {
        console.log(req);
    }

    changePassword(req, res, next) {
        console.log(req);
    }

    forgetPassword(req, res, next) {
        console.log(req);
    }

    updateProfile(req, res, next) {
        console.log(req);
    }
}

module.exports =  new AuthController();
