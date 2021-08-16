import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./profileInformation.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {
  profileUpdate,
  getProfileUpdate,
} from "../../services/dashboard/dashboard.service";
import { showSnackbar } from "../../store/actions/common";
import { setCustomer } from "../../store/actions/auth";
import { getStoreId } from "../../util";

function ProfileInfoForm() {
  const customer = useSelector((state) => state.auth.customer);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    firstname: customer?.firstname,
    lastname: customer?.lastname,
    email: customer?.email,
    mobile_number: customer?.mobile,
    gender: customer.gender,
    dob: customer.dob,
    profileImg: "",
  });
  const handleChange = (event) => {
    if (event.target.type === "file") {
      setValues({
        ...values,
        [event.target.name]: event.target.files[0],
      });
    } else {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cust = new FormData();

    cust.append("customerid", customer.customerID);
    cust.append("firstname", values.firstname);
    cust.append("email", values.email);
    cust.append("customerInfo[lastname]", values.lastname);
    cust.append("customerInfo[dob]", values.dob);
    cust.append("customerInfo[gender]", values.gender);
    cust.append("customerInfo[mobile_number]", values.mobile_number);
    cust.append("customerInfo[storeId]", getStoreId());

    const res = await profileUpdate(cust);

    if (res.status === 200) {
      dispatch(
        setCustomer({
          ...values,
        })
      );
      return dispatch(showSnackbar(res?.data?.message, "success"));
    }
    return dispatch(showSnackbar("Something went wrong", "error"));
  };
  return (
    <>
      <section className="registration-form-wrapper">
        <form onSubmit={handleSubmit} className="user-sign-in-form">
          <article className="inner-form-wrapper">
            <section>
              <div className>
                <label className="profile-label">First Name</label>
                <input
                  value={values?.firstname}
                  name="firstname"
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <label className="profile-label">Last Name</label>
                <input
                  name="lastname"
                  value={values?.lastname}
                  onChange={handleChange}
                />
              </div>
            </section>
            <section>
              <div className>
                <label className="profile-label">Email</label>
                <input
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <label className="profile-label">Mobile Number</label>
                <input
                  name="mobile_number"
                  value={values?.mobile_number}
                  onChange={handleChange}
                />
              </div>
            </section>
            <section>
              <FormControl component="fieldset">
                <FormLabel className="profile-label" component="legend">Your Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  value={values.gender}
                  onChange={(e) =>
                    setValues({ ...values, gender: e.target.value })
                  }
                >
                  <section>
                    <FormControlLabel
                      value="Male"
                      control={<Radio color="primary" />}
                      label="Male"
                      labelPlacement="start"
                      name="gender"
                      style={{color:"black"}}
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio color="primary" />}
                      label="Female"
                      labelPlacement="start"
                      name="gender"
                      style={{color:"black"}}
                    />
                  </section>
                </RadioGroup>
              </FormControl>
            </section>
            <section>
              <div style={{position:"relative"}}>
                <label className="profile-label">Date of Birth</label>
                <input
                  value={values.dob}
                  placeholder="Select DOB"
                  name="dob"
                  onChange={handleChange}
                />
                <img className="inputCalender" src="/assets/images/pfCalender.svg" />
              </div>
            </section>
          </article>
          <section className="registration-submit-btn-wrapper">
            <button type="submit" className="registration-btn">
              Submit
            </button>
          </section>
        </form>
      </section>
    </>
  );
}

export default ProfileInfoForm;
