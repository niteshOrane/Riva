import React from "react";
import Image from "../../../common/LazyImage/Image";
import * as icons from "../../../common/Icons/Icons";

const closeStyle = {
  right: "12px",
  top: "12px",
};
const cardStyle = {
  position: "relative",
  flexBasis: "30%",
};
function Card({ src, name, priceWas, priceIs, remove }) {
  return (
    <div style={cardStyle}>
      <button
        type="button"
        title="Remove"
        style={closeStyle}
        onClick={remove}
        className="closeBtn no-border bg-transparent position-absolute"
      >
        <icons.Close />
      </button>
      <div>
        <Image src={src} width="100%" />
      </div>
      <div>
        <p className="font-size-600">{name}</p>
      </div>
      <div className="d-flex align-items-center gap-12">
        <s className="color-grey">was ${priceWas}</s>&nbsp; &nbsp;
        <span>Now ${priceIs}</span>
      </div>
    </div>
  );
}

export default Card;
