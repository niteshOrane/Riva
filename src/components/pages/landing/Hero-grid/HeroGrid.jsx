import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedCategory } from '../../../../store/actions/common';
import Image from '../../../common/LazyImage/Image';

import style from './HeroGrid.module.scss';
import Circle from '../../../layout/Navbar/Circle';
import SlideBanner from '../../../pages/landing/Banners/SlideBanner';


const HeroGrid = ({ btfLeft, btfRight }) => {
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

  useEffect(() => {
    const items =
      links?.children_data?.filter((e) => e?.id === defaultCategory) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, defaultCategory));
    }
  }, [links, defaultCategory]);

  return (
    <div className={`${style.grid} max-width-1600 mx-auto`}>
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
        {btfLeft.length > 0 ? <SlideBanner banners={btfLeft} /> : null}
      </div>
      {btfRight.length > 0 ? (
        <div className={`d-grid ${style.gap25}`}>
          <div className="position-relative">
            <div className="position-relative h-100">
              <Link to={`/${btfRight?.[0]?.url_banner ?? ''}`}>
                <Image
                  src={btfRight?.[0]?.image}
                  classname={style.imgHeight}
                  width="100%"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className={style.col2Grid}>
            <div className={style.col2GridImgs}>
              <Link to={`/${btfRight?.[1]?.url_banner ?? ''}`}>
                <Image src={`${btfRight?.[1]?.image}`} width="100%" alt="" />
              </Link>
            </div>
            <div className={style.col2GridImgs}>
              <Link to={`/${btfRight?.[2]?.url_banner ?? ''}`}>
                <Image src={`${btfRight?.[2]?.image}`} width="100%" alt="" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default HeroGrid;
