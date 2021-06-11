import React from "react";
import style from "./megalinks.module.scss";
const MegaLinks = ({ links }) => {
  return (
    <div className="d-flex-all-center bg-black flex-wrap">
      {links.map((link) => (
        <div className={style.link}>
          <a className={`${style.megaLink} p-12 d-block`} href={link.slug}>
            <span>{link.title.toUpperCase()}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default MegaLinks;
