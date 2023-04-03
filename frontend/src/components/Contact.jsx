import React from 'react'
import './Contact.scss'

const Contact = () => {
    return (
        <div>
            <div className='contact-container'>
                <div className='avt-container'>
                    <img src='https://i.pinimg.com/736x/76/07/5c/76075c11bfe509ee9a11d9baa991c40d.jpg' className='avt-img'></img>
                </div>
                <div className='content-contact-container'>
                    <div className='header-contact'>
                        <p className="friend-name">Chi Huynh</p>
                        <p className="last-message-time">
                            3/8/2023
                        </p>
                    </div>
                    <div className='body-contact'>
                        <p className="last-message-content">
                            kì vậy =)) oke a để hồm nào e chỉnh tóc tai đi làm 1 tấm lịch sự
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact