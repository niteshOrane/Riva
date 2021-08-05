import React from 'react';

const ArrowButton = ({ direction, onClick }) => {
    return <span className="material-icons-outlined">
        {direction == 'forward' ? 'arrow_forward_ios' : 'arrow_back_ios'}
    </span>;
}

export default ArrowButton;