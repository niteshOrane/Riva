import React from "react";
import styles from "./InvitationForm.module.scss";
const InvitationForm = () => {
  return (
    <form className="mt-50px w-100" style={{ maxWidth: "60%" }}>
      <div>
        <p>To:</p>
        <textarea
          className="p-12px w-100 font-size-normal"
          id={styles.emailsTextArea}
          placeholder="Enter Email Addresses Separated by Commas, maximum 50 allowed."
          name="emails"
          rows="3"
        />
      </div>
      <div className="mt-20px">
        <p>Message:</p>
        <textarea
          className="p-12px w-100 font-size-normal"
          id={styles.msgTextarea}
          placeholder="Come shop with me at RIVA! We have new things every day. Its like a treasure chest of cute stuff. Membership is free and we think you'll really Love it."
          name="message"
          rows="7"
        />
      </div>
      <button type="submit" className={styles.sendBtn}>
        SEND INVITES
      </button>
    </form>
  );
};

export default InvitationForm;
