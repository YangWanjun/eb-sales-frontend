import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Link,
} from '@material-ui/core';
import FormComponent from './Form';
import { common } from '../../utils/common';
import { constant } from '../../utils/constants';
import { history } from '../../utils/store';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(1),
    borderTop: '1px solid lightgray',
  },
  errorStepLabel: {
    color: 'red',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
});

class StepForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleGotoStep = this.handleGotoStep.bind(this);
    this.clean = this.clean.bind(this);
    this.toastError = this.toastError.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.state = {
      activeStep: 0,
      maxStep: 0,
      data: {},
      errors: {},
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
          activeStep: state.activeStep + 1,
          maxStep: state.maxStep <= state.activeStep ? state.activeStep + 1 : state.maxStep,
        };
      });
    } else if (!this.hasForm(name)) {
      this.setState(state => {
        return {
          activeStep: state.activeStep + 1,
          maxStep: state.maxStep <= state.activeStep ? state.activeStep + 1 : state.maxStep,
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

  handleGotoStep(index) {
    const { steps } = this.props;
    if (index !== null && index !== undefined && index >= 0 && index < steps.length) {
      this.setState({activeStep: index});
    }
  }

  handleReset() {
    this.setState({activeStep: 0, maxStep: 0,});
  }

  clean(name) {
    if (name && this['__clean__' + name]) {
      return this['__clean__' + name]();
    } else {
      return null;
    }
  }

  toastError(name, errors) {
    if (name && this['__toastError__' + name]) {
      this['__toastError__' + name](errors);
    } else {
      this.props.showErrorMsg(constant.ERROR.FORM_CHECK_ERROR);
    }
  }

  handleOk = () => {
    const { data } = this.state;
    const { add_url, success_url } = this.props;

    if (add_url) {
      common.fetchPost(add_url, data).then(json => {
        this.props.showSuccessMsg(constant.SUCCESS.SAVED);
        this.setState({errors: null});
        if (this.props.onRowAdded) {
          this.props.onRowAdded(json);
        }
        if (success_url) {
          history.push({'pathname': common.formatStr(success_url, json.pk),});
        }
      }).catch(errors => {
        this.setState({errors});
        const firstKey = Object.keys(errors)[0];
        this.toastError(firstKey, errors[firstKey]);
      });
    }
  }

  render () {
    const { classes, steps, ...props } = this.props;
    const { activeStep, maxStep, data, errors } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => {
            const formName = step.form ? step.form.name : null;
            const formData = (formName && data[formName]) ? data[formName] : step.initial;
            const error = (errors && formName) ? errors[formName] : null;
            return (
              <Step key={index}>
                <StepLabel>
                  {error ? (
                    <Link
                      component="button"
                      className={classes.errorStepLabel}
                      onClick={() => {this.handleGotoStep(index)}}
                    >
                      {step.name}
                    </Link>
                  ) : step.name}
                </StepLabel>
                <StepContent>
                  <div>
                    {step.form ? (
                      <FormComponent
                        {...step.form}
                        {...props}
                        classes={classes}
                        ref={(form) => {
                          this['__clean__' + formName] = form && form.clean;
                          this['__toastError__' + formName] = form && form.toastError;
                        }}
                        data={formData}
                        errors={error}
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
        {maxStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            {activeStep === steps.length ? (
              <Button onClick={this.handleBack} className={classes.button}>
                Back
              </Button>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleOk}
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
