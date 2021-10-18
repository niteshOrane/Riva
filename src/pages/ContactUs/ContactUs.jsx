import React from 'react'
import styles from './contact.module.scss'
import ContactUsForm from '../../components/pages/ContactUs/ContactUsForm'
import CustomerService from '../../components/pages/ContactUs/CustomerService'

function ContactUs() {
    return (
        <div className={styles.wrap}>
            <h2 className={styles.title}>CONTACT INFORMATION</h2>
            <ContactUsForm />
        </div>
    )
}

export default ContactUs
