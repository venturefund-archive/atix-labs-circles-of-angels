import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './_style.scss';

const Loading = ({ spinning, children }) => (
  <Spin spinning={spinning}>{children}</Spin>
);

export default Loading;

Loading.defaultProps = {
  spinning: true
};

Loading.propTypes = {
  spinning: PropTypes.bool,
  children: PropTypes.element.isRequired
};
