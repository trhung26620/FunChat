import express from 'express';
import authenController from '../controller/authenController'
import verifyToken from '../middleware/auth-jwt';

const router = express.Router();

const authenAPI = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get('/find-friend', verifyToken, authenController.findFriendByUserId)
    app.use('/', router);
};
export default authenAPI;