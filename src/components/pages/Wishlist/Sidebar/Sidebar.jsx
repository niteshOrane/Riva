import React from 'react'
import styles from './Sidebar.module.scss';
import * as icons from '../../../common/Icons/Icons';
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <h2>My Account</h2>
                <button>Join VIP Membership</button>
            </div>
            <div className={styles.sidebarBody}>
                <div className="d-flex align-items-center" id={styles.sec}>
                    <icons.Heart />
                    <p className={styles.title}>My Wishlist</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
