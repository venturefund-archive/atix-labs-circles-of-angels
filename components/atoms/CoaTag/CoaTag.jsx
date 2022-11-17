import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './coa-tag.scss';

export const CoaTag = ({ children, predefinedColor, predefinedSize }) => (
  <Tag
    className={classNames('coaTag', {
      [`--${predefinedColor}`]: Boolean(predefinedColor),
      [`--${predefinedSize}`]: Boolean(predefinedSize)
    })}
  >
    {children}
  </Tag>
);

CoaTag.defaultProps = {
  children: '',
  predefinedColor: '',
  predefinedSize: 'small'
};

CoaTag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  predefinedColor: PropTypes.oneOf(['green', 'orange', 'yellow', 'gray', 'blue', 'red']),
  predefinedSize: PropTypes.oneOf(['small', 'big'])
};
