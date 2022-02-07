import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import ChangePasswordForm from "../../components/pages/Dashboard/Accounts/ChangePasswordForm/ChangePasswordForm";
import { showSnackbar } from "../../store/actions/common";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../services/auth/auth.service";
import styles from "./ChangePassword.module.scss";
import useArabic from "../../components/common/arabicDict/useArabic";

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
  const {translate} = useArabic();

  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, retypePassword, otp } = values;

    if (newPassword !== retypePassword)
      return dispatch(showSnackbar("Passwords not match", "error"));

    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

    if (!re.test(newPassword))
      return dispatch(
        showSnackbar(
          "Password must be at least 8 characters long with 1 Uppercase, 1 Lowercase & 1 Number character.",
          "error"
        )
      );

    if (!currentPassword || !newPassword || !retypePassword)
      return dispatch(showSnackbar("All fields are required", "error"));

    const user = new FormData();
    user.append("email", auth?.customer?.email || "");
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
      if(res?.data?.message){
        return dispatch(showSnackbar(res.data.message, "warning"));
      }
      return dispatch(showSnackbar(res.data.data, "success"));
    }
    return dispatch(showSnackbar("Something went wrong", "error"));
  };

  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">{translate?.dash?.CHANGE}</h2>
            <ChangePasswordForm
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              translate={translate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
