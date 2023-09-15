import express from 'express';
import authenController from '../controller/authenController'
import verifyToken from '../middleware/auth-jwt';
const multer = require('multer')
const upload = multer({ dest: 'src/public/image/' })

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
    router.post('/add-friend', verifyToken, authenController.addFriendByUserId)
    router.post('/reject-friend', verifyToken, authenController.rejectFriendByUserId)
    router.post('/approve-friend', verifyToken, authenController.approveFriendByUserId)
    router.get('/get-current-user', verifyToken, authenController.getCurrentUser)
    router.get('/get-contact-list-data', verifyToken, authenController.getContractListData)
    router.get('/logout', verifyToken, authenController.logoutAccount)
    router.post('/update-avatar', [verifyToken, upload.single('image')], authenController.updateAvatar)
    router.post('/send-message', [verifyToken], authenController.sendMessage)
    router.get('/get-message-conversation/:id', [verifyToken], authenController.getMessageByConversationId)
    app.use('/', router);
};
export default authenAPI;