import React from 'react';
import { Input } from 'antd';

class EditableCell extends React.Component {
  handleChange = evnt => {
    const { fieldToEdit, colKey } = this.props;
    fieldToEdit.data[colKey] = evnt.currentTarget.value;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Input
            defaultValue={record[dataIndex]}
            onChange={this.handleChange}
          />
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

export default EditableCell;
