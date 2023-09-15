import React, { useState } from 'react';
import './FindFriendModal.scss'
import { useGlobalState } from '../../store';
import axios from '../../utils/axios';
import { getCurrentUserId } from '../../utils/fetch-local-storage'

const FindFriendModal = () => {
    const [modal, setModal] = useGlobalState('addFriendModal')
    const [friendId, setFriendId] = useState('')
    const [friendData, setFriendData] = useState({});
    const [friendReqStatus, setFriendReqStatus] = useState('NOT-REQUEST')

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
                    setFriendReqStatus(data?.data?.friendReqStatus)
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
        setFriendReqStatus('NOT-REQUEST')
    }

    const handleAddFriend = async () => {
        if (friendData && friendData.id) {
            try {
                let currentUserId = getCurrentUserId()
                if (currentUserId === friendData.id) {
                    console.log('This is your ID');
                    return
                }
                const { status, data } = await axios.post('/add-friend', { friendId: friendData.id })
                if (status === 200 && data?.errCode === 0) {
                    setFriendReqStatus('PENDING')
                } else {
                    console.log(data?.errMessage)
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('Something went wrong')
        }
    }

    const handleRejectFriendRequest = async () => {
        if (friendData && friendData.id) {
            try {
                const { status, data } = await axios.post('/reject-friend', { friendId: friendData.id })
                if (status === 200 && data?.errCode === 0) {
                    console.log('Reject successfully')
                    setFriendReqStatus('REJECTED')
                } else {
                    console.log(data?.errMessage)
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('Something went wrong')
        }
    }

    const handleApproveFriendRequest = async () => {
        if (friendData && friendData.id) {
            try {
                const { status, data } = await axios.post('/approve-friend', { friendId: friendData.id })
                if (status === 200 && data?.errCode === 0) {
                    console.log('Approve successfully')
                    setFriendReqStatus('APPROVED')
                    window.location.reload()
                } else {
                    console.log(data?.errMessage)
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('Something went wrong')
        }
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
                            {friendReqStatus === 'PENDING'
                                ?
                                <button className="add-btn">
                                    Requested
                                </button>
                                :
                                friendReqStatus === 'REJECTED' || friendReqStatus === 'NOT-REQUEST'
                                    ?
                                    <button className="add-btn" onClick={() => handleAddFriend()}>
                                        Add
                                    </button>
                                    :
                                    friendReqStatus === 'WAIT-FOR-APPROVE'
                                        ? <>
                                            <button className="add-btn" onClick={() => { handleApproveFriendRequest() }}>
                                                Approve
                                            </button>
                                            <button className="add-btn" onClick={() => { handleRejectFriendRequest() }}>
                                                Reject
                                            </button>
                                        </>
                                        :
                                        ''
                            }

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