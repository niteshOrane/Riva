import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },

  switchBase: {
    padding: 1,
    "& + $track": {
      backgroundColor: "#cccccc",
    },
    "&$checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + $track": {
        backgroundColor: "#59a5fe",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

function MySubscription() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="circlesContainer">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">My Subscription</h2>
            <div className="mt-20px">
              <div className="d-flex align-items-center">
                <p className="w-100" style={{ maxWidth: "350px" }}>
                  Receive our Top Offer Details Via Email
                </p>
                <IOSSwitch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                />
              </div>
              <div className="d-flex align-items-center">
                <p className="w-100" style={{ maxWidth: "350px" }}>
                  Receive Top Deals Via Sms
                </p>
                <IOSSwitch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySubscription;
