import React, { useEffect, useState } from 'react'
import Contact from './Contact'
import './ContactList.scss'
import { useGlobalState } from '../store'
import axios from '../utils/axios'
const ContactList = () => {
    const [contactDataList, setContactDataList] = useGlobalState('contactDataList')
    return (
        <div className='contact-list-container'>
            {contactDataList &&
                contactDataList.map((contactData, index) => {
                    return (
                        <Contact key={index} contactData={contactData} />
                    )
                })
            }
        </div>
    )
}

export default ContactList