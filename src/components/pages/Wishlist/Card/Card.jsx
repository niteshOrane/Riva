import React from "react";
import Image from "../../../common/LazyImage/Image";
import * as icons from "../../../common/Icons/Icons";
import styles from "./Card.module.scss";

function Card({ src, name, priceWas, priceIs, remove }) {
  return (
    <div className={styles.cardStyle}>
      <button
        type="button"
        title="Remove"
        onClick={remove}
        className={`${styles.closeStyle} closeBtn no-border bg-transparent position-absolute`}
      >
        <icons.Close />
      </button>
      <div className={styles.imgContainer_P}>
        <div className={styles.imgContainer}>
          <Image src={src} width="100%" />
        </div>
      </div>
      <div className="my-12px">
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
