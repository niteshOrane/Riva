import React from "react";
import style from "./topBar.module.scss";
const TopBar = () => {
  return (
    <div className="bg-primary max-width-1750 mx-auto">
      <div
        className={`d-flex align-items-center justify-content-between bg-light-pink ${style.topBarcontainer}`}
      >
        <div className={style.topBarRight}>
          <span class="font-size-normal color-primary material-icons-outlined">
            phone
          </span>{" "}
          <p>
            <a className="font-black" href="tel:+971 800 7482">
              +971 800 7482
            </a>
          </p>
        </div>
        <div>
          <h4 className={style.topBarMsg}>
            NEW IN: <span className="color-primary">SPRING-SUMMER 2021</span>{" "}
            COLLECTION
          </h4>
        </div>

        <div
          className={`${style.topBarLeft} color-white bg-primary h-100 d-flex align-items-center`}
        >
          <div className="d-flex-all-center c-pointer">
            <div className={`${style.flag} d-flex`}>
              <img src="./assets/images/flag.png" alt="" />
            </div>
            <span>USD (&)</span>
            <span class="material-icons-outlined">keyboard_arrow_down</span>
            |&nbsp;
          </div>
          العربية
        </div>
      </div>
    </div>
  );
};

export default TopBar;
