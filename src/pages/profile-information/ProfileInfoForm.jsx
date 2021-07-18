import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './profileInformation.scss';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { profileUpdate, getProfileUpdate } from '../../services/dashboard/dashboard.service';
import { showSnackbar } from '../../store/actions/common';
import { setCustomer } from '../../store/actions/auth';

function ProfileInfoForm() {
  const customer = useSelector((state) => state.auth.customer);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    firstname: customer?.firstname,
    lastname: customer?.lastname,
    email: customer?.email,
    number: customer?.mobile,
    gender: customer.gender,
    dob: customer.dob,
  });
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cust = new FormData();

    cust.append('customerid', customer.customerID);
    cust.append('firstname', values.firstname);
    cust.append('email', values.email);
    cust.append('lastname', values.lastname);
    cust.append('dob', values.dob);
    cust.append('gender', values.gender);

    const res = await profileUpdate(cust);

    if (res.status === 200) {
      dispatch(
        setCustomer({
          ...values,
        })
      );
      return dispatch(showSnackbar(res?.data?.data, 'success'));
    }
    return dispatch(showSnackbar('Something went wrong', 'error'));
  };
  return (
    <>
      <section className="registration-form-wrapper">
        <form onSubmit={handleSubmit} className="user-sign-in-form">
          <article className="inner-form-wrapper">
            <section>
              <div className>
                <label>First Name</label>
                <input
                  value={values?.firstname}
                  name="firstname"
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginLeft: '2rem' }}>
                <label>Last Name</label>
                <input
                  name="lastname"
                  value={values?.lastname}
                  onChange={handleChange}
                />
              </div>
            </section>
            <section>
              <div className>
                <label>Email</label>
                <input
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginLeft: '2rem' }}>
                <label>Mobile Number</label>
                <input
                  name="number"
                  value={values?.number}
                  onChange={handleChange}
                />
              </div>
            </section>
            <section>
              <FormControl component="fieldset">
                <FormLabel component="legend">Your Gender</FormLabel>
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
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio color="primary" />}
                      label="Female"
                      labelPlacement="start"
                      name="gender"
                    />
                  </section>
                </RadioGroup>
              </FormControl>
            </section>
            <section>
              <div>
                <label>Date of Birth</label>
                <input
                  value={values.dob}
                  placeholder="Select DOB"
                  name="dob"
                  onChange={handleChange}
                  type="date"
                />
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
