import React from 'react';
import ProductGoWithCard from '../../../common/Cards/ProductGoWithCard/ProductGoWithCard';
import SectionHeader from '../../../common/SectionHeader/SectionHeader';
import styles from './howToWearThis.module.scss';

const HowToWearThis = (props) => {
    return <div className={styles.howToWearThis}>
        <div className={styles.sectionHeaderContainer}>
            <SectionHeader roboto="How to" dancing="Wear It" />
        </div>
        <div className={styles.cards}>
            {
                props.cards.map((card) => {
                    return <ProductGoWithCard src={card.src} />;
                })
            }
        </div>
    </div>
}

export default HowToWearThis;