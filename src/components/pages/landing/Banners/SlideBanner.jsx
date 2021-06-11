import React from 'react';
import style from './slideBanner.module.scss';
import ButtonWithArrows from '../../../common/Buttons/ButtonWithArrows/ButtonWithArrows';
import Slider from '../../../common/Sliders/Slider';
import Image from '../../../common/LazyImage/Image';

const SlideBanner = ({banners = []}) => {
    return <div className={style.slider}>
        <Slider
            className="basicSlider"
            items={banners}
            slidesToShow={1}
            render={(item) => (
                <div className={`${style.slide} text-center d-flex-all-center flex-column`}>
                    <Image src={`http://65.0.141.49/media/mageplaza/bannerslider/banner/image/${item.image}`} width="100%" alt="" />
                    <div className={style.overlay}>
                        <a href="/" className={style.overlay}>
                            <div className={`${style.sliderTxt} text-center `}>
                                <h2 className="color-white">{item.title.toUpperCase()}</h2>
                                <p className="color-white">
                                    Discover this week the latest pieces from our latest collection
                                    Spring summer 2021 Woman
                                </p>
                                <ButtonWithArrows btnClass="mx-auto" text="Shop Now" />
                            </div>
                        </a>
                    </div>
                </div>
            )}
        />
    </div>
}

export default SlideBanner;