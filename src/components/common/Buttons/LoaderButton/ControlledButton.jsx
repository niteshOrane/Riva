import React from 'react';
import LoadingButton from './index';

const ControlledButton = (props) => {
  const { onClick, loading, value, ...other } = props;
  return (
    <LoadingButton
        loading={loading}
        {...other}
        onClick={(e) => { onClick(e); }}
      >
        {value}
      </LoadingButton>
  );
}
export default ControlledButton;