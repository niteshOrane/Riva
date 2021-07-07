import React, { useState } from "react";
import "./profileInformation.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function ProfileInfoForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    gender: "",
    dob: "",
  });
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <>
      <section className="registration-form-wrapper">
        <form onSubmit={handleSubmit} className="user-sign-in-form">
          <article className="inner-form-wrapper">
            <section>
              <div className>
                <label>First Name</label>
                <input name="firstName" onChange={handleChange} />
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <label>Last Name</label>
                <input name="lastName" onChange={handleChange} />
              </div>
            </section>
            <section>
              <div className>
                <label>Email</label>
                <input name="email" onChange={handleChange} />
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <label>Mobile Number</label>
                <input name="number" onChange={handleChange} />
              </div>
            </section>
            <section>
              <FormControl component="fieldset">
                <FormLabel component="legend">Your Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <section>
                    <FormControlLabel
                      value="Male"
                      control={<Radio color="primary" />}
                      label="Male"
                      labelPlacement="start"
                      onChange={handleChange}
                      name="gender"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio color="primary" />}
                      label="Female"
                      labelPlacement="start"
                      onChange={handleChange}
                      name="gender"
                    />
                  </section>
                </RadioGroup>
              </FormControl>
            </section>
            <section>
              <div>
                <label>Date of Birth</label>
                <input name="dob" onChange={handleChange} type="date" />
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
