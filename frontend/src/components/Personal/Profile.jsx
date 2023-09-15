import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { useGlobalState } from '../../store'

function Profile() {
    const [modal, setModal] = useGlobalState('profileModal');
    const [copied, setCopied] = useState(false);
    const [userId, setUserId] = useState("#642927608bc2f40263a0066d");
    const [user, setUser] = useGlobalState('currentUser')
    const handleCopyClick = () => {
        navigator.clipboard.writeText(userId);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }
    useEffect(() => {
        setUserId('#' + user.id)
    }, [user])
    return (
        <div className={`profile-container global-modal-container ${modal}`}>
            <div className="profile-wrapper">
                <div className="header-profile-container">
                    <div className="avt-container">
                        <img src={user.avatarUrl} alt="" className="my-avt-img" />
                    </div>
                    <div className="name-container">
                        <p>{user.name}</p>
                    </div>
                    <div className="close-btn-container" onClick={() => setModal('close-modal')}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                    </div>
                </div>
                {/* <hr /> */}
                <div className="body-container">
                    <div className="id-info-container" onClick={() => handleCopyClick()}>
                        <p className="id-info">{userId}</p>
                    </div>
                    {copied && <span className="copied-text">Copied!</span>}
                </div>
            </div>
        </div>
    )
}

export default Profile