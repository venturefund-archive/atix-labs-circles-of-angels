/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import './_style.scss';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MemberListCard from '../MemberListCard/MemberListCard';
import TitlePage from '../../atoms/TitlePage/TitlePage';

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

const MemberList = () => (
  <div className="column MemberList">
    <TitlePage textTitle="Project Members" />
    <div style={{ width: 300 }} className="flex">
      <Input placeholder="Search by Name" prefix={<SearchOutlined />} />
      <Select
        showSearch
        style={{ width: 300, marginLeft: '1em' }}
        placeholder="Select by Country"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="Argentina">Argentina</Option>
        <Option value="Uruguay">Uruguay</Option>
        <Option value="Brasil">Brasil</Option>
      </Select>
    </div>
    <div className="flex cardSection">
      <MemberListCard />
      <MemberListCard />
      <MemberListCard />
      <MemberListCard />
      <MemberListCard />
      <MemberListCard />
    </div>
  </div>
);

export default MemberList;
