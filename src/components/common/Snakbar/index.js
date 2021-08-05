import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { showSnackbar } from '../../../store/actions/common';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = ({ message, type, open }) => {
  const dispatch = useDispatch();

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;

    dispatch(showSnackbar(null, '', false));
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  message: state.common.snackbar?.error,
  type: state.common.snackbar?.severity,
  open: state.common.snackbar?.open,
});

export default connect(mapStateToProps)(SnackBar);
