import React, { useState, useRef, useEffect } from 'react'
import './OTPVerification.scss'
import axios from '../utils/axios'

const OTPVerification = ({ setVerifyOTP, email }) => {
    const [otpArray, setOtpArray] = useState(Array(6).fill(''));
    const inputsRef = useRef([]);
    const [slideDown, setSlideDown] = useState(true)
    const [timeCounter, setTimeCounter] = useState('2:00');

    const handleOnchangeOTP = (e, index) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        let currentOtpArr = [...otpArray]
        currentOtpArr[index] = e.target.value;
        setOtpArray(currentOtpArr)
        if (e.target.value && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !otpArray[index]) {
            // Move focus to previous input field when user presses backspace on empty input field
            if (index > 0) {
                inputsRef.current[index - 1].focus();
            }
        }
    };

    const handleCloseModal = () => {
        // setSlideDown(false)
        setVerifyOTP(false)
    }

    useEffect(() => {
        let interval = setInterval(() => {
            const [minutes, seconds] = timeCounter.split(':').map((str) => parseInt(str));
            let newTime = '';
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                    newTime = '0:00';
                } else {
                    newTime = `${minutes - 1}:59`
                }
            } else {
                newTime = `${minutes}:${seconds - 1 < 10 ? '0' : ''}${seconds - 1}`;
            }
            setTimeCounter(newTime);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeCounter]);


    useEffect(() => {

    }, [])
    const handleResendOTP = async () => {
        if (timeCounter === '0:00') {
            try {
                const { status, data } = await axios.post('/resendOTP', {
                    email: email
                })
                if (status === 200 && data?.errCode === 0) {
                    setTimeCounter('2:00')
                    setOtpArray(Array(6).fill(''))
                } else {
                    console.log('Something went wrong!')
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('Please wait unitl OTP timeout')
        }
    }

    const handleVerifyOTP = async () => {
        if (timeCounter === '0:00') {
            console.log('OTP expired')
            return
        }
        let currentOtpArr = [...otpArray]
        let otpStr = '';
        currentOtpArr.forEach((val) => {
            if (val) {
                otpStr += val
            }
        })
        if (otpStr.length === 6 && email) {
            try {
                const { data } = await axios.post('/OTPVerification', {
                    email: email,
                    code: otpStr,
                })
                if (data?.errCode === 0) {
                    window.location.href = '/sign-in'
                    setVerifyOTP(false)
                } else {
                    console.log(data.errMessage)
                }
            } catch (error) {
                console.error(error)
            }

        } else {
            console.log('Invalid OTP')
        }
    }
    return (
        <div className='OTPVerification-container'>
            <div className={`container ${slideDown ? 'slide-down' : 'slide-up'}`}>
                <button type="button" className="close-modal-btn" onClick={() => handleCloseModal()}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
                    </path>
                    </svg>
                </button>
                <div className="row justify-content-md-center">
                    <div className="col-md-4 text-center">
                        <div className="row">
                            <div className="col-sm-12 mt-5 bgWhite">
                                <div className="title verify-btn">
                                    Verify OTP
                                </div>

                                <form action="" className="mt-5">
                                    {otpArray.map((otp, index) => {

                                        return (
                                            <input value={otp} key={index} className="otp" type="text"
                                                onChange={(e) => handleOnchangeOTP(e, index)}
                                                onKeyDown={(event) => handleKeyDown(event, index)}
                                                ref={(el) => inputsRef.current[index] = el}
                                                maxLength={1} />
                                        )
                                    })}
                                </form>
                                <hr className="mt-4" />
                                {timeCounter === '0:00'
                                    ?
                                    <button className='resend-btn btn btn-primary btn-block mt-4 mb-4 customBtn'
                                        onClick={() => handleResendOTP()}
                                    >Resend OTP</button>
                                    :
                                    <button className='verify-btn btn btn-primary btn-block mt-4 mb-4 customBtn'
                                        onClick={() => handleVerifyOTP()}>Verify</button>
                                }
                                <span className='count-down'>{timeCounter}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OTPVerification