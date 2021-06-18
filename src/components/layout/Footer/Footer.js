import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CopyRightSection from "./CopyRightSection/CopyRightSection";
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
        <div className={style.footerCol}>
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
        <div className={style.footerCol}>
          <h4 className={style.title}>STAY CONNECTED</h4>
          <ul className="d-flex align-items-center justify-content-between">
            <div className={style.icon}>
              <span className="material-icons-outlined">
                notifications_none
              </span>
            </div>
            <div className={style.icon} title="Facebook">
              <span className="material-icons-outlined">facebook</span>
            </div>
            <div className={style.icon} title="Instagram">
              <span className="material-icons-outlined">
                notifications_none
              </span>
            </div>
            <div className={style.icon}>
              <span className="material-icons-outlined">
                notifications_none
              </span>
            </div>
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
            <span className="material-icons-outlined">settings_phone</span>
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
              <img
                src="/assets/images/appleStore.png"
                width="106px"
                height="34px"
                alt=""
              />
            </div>
            <div>
              <img
                src="/assets/images/googleStore.png"
                width="120px"
                height="34px"
                alt=""
              />
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
