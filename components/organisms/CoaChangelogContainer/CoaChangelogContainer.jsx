import React, { useEffect, useRef, useState } from 'react';
import './coa-changelog-container.scss';
import { Divider, message } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { getChangelog } from '../../../api/projectApi';
import { sortArrayByDate } from '../../utils';
import Loading from '../../molecules/Loading/Loading';
import CoaChangelogItem from '../../atoms/ChangelogItem/CoaChangelogItem';
import jsPDF from 'jspdf';
import customConfig from 'custom-config';

export const CoaChangelogContainer = ({
  title,
  projectId,
  milestoneId,
  activityId,
  revisionId,
  evidenceId,
  userId,
  emptyText,
  withInfinityHeight
}) => {
  const fetchChangelog = useRef();
  const [changeLogs, setChangeLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const pdfRef = useRef(null);

  fetchChangelog.current = async () => {
    setLoading(true);
    const params = { milestoneId, activityId, revisionId, evidenceId, userId };
    const response = await getChangelog(projectId, params);
    if (response.errors || !response.data) {
      message.error('An error occurred while fetching the changelogs');
      return;
    }

    const sortedChangelogs = sortArrayByDate(response.data, 'datetime');
    setChangeLogs(sortedChangelogs);
    setLoading(prevState => !prevState);
  };

  useEffect(() => {
    fetchChangelog.current();
  }, []);

  const generatePDF = () => {
    const doc = jsPDF();
    const content = pdfRef.current;
    doc.html(content);
    return doc.save(`${customConfig.NAME} - changelog.pdf`);
  };

  return (
    <Loading spinning={loading}>
      <div
        className={classNames('o-coaChangelogContainer', {
          '--infinityHeight': withInfinityHeight
        })}
      >
        <div className="o-coaChangelogContainer__header">
          <h3>{title}</h3>
          <CoaTextButton onClick={generatePDF}>Download</CoaTextButton>
        </div>
        <Divider type="horizontal" />

        <div
          className={classNames('o-coaChangelogContainer__body', {
            '--empty': changeLogs.length === 0
          })}
          id="test"
        >
          {changeLogs.length === 0 && (
            <>
              <img src="/static/images/window-icon.png" alt="empty-changelog-list" />
              <p className="o-coaChangelogContainer__emptyText">{emptyText}</p>
            </>
          )}
          {changeLogs.length > 0 &&
            changeLogs.map(changelog => (
              <CoaChangelogItem changelog={changelog} key={changelog.id} />
            ))}
        </div>
      </div>
    </Loading>
  );
};

CoaChangelogContainer.defaultProps = {
  title: 'Project Changelog',
  milestoneId: undefined,
  activityId: undefined,
  revisionId: undefined,
  evidenceId: undefined,
  userId: undefined,
  emptyText: 'No entries in the changelog yet'
};

CoaChangelogContainer.propTypes = {
  title: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  milestoneId: PropTypes.string,
  activityId: PropTypes.string,
  revisionId: PropTypes.string,
  evidenceId: PropTypes.string,
  userId: PropTypes.string,
  emptyText: PropTypes.string
};
