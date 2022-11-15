import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';

const FooterButtons = ({ finishButton, nextStepButton, prevStepButton }) => (
  <div className="footerButtons__container">
    <div>{prevStepButton}</div>
    <div className="footerButtons__container__right">
      {nextStepButton}
      {!!finishButton && <div>{finishButton}</div>}
    </div>
  </div>
);

FooterButtons.defaultProps = {
  nextStepButton: undefined,
  finishButton: undefined,
  prevStepButton: undefined
};

FooterButtons.propTypes = {
  finishButton: PropTypes.func,
  prevStepButton: PropTypes.func,
  nextStepButton: PropTypes.func
};

export default FooterButtons;
