import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import * as icons from '../../../../../../common/Icons/Icons';
import StepConnector from '@material-ui/core/StepConnector';
import styles from './Stepper.module.scss';
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: '50%',
    left: '-100%',
    right: '0',
  },
  active: {
    '& $line': {
      background: '#000',
    },
  },
  completed: {
    '& $line': {
      background: '#000',
    },
  },
  line: {
    height: 5,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    background: '#000',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    background: '#000',
  },
  test: {
    background: 'red',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const stepperIcons = {
    1: <icons.Check />,
    2: <icons.StepperUser />,
    3: <icons.Truck />,
    4: <icons.StepperExpectedBy />,
  };

  return (
    <div className={completed ? styles.completed : styles.not_completed}>
      {stepperIcons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  steperBody: {
    padding: '0',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    {
      name: 'Ordered',
      text: 'Thu, 13th May',
    },
    {
      name: 'Packed',
      text: 'Fri, 14th May',
    },
    {
      name: 'Shipped',
      text: 'Fri, 14th May',
    },
    {
      name: 'Delivered',
      text: 'Expeted by Mon, 17th',
    },
  ];
}

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return "step one...";
//     case 1:
//       return "What is an ad group anyways?";
//     case 2:
//       return "This is the bit I really care about!";
//     case 3:
//       return "testing third step!";
//     default:
//       return "Unknown step";
//   }
// }

export default function OrderStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const steps = getSteps();

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.steperBody}
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, i) => (
          <Step className="text-center" key={label}>
            <div className="my-12px">{label.name}</div>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <p
                className={`font-weight-600  ${
                  i === 3 ? 'color-black' : 'greyText'
                }`}
              >
                {label.text}
              </p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={styles.orderPlacedMsg}>
        <div className={styles.border}></div>
        <p>Your Order hs been placed.</p>
        <div className={styles.placedDate}>
          <small className="d-inline-block greyText">Thu, 13th May</small>
          <small className="d-inline-block greyText">9:20 pm</small>
        </div>
      </div>
      {/* <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
