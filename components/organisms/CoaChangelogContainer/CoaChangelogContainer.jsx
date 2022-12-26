import React, { useEffect, useRef, useState } from 'react';
import './coa-changelog-container.scss';
import { Divider, message } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import customConfig from 'custom-config';
import changelogActions from 'constants/ChangelogActions';
import { getChangelog } from '../../../api/projectApi';
import { formatDate, sortArrayByDate } from '../../utils';
import Loading from '../../molecules/Loading/Loading';
import CoaChangelogItem from '../../atoms/ChangelogItem/CoaChangelogItem';

export const CoaChangelogContainer = ({
  title,
  projectId,
  milestoneId,
  activityId,
  revisionId,
  evidenceId,
  userId,
  emptyText,
  withInfinityHeight,
  currency
}) => {
  const fetchChangelog = useRef();
  const [changeLogs, setChangeLogs] = useState([]);
  const [processedChangeLogs, setProcessedChangeLogs] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const _processedChangeLogs = changeLogs?.map(changelog => [
      formatDate(changelog?.datetime),
      changelogActions(changelog)?.[changelog?.action]?.title,
      changelogActions(changelog)?.[changelog?.action]?.description,
      changelog?.transaction,
      changelog?.revision
    ]);
    setProcessedChangeLogs(_processedChangeLogs);
  }, [changeLogs]);

  function generatePDF() {
    const doc = new jsPDF();

    doc.addImage('/static/images/aqua-logo.png', 'png', 90, 10);

    doc.addImage('/static/images/changelog-title.png', 'png', 10, 20);

    autoTable(doc, {
      startY: 30,
      margin: { horizontal: 10 },
      head: [['Date', 'Title', 'Description', 'Transaction', 'Revision']],
      body: processedChangeLogs,
      rowPageBreak: 'avoid',
      headStyles: {
        fillColor: [241, 243, 255],
        textColor: [82, 91, 107],
        halign: 'center'
      },
      bodyStyles: {
        fillColor: [241, 243, 255]
      },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      columnStyles: { 0: { halign: 'center' }, 4: { halign: 'center' } }
    });

    doc.save(`${customConfig.NAME} - changelog.pdf`);
  }

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
              <CoaChangelogItem changelog={changelog} key={changelog.id} currency={currency} />
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
  emptyText: 'No entries in the changelog yet',
  withInfinityHeight: false
};

CoaChangelogContainer.propTypes = {
  title: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  milestoneId: PropTypes.string,
  activityId: PropTypes.string,
  revisionId: PropTypes.string,
  evidenceId: PropTypes.string,
  userId: PropTypes.string,
  emptyText: PropTypes.string,
  withInfinityHeight: PropTypes.bool
};
