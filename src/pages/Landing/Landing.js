import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useLanding from './LandingHooks';
import {URL} from '../../util'
import HeroGrid from '../../components/pages/landing/Hero-grid/HeroGrid';
import Slider from '../../components/common/Sliders/Slider';
import ExtraordinaryEssentials from '../../components/pages/landing/ExtraordinaryEssentials';
import BestSellingProducts from '../../components/pages/landing/BestSellingProducts/BestSellingProducts';
import {
  body,
  cardsData,
} from '../../mockdata.json';
import Image from "../../components/common/LazyImage/Image";
import TopBrand from '../../components/pages/landing/RecentlyViewSection/TopBrand';
import OneImageBanner from '../../components/pages/landing/Banners/OneImageBanner';
import CardLayout from '../../components/pages/landing/CardLayout';
import VideoPlayer from '../../components/pages/landing/VideoPlayer/VideoPlayer';
import Instagram from '../../components/pages/landing/Instagram/Instagram';
import useHeroGrid from '../../components/pages/landing/Hero-grid/HeroGridHooks';



function Landing() {
  const {middleBanner} = useLanding();
  const { btfLeft, btfRight , videoBanner} = useHeroGrid();
  const selectedCategoryItem = useSelector((state) => state.common.selectedCategoryItem);
  const [selectedCategory, setSelectedCategory] = useState([]);
  useEffect(() => {
   const items=   selectedCategoryItem?.data?.find(e=>e?.url_key==="accessories-bags" || e?.url_key==="girls-accessories")?.children_data.find(e=>e.url_key==="accessories")?.children_data;
 
   setSelectedCategory(items);
  }, [selectedCategoryItem]);

  return (
    <>
      <div>
        <HeroGrid btfLeft={btfLeft} btfRight={btfRight} />
        <Slider
          className="categoriesSlider"
          items={selectedCategory}
          bgImageUrl="./assets/images/categSlider-bg.png"
          bgImage
          slidesToShow={6}
          header={['Shop By', 'Category']}
          render={(item) => (
            <div className="text-center d-flex-all-center flex-column">
              <div>
              <Image
                  src={`${URL.baseUrl}${item?.image}`}
                  width="100%"
                  alt={item?.name}
                  defaultImage={'assets/images/sunGlass.png'}
                />
              </div>
              <div>
                <span>{item.name}</span>
              </div>
            </div>
          )}
        />
        <BestSellingProducts products={body.productList} />
        <VideoPlayer videoBanner={videoBanner}/>
        <CardLayout data={cardsData} />
        <ExtraordinaryEssentials products={body.extraordinarySlider} />
        <OneImageBanner img={middleBanner || './assets/images/springSummerBanner.png'}/>
        <TopBrand />
        <Instagram products={body.instaProducts} />
      </div>
    </>
  );
}

export default Landing;
