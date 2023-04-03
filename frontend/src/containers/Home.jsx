import React from 'react'
import ContactList from '../components/ContactList'
import './Home.scss'
import Utility from '../components/Utility'
import ConversationHeader from '../components/ConversationHeader'
import MessageTyping from '../components/MessageTyping'
import Conversation from '../components/Conversation'
import FindFriendModal from '../components/Friends/FindFriendModal'
import Profile from '../components/Personal/Profile'
const Home = () => {
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
                    <ConversationHeader />
                </div>
                <hr />
                <div className="right-body-container">
                    <Conversation />
                </div>
                {/* <hr /> */}
                <div className="right-bottom-container">
                    <MessageTyping />
                </div>
            </div>
            <FindFriendModal />
            <Profile />
        </div >
    )
}

export default Home