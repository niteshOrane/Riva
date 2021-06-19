import React from 'react';
import ButtonWithArrows from '../../Buttons/ButtonWithArrows/ButtonWithArrows';
import Image from '../../LazyImage/Image';
import style from './style.module.scss';
const CardWithBoxContent = ({ item }) => {
  return (
    <div className="position-relative">
      <div>
        <Image src={item.image || ''} width="100%" alt={item.title} />
      </div>
      <div className={style.cardBoxContent}>
        <h3 className="text-center">{item.title}</h3>
        <p className={`text-center ${style.description}`}>{item.description}</p>
        <ButtonWithArrows
          btnClass="bg-black color-white mx-auto"
          text="Shop Now"
        />
      </div>
    </div>
  );
};

export default CardWithBoxContent;
