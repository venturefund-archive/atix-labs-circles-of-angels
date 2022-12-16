import React from 'react';
import './coa-changelog-container.scss';
import { Divider } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';

export const CoaChangelogContainer = () => {
  return (
    <div className="o-coaChangelogContainer">
      <div className="o-coaChangelogContainer__header">
        <h3>Project Changelog</h3>
        <CoaTextButton>Download</CoaTextButton>
      </div>
      <Divider type="horizontal" />
    </div>
  );
};
