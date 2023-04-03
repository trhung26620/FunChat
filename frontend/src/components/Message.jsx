import React, { useState } from 'react'
import './Message.scss'

const Message = () => {
    const [messageData, setMessageData] = useState({
        name: 'Xuan Huy',
        content: 'Hi anh/chị. Em thấy có bài đăng về tuyển dụng blockchain devloper. nếu bên mình có cần vị trí intern thì mong anh/chị bỏ chút thời gian qua xem CV e xem có phù hợp không ạ, em cảm ơn',
        time: '13:48',
        owner: false
    });
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