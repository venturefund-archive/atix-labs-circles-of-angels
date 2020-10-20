/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

const LinkButton = ({ text }) => (
  <>
    <img
      style={{ height: '80%' }}
      src="./static/images/download-file.svg"
      alt="download"
    />
    {text}
  </>
);

LinkButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default LinkButton;
