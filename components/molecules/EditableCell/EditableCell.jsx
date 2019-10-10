/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Input } from 'antd';

class EditableCell extends React.Component {
  handleChange = evnt => {
    const { fieldtoedit, colkey } = this.props;
    fieldtoedit.data[colkey] = evnt.currentTarget.value;
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
