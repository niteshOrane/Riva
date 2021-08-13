import React from 'react';
import styles from './Chat.module.scss';

const Chat = () => {
    return (
        <div className={`${styles.chatBtn} d-flex-all-center c-pointer`} >
          <img src="/assets/images/footerChat.png" alt = "/" />
        </div>
    )
}

export default Chat;