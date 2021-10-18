import React from "react";
import styles from "./contactus.module.scss"

const dummyContact = [
  {
    icon: <span className="material-icons-outlined">whatsapp</span>,
    name: "+91 9876092345",
  },
  {
    icon: <span className="material-icons-outlined">email</span>,
    name: "wecare@rivafashion.com",
  },
  {
    icon: <span className="material-icons-outlined">whatsapp</span>,
    name: "+91 9876092345",
  },
];

function CustomerService() {
  return (
    <div>
      <section>
        {dummyContact.map((li) => (
          <div className = {styles.box}>
            <span>{li.icon}</span>
            <span>{li?.name}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default CustomerService;
