import React from 'react';
import useCMSContent from './useCMSContent';
import './CMSContent.css';

const CMSContent = ({ match }) => {
  const { identifier } = match.params;
  const { content } = useCMSContent({
    identifier,
  });
  return (
    <div
      className="mx-75px my-20px"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default CMSContent;
