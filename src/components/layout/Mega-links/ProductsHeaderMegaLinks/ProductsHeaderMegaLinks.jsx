/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './ProductsHeaderMegaLinks.module.scss';
import Image from '../../../common/LazyImage/Image';

const ProductsHeaderMegaLinks = ({ links }) => {
  const [showMegaMenue, setShowMegaMenue] = useState(null);
  return (
    <div className={`${style.container} d-flex-all-center flex-wrap`}>
      {links &&
        links?.map((link, i) => (
          <div
            key={i}
            className={style.link}
            onMouseOver={() => setShowMegaMenue(link.url_key)}
            onMouseLeave={() => setShowMegaMenue(null)}
          >
            <Link
              to={`/products/${link.url_key}/${link.id}`}
              className={`${style.megaLink} p-12 d-block`}
              href={link.url_key}
            >
              <span onClick={() => setShowMegaMenue(null)}>
                {link.name.toUpperCase()}
              </span>
              <div
                className={`${style.megaContainer} ${showMegaMenue === link.url_key ? style.show : ''
                  } position-absolute px-75px pl-100px`}
              >
                <div className={style.titleDoubleLineFilter} />
                <div className={style.titleDoubleLine_SecondFilter} />
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-between text-left">
                    <div className={style.allProductsCard}>
                      <div >All Products</div>
                      <div className={style.allProductsTitleLine} />
                      <div className={`d-flex justify-content-between ${style.allProductsTitles}`}
                      >
                        {links
                          ?.find((l) => l.url_key === showMegaMenue)
                          ?.children_data?.map((child) => (
                            <Link
                              to={`/products/${child.url_key}/${child.id}`}
                              className={`${style.megaLink} p-12 d-block`}
                            >
                              <p
                                className={`${style.pLink} color-grey`}
                                onClick={() => setShowMegaMenue(null)}
                              >
                                {child.name}
                              </p>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className={style.megaImg}>
                    <Image src={link.image} width="100%" alt="change me" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ProductsHeaderMegaLinks;
