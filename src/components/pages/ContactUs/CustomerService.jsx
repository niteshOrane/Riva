import React from "react";
import styles from "./contactus.module.scss";

const dummyContact = [
  {
    icon: (
      <span style={{ fontSize: "3rem" }} className="material-icons-outlined">
        call
      </span>
    ),
    name: "+91 9876092345",
  },
  {
    icon: (
      <span style={{ fontSize: "3rem" }} className="material-icons-outlined">
        email
      </span>
    ),
    name: "wecare@rivafashion.com",
  },
  {
    icon: (
      <span style={{ fontSize: "3rem" }} className="material-icons-outlined">
        whatsapp
      </span>
    ),
    name: "+91 9876092345",
  },
];

function CustomerService() {
  return (
    <div className={styles.serviceWrap}>
      <h2 className={styles.title}>CUSTOMER SERVICE</h2>
      <p>We’re available 24X7 for you.</p>
      <section>
        {dummyContact.map((li) => (
          <div className={styles.box}>
            <span>{li.icon}</span>
            <span>{li?.name}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default CustomerService;
