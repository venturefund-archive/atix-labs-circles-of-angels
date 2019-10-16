/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
// import './_style.scss';

export default class RegisterStep extends React.Component {
  constructor(props) {
    super(props);
    console.log('registration step called', props);
    this.state = {
      // stepName: props.stepName
    };
  }
  // componentDidMount() {}
  // getStep(step) {
  //   switch (step) {
  //     case 1:
  //       return <PersonalInfoStep />
  //     case 2:
  //         return <RoleSelectionStep />
  //     case 3:
  //         return <RoleQuestionsStep />
  //     case 4:
  //         return <CongratsStep />
  //     }
  // }
  // getNextStepButton(step) {
  //   return (
  //     <button
  //       onClick={this.nextStep()}
  //       value={step < 4 ? 'Continue' : 'Finish'}
  //     />
  //   );
  // }
  // render() {
  //   const {stepName, currentStep } = this.state;
  //   <div id={stepName}>
  //     {/* {this.getStep(currentStep)} */}
  //     {this.getNextStepButton(currentStep)}
  //   </div>
  // }
}

// export default RegistrationStep;
