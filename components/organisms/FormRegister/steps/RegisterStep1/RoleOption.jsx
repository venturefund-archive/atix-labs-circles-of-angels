/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const RoleOption = ({ onSelect, title, usertype, value, selected }) => {
  const selectedClass = selected ? 'selectedOption' : '';

  return (
    <Col sm={24} md={8} lg={8}>
      <button
        onClick={() => onSelect(value)}
        className={`OptionsUsers ${selectedClass}`}
        selected={selected}
      >
        <div>
          <img src="./static/images/icon-users-small.svg" alt="platformusers" />
          <h1>{title}</h1>
          <p>{usertype}</p>
        </div>
      </button>
    </Col>
  );
};

export default RoleOption;

RoleOption.defaultProps = {
  title: ''
};

RoleOption.propTypes = {
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string,
  usertype: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired
};
