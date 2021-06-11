import React from 'react';
import { Link } from 'react-router-dom';
import style from './megalinks.module.scss';

const MegaLinks = ({ links }) =>  (
    <div className={`${style.container} d-flex-all-center flex-wrap mx-75px`}>
     {links && links?.map((link, i) => (
        <div key={i} className={style.link}>
          <Link
            to={`/products/${link.url_key}/${link.id}`}
            className={`${style.megaLink} p-12 d-block`}
            href={link.url_key}
          >
            <span>{link.name.toUpperCase()}</span>
          </Link>
        </div>
      ))}
    </div>
  );
  
export default MegaLinks;
