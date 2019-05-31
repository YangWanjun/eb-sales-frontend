import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@material-ui/core';
import FormComponent from './Form';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit,
    borderTop: '1px solid lightgray',
  },
});

class StepForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.clean = this.clean.bind(this);
    this.state = {
      activeStep: 0,
      data: {},
    };
  }

  handleNext = (name) => () => {
    const formData = this.clean(name);
    if (formData) {
      this.setState(state => {
        let data = state.data;
        data[name] = formData;
        return {
          data,
          activeStep: state.activeStep + 1
        };
      });
    } else if (!this.hasForm(name)) {
      this.setState(state => {
        return {
          activeStep: state.activeStep + 1
        };
      });
    }
  }

  hasForm(name) {
    const forms = this.props.steps.filter(step => {
      if (step.form && step.form.name === name) {
        return true;
      } else {
        return false;
      }
    });
    return forms.length > 0;
  }

  handleBack() {
    this.setState(state => {
      return {activeStep: state.activeStep - 1};
    });
  }

  handleReset() {
    this.setState({activeStep: 0});
  }

  clean(name) {
    if (name && this['__clean__' + name]) {
      return this['__clean__' + name]();
    } else {
      return null;
    }
  }

  render () {
    const { classes, steps, ...props } = this.props;
    const { activeStep, data } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => {
            const formName = step.form ? step.form.name : null;
            const formData = (formName && data[formName]) ? data[formName] : step.data;
            return (
              <Step key={index}>
                <StepLabel>{step.name}</StepLabel>
                <StepContent>
                  <div>
                    {step.form ? (
                      <FormComponent
                        {...step.form}
                        {...props}
                        classes={classes}
                        ref={(form) => {
                          this['__clean__' + formName] = form && form.clean;
                        }}
                        data={formData}
                      />
                    ) : null}
                  </div>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext(formName)}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              &nbsp;&nbsp;&nbsp;確定&nbsp;&nbsp;&nbsp;
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(StepForm);
