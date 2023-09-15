import React, { useEffect, useState } from 'react'
import './Contact.scss'
import { shortenString, formatDate } from '../utils/string-handle'
import { getCurrentUserId } from '../utils/fetch-local-storage'
import { setGlobalState } from '../store'

const Contact = ({ contactData }) => {
    const [currentUserId, setCurrentUserId] = useState('')
    useEffect(() => {
        let id = getCurrentUserId()
        setCurrentUserId(id)
    }, [])

    const handleOnclickConservation = () => {
        setGlobalState('selectedConservation', contactData)
    }

    return (
        <div>
            <div onClick={() => handleOnclickConservation()} className='contact-container'>
                <div className='avt-container'>
                    <img src={contactData.avatarUrl} className='avt-img'></img>
                </div>
                <div className='content-contact-container'>
                    <div className='header-contact'>
                        <p className="friend-name">{contactData.name}</p>
                        <p className="last-message-time">
                            {formatDate(contactData.lastMessTime)}
                        </p>
                    </div>
                    <div className='body-contact'>
                        <p className="last-message-content">
                            {currentUserId && currentUserId === contactData.from ? <b>You: </b> : ''}
                            {shortenString(contactData.lastMessage, 90)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact