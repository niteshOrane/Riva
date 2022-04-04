import React from "react";
import styles from "../return.module.scss";

function Form3({ requestReturn, handleCommentChange, list }) {
  return (
    <>
      <div className={styles.wrap}>
        <header>
          <span>3</span>
          <p>RETURN ACTION</p>
        </header>
        <section className={styles.formSec}>
          <section className={styles.formSec}>
            <form>
              <label className={styles.cmtLabel}>Comments</label>
              <small>Please specify comments(if any) here</small>
              <textarea onChange={handleCommentChange} />
            </form>
          </section>
          <form onSubmit={requestReturn}>
            <button
              disabled={list.length === 0}
              style={{
                backgroundColor: list.length === 0 ? "gray" : "black",
                cursor: list.length === 0 ? "not-allowed" : "pointer",
              }}
              type="submit"
            >
              Request Return
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Form3;
