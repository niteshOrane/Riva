/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../common/LazyImage/Image";
import style from "./megalinks.module.scss";
import { header } from "../../../mockdata.json";

const MegaLinks = ({ links }) => {
  const [showMegaMenue, setShowMegaMenue] = useState(null);

  const handleMouseOver = (link) => {
    // document.getElementById('header').style.position = 'relative';
    setShowMegaMenue(link);
  };

  return (
    <>
      <div
        className={`${style.container} d-flex-all-center  px-75px position-relative`}
      >
        {links &&
          links?.map((link, i) => (
            <div
              key={i}
              className={style.link}
              onMouseOver={() => handleMouseOver(link.url_key)}
              onMouseLeave={() => setShowMegaMenue(null)}
            >
              <Link
                to={`/products/${link.url_key}/${link.id}`}
                className={`${style.megaLink} p-12px d-block`}
              >
                <span
                  className="white-space-nowrap"
                  onClick={() => setShowMegaMenue(null)}
                >
                  {link.name.toUpperCase()}
                </span>
              </Link>

              <div
                className={`${style.megaContainer} ${showMegaMenue === link.url_key ? style.show : ""
                  } position-absolute px-75px pl-100px`}
              >
                <div className={style.titleDoubleLineFilter} />
                <div className={style.titleDoubleLine_SecondFilter} />
                <div className="d-flex justify-content-between text-left">
                  <div className={style.allProductsCard}>
                    <div>All Products</div>
                    <div className={style.allProductsTitleLine} />
                    <div
                      className={`d-flex justify-content-between ${style.allProductsTitles}`}
                    >
                      {links
                        ?.find((l) => l.url_key === showMegaMenue)
                        ?.children_data?.map((child) => (

                          <> <Link
                            to={`/products/${child.url_key}/${child.id}`}
                            className={`${style.megaLink} p-12px d-block`}
                          >
                            <p
                              className={`${style.pLink} ${child.children_data.length > 0 ? 'color-black font-weight-700' : 'color-gray'}`}
                              onClick={() => setShowMegaMenue(null)}
                            >
                              {child.name}
                            </p>
                          </Link>
                            {child.children_data?.map((childitem) => (
                              <Link
                                to={`/products/${childitem.url_key}/${child.id}/${childitem.id}`}
                                className={`${style.megaLink} p-12px d-block`}
                              >
                                <p
                                  className={`${style.pLink} color-grey`}
                                  onClick={() => setShowMegaMenue(null)}
                                >
                                  {child.name}
                                </p>
                              </Link>
                            ))}
                          </>
                        ))}
                    </div>
                  </div>
                  <div className={style.megaImg}>
                    <Image src={link.image} width="100%" alt="change me" />
                    <Link
                      to={`/products/${link.url_key}/${link.id}`}
                      className={`${style.megaLink} p-12px d-block`}
                    >
                      <button
                        type="button"
                        className="bg-black my-12px no-border p-12px color-white"
                        onClick={() => setShowMegaMenue(null)}
                      >
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="container-with-circles">
        <div className={style.titleDoubleLine} />
        <div className={style.titleDoubleLine_Second} />
      </div>
    </>
  );
};

export default MegaLinks;
