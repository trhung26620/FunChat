import express from 'express';
import unauthenController from '../controller/unauthenController'


const router = express.Router();

const unauthenAPI = (app) => {
    router.post('/registration', unauthenController.registerAccount)
    router.post('/login', unauthenController.loginAccount)
    router.post('/OTPVerification', unauthenController.verifyOTP)
    router.post('/resendOTP', unauthenController.resendOTP)
    router.get('/test', unauthenController.test)
    app.use('/', router);
};
export default unauthenAPI;