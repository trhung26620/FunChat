import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './FindFriendModal.scss'
import { useGlobalState } from '../../store';
import axios from '../../utils/axios';
import { getCurrentUserId } from '../../utils/fetch-local-storage'

const FindFriendModal = () => {
    const [modal, setModal] = useGlobalState('addFriendModal')
    const [friendId, setFriendId] = useState('')
    const [friendData, setFriendData] = useState({});

    const handleFindFriend = async () => {
        if (friendId) {
            try {
                let friendIdTemp = friendId;
                friendIdTemp = friendIdTemp.replace('#', '')
                let currentUserId = getCurrentUserId()
                if (currentUserId === friendIdTemp) {
                    console.log('This is your ID');
                    return
                }
                const { status, data } = await axios.get(`/find-friend?friendId=${friendIdTemp}`)
                if (status === 200 && data?.errCode === 0) {
                    setFriendData(data?.data)
                } else {
                    console.log(data?.errMessage)
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            setFriendData({})
            console.log('Please input friend id')
        }
    }

    const handleCloseModal = () => {
        setFriendId('')
        setFriendData({})
        setModal('close-modal')
    }
    return (
        <div className={`find-friend-modal-container ${modal}`}>
            <div className="modal-wrapper slide-down">
                <div className="header-modal-container">
                    <p className='modal-title'>Find Your Friend</p>
                    <div className="close-btn-container" onClick={() => handleCloseModal()}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                    </div>
                </div>
                <div className="body-modal-container">
                    <div className="id-friend-input-container">
                        <input value={friendId}
                            onChange={(e) => setFriendId(e.target.value)}
                            type="text" className='friend-id-input' placeholder='Friend ID' />
                    </div>
                    {friendData && friendData.name &&
                        <div className="friend-result-container">
                            <div className="avt-friend-container">
                                <img src={friendData.avatarUrl} alt="" className="avt-friend" />
                            </div>
                            <div className="friend-name-container">
                                <span className='friend-name'>{friendData.name}</span>
                            </div>
                            <button className="add-btn">
                                Add
                            </button>
                        </div>
                    }
                </div>
                <div className="footer-container">
                    <button className="find-btn" onClick={() => handleFindFriend()}>
                        Find
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FindFriendModal