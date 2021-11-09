import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLanding from "./LandingHooks";
import { URL } from "../../util";
import HeroGrid from "../../components/pages/landing/Hero-grid/HeroGrid";
import HeroGrid2 from "../../components/pages/landing/Hero-grid/HomeHeroGrid";
import Slider from "../../components/common/Sliders/Slider";
import ExtraordinaryEssentials from "../../components/pages/landing/ExtraordinaryEssentials";
import BestSellingProducts from "../../components/pages/landing/BestSellingProducts/BestSellingProducts";
import { body, cardsData } from "../../mockdata.json";
import Image from "../../components/common/LazyImage/Image";
import TopBrand from "../../components/pages/landing/RecentlyViewSection/TopBrand";
import OneImageBanner from "../../components/pages/landing/Banners/OneImageBanner";
import CardLayout from "../../components/pages/landing/CardLayout";
import VideoPlayer from "../../components/pages/landing/VideoPlayer/VideoPlayer";
import Instagram from "../../components/pages/landing/Instagram/Instagram";
import useHeroGrid from "../../components/pages/landing/Hero-grid/HeroGridHooks";
import { Link } from "react-router-dom";
import { getInstagramBanners } from "../../services/layout/Layout.service";
import styles from "./Landing.module.scss"

function Landing() {
  const { middleBanner } = useLanding("topbrands");
  const { btfLeft, btfRight, videoBanner,loading } = useHeroGrid();
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [instagramBanners, setInstagramBanners] = useState(null);

  const getIgBanners = async () => {
    const size = new FormData();
    size.append("limit", 8);
    const res = await getInstagramBanners(size);
    if(res?.status===200 && res?.data){
      setInstagramBanners(res?.data)
    }
  };

  console.log({loading})

  useEffect(() => {
    getIgBanners();
  }, []);
  useEffect(() => {
    const items = selectedCategoryItem?.data
      ?.find(
        (e) =>
          e?.url_key === "accessories-bags" ||
          e?.url_key === "girls-accessories"
      )
      ?.children_data.find((e) => e.url_key === "accessories")?.children_data;

    setSelectedCategory(items);
  }, [selectedCategoryItem]);
  return (
    <>
      <div>
        <HeroGrid btfLeft={btfLeft} btfRight={btfRight} loading={loading} />
        <div>
          <Slider
            className="categoriesSlider"
            items={selectedCategory}
            bgImageUrl="./assets/images/categSlider-bg.png"
            bgImage
            slidesToShow={6}
            header={["Shop By", "Category"]}
            render={(item) => (
              <Link
                to={`/products/${item?.url_key}/${item?.parent_id}`}
                className="catsSliderItem text-center d-flex-all-center flex-column"
              >
                <div className="catSliderImgsSpace">
                  <Image
                    src={item?.image?.replace("index.php", "")}
                    width="100%"
                    alt={item?.name}
                    customeStyle={{ borderRadius: "50%" }}
                    isCategory
                  />
                </div>
                <div>
                  <span className={`${styles.categoryName} my-12px d-inline-block`}>
                    {item?.name?.toUpperCase()}
                  </span>
                </div>
              </Link>
            )}
          />
        </div>
        <BestSellingProducts products={body.productList} />
        <div className="max-width-1750 mx-auto">
          <VideoPlayer videoBanner={videoBanner} />
        </div>
        <CardLayout data={cardsData} />
        <ExtraordinaryEssentials products={body.extraordinarySlider} />
        <OneImageBanner
          img={`http://65.0.141.49/shop/media/mageplaza/bannerslider/banner/image/${middleBanner?.[0]?.image}`}
          // title={middleBanner?.[0]?.name}
          link={middleBanner?.[0]?.url_banner}
        />
        <TopBrand />
        {instagramBanners && <Instagram instagramBanners = {instagramBanners} /> }
      </div>
    </>
  );
}

export default Landing;
