import React from 'react';
import styles from './productGoWithCard.module.scss';

const ProductGoWithCard = ({ src }) => {
    return <div className={styles.card}>
        <img src={src} />
        <div className={`${styles.btn} d-flex`}>
            <div className={styles.name}><span>SHOP THIS LOOK</span></div>
            <div className={styles.icon}>
                <span class="material-icons-outlined">
                    east
                </span>
            </div>
        </div>
    </div>
}

export default ProductGoWithCard;