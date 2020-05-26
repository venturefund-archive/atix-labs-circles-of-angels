/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Input, Select } from 'antd';
import './_style.scss';

const { Option } = Select;
const { TextArea } = Input;

function ModalMemberSelection() {
  return (
    <div className="memberSelection column">
      <p>Aplicant</p>
      <Input placeholder="Paste aplicant info" />
      <p>Rol</p>
      <Select defaultValue="Option1">
        <Option value="Option1">Option1</Option>
        <Option value="Option2">Option2</Option>
      </Select>
      <p>Description</p>
      <TextArea rows={4} placeholder="Type description" />
    </div>
  );
}

export default ModalMemberSelection;
