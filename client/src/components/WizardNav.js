import React from 'react';
/* eslint react/prop-types: 0 */
import '../css/nav.css';

const WizardNav = (props) => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    dots.push(
      <span
        key={`step-${i}`}
        className={isActive ? 'active-wizard dot' : 'dot'}
        onClick={() => props.goToStep(i)}
      >
        &bull;
      </span>
    );
  }

  return <div className='nav-wizard'>{dots}</div>;
};

export default WizardNav;
