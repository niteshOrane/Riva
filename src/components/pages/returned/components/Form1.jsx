import React from "react";
import styles from "../return.module.scss";

function Form1({ handleCommentChange }) {
  return (
    <div className={styles.wrap}>
      <header>
        <span>1</span>
        <p>REASON FOR RETURN</p>
      </header>
      <section className={styles.formSec}>
        <form>
          <label className={styles.cmtLabel}>Comments</label>
          <small>Please specify comments(if any) here</small>
          <textarea onChange={handleCommentChange} />
          <a href="#continue" >
            <button type="submit">Continue</button>
          </a>
        </form>
      </section>
    </div>
  );
}

export default Form1;
