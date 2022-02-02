import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { showSnackbar } from '../../../store/actions/common';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = ({ message, type, open }) => {
  const dispatch = useDispatch();

  const { language } = useSelector(state => state?.common?.store);
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;

    dispatch(showSnackbar(null, '', false));
  };

  return (
    <>
      <Snackbar  autoHideDuration={2000}  open={open} onClose={handleClose} dir={language === 'Arabic' ? 'rtl' : 'ltr'}>
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
