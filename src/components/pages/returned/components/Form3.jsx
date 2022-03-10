import React from "react";
import styles from "../return.module.scss";

function Form3() {
  return (
    <div className={styles.wrap}>
      <header>
        <span>3</span>
        <p>RETURN ACTION</p>
      </header>
      <section className={styles.formSec}>
        <form>
          <lable>Reason for return</lable>
          <select>
            <option>reason1</option>
          </select>
          <button type="submit">Request Return</button>
        </form>
      </section>
    </div>
  );
}

export default Form3;
