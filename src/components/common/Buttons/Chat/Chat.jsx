import React from 'react';
import styles from './Chat.module.scss';

const Chat = () => {
    return (
        <div className={`${styles.chatBtn} d-flex-all-center c-pointer`} >
            <span className="material-icons-outlined">
                question_answer
            </span>
        </div>
    )
}

export default Chat;