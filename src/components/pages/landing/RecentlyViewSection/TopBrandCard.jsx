import React from "react";
 import style from './TopBrandCard.module.scss';
const TopBrandCard = ({item}) => {  
    return (
        (   
          <a href="#" className={style.card}>
              <div className={`d-flex align-items-cetner ${style.cardBody}`}>
                <div className={style.cardImg}>
                    <img src={item.src} width="100%" alt="" />
                </div>
                <div className={style.cardText}>
                    <p className={style.title}>
                       {item.title || ""}
                    </p>
                    <div className="d-flex align-items-center">
                        <s className={style.crosedPrice}>{item.price || ""}</s>
                        <p className={`${style.price} color-primary`}>{item.price || ""}</p>
                    </div>
                </div>
              </div>
          </a>
          
        )
    );

  };

export default TopBrandCard;
