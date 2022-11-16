import { Icon } from 'antd';
import {
  FEEDBACK_MESSAGE_ICONS,
  ICON_CLASSES_BY_FEEDBACK_TYPE
} from 'components/organisms/AssignProjectUsers/constants';
import React, { useState, useEffect } from 'react';
import './feedback-message.scss';
import PropTypes from 'prop-types';

export const FeedbackMessage = ({ message, type, seconds, show, className }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(show);
  }, [show]);

  useEffect(() => {
    let timeout;
    if (showMessage && seconds > 0) {
      timeout = setTimeout(() => {
        setShowMessage(false);
      }, [seconds * 1000]);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showMessage, seconds]);

  return (
    <div className={`feedbackMessage__container ${showMessage ? '--show' : '--hide'} ${className}`}>
      <Icon
        type={FEEDBACK_MESSAGE_ICONS[type]}
        theme="filled"
        className={`feedbackMessage__container__icon --${ICON_CLASSES_BY_FEEDBACK_TYPE[type]}`}
      />
      <p>{message}</p>
    </div>
  );
};

FeedbackMessage.defaultProps = {
  message: undefined,
  type: undefined,
  seconds: undefined,
  show: false,
  className: ''
};

FeedbackMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  seconds: PropTypes.number,
  show: PropTypes.bool,
  className: PropTypes.string
};
