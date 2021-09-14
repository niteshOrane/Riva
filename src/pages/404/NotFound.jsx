import React from 'react';
import { Button, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = props => {
  const { classes = {} } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={`${styles.heading} ${classes.primaryText}`}>
          {' '}
          404 Error{' '}
        </p>
        <p className={`${styles.subtitle} ${classes.primaryText}`}>
          {' '}
          We couldn’t find what you are looking for !{' '}
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="primary" className={styles.action}>
            <Icon>home</Icon>{' '}
            <span className={styles.actionText}> Go to Home </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
