import React, { useState } from 'react'
import './Login.scss'
import axios from '../utils/axios'

const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    const handleClickSignUp = () => {
        window.location.href = '/sign-up'
    }
    const handleLogin = async () => {
        if (email && password) {
            try {
                let { status, data } = await axios.post('/login', {
                    email: email,
                    password: password
                })
                console.log("🚀 ~ file: Login.jsx:18 ~ handleLogin ~ status, data:", status, data)
                if (status === 200 && data.errCode === 0) {
                    if (data && data.data) {
                        localStorage.setItem('user', JSON.stringify(data.data))
                        window.location.href = '/home'
                    }
                } else if (data?.errCode === 4) {
                    console.log(data.errMessage)
                }
            } catch (error) {
                console.error(error)
            }

        } else {
            console.log('Missing email or password')
        }
    }
    return (
        <div className='login-container'>
            {/* <p className="tip">Click on button in image container</p> */}
            <div className="cont">
                <div className="form sign-in">
                    <h2>Welcome back to FunChat,</h2>
                    <label>
                        <span>Email</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <p className="forgot-pass">Forgot password?</p>
                    <button type="button" className="submit" onClick={() => handleLogin()}>Sign In</button>
                    <button type="button" className="signup" onClick={() => handleClickSignUp()}>SIGN UP</button>
                </div>
            </div>

        </div>
    )
}

export default Login