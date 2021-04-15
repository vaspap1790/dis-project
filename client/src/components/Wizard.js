import React, { Fragment, useState, useEffect } from 'react';
import StepWizard from 'react-step-wizard';
import Nav from './WizardNav';
import '../css/wizard.css';
/* eslint react/prop-types: 0 */

const Wizard = () => {
  const [state, updateState] = useState({
    form: {},
    transitions: {}
  });

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;
    updateState({
      ...state,
      form
    });
  };

  const onStepChange = (stats) => {
    // console.log(stats);
  };

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW
    });

  const { SW, demo } = state;

  return (
    <>
      <div className='row'>
        <div className={`col-12 rsw-wrapper`}>
          <StepWizard
            onStepChange={onStepChange}
            isHashEnabled
            nav={<Nav />}
            instance={setInstance}
          >
            <First hashKey={'step1'} update={updateForm} />
            <Second hashKey={'step2'} form={state.form} />
            <Last hashKey={'step3'} />
          </StepWizard>
        </div>
      </div>
    </>
  );
};

export default Wizard;

const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  step
}) => (
  <div>
    <hr />
    <div>Current Step: {currentStep}</div>
    <div>Total Steps: {totalSteps}</div>
    <hr />
    {step > 1 && (
      <button className='btn btn-default btn-block' onClick={previousStep}>
        Go Back
      </button>
    )}
    {step < totalSteps ? (
      <button className='btn btn-primary btn-block' onClick={nextStep}>
        Continue
      </button>
    ) : (
      <button className='btn btn-success btn-block' onClick={nextStep}>
        Finish
      </button>
    )}
  </div>
);

/** Steps */
const First = (props) => {
  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <div>
      <h3 className='text-center'>Welcome! Have a look around!</h3>

      <label>First Name</label>
      <input
        type='text'
        className='form-control'
        name='firstname'
        placeholder='First Name'
        onChange={update}
      />
      <Stats step={1} {...props} />
    </div>
  );
};

const Second = (props) => {
  const validate = () => {
    if (window.confirm('Are you sure you want to go back?')) {
      // eslint-disable-line
      props.previousStep();
    }
  };

  return (
    <div>
      {props.form.firstname && <h3>Hey {props.form.firstname}! 👋</h3>}
      I've added validation to the previous button.
      <Stats step={2} {...props} previousStep={validate} />
    </div>
  );
};

const Last = (props) => {
  const submit = () => {
    alert('You did it! Yay!'); // eslint-disable-line
  };

  return (
    <div>
      <div className={'text-center'}>
        <h3>This is the last step in this example!</h3>
        <hr />
      </div>
      <Stats step={3} {...props} nextStep={submit} />
    </div>
  );
};
