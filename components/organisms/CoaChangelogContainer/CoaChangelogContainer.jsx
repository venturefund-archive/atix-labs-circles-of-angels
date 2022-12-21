import React, { useState } from 'react';
import './coa-changelog-container.scss';
import { Divider } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const CoaChangelogContainer = ({ title, emptyText }) => {
  const [changeLogs, setChangeLogs] = useState([]);
  return (
    <div className="o-coaChangelogContainer">
      <div className="o-coaChangelogContainer__header">
        <h3>{title}</h3>
        <CoaTextButton>Download</CoaTextButton>
      </div>
      <Divider type="horizontal" />
      <div
        className={classNames('o-coaChangelogContainer__body', {
          '--empty': changeLogs.length === 0
        })}
      >
        {changeLogs.length === 0 && (
          <>
            <img src="/static/images/window-icon.png" alt="empty-changelog-list" />
            <p className="o-coaChangelogContainer__emptyText">{emptyText}</p>
          </>
        )}
      </div>
    </div>
  );
};

CoaChangelogContainer.defaultProps = {
  title: 'Changelog',
  emptyText: 'No entries in the changelog yet'
};

CoaChangelogContainer.propTypes = {
  title: PropTypes.string,
  emptyText: PropTypes.string
};
