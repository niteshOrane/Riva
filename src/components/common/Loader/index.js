import React from 'react';

import './loader.css';

function Loader({ isLanding = false }) {
  return (
    <>
      {!isLanding ? <div className="loading">Loading&#8230;</div > :
        <div className="loadingLanding">
          <p>Please wait</p>
          <span>
            <i />
            <i />
            <i />
          </span>
        </div>
      }</>
  );
}

export default Loader;
