const createError = require('http-errors');
const { userValidation } = require('../helper/validation');
const User = require('../models/user');

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body;
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

            const user = new User({
                email,
                password
            });

            const userSaved = await user.save();

            return res.json({
                status: 200,
                access_token: userSaved,
            })
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
    
            const isValid = await user.isCheckPassword(password);
            if (!isValid) {
                throw createError.Unauthorized();
            }
    
            return res.send(user);
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
