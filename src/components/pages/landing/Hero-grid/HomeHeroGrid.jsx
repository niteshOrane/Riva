import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ButtonWithArrows from "../../../common/Buttons/ButtonWithArrows/ButtonWithArrows";
import CategoriesCircles from "../../../common/CategoriesCircles/CategoriesCircles";
import { selectedCategory } from "../../../../store/actions/common";
import Image from "../../../common/LazyImage/Image";

import "./heroGridTwo.css";

const HomeHeroGrid = (props) => {
  const { items, srcPath = "/assets/images/banner", isHomePage } = props;
  const links = useSelector((state) => state.common.category)[0];
  const [defaultCategory, setCategory] = useState([]);
  const [itemsImage, setItemsImage] = useState([]);
  useEffect(() => {
    setItemsImage(items);
    setCategory(links?.children_data.filter((item) => item.is_active == 1));
  }, [items]);
  const dispatch = useDispatch();
  const history = useHistory();
  const onCategorySelect = (id) => {
    const selectItem = links?.children_data?.filter((e) => e?.id === id) ?? [];
    if (selectItem.length) {
      dispatch(selectedCategory(selectItem[0]?.children_data, id));
      history.push(`/type/${id}`);
    }
  };
  return (
    <div className="landing-two-wrapper">
      <CategoriesCircles isHomePage={isHomePage} />
      {itemsImage.length ? (
        <div>
          <section className="banner-grid-wrapper">
            <div
              className="base-image-wrapper c-pointer"
              onClick={() => {
                onCategorySelect(
                  defaultCategory.find(
                    (e) =>
                      e?.name?.toLowerCase() ===
                      itemsImage
                        .find((m) => m.position === "1")
                        ?.title?.toLowerCase()
                  )?.id
                );
              }}
            >
              {itemsImage.length ? (
                <Image
                  src={`http://65.0.141.49/shop/media/mageplaza/bannerslider/banner/image/${
                    itemsImage.find((e) => e.position === "1").image || ""
                  }`}
                  alt={items?.[0]?.title}
                />
              ) : null}
              <div className="banner-wrapper-text">
                <h3>{items?.[0]?.title ?? "WOMEN"}</h3>
                <ButtonWithArrows
                  btnClass="bg-black color-white mx-auto"
                  text="Shop Now"
                />
              </div>
            </div>
            <section>
              <div
                className="base-image-two c-pointer "
                onClick={() => {
                  onCategorySelect(
                    defaultCategory.find(
                      (e) =>
                        e?.name?.toLowerCase() ===
                        itemsImage
                          .find((m) => m.position === "2")
                          ?.title?.toLowerCase()
                    )?.id
                  );
                }}
              >
                <img
                  src={`http://65.0.141.49/shop/media/mageplaza/bannerslider/banner/image/${
                    itemsImage.find((e) => e.position === "2")?.image
                  }`}
                  alt=""
                />
                <div className="banner-wrapper-text">
                  <h3>{items?.[1]?.title ?? "TEENS"}</h3>
                  <ButtonWithArrows
                    btnClass="bg-black color-white mx-auto"
                    text="Shop Now"
                  />
                </div>
              </div>
              <div
                className="base-image-two c-pointer "
                onClick={() => {
                  onCategorySelect(
                    defaultCategory.find(
                      (e) =>
                        e?.name?.toLowerCase() ===
                        itemsImage
                          .find((m) => m.position === "3")
                          ?.title?.toLowerCase()
                    )?.id
                  );
                }}
              >
                <img
                  src={`http://65.0.141.49/shop/media/mageplaza/bannerslider/banner/image/${
                    itemsImage.find((e) => e.position === "3")?.image
                  }`}
                  alt=""
                />
                <div className="banner-wrapper-text">
                  <h3>{items?.[2]?.title ?? "KIDS"}</h3>
                  <ButtonWithArrows
                    btnClass="bg-black color-white mx-auto"
                    text="Shop Now"
                  />
                </div>
              </div>
            </section>
          </section>
          <div
            className="red-banner-wrapper c-pointer"
            onClick={() => {
              onCategorySelect(
                defaultCategory.find(
                  (e) =>
                    e?.name?.toLowerCase() ===
                    itemsImage
                      .find((m) => m.position === "1")
                      ?.title?.toLowerCase()
                )?.id
              );
            }}
          >
            <section>
              <img
                src={`http://65.0.141.49/shop/media/mageplaza/bannerslider/banner/image/${
                  itemsImage.find((e) => e.position === "4")?.image
                }`}
                alt=""
              />
            </section>
          </div>
        </div>
      ) : (
        <div style={{ margin: "0% auto" }}>
          <Image
            src={
              "https://via.placeholder.com/1300x500?text=Loading+Please+wait"
            }
            alt=""
          />
        </div>
      )}
    </div>
  );
};
export default HomeHeroGrid;
