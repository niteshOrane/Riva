import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./footer.module.scss";

function Footer() {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const links = useSelector((state) => state.common.footer);

  return (
    <footer className={style.footer}>
      <div className={style.footerGrid}>
        <div className={style.footerCol}>
          <h4 className={style.title}>CUSTOMER CARE</h4>
          <ul className={style.ul}>
            {links.map((link) => (
              <li className={`d-flex align-items-center ${style.link}`}>
                <a className={`w-100 ${style.footerLink}`} href={link.slug}>
                  <span class="material-icons-outlined">arrow_right_alt</span>
                  <span>{link.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.footerCol}>
          <h4 className={style.title}> ABOUT RIVA</h4>
          <ul className={style.ul}>
            {links.map((link) => (
              <li className={`d-flex align-items-center ${style.link}`}>
                <a className={`w-100 ${style.footerLink}`} href={link.slug}>
                  <span class="material-icons-outlined">arrow_right_alt</span>
                  <span>{link.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
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
              <span class="material-icons-outlined">notifications_none</span>
            </div>
            <div className={style.icon} title="Facebook">
              <span class="material-icons-outlined">facebook</span>
            </div>
            <div className={style.icon} title="Instagram">
              <span class="material-icons-outlined">notifications_none</span>
            </div>
            <div className={style.icon}>
              <span class="material-icons-outlined">notifications_none</span>
            </div>
          </ul>

            <div className={style.m}>
            <span class="material-icons-outlined">
            settings_phone
            </span>
            <div>
            <span className={style.clrGrey}>
            Customer care:&nbsp;
            </span>
            <a href="tel: +971 800 7482" className="color-white">
              +971 800 7482 
            </a>
            </div>
            </div>


            <div className={style.m}>
            <span class="material-icons-outlined">
            settings_phone
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
            <h3 className="font-weight-normal color-white">
            RIVA APP
            </h3>
           <div>
             <img src="./assets/images/appleStore.png" width="120px" alt="" />
           </div>
           <div>
             <img src="./assets/images/googleStore.png" width="120px" alt="" />
           </div>
            </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
