import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { errorHandler } from '../../../store/actions/common';

class AlertComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    };
  }

  static getDerivedStateFromProps(props) {
    const { visible } = props;
    return { visible };
  }

  onPrimaryAction = () => {
    const { primaryHandler, errorHandler: action__errorHandler } = this.props;
    //primaryHandler?.();
    action__errorHandler(null);
    this.setState({
      visible: false,
    });
  };

  onSecondaryAction = () => {
    const { secondaryHandler, errorHandler: action__errorHandler } = this.props;
    //secondaryHandler?.();
    action__errorHandler(null);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    const { title, message, primaryActionText, secondaryActionText } =
      this.props;

    return (
      <Dialog open={visible}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onSecondaryAction} color="primary">
            {secondaryActionText}
          </Button>
          <Button onClick={this.onPrimaryAction} color="primary">
            {primaryActionText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(null, { errorHandler })(AlertComponent);
