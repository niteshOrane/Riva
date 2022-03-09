import React from "react";
import styles from "../return.module.scss";

function Form1() {
  return (
    <div className={styles.wrap}>
      <header>
        <span>1</span>
        <p>REASON FOR RETURN</p>
      </header>
      <section className={styles.formSec}>
        <form>
          <lable>Reason for return</lable>
          <select>
            <option>reason1</option>
          </select>
          <label className={styles.cmtLabel}>Comments</label>
          <small>Please specify comments(if any) here</small>
          <textarea />
          <button type="submit">Continue</button>
        </form>
      </section>
    </div>
  );
}

export default Form1;
