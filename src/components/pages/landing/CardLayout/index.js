import React from 'react';
import Card from '../../../common/Cards/CardWithBoxContent';
import style from './styles.module.scss';

function index({ data }) {
  return (
    <div className={`container-90 max-width-1600 mx-auto ${style.container}`}>
      {data.map((item) => (
        <Card item={item} />
      ))}
    </div>
  );
}

export default index;
