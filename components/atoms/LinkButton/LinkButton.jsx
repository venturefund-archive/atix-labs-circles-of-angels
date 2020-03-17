import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const LinkButton = ({ className, iconType, text }) => (
  <div className={className}>
    <Icon type={iconType} />
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
