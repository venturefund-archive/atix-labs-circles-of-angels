import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';

const FooterButtons = ({ finishButton, nextStepButton, prevStepButton, errors }) => (
  <div className="footerButtons__container">
    <div>{prevStepButton}</div>
    <div className="footerButtons__container__right">
      <div className="footerButtons__container__right__nextButtonContainer">
        <div>
          {errors.map(error => (
            <div className="footerButtons__container__right__nextButtonContainer__error">
              {error}
            </div>
          ))}
        </div>
        {nextStepButton}
      </div>
      {!!finishButton && <div>{finishButton}</div>}
    </div>
  </div>
);

FooterButtons.defaultProps = {
  nextStepButton: undefined,
  finishButton: undefined,
  prevStepButton: undefined,
  errors: []
};

FooterButtons.propTypes = {
  finishButton: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.any)]),
  prevStepButton: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.any)]),
  nextStepButton: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.any)]),
  errors: PropTypes.arrayOf(PropTypes.string)
};

export default FooterButtons;
