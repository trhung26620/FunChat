import React, { useEffect, useRef, useState } from 'react'
import ContactList from '../components/ContactList'
import './Home.scss'
import Utility from '../components/Utility'
import ConversationHeader from '../components/ConversationHeader'
import MessageTyping from '../components/MessageTyping'
import Conversation from '../components/Conversation'
import FindFriendModal from '../components/Friends/FindFriendModal'
import Profile from '../components/Personal/Profile'
import axios from '../utils/axios';
import { useGlobalState, setGlobalState } from '../store'
import UploadAvatarModal from '../components/Setting/UploadAvatarModal'
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const messagesContainerRef = useRef(null);
    const [socket, setSocket] = useGlobalState('socket')
    const [currentUser, setCurrentUser] = useGlobalState('currentUser');
    const [selectedConservation, setSelectedConservation] = useGlobalState('selectedConservation')
    const [contactDataList, setContactDataList] = useGlobalState('contactDataList')
    const [finishFetchContact, setFinishFetchContact] = useState(false)
    const [conversationMessages, setConversationMessages] = useGlobalState('conversationMessages')
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const { status, data } = await axios.get(`/get-current-user`)
            if (status === 200 && data?.errCode === 0) {
                setCurrentUser(data?.data)
            } else {
                console.log(data?.errMessage)
            }

        } catch (error) {
            if(error?.response?.status === 401){
                navigate('/login');
            }else{
                console.log(error)
            }
        }
    }

    const getContactDataList = async () => {
        try {
            const { status, data } = await axios.get(`/get-contact-list-data`)
            if (status === 200 && data?.errCode === 0) {
                setContactDataList(data.data)
                setFinishFetchContact(true)
            } else {
                console.log(data?.errMessage)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchUserData()
        getContactDataList()
        // messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }, [])

    useEffect(() => {
        socket.emit('online', currentUser.id);
    }, [currentUser])

    useEffect(() => {
        socket.on("updateFriendOnline", (userId) => {
            console.log('checkkakaak123')
            const contactData = contactDataList.find(contactData => contactData.friendId === userId);
            if (contactData) {
                contactData.onlineStatus = true;
                setContactDataList([...contactDataList])
            }
        });

        socket.on("updateFriendOffline", ({ userId, lastTimeOnline }) => {
            const contactData = contactDataList.find(contactData => contactData.friendId === userId);
            if (contactData) {
                contactData.onlineStatus = lastTimeOnline;
                setContactDataList([...contactDataList])
            }
        });

    }, [finishFetchContact])
    return (
        <div className='home-container'>
            <div className="left-container">
                <div className="left-header-container">
                    <Utility />
                </div>
                <div className="left-body-container">
                    <ContactList />
                </div>
            </div>
            <div className="right-container">
                <div className="right-header-container">
                    {Object.keys(selectedConservation).length !== 0 &&
                        <ConversationHeader />

                    }
                </div>
                {/* <hr /> */}
                <div className="right-body-container" ref={messagesContainerRef}>
                    {Object.keys(selectedConservation).length !== 0 ?
                        <>
                            <Conversation
                                conversationId={selectedConservation.conversationId}
                                avatarUrl={selectedConservation.avatarUrl}
                                messagesContainerRef={messagesContainerRef}
                            />
                        </>
                        :
                        <span className='no-conversation-selected'>No conversation selected</span>
                    }
                </div>
                <div className="right-bottom-container">
                    <MessageTyping />
                </div>
            </div>
            <FindFriendModal />
            <Profile />
            <UploadAvatarModal />
        </div >
    )
}

export default Home