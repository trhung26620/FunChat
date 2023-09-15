import React, { useState } from 'react';
import './UploadAvatarModal.scss'
import { useGlobalState } from '../../store';
import axios from '../../utils/axios';

const UploadAvatarForm = () => {
    const [modal, setModal] = useGlobalState('uploadAvatarModal')
    const [user, setUser] = useGlobalState('currentUser')
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    }
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);
        try {
            const { status, data } = await axios.post('/update-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (status === 200 && data.errCode === 0) {
                setUser({ ...user, avatarUrl: data.data.avatarUrl })
                setModal('close-modal')
            } else {
                alert(data.errMessage)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleCloseModal = () => {
        setModal('close-modal')
        setSelectedFile(null)
    }

    return (
        <div className={`update-avatar-modal-container ${modal}`}>
            <div className="modal-wrapper slide-down">
                <div className="header-modal-container">
                    <p className='modal-title'>Update Your avatar</p>
                    <div className="close-btn-container" onClick={() => handleCloseModal()}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                    </div>
                </div>
                <div className="body-modal-container">
                    <div className="preview-img-container">
                        {selectedFile
                            ?
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected file preview"
                            />
                            :
                            <img src={user.avatarUrl} alt="" />
                        }
                    </div>
                </div>
                <div className="footer-container">
                    <div className="button-container">
                        <button className="upload-btn">
                            <label className='lable-upload' htmlFor='previewImg'>Upload</label>
                        </button>
                        <button className="save-btn" onClick={() => handleSubmit()}>
                            Save
                        </button>
                    </div>
                    <input type='file' id='previewImg' hidden
                        onChange={(event) => handleFileSelect(event)}
                    />
                </div>
            </div>
        </div>
    )
}

export default UploadAvatarForm