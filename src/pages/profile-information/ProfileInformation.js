import React from "react";
import Container from "@material-ui/core/Container";
import "./profileInformation.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function ProfileInformation() {
  return (
    <Container>
      <section className = "registration-form-wrapper">
        <form className="user-sign-in-form">
          <section>
            <div className>
              <label>First Name</label>
              <input />
            </div>
            <div style={{ marginLeft: "2rem" }}>
              <label>Last Name</label>
              <input />
            </div>
          </section>
          <section>
            <div className>
              <label>Email</label>
              <input />
            </div>
            <div style={{ marginLeft: "2rem" }}>
              <label>Mobile Number</label>
              <input />
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
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio color="primary" />}
                    label="Female"
                    labelPlacement="start"
                  />
                </section>
              </RadioGroup>
            </FormControl>
          </section>
          <section>
            <div>
              <label>Date of Birth</label>
              <input type="date" />
            </div>
          </section>
        </form>
      </section>
      <section  className = "registration-submit-btn-wrapper">
           <button type="submit" className = "registration-btn">Submit</button>
      </section>
    </Container>
  );
}

export default ProfileInformation;
