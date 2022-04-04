import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import TagManager from "react-gtm-module";
import useLanding from "./LandingHooks";

import HeroGrid from "../../components/pages/landing/Hero-grid/HeroGrid";
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

import { getInstagramBanners } from "../../services/layout/Layout.service";
import styles from "./Landing.module.scss";
import useArabic from "../../components/common/arabicDict/useArabic";
import useAnalytics from "../../components/common/GoogleAnalytics/useAnalytics";
import useDocumentTitle from "../../components/common/PageTitle/useDocumentTitle";

const titleObj = {
  1241:"Latest Women Fashion",
  866:"Kids",
  2539:"Riva Fashion"
}

function Landing() {
  const { middleBanner } = useLanding("topbrands");
  const location = useLocation();
  const params = useParams();
  useAnalytics();
  useDocumentTitle(titleObj[params.mainCategoryId])

  const { btfLeft, btfRight, videoBanner, loading } = useHeroGrid();
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [instagramBanners, setInstagramBanners] = useState(null);
  const { translate } = useArabic();

  const getIgBanners = async () => {
    const size = new FormData();
    size.append("limit", 8);
    const res = await getInstagramBanners(size);
    if (res?.status === 200 && res?.data) {
      setInstagramBanners(res?.data);
    }
  };

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        url: location.pathname,
      },
    });
    window.insider_object = {
      page: {
        type: "Category_landing",
        url: location.pathname,
      },
    };

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
    getIgBanners();
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
            header={[translate?.home?.SHOP, translate?.home?.CAT]}
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
                  <span
                    className={`${styles.categoryName} my-12px d-inline-block`}
                  >
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
          img={`${process.env.REACT_IMAGE_URL}${middleBanner?.[0]?.image}`}
          // title={middleBanner?.[0]?.name}
          link={middleBanner?.[0]?.url_banner}
        />
        <TopBrand />
        {instagramBanners && <Instagram instagramBanners={instagramBanners} />}
      </div>
    </>
  );
}

export default Landing;
