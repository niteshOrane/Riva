/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Dialog from '@material-ui/core/Dialog';
import * as icons from '../../../Icons/Icons';
import CreatePasswordForm from './CreatePasswordForm';
import styles from '../SignUpCard.module.scss';

const CreatePassword = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const parsed = queryString.parse(props?.location?.search);
    if (parsed && Object.keys(parsed).length && parsed?.token && parsed?.fid) {
      setIsOpen(true)
    }
  }, [])
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={isOpen}
    >
      <div className={styles.popupBody}>
        <button
          type="button"
          onClick={handleClose}
          title="Close"
          className={`bg-transparent no-border ${styles.close}`}
        >
          <icons.Close />
        </button>
        <CreatePasswordForm handleSubmit={handleClose} props={props} />
      </div>
    </Dialog>
  );
};

export default CreatePassword;
