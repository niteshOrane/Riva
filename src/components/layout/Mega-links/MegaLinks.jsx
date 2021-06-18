/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './megalinks.module.scss';
import { header } from '../../../mockdata.json';

const MegaLinks = ({ links }) => {
  const [showMegaMenue, setShowMegaMenue] = useState(null);
  return (
    <div
      className={`${style.container} d-flex-all-center flex-wrap px-75px position-relative`}
    >
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
                className={`${style.megaContainer} ${
                  showMegaMenue === link.url_key ? style.show : ''
                } position-absolute px-75px`}
              >
                <div className="d-flex justify-content-between">
                  <div className={style.allProductsCard}>
                    <div className={style.allProductsTitle}>All Products</div>
                    <div
                      className={`d-flex justify-content-between ${style.allProductsTitles}`}
                    >
                      {header.MegaMenuse?.[showMegaMenue]?.links?.map(
                        (title) => (
                          <p
                            className={`${style.pLink} color-grey`}
                            onClick={() => setShowMegaMenue(null)}
                          >
                            {title}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                  <div className={style.megaImg}>
                    <img
                      src={header.MegaMenuse?.[showMegaMenue]?.image}
                      width="100%"
                      alt="change me"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default MegaLinks;
