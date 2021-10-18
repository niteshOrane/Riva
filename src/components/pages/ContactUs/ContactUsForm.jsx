

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./contactus.module.scss";

import {
  showSnackbar,
  toggleSignUpCard,
} from "../../../store/actions/common";

import {
  addContactEnquiery
} from "../../../services/contactus/contactus.service";


function ContactUsForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    comment: "",
    telephone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const { email, comment, name, telephone } = formData;

  const userCreateHandler = async (e) => {
    e.preventDefault();
    if (!email || !name || !telephone)
      return dispatch(showSnackbar("All fields are required", "warning"));
  };

  return (
    <form className={styles.form} onSubmit={userCreateHandler}>
      <section className={styles.groupWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
        </div>
        <div className={`${styles.formGroup} ${styles.email}`}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={handleChange} />
        </div>
      </section>
      <section className={styles.groupWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="telephone">Telephone</label>
          <input type="tel" id="telephone" name="telephone" onChange={handleChange} />
        </div>
      </section>
      <section className={styles.groupWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="comment">Comment</label>
          <textarea type="text" id="comment" name="comment" onChange={handleChange} />
        </div>
      </section>
      <div>
        <button className={styles.btn} type="button">Submit</button>
      </div>
    </form>
  );
}

export default ContactUsForm;
