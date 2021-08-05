import React from 'react';
import styles from './sectionHeader.module.scss';

const SectionHeader = ({ roboto, dancing }) => {
    return (
        <div className={`${styles.backgroundImage} ${styles.sectionHeader}`}>
            <span className={styles.textStyleRoboto}>{roboto}</span>&nbsp;
            <span className={styles.textStyleDancing}>{dancing}</span>
        </div>
    )
}

export default SectionHeader;