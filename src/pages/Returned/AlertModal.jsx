import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Divider } from "@material-ui/core";

function getModalStyle() {
  const top = "50";
  const left = "50";

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    lineHeight:1.5
  },
  list:{
    "&::first-letter":{
      textTransform:"capitalize"
    }
  }
}));

export default function AlertModal({ open, handleClose, data }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Action Required</h2>
      <span>
        Please select below fields on <strong>{data?.name}</strong>
      </span>
      <Divider />
      <p id="simple-modal-description">
        <ul>
          {data?.keys?.map((li) => (
            <li className={classes.list}>{li}</li>
          ))}
        </ul>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
