import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon
} from "react-share";

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
    width: '25%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  heading: {
    textAlign: 'center'
  },

}));

export default function ShareIcons({ styles, product, language,translate }) {
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

      <div>
        <h1 className={classes.heading}>RIVA</h1>
        <h5 className={classes.heading}>Share your favourite products</h5>
        <h5 className={classes.heading}>
          <FacebookShareButton
            url={window.location.href}
            quote={product?.name}
            className={styles.socialMediaPopper}
            hashtag="#rivaapp"
          >
            <FacebookIcon size={36} />
          </FacebookShareButton>
          <TwitterShareButton
            url={window.location.href}
            title={product?.name}
            className={styles.socialMediaPopper}
            hashtag="#rivaapp"
          >
            <TwitterIcon size={36} />
          </TwitterShareButton>
          <LinkedinShareButton
            url={window.location.href}
            title={product?.name}
            className={styles.socialMediaPopper}
            hashtag="#rivaapp"
          >
            <LinkedinIcon size={36} />
          </LinkedinShareButton>
          <WhatsappShareButton
            url={window.location.href}
            className={styles.socialMediaPopper}
            title={product?.name}
            separator=":: "
          >
            <WhatsappIcon size={36} />
          </WhatsappShareButton>
        </h5>
      </div>
    </div>

  );

  return (
    <div dir={language === 'Arabic' ? 'rtl' : 'ltr'}>
      <span onClick={handleOpen}>
        {translate?.details?.SHARE}
      </span>
      <Modal
        dir={language === 'Arabic' ? 'rtl' : 'ltr'}
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
