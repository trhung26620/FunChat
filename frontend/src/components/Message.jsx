import React, { useState } from 'react'
import './Message.scss'

const Message = ({ messageData }) => {
    return (
        <div className={`message-container ${messageData.owner ? 'owner-bg' : ''}`} >
            {!messageData.owner &&
                <p className="sender-name">{messageData.name}</p>
            }
            <p className="message-content">{messageData.content}</p>
            <p className="send-time">{messageData.time}</p>
        </div>
    )
}
export default Message