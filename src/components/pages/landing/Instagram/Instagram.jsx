import React, { useRef } from "react";
import InstaCard from "../../../common/Cards/InstaCard";
import style from "./Instagram.module.scss";

const Instagram = ({ instagramBanners }) => {
  return (
    <div className="container-with-circles my-20px">
      <div className="">
        <div>
          <p className="d-flex-all-center my-20px">
            {" "}
            <img alt="As Seen on Instagram"
              src="./assets/images/insta.png"
              width="25px"
              height="25px"
            />{" "}
            <span className={style.seenTxt}>As Seen on Instagram</span>
          </p>
        </div>
      </div>
      <div
        id={style.p_mrgn}
        className={`d-flex gap-12px ${style.igCard}`}
      >
        {instagramBanners?.data?.map((product, index) => {
          return (
            <div key={index}>
              <a href={product?.permalink} rel="noreferrer" target="_blank">
                <InstaCard product={product} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Instagram;
