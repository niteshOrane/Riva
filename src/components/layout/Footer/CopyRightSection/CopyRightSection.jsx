import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useArabic from "../../../common/arabicDict/useArabic";
import style from "../footer.module.scss";
import SaudiFrame from "./SaudiFrame";

const CopyRightSection = () => {
  const { translate } = useArabic();
  const { store_name } = useSelector((state) => state?.common?.store);
  return (
    <div className={`mx-75px max-width-1750 mx-auto ${style.copyRightSec}`}>
      <div className="d-flex align-items-center aaa justify-content-between">
        <div className="d-flex align-items-center">
          <strong id="logo">
            <Link className="d-block">
              <img
                src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/bde346b9-37f2-4300-b2be-c81f2ca3dd57.png"
                width="90%"
                className={`${style.footerLogoImg} logo-image`}
                alt=""
              />
            </Link>
            {store_name === "Saudi Arabia" && <SaudiFrame />}
          </strong>
          <div className={style.copyRightText}>{translate?.footer?.COPY}</div>
        </div>
        <div className="d-flex align-items-center">
          <p className="color-white"> {translate?.footer?.WE}</p>
          <div className={style.weAcceptImage}>
            <img
              src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/123a4652-df8c-474a-a745-c4132efed9bc.png"
              width="100%"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyRightSection;
