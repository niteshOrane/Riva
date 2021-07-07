import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import ChangePasswordForm from "../../components/pages/Dashboard/Accounts/ChangePasswordForm/ChangePasswordForm";
import { showSnackbar } from "../../store/actions/common";
import { useDispatch } from "react-redux";
import { changePassword } from "../../services/auth/auth.service";
import styles from "./ChangePassword.module.scss";

function ChangePassword() {
  const [values, setValues] = React.useState({
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
    otp: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e, values) => {
    e.preventDefault();
    const { currentPassword, newPassword, retypePassword, otp } = values;
    if (!currentPassword || !newPassword || !retypePassword || !otp)
      return dispatch(showSnackbar("All fields are required", "error"));

    const user = new FormData();
    user.append("email", "abwwwwwdddddcrrrrrrrrrr@gmail.com");
    user.append("oldpassword", currentPassword);
    user.append("newpassword", newPassword);
    // user.append("retypePassword", retypePassword);
    const res = await changePassword(user);
    if (res.status === 200) {
      setValues({
        currentPassword: "",
        newPassword: "",
        retypePassword: "",
        otp: "",
      });
      return dispatch(showSnackbar(res.data.data, "success"));
    }
    return dispatch(showSnackbar("Something went wrong", "error"));
  };

  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className={styles.circlesContainer}>
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">Change Password</h2>
            <ChangePasswordForm
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
