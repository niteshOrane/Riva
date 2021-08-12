import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 590,
    height:264,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display:"flex"
  },
  heading:{
    margin:"30px 70px 21px 87px "
  },
  input: {
    height: 42,
    width: 200,
    padding: "3px",
    border: "2px solid black",
    outline: "none",
    marginTop:"10px",
  },
  btn: {
    padding:"10px",
    backgroundColor:"#000",
    color:"#fff",
    marginTop:"10px",
    border:"none",
    cursor:"pointer"
},
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="w-50">
        <img src ="/assets/images/sub.jpg" alt="" />
      </div>
      <div>
        <h1 className={classes.heading}>RIVA</h1>
        <span>Subscribe to the Riva fashion website to receive timely updates to your favourite products</span>
        <div className="d-flex">
          <input className={classes.input} placeholder="Enter Your Mail" />
          <button className={classes.btn}>Subscibe</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <span  onClick={handleOpen}>
        Share
      </span>
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
