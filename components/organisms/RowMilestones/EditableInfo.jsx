import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Select } from 'antd';

const { Option } = Select;

const EditableInfo = ({
  value,
  isEditing,
  updateValue,
  selectable,
  options,
  placeholder
}) => {
  const input = () => {
    if (selectable) {
      return (
        <Select
          onChange={selected => updateValue(selected)}
          placeholder={placeholder}
          // if value is null use undefined to show placeholder
          defaultValue={value === null ? undefined : value}
        >
          {options &&
            options.map(option => (
              <Option value={option.value} key={option.value}>
                {option.text}
              </Option>
            ))}
        </Select>
      );
    }
    return (
      <Input
        defaultValue={value}
        onChange={target => updateValue(target.currentTarget.value)}
      />
    );
  };

  // this is ugly
  let text = value;
  if (selectable) {
    const found = options.find(a => a.value === value);
    text = found ? found.text : value;
  }

  return (
    <Col className="gutter-row " span={24}>
      {isEditing ? input() : <p>{text}</p>}
    </Col>
  );
};

EditableInfo.defaultProps = {
  value: '',
  isEditing: false,
  updateValue: undefined,
  selectable: false,
  options: [],
  placeholder: ''
};

EditableInfo.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isEditing: PropTypes.bool,
  updateValue: PropTypes.func,
  selectable: PropTypes.bool,
  options: PropTypes.arrayOf({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object
    ]),
    text: PropTypes.string
  }),
  placeholder: PropTypes.string
};

export default EditableInfo;
