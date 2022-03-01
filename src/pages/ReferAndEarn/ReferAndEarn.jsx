import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";

import Invitations from "../../components/pages/Dashboard/MyStuff/ReferAndEarn/Invitations/Invitations";
import InvitationForm from "../../components/pages/Dashboard/MyStuff/ReferAndEarn/InvitationForm/InvitationForm";
import InvitesAndCredits from "../../components/pages/Dashboard/MyStuff/ReferAndEarn/InvitesAndCredits/InvitesAndCredits";
import HowItWorks from "../../components/pages/Dashboard/MyStuff/ReferAndEarn/HowItWorks/HowItWorks";

function ReferAndEarn() {
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">Refer & Earn Credit</h2>
            <Link className="d-block my-20px" to="#">
              <img
                src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/8e58db27-9971-47d4-ae2b-4c42b7d14707.png"
                width="100%"
                alt="CHANGE_ME"
              />
            </Link>
            <Invitations />
            <InvitationForm />
            <InvitesAndCredits />
            <HowItWorks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferAndEarn;
