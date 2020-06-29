/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

const LinkButton = ({ className, text }) => (
  <div className={className}>
    <img src="./static/images/download-file.svg" alt="download" />
    <a className="download">Download</a>
    {text}
  </div>
);

LinkButton.defaultProps = {
  className: ''
};

LinkButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default LinkButton;
