require('dotenv').config();
import nodemailer from 'nodemailer';
import { encode } from 'html-entities';

let sendOTPViaEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"FunChat" <${process.env.EMAIL_APP}>`, // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "OTP to verify the account registration", // Subject line
        // html: getBodyHTMLEmail(dataSend),
        html: getBodyHTMLEmail(dataSend)
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let { username, otp } = dataSend
    username = encode(username);
    let result =
            `
        <h3>Dear ${username}</h3>
        <p>You received this email because you have registered an account on FunChat</p>
        <p>Please enter the following OTP to confirm your email and complete the registration procedure</p>
        <p>Your OTP: <b>${otp}</b></p>
        <p>OTP expiration time is <b>2 minutes</b></p>

        <div>Sincerely thank!</div>
        `
    return result
}

module.exports = {
    sendOTPViaEmail: sendOTPViaEmail,
}