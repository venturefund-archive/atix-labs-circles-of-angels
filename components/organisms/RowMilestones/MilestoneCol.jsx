import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

// what's the point of this component
// it's the same as MilestoneRow but with no default className
const MilestoneCol = ({ className, span, children }) => (
  <Col
    className={`gutter-row ${className}`}
    xs={{ span: 24 }}
    sm={{ span: 24 }}
    md={18}
    lg={{ span }}
  >
    {children}
  </Col>
);

MilestoneCol.defaultProps = {
  className: ''
};

MilestoneCol.propTypes = {
  className: PropTypes.string,
  span: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default MilestoneCol;
