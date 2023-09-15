import React, { useState, useEffect, useRef } from 'react'
import Message from './Message'
import './Conversation.scss'
import axios from '../utils/axios'
import { useGlobalState } from '../store'

const Conversation = ({ conversationId, avatarUrl, messagesContainerRef }) => {
    const [messageDataList, setMessageDataList] = useState([]);
    const [conversationMessages, setConversationMessages] = useGlobalState('conversationMessages')

    const loadMessage = async () => {
        try {
            const { status, data } = await axios.get(`/get-message-conversation/${conversationId}`)
            if (status === 200 && data?.errCode === 0) {
                setMessageDataList(data.data)
                conversationMessages[conversationId] = data.data
                setConversationMessages(conversationMessages)
            } else {
                console.log(data?.errMessage)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setMessageDataList([])
        if (conversationId in conversationMessages) {
            setMessageDataList(conversationMessages[conversationId])
        } else {
            loadMessage()
        }
    }, [conversationId])

    useEffect(() => {
        if (conversationId in conversationMessages) {
            setMessageDataList(conversationMessages[conversationId])
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [conversationMessages])


    useEffect(() => {
        // console.log('Debugggg')
        if (messageDataList.length > 0) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messageDataList]);


    return (
        <div className='conversation-container'>
            {messageDataList && messageDataList.length > 0
                &&
                messageDataList.map((messageData, index) => {
                    return (
                        <div key={index} className={`message-wrapper ${messageData.owner ? 'message-owner' : ''}`}>
                            {!messageData.owner &&
                                <div className="avt-container">
                                    <img src={avatarUrl} alt="" className="avt-img" />
                                </div>
                            }
                            <Message messageData={messageData} />
                        </div>
                    )
                    // }
                })
            }
            {/* {!lastMessage && <h3 className='empty-conversation'>Empty Conversation</h3>} */}
            {/* {messageDataList.length === 0 && <h3 className='empty-conversation'>Empty Conversation</h3>} */}
        </div>
    )
}

export default Conversation