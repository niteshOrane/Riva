import React, { useRef } from 'react';
import InstaCard from '../../../common/Cards/InstaCard';
import style from './Instagram.module.scss';

const Instagram = ({ products }) => {
  return (
    <div className="container-90 max-width-1600 mx-auto my-20px">
      <div className="">
        <div>
          <p className="d-flex-all-center my-20px">
            {' '}
            <img
              src="./assets/images/insta.png"
              width="25px"
              height="25px"
            />{' '}
            <span className={style.seenTxt}>As Seen on Instagram</span>
          </p>
        </div>
      </div>
      <div
        id={style.p_mrgn}
        className="d-flex align-items-center justify-content-between gap-12"
      >
        {products.map((product, index) => {
          return (
            <div key={index}>
              <InstaCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Instagram;
