import React, { useState } from 'react';
import styles from './additionalProductDetails.module.scss';

const AdditionalProductDetails = ({ sections }) => {
    const defaultSectionName = Object.keys(sections)[0];
    const [selectedSection, setSelectedSection] = useState(defaultSectionName);

    return <div className={`${styles.additionalDetails} gap-12`}>
        <div className={styles.chooseSectionContainer}>
            {
                Object.keys(sections).map((sectionName) => {
                    return <div
                        className={`${styles.section} ${sectionName == selectedSection ? styles.selected : ''}`}
                        onClick={() => {setSelectedSection(sectionName)}}
                    >
                        {sectionName}
                    </div>
                })
            }
        </div>
        <div className={styles.sectionContainer}>
            {
                sections[selectedSection].map((line) => {
                    return <div className={`${styles.row} d-flex`}>
                        {line.title ? <div className={styles.title}>{line.title}:&nbsp;</div> : ""}
                        {line.text ? <div>{line.text}</div> : ""}
                    </div>
                })
            }
        </div>
    </div>
}

export default AdditionalProductDetails;