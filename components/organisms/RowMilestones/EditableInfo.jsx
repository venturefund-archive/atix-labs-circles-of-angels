import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const EditableInfo = ({ value, isEditing, updateValue }) => (
  <Col className="gutter-row " span={24}>
    {isEditing ? (
      <input
        defaultValue={value}
        onChange={target => updateValue(target.currentTarget.value)}
      />
    ) : (
      <p>{value}</p>
    )}
  </Col>
);

EditableInfo.defaultProps = {
  value: '',
  isEditing: false,
  updateValue: undefined
};

EditableInfo.propTypes = {
  value: PropTypes.string,
  isEditing: PropTypes.bool,
  updateValue: PropTypes.func
};

export default EditableInfo;
