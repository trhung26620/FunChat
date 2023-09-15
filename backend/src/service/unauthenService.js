const OTP = require('otp');
import handleError from '../config/errCode'
const User = require('../model/User')
import bcrypt from 'bcryptjs';
import { sendOTPViaEmail } from './emailService'
import jwt from 'jsonwebtoken'
require('dotenv').config()
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

const checkEmailIsExist = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                email: email
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const checkAccountIsOTPVerified = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                email: email
            })
            if (user) {
                if (user.otpVerification === true) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}


const registerAccount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.username && data.email && data.password) {
                let emailIsExist = await checkEmailIsExist(data.email)
                let emailIsVerify = await checkAccountIsOTPVerified(data.email)
                if (emailIsExist === true && emailIsVerify === false) {
                    await User.deleteOne({
                        email: data.email
                    })
                }
                emailIsExist = await checkEmailIsExist(data.email)
                if (emailIsExist === false && emailIsVerify === false) {
                    const otp = new OTP({ digits: 6 });
                    let code = otp.totp()
                    const currentTime = new Date();
                    let expiredTime = new Date()
                    expiredTime = expiredTime.setMinutes(currentTime.getMinutes() + 2);
                    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                    await User.create({
                        name: data.username,
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        friends: [],
                        conversations: [],
                        otp: {
                            code: code,
                            expiry: expiredTime
                        },
                        otpVerification: false
                    })
                    await sendOTPViaEmail({
                        receiverEmail: data.email,
                        otp: code,
                        username: data.username
                    })
                    resolve(handleError(0))
                } else {
                    resolve(handleError(3))
                }

            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const verifyOTP = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.email && data.code) {
                let user = await User.findOne({ email: data.email })
                if (user && user.otpVerification === false) {
                    let otpExpire = user.otp.expiry
                    let otpCode = user.otp.code
                    let currentTime = new Date()
                    if (currentTime <= otpExpire && otpCode === data.code) {
                        user.otpVerification = true
                        await user.save()
                        resolve(handleError(0))
                    } else {
                        resolve(handleError(5))
                    }
                } else {
                    resolve(handleError(5))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const loginAccount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.email && data.password) {
                let user = await User.findOne({ email: data.email });
                if (user && user.otpVerification === true) {
                    const check = await bcrypt.compareSync(data.password, user.password);
                    if (check) {
                        let token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                            expiresIn: 86400 // 24 hours
                        });
                        user.session = token;
                        await user.save();
                        resolve({
                            ...handleError(0),
                            data: {
                                id: user.id,
                                token: token,
                                name: user.name,
                                avatarUrl: user.avatarUrl,
                                email: user.email,
                            }
                        })
                    } else {
                        resolve(handleError(4))
                    }
                } else {
                    resolve(handleError(4))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const resendOTP = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.email) {
                let user = await User.findOne({ email: data.email })
                let currentTime = Date.now()
                if (user && user?.otpVerification === false && user?.otp?.expiry < currentTime) {
                    const otp = new OTP({ digits: 6 });
                    let code = otp.totp()
                    const currentTime = new Date();
                    let expiredTime = new Date()
                    expiredTime = expiredTime.setMinutes(currentTime.getMinutes() + 2);
                    user.otp.code = code
                    user.otp.expiry = expiredTime
                    await user.save()
                    await sendOTPViaEmail({
                        receiverEmail: user.email,
                        otp: code,
                        username: user.name
                    })
                    resolve(handleError(0))
                } else {
                    resolve(handleError(6))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = { registerAccount, loginAccount, verifyOTP, resendOTP }