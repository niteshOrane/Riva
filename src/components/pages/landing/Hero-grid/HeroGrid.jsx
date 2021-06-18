import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useHeroGrid from './HeroGridHooks';
import { selectedCategory } from '../../../../store/actions/common';
import Image from '../../../common/LazyImage/Image';

import ButtonWithArrows from '../../../common/Buttons/ButtonWithArrows/ButtonWithArrows';
import style from './HeroGrid.module.scss';
import Circle from '../../../layout/Navbar/Circle';
import SlideBanner from '../../../pages/landing/Banners/SlideBanner';

const baseUrl = `http://65.0.141.49/media/mageplaza/bannerslider/banner/image/`;

const HeroGrid = () => {
  const { btfLeft, btfRight } = useHeroGrid();
  const links = useSelector((state) => state.common.category)[0];
  const [defaultCategory, setCategory] = useState('1241'); //woman
  const dispatch = useDispatch();
  const onCategorySelect = (id) => {
    setCategory(id);
    const items = links?.children_data?.filter((e) => e?.id === id) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, id));
    }
  };

  console.log(btfRight);

  useEffect(() => {
    const items =
      links?.children_data?.filter((e) => e?.id === defaultCategory) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, defaultCategory));
    }
  }, [links, defaultCategory]);

  return (
    <div className={`${style.grid} max-width-1600`}>
      <div className={style.col1}>
        {links?.children_data?.map(
          (item) =>
            item.is_active == 1 && (
              <div className={style.circleContainer}>
                <Circle
                  id={item?.id}
                  onClick={() => {
                    onCategorySelect(item?.id);
                  }}
                  bg={`${defaultCategory === item?.id ? 'skin' : 'black'}`}
                >
                  {item?.name}
                </Circle>{' '}
              </div>
            )
        )}
      </div>
      <div className={style.col2}>
        <SlideBanner banners={btfLeft} />
      </div>
      <div className={`d-grid ${style.gap25}`}>
        <div className="position-relative">
          <a href="/" className={`${style.overlay} ${style.overlay2}`}>
            <div className={style.trendyTxt}>
              <h2>Trendy Look</h2>
              <h2 className={style.redBgTxt}>For Every Day</h2>
            </div>
          </a>
          <div className="position-relative">
            <img
              src={`${baseUrl}${btfRight?.[0]?.image}`}
              width="100%"
              alt=""
              customeStyle={{ maxheight: 250 }}
            />
          </div>
        </div>
        <div className={style.col2Grid}>
          <div className="position-relative">
            <a href="/" className={`${style.overlay} ${style.overlay3}`}>
              <div className={`${style.sliderTxt} text-center `}>
                <h2 className="color-white">MOST WANTED</h2>
                <div>
                  <img
                    src="./assets/images/wave-border.png"
                    width="100px"
                    alt="Wanted"
                  />
                </div>
                <p className={style.yellowTxt}>MID-SEASON SLAE</p>
                <ButtonWithArrows btnClass="mx-auto" text="Shop Now" />
              </div>
            </a>
            <Image
              src={`${baseUrl}${btfRight?.[1]?.image}`}
              width="100%"
              alt=""
            />
          </div>

          <div className="position-relative">
            <Image
              src={`${baseUrl}${btfRight?.[2]?.image}`}
              width="100%"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroGrid;
