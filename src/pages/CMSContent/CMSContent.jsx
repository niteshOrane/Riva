import React, { useEffect } from 'react';
import useCMSContent from './useCMSContent';

const CMSContent = (props) => {
    const identifier = props.match.params.identifier;
    const { content } = useCMSContent({
        identifier
    });

    return (
        <div className="mx-75px my-20px" dangerouslySetInnerHTML={{ __html: content }} />
    );
}

export default CMSContent;