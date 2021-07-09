import React from "react";
import * as icons from "../../../../../common/Icons/Icons";
const Invitations = () => {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex gap-12px align-items-center">
        <icons.Envelope />
        <h3 className="font-weight-normal">Email Invitations</h3>
      </div>
      <div className="gap-12px d-flex align-items-center">
        <p>Share:</p>
        <icons.FooterWhatsapp style={{ fill: "black" }} />
        <icons.SnapChat />
        <icons.Instagram />
        <icons.FacebookUnFill />
      </div>
    </div>
  );
};

export default Invitations;
