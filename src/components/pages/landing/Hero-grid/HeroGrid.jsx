import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "../../../common/LazyImage/Image";
import CategoriesCircles from "../../../common/CategoriesCircles/CategoriesCircles";
import SlideBanner from "../Banners/SlideBanner";
import style from "./HeroGrid.module.scss";


const HeroGrid = ({ btfLeft, btfRight, loading }) => {
  const { language } = useSelector((state) => state?.common?.store);
  return (
    <div className={`${style.grid} container-with-circles`}>
     
      {loading && (
        <div className={style.skeleton}>
          <div className={style.mainSkeleton}>
            <Skeleton height="30rem" width="40rem" containerClassName={style.mainSkeleton} />
          </div>
          <div className={style.subSkeleton}>
            <Skeleton
              containerClassName={style.skeSpan}
              count={2}
              height="15rem"
              width="35rem"
            />
          </div>
        </div>
      )}
      <div className="d-flex">
        <div className={style.col2}>
          {btfLeft.length > 0 ? <SlideBanner banners={btfLeft} /> : null}
        </div>

        {btfRight.length > 0 ? (
          <div className={`d-grid w-50 ${style.gap25}`}>
            <div className="position-relative">
              <div className="position-relative h-100">
                <a href={`${btfRight?.[0]?.url_banner}`}>
                  <Image
                    src={btfRight?.[0]?.image}
                    classname={style.imgHeight}
                    width="100%"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className={style.col2Grid}>
              <div className={style.col2GridImgs}>
                <a href={`${btfRight?.[1]?.url_banner}`}>
                  <Image src={`${btfRight?.[1]?.image}`} width="100%" alt="" />
                </a>
              </div>
              <div className={style.col2GridImgs}>
                <a href={`${btfRight?.[2]?.url_banner}`}>
                  <Image src={`${btfRight?.[2]?.image}`} width="100%" alt="" />
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default HeroGrid;
