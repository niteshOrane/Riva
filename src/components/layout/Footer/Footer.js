import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CopyRightSection from "./CopyRightSection/CopyRightSection";
import * as icons from "../../common/Icons/Icons";
import style from "./footer.module.scss";
import { showSnackbar } from "../../../store/actions/common";
import { getStoreId } from "../../../util";
import storeData from "../../../store/index";

import { addSubscribeList } from "../../../store/actions/subscription/index";
import useArabic from "../../common/arabicDict/useArabic";

function Footer() {
  const dispatch = useDispatch();
  const {translate} = useArabic()
  const [phone, setPhone] = useState("+971 800 7482");
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);
  const footer = useSelector((state) => state.common.footer);
  const handleOnSubmit = (e) => {
    if (value) {
      dispatch(addSubscribeList({ email: value, store_id: getStoreId() }));
      setValue("");
    } else {
      dispatch(showSnackbar("Please enter email to Subscribe", "error"));
    }
  };
  useEffect(() => {
    const data = storeData?.getState()?.common.store;
    setPhone(data.phone || "+971 800 7482");
  }, [storeData]);

  return (
    <footer className={`max-width-1750 mx-auto ${style.footer}`}>
      <div className={style.footerGrid}>
        {footer?.footer_links?.map((section) => (
          <div className={style.footerCol}>
            <h4 className={style.title}>{section.section.toUpperCase()}</h4>
            <ul className={style.ul}>
              {section.data.map((link, i) => (
                <>
                  <li
                    key={i}
                    className={`d-flex align-items-center ${style.link}`}
                  >
                    <Link
                      to={`/${link.href.split("/").pop()?.toLowerCase() === "customer-service" ? "contact-us" : link.href.split("/").pop()}`}
                      className={`w-100 ${style.footerLink}`}
                    >
                      <img src="/assets/images/footerArr.svg" alt={link.name} />
                      <span className={style.footerLinkIcon}>{link.name}</span>
                    </Link>
                  </li>
                </>
              ))}
            </ul>
          </div>
        ))}
        <div className={`${style.footerCol} ${style.maxWidth80}`}>
          <h4 className={style.title}>{translate?.footer?.TOUCH}</h4>
          <div>
            <p className={style.thirdMsg}>
            {translate?.footer?.DEALS}
              ...
            </p>
          </div>
          <div className={style.inp}>
            <input
              type="email"
              value={value}
              placeholder="Sign up for RIVA news"
              name="email"
              onChange={handleChange}
              id="email"
            />
          </div>
          <div className={style.sub}>
            <button onClick={(e) => handleOnSubmit(e)} type="button">
            {translate?.footer?.SUBS}
            </button>
          </div>
        </div>
        <div className={`${style.footerCol} ${style.lastCol}`}>
          <h4 className={style.title}>{translate?.footer?.STAY}</h4>
          <ul className="d-flex align-items-center justify-content-between">
            <a
              href="https://www.snapchat.com/add/rivafashion/"
              target="_blank"
              rel="noreferrer"
            >
              <div className={style.icon}>
                <span>
                  <icons.FooterNotification />
                </span>
              </div>
            </a>
            <a
              href="https://www.instagram.com/rivafashionme"
              target="_blank"
              rel="noreferrer"
            >
              <div className={style.icon} title="Instagram">
                <span>
                  <icons.Instagram />
                </span>
              </div>
            </a>
            <a
              href="https://www.facebook.com/rivafashionofficial"
              target="_blank"
              rel="noreferrer"
            >
              <div className={style.icon} title="Facebook">
                <span>
                  <icons.FooterFb />
                </span>
              </div>
            </a>
            <a
              href="https://www.youtube.com/user/Rivafashionme"
              target="_blank"
              rel="noreferrer"
            >
              <div className={style.icon}>
                <span>
                  <icons.FooterYoutube />
                </span>
              </div>
            </a>
          </ul>

          <div className={style.m}>
            <img src="/assets/images/footerPhn.png" alt="" />
            <div className={style.text_alignmemt}>
              <span className={style.clrGrey}>{translate?.footer?.CARE}:&nbsp;</span>
              <a href={`tel: ${phone}`} className="color-white">
                {phone}
              </a>
            </div>
          </div>

          <div className={style.m}>
            <span>
              <icons.FooterWhatsapp />
            </span>
            <div className={style.text_alignmemt}>
              <span className={style.clrGrey}>
              {translate?.footer?.WHATS}:&nbsp;
              </span>
              <a href={`tel: ${phone}`} className="color-white">
                {phone}
              </a>
            </div>
          </div>

          <div className={style.lm} >
            <div className="font-weight-normal color-white">RIVA APP</div>
            <div>
              <a
                href="https://apps.apple.com/us/app/apple-store/id375380948"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/assets/images/appleStore.png"
                  width="106px"
                  height="34px"
                  alt=""
                />
              </a>
            </div>
            <div>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/assets/images/googleStore.png"
                  width="120px"
                  height="34px"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <CopyRightSection />
      <div
        id="myBtn"
        className={`${style.toTopBtn} c-pointer`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="material-icons-outlined font-white d-flex-all-center">
          keyboard_arrow_up
        </span>
      </div>
    </footer>
  );
}

export default Footer;
