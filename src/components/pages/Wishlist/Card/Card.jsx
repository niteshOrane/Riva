import React from 'react';
import { Link } from "react-router-dom";
import Image from '../../../common/LazyImage/Image';
import * as icons from '../../../common/Icons/Icons';
import styles from './Card.module.scss';
import { URL } from '../../../../util';

function Card({ src, name, priceWas, priceIs, remove , sku}) {
  const srcImage =
    src?.indexOf('http') > -1 ? src : `${URL.baseUrlProduct}/${src}`;
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
      <Link to={`/product/${sku}`}>
   
      <div className={styles.imgContainer_P} >
        <div className={styles.imgContainer}>
          <Image src={srcImage} width="100%" />
        </div>
      </div>
      </Link>
      <div className="my-12px">
        <p className={`font-size-600 ${styles.boldFont}`}>{name}</p>
      </div>
      <div className="d-flex align-items-center gap-12px">
        <s className="color-grey">was ${parseFloat(priceWas)?.toFixed(2)}</s>&nbsp; &nbsp;
        <span>Now ${parseFloat(priceIs)?.toFixed(2)}</span>
      </div>
    </div>

  );
}

export default Card;
