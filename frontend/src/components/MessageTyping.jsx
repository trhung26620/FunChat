import React, { useEffect, useState } from 'react'
import './MessageTyping.scss'
import { useGlobalState } from '../store';
import axios from '../utils/axios'

const MessageTyping = () => {
    const [messageText, setMessageText] = useState('');
    const [selectedConservation, setSelectedConservation] = useGlobalState('selectedConservation')
    const [conversationMessages, setConversationMessages] = useGlobalState('conversationMessages')
    const handleEnterKey = async (e) => {
        if (e.key === 'Enter') {
            if(messageText && selectedConservation?.conversationId){
                try {
                    let conversationId = selectedConservation.conversationId
                    let tempMessage = messageText
                    setMessageText('')
                    const { status, data } = await axios.post('/send-message',{
                        conversationId: conversationId,
                        message: tempMessage
                    })
                    if (status === 200 && data?.errCode === 0) {
                        let conversationMessagesTemp = {...conversationMessages}
                        conversationMessagesTemp[conversationId].push({
                            name: selectedConservation.name,
                            ...data.data,
                            owner: true
                        })

                        setConversationMessages(conversationMessagesTemp)
                    }
                    else {
                        alert(data.errMessage)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <div className='message-typing-container'>
            <div className="left-typing-container">
                <div className="additional-options-container">
                    <div className="icon-symbol-container">
                        <svg height="20px" viewBox="0 0 38 38" width="20px"><g fill="#d4af7a" fillRule="evenodd"><g transform="translate(-893.000000, -701.000000)"><g transform="translate(709.000000, 314.000000)"><g><path d="M210.5,405 C209.121,405 208,403.879 208,402.5 C208,401.121 209.121,400 210.5,400 C211.879,400 213,401.121 213,402.5 C213,403.879 211.879,405 210.5,405 M212.572,411.549 C210.428,413.742 206.938,415 203,415 C199.062,415 195.572,413.742 193.428,411.549 C192.849,410.956 192.859,410.007 193.451,409.428 C194.045,408.85 194.993,408.859 195.572,409.451 C197.133,411.047 199.909,412 203,412 C206.091,412 208.867,411.047 210.428,409.451 C211.007,408.859 211.956,408.85 212.549,409.428 C213.141,410.007 213.151,410.956 212.572,411.549 M195.5,400 C196.879,400 198,401.121 198,402.5 C198,403.879 196.879,405 195.5,405 C194.121,405 193,403.879 193,402.5 C193,401.121 194.121,400 195.5,400 M203,387 C192.523,387 184,395.523 184,406 C184,416.477 192.523,425 203,425 C213.477,425 222,416.477 222,406 C222,395.523 213.477,387 203,387"></path></g></g></g></g></svg>
                    </div>
                    <div className="file-attachment-symbol-container">
                        <svg className="x1lliihq x1k90msu x13hzchw x1qfuztq" height="20px" viewBox="0 -1 17 17" width="20px"><g fill="none" fillRule="evenodd"><path d="M2.882 13.13C3.476 4.743 3.773.48 3.773.348L2.195.516c-.7.1-1.478.647-1.478 1.647l1.092 11.419c0 .5.2.9.4 1.3.4.2.7.4.9.4h.4c-.6-.6-.727-.951-.627-2.151z" fill="#d4af7a"></path><circle cx="8.5" cy="4.5" fill="#d4af7a" r="1.5"></circle><path d="M14 6.2c-.2-.2-.6-.3-.8-.1l-2.8 2.4c-.2.1-.2.4 0 .6l.6.7c.2.2.2.6-.1.8-.1.1-.2.1-.4.1s-.3-.1-.4-.2L8.3 8.3c-.2-.2-.6-.3-.8-.1l-2.6 2-.4 3.1c0 .5.2 1.6.7 1.7l8.8.6c.2 0 .5 0 .7-.2.2-.2.5-.7.6-.9l.6-5.9L14 6.2z" fill="#d4af7a"></path><path d="M13.9 15.5l-8.2-.7c-.7-.1-1.3-.8-1.3-1.6l1-11.4C5.5 1 6.2.5 7 .5l8.2.7c.8.1 1.3.8 1.3 1.6l-1 11.4c-.1.8-.8 1.4-1.6 1.3z" stroke="#d4af7a" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>                    </div>
                </div>
                <div className="typing-container">
                    <input value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyDown={(e) => handleEnterKey(e)} className='typing-input' type="text" placeholder='Type a message...' />

                </div>
            </div>
            <div className="right-typing-container">
                <div className="micro-symbol-container">
                    <svg height="30px" viewBox="0 0 34 48" width="30px"><path d="M17 37v9" fill="#d4af7a" stroke="#d4af7a" strokeLinejoin="round" strokeWidth="4"></path><path d="M10 46h14" fill="none" stroke="#d4af7a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4px"></path><path d="M39 20v3.5A14.5 14.5 0 0124.5 38h-1A14.5 14.5 0 019 23.5V20" fill="none" stroke="#d4af7a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4px" transform="translate(-7)"></path><rect fill="#d4af7a" height="28" rx="6.5" stroke="#d4af7a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" width="14" x="10" y="2"></rect>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default MessageTyping