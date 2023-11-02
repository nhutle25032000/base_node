const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const userRole = require('../enum/userRole');
require('dotenv').config();

const signAccessToken = async (params) => {
    return new Promise((resolve, reject) => {
        const payload = {
            user_id: params.user_id,
            role: params.role,
        }
        const secret = process.env.SECRET_TOKEN;
        const option = {
            expiresIn: '1h'
        }

        JWT.sign(payload, secret, option, function(err, token) {
            if (err) {
                reject(err);
            }

            resolve(token)
        })
    })
}

const signRefreshToken = async (params) => {
    return new Promise((resolve, reject) => {
        const payload = {
            user_id: params.user_id
        }
        const secret = process.env.REFRESH_TOKEN;
        const option = {
            expiresIn: '1y'
        }

        JWT.sign(payload, secret, option, function(err, token) {
            if (err) {
                reject(err);
            }

            resolve(token)
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized());
    }

    const authHeader = req.headers['authorization'];
    const bearToken = authHeader.split(' ');
    const token = bearToken[1];

    JWT.verify(token, process.env.SECRET_TOKEN, (err, payload) => {
        if (err) {
            if (err.name == 'JsonWebTokenError') {
                return next(createError.Unauthorized());
            }

            return next(createError.Unauthorized(err));
        }

        req.payload = payload
        next();
    });

}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
            if (err) reject(err);

            resolve(payload);
        })
    })
}

const checkBloggerRole = async (req, res, next) => {
    if (req.payload.role = userRole.blogger) {
        return next();
    }

    return next(createError.Unauthorized());
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    verifyRefreshToken,
    signRefreshToken,
    checkBloggerRole,
}
