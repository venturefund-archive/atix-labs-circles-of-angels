import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const LinkButton = ({ className, iconType, text }) => (
  <div className={className}>
    <img src='./static/images/download-file.svg' alt="download"/>
    <a className="download">Download</a>
    {text}
  </div>
);

LinkButton.defaultProps = {
  className: '',
  iconType: 'download'
};

LinkButton.propTypes = {
  className: PropTypes.string,
  iconType: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default LinkButton;
