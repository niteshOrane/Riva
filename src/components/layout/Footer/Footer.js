import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CopyRightSection from "./CopyRightSection/CopyRightSection";
import * as icons from "../../common/Icons/Icons";
import style from "./footer.module.scss";

function Footer() {
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);
  const footer = useSelector((state) => state.common.footer);

  return (
    <footer className={`max-width-1750 mx-auto ${style.footer}`}>
      <div className={style.footerGrid}>
        {footer?.footer_links?.map((section) => (
          <div className={style.footerCol}>
            <h4 className={style.title}>{section.section.toUpperCase()}</h4>
            <ul className={style.ul}>
              {section.data.map((link, i) => (
                <li
                  key={i}
                  className={`d-flex align-items-center ${style.link}`}
                >
                  <Link
                    to={link.href.split("/").pop()}
                    className={`w-100 ${style.footerLink}`}
                    href={link.href.split("/").pop()}
                  >
                    <span className="material-icons-outlined">
                      arrow_right_alt
                    </span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={`${style.footerCol} ${style.maxWidth80}`}>
          <h4 className={style.title}>STAY IN TOUCH</h4>
          <div>
            <p className={style.thirdMsg}>
              Get exclusive deals you will not find anywhere else straight to
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
            <button type="button">SUBSCRIBE</button>
          </div>
        </div>
        <div className={`${style.footerCol} ${style.lastCol}`}>
          <h4 className={style.title}>STAY CONNECTED</h4>
          <ul className="d-flex align-items-center justify-content-between">
            <a
              href="https://www.snapchat.com/add/rivafashion/"
              target="_blank"
              rel="noreferrer"
            >
              <div className={style.icon}>
                <span>
                  <icons.Notification />
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
            <span className="material-icons-outlined">settings_phone</span>
            <div>
              <span className={style.clrGrey}>Customer care:&nbsp;</span>
              <a href="tel: +971 800 7482" className="color-white">
                +971 800 7482
              </a>
            </div>
          </div>

          <div className={style.m}>
            <span>
              <icons.FooterWhatsapp />
            </span>
            <div>
              <span className={style.clrGrey}>
                WhatsApp Customer Care:&nbsp;
              </span>
              <a href="tel: +971 800 7482" className="color-white">
                +965 22216688
              </a>
            </div>
          </div>

          <div className={style.lm}>
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
