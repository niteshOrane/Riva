import React from 'react'
import * as icons from '../../../common/Icons/Icons';
const closeStyle = {
    right: '3px',
    top: '3px'
}
const cardStyle = {
    position: "relative",
    flexBasis: "33.33%",
}
function Card({src, name, priceWas, priceIs}) {
    return (
        <div style={cardStyle}>
            <button type="button" style={closeStyle} className="closeBtn no-border bg-transparent position-absolute">
            <icons.Close />
                </button>
            <div>
            <img src={src} width="100%"/>
            </div>
            <div>
                <p className="font-size-600">{name}</p>
            </div>
            <div className="d-flex align-items-center gap-12">
                <s className="color-grey">was ${priceWas}</s>&nbsp; &nbsp;<span>Now ${priceIs}</span>
            </div>
        </div>
    )
}

export default Card
