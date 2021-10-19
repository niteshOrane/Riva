import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./contactus.module.scss";

import { showSnackbar, toggleSignUpCard } from "../../../store/actions/common";

import { addContactEnquiery } from "../../../services/contactus/contactus.service";

function ContactUsForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    comment: "",
    telephone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, comment, name, telephone } = formData;

  const userCreateHandler = async (e) => {
    e.preventDefault();
    if (!email || !name || !telephone || !comment)
      return dispatch(showSnackbar("All fields are required", "warning"));

    const quiry = new FormData();
    quiry.append("contactForm[name]", name);
    quiry.append("contactForm[email]", email);
    quiry.append("contactForm[telephone]", telephone);
    quiry.append("contactForm[comment]", comment);
    const res = await addContactEnquiery(quiry);
    if (res?.status === 200) {
      if (res?.data?.message) {
        dispatch(showSnackbar(`${res?.data?.message}`, "error"));
      } else {
        dispatch(showSnackbar("We got your quiry", "success"));
      }
    } else {
      dispatch(showSnackbar("something went wrong", "error"));
    }
  };

  return (
    <form className={styles.form} onSubmit={userCreateHandler}>
      <h2 className={styles.title}>CONTACT INFORMATION</h2>
      <section className={styles.groupWrap}>
        <div className={styles.formGroup}>
          <div className={styles.require}>
            <label htmlFor="name">Name</label>
            <span>*</span>
          </div>

          <input type="text" id="name" name="name" onChange={handleChange} />
        </div>
        <div className={`${styles.formGroup} ${styles.email}`}>
          <div className={styles.require}>
            <label htmlFor="email">Email</label>
            <span>*</span>
          </div>

          <input type="text" id="email" name="email" onChange={handleChange} />
        </div>
      </section>
      <section className={styles.groupWrap}>
        <div className={styles.formGroup}>
          <div className={styles.require}>
            <label htmlFor="telephone">Telephone</label>
            <span>*</span>
          </div>

          <input
            type="tel"
            id="telephone"
            name="telephone"
            onChange={handleChange}
          />
        </div>
      </section>
      <section className={styles.groupWrap}>
        <div className={styles.formGroup}>
          <div className={styles.require}>
            <label htmlFor="comment">Comment</label>
            <span>*</span>
          </div>

          <textarea
            type="text"
            id="comment"
            name="comment"
            onChange={handleChange}
          />
        </div>
      </section>
      <div>
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ContactUsForm;
