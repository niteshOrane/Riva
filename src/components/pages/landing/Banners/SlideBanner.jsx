import React from 'react';
import { Link } from 'react-router-dom';
import style from './slideBanner.module.scss';
import ButtonWithArrows from '../../../common/Buttons/ButtonWithArrows/ButtonWithArrows';
import Slider from '../../../common/Sliders/Slider';
import Image from '../../../common/LazyImage/Image';

const SlideBanner = ({ banners = [] }) => {
  console.log("nitesh",banners)
  return (
    <div className={style.slider}>
      <Slider
        className="basicSlider"
        items={banners}
        slidesToShow={1}
        render={(item) => (
          <Link to={`/${banners?.url_banner || ''}`}>
            <div
              className={`${style.slide} text-center d-flex-all-center flex-column`}
            >
              <Image
                src={item.image}
                width="100%"
                alt=""
              />
              <div className={style.overlay}>
                <a href="/" className={style.overlay}>
                  <div className={`${style.sliderTxt} text-center `}>
                    <h2 className="color-white">{item.title.toUpperCase()}</h2>
                    <p className="color-white">
                      Discover this week the latest pieces from our latest
                      collection Spring summer 2021 Woman
                    </p>
                    <ButtonWithArrows btnClass="mx-auto" text="Shop Now" />
                  </div>
                </a>
              </div>
            </div>
          </Link>
        )}
      />
    </div>
  );
};

export default SlideBanner;
