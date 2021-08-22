import React from "react";
import moment from "moment";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import * as icons from "../../components/common/Icons/Icons";
import useNotifyMeList from './useNotifyMeList';
import styles from "./NotifyMe.module.scss";

function NotifyMe() {
  const { notifyList } = useNotifyMeList();
  return (
    <div className="d-flex my-20px">
      <div className="container-with-circles">
        <div className="circlesContainer">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2>Notify Me</h2>
            {notifyList && notifyList?.data.length ? notifyList?.data?.map((card, i) => (
              <div className={styles.card}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className={styles.checkIcon}>
                      <icons.Check />
                    </div>
                    <div>
                      <h4 className="font-weight-normal">
                        Your notification for:- {card.productname}
                      </h4>
                      <span className="greyText font-size-small">
                        {moment().format("DD MMM, YYYY")}
                      </span>
                    </div>
                  </div>
                  <button
                    className="bg-transparent no-border c-pointer"
                    id={styles.closeBtn}
                  ><icons.Close /></button>
                </div>
              </div>
            )) : <div>{notifyList?.message || 'Please wait loading...'}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotifyMe;
