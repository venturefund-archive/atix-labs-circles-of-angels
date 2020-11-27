import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const RoleOption = ({ onSelect, title, usertype, value, selected, image }) => {
  const selectedClass = selected ? 'selectedOption' : '';

  return (
    <Col sm={24} md={12} lg={12}>
      <button
        onClick={() => onSelect(value)}
        className={`OptionsUsers ${selectedClass}`}
        selected={selected}
        type="button"
      >
        <div>
          <img src={image} alt="platformusers" />
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
  selected: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
