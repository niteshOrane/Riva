import React from "react";
import styles from "./contactus.module.scss";

function ContactUsForm() {
  return (
    <form className = {styles.form}>
      <section className={styles.groupWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className={`${styles.formGroup} ${styles.email}`}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>
      </section>
      <section className={styles.groupWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="telephone">Telephone</label>
          <input type="tel" id="telephone" name="telephone" />
        </div>
      </section>
      <section className={styles.groupWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="comment">Comment</label>
          <textarea type="text" id="comment" name="comment" />
        </div>
      </section>
      <div>
          <button className={styles.btn} type = "button">Submit</button>
      </div>
    </form>
  );
}

export default ContactUsForm;
