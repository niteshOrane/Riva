import React from "react";
import { Link } from 'react-router-dom';
import ButtonWithArrows from "../../Buttons/ButtonWithArrows/ButtonWithArrows";
import Image from "../../LazyImage/Image";
import style from "./style.module.scss";

const CardWithBoxContent = ({ item }) => {
  return (
    <Link to={`/products/${item?.url_key ?? ''}/${item?.id ?? ''}`}>
      <div className="position-relative" title={item?.name}>
        <div>
          <Image src={item.image || ""} width="100%" alt={item?.title} />
        </div>
        <div className={style.cardBoxContent}>
          <h3 className="text-center">{item?.title}</h3>
          <p className={`text-center ${style.description}`}>
            {item?.description || item?.name || <i>No Description</i>} 
          </p>
          <ButtonWithArrows
            btnClass="bg-black color-white mx-auto"
            text="Shop Now"
            isFestiveCard
          />
        </div>
      </div>
    </Link>
  );
};

export default CardWithBoxContent;
