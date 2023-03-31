import React, { useState } from 'react'
import './Registration.scss'
import OTPVerification from '../components/OTPVerification'
import axios from '../utils/axios'

const Registration = () => {
    let [verifyOTP, setVerifyOTP] = useState(false)
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')
    let [email, setEmail] = useState('')
    const handleClickSignin = () => {
        document.location.href = '/sign-in'
    }
    const handleSignUp = async () => {
        const { data } = await axios.post('/registration', {
            username: userName,
            password: password,
            email: email
        })
        if (data?.errCode === 0) {
            setVerifyOTP(true)
        }
    }
    return (
        <>
            <div className='registration-container'>
                <div className="user">
                    <header className="user__header">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                        <h1 className="user__title">Sign-up and play FunChat together...!</h1>
                    </header>

                    <form className="form">
                        <div className="form__group">
                            <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Username" className="form__input" />
                        </div>

                        <div className="form__group">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="form__input" />
                        </div>

                        <div className="form__group">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="form__input" />
                        </div>

                        <button className="btn btn-register" type="button" onClick={() => handleSignUp()}>Register</button>
                        <button type="button" className="btn-signup" onClick={() => handleClickSignin()}>Back to Sign Up</button>
                        {/* <button className="btn btn-login" type="button">Login</button> */}
                    </form>
                </div>
            </div>
            {verifyOTP &&
                <div className='otp-container'>
                    <OTPVerification setVerifyOTP={setVerifyOTP} email={email} />
                </div>
            }

        </>
    )
}

export default Registration