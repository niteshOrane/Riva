/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import Image from '../../common/LazyImage/Image';
import style from './megalinks.module.scss';

const MegaLinks = ({ links, language }) => {
  const history = useHistory()
  const [showMegaMenue, setShowMegaMenue] = useState(null);
  const [childLinks, setChildLinks] = useState({});
  const handleMouseOver = (link) => {
    // document.getElementById('header').style.position = 'relative';
    setShowMegaMenue(link);
  };
  useEffect(() => {
    const childLink = links?.find((l) => l.url_key === showMegaMenue);
    setChildLinks(childLink ?? {})
  }, [showMegaMenue])
  const onSelectCaegory = (link) => {
    sessionStorage.setItem("selectedCategory", link);
  };
  const redirectPath = (link,id) => {
    history.push(`/products/${link}/${id}`)
  }
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
              <Link onClick={() => { onSelectCaegory(link.name) }}
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
                className={`${style.megaContainer} ${showMegaMenue === link.url_key ? style.show : ''
                  // style.show
                  } position-absolute px-75px pl-100px`}
              >
                <div className={style.titleDoubleLineFilter} />
                <div className={style.titleDoubleLine_SecondFilter} />
                <div className="d-flex justify-content-between text-left">
                  <div className={style.allProductsCard}>

                    <div
                      className={`d-flex justify-content-between ${style.allProductsTitles}`}
                    >

                      {childLinks?.children_data?.map((child) => (
                        <div
                          style={{
                            display: child.children_data.length > 0 && 'flex',
                            paddingRight: language === 'Arabic' ? '0' : '60',
                            paddingLeft: language === 'Arabic' ? '60' : '0',
                          }}
                        >

                          <span>
                            <Link onClick={() => { onSelectCaegory(child.name) }}
                              to={`/products/${child.url_key}/${child.id}`}
                              className={`${style.megaLink} p-12px d-block`}
                            >
                              <p
                                className={`${style.pLink} ${child.children_data.length > 0
                                  ? 'color-black font-weight-700'
                                  : 'color-gray'
                                  }`}
                                onClick={() => setShowMegaMenue(null)}
                              >
                                {child.name}
                              </p>
                              {child.children_data.length > 0 && (
                                <div className={style.allProductsTitleLine} />
                              )}
                            </Link>
                            {child.children_data?.map((childitem) => (
                              <Link onClick={() => { onSelectCaegory(childitem.name) }}
                                to={`/products/${childitem.url_key}/${child.id}/${childitem.id}`}
                                className={`${style.megaLink} p-12px d-block`}
                              >
                                <p
                                  className={`${style.pLink} color-grey`}
                                  onClick={() => setShowMegaMenue(null)}
                                >
                                  {childitem.name}
                                </p>
                              </Link>
                            ))}
                          </span>{' '}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={style.megaImg}>
                    <Image onClick = {() => redirectPath(link.url_key,link.id)} src={link?.image?.replace('index.php', '')} width="100%" alt="change me" />
                    <Link onClick={() => { onSelectCaegory(link.name) }}
                      to={`/products/${link.url_key}/${link.id}`}
                      className={`${style.megaLink} p-12px d-block`}
                    >
                      <button
                        type="button"
                        className="bg-black my-12px no-border p-12px color-white c-pointer"
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
