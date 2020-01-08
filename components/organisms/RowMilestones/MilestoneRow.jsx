import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const MilestoneRow = ({ className, children }) => (
  <Col
    className={`gutter-row ${className}`}
    xs={{ span: 24 }}
    sm={{ span: 24 }}
    md={19}
    lg={{ span: 19 }}
  >
    {children}
  </Col>
);

MilestoneRow.defaultProps = {
  className: 'TableMilestones'
};

MilestoneRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default MilestoneRow;
