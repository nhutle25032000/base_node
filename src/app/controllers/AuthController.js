class AuthController {
    login(req, res, next) {
        console.log(req);
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
