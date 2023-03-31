import express from 'express';
import unauthenController from '../controller/unauthenController'


const router = express.Router();

const unauthenAPI = (app, io) => {
    router.post('/registration', unauthenController.registerAccount)
    router.post('/login', unauthenController.loginAccount)
    router.post('/OTPVerification', unauthenController.verifyOTP)
    router.post('/resendOTP', unauthenController.resendOTP)
    app.use('/', router);
};
export default unauthenAPI;