import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from '../../Loader';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const LoadingButton = (props) => {
  const [parentSize, setParentSize] = useState(0);
  const parentRef = useRef(null);
  useEffect(() => {
    const { clientHeight = 30, clientWidth = 20 } = parentRef.current;

    setParentSize(Math.min(clientHeight, clientWidth));
  }, []);
  const { classes, loading, className, ...other } = props;
  return (<>
    <Button disabled={loading} ref={parentRef} className={`${className}`} {...other} />
    {loading ? <Loader/> : null} </>
  );
}

LoadingButton.defaultProps = {
  loading: false,
  done: false,
};

LoadingButton.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  done: PropTypes.bool,
};

export default withStyles(styles)(LoadingButton);