import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import './coa-changelog-container.scss';
import { Divider, message, Icon } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import customConfig from 'custom-config';
import { getDateAndTime } from 'helpers/utils';
import changelogActions, { CHANGELOG_ACTIONS_ENUM } from 'constants/ChangelogActions';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { RubikMedium } from 'components/utils/Rubik-Medium';
import { getChangelog } from '../../../api/projectApi';
import { sortArrayByDate } from '../../utils';
import Loading from '../../molecules/Loading/Loading';
import CoaChangelogItem from '../../atoms/ChangelogItem/CoaChangelogItem';

export const CoaChangelogContainer = forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const fetchChangelog = useRef();
    const [changeLogs, setChangeLogs] = useState([]);
    const [processedChangeLogs, setProcessedChangeLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { texts } = React.useContext(DictionaryContext);

    fetchChangelog.current = async () => {
      setLoading(true);
      const params = { milestoneId, activityId, revisionId, evidenceId, userId };
      const response = await getChangelog(projectId, params);
      if (response.errors || !response.data) {
        message.error(texts?.changelog?.error || 'An error occurred while fetching the changelogs');
        return;
      }

      const _processedChangelogs = sortArrayByDate(response.data, 'datetime').filter(changelog =>
        Object.values(CHANGELOG_ACTIONS_ENUM).includes(changelog?.action)
      );
      setChangeLogs(_processedChangelogs);
      setLoading(prevState => !prevState);
    };

    useImperativeHandle(ref, () => ({
      fetchChangelog: fetchChangelog.current
    }));

    useEffect(() => {
      fetchChangelog.current();
    }, []);

    useEffect(() => {
      const _processedChangeLogs = changeLogs?.map(changelog => [
        getDateAndTime(changelog?.datetime, 'minimal'),
        changelogActions(changelog, texts)?.[changelog?.action]?.titleText,
        changelogActions(changelog, texts)?.[changelog?.action]?.descriptionText,
        changelog?.transaction,
        changelog?.revision
      ]);
      setProcessedChangeLogs(_processedChangeLogs);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeLogs]);

    async function generatePDF() {
      const doc = new jsPDF();
      const imageUrl = customConfig.LARGE_LOGO_PATH_PNG;
      doc.addFileToVFS('Rubik-Regular.ttf', RubikMedium);
      doc.addFont('Rubik-Regular.ttf', 'Rubik', 'medium');

      doc.addImage(imageUrl, 'png', 10, 10, 70, 10);

      doc
        .setFont('Rubik', 'medium')
        .setFontSize(16)
        .setTextColor('#4C7FF7');
      doc.text('Blockchain Changelog', 10, 33);
      /* doc.addImage('/static/images/changelog-title.png', 'png', 10, 20); */

      autoTable(doc, {
        startY: 40,
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
        columnStyles: { 0: { halign: 'center' }, 3: { cellWidth: 50 }, 4: { halign: 'center' } }
      });

      doc.save(`${customConfig.ORGANIZATION_NAME} - changelog.pdf`);
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
            <CoaTextButton onClick={generatePDF}>
              <Icon type="download" />
              {texts?.general?.btnDownload || 'Download'}
            </CoaTextButton>
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
                <p className="o-coaChangelogContainer__emptyText">
                  {texts?.changelog?.empty || emptyText}
                </p>
              </>
            )}
            {changeLogs.length > 0 &&
              changeLogs.map(changelog => (
                <CoaChangelogItem
                  changelog={changelog}
                  key={changelog.id}
                  currency={currency}
                  texts={texts}
                />
              ))}
          </div>
        </div>
      </Loading>
    );
  }
);

CoaChangelogContainer.defaultProps = {
  title: 'Project Changelog',
  milestoneId: undefined,
  activityId: undefined,
  revisionId: undefined,
  evidenceId: undefined,
  userId: undefined,
  emptyText: 'No entries in the changelog yet',
  withInfinityHeight: false,
  currency: undefined
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
  withInfinityHeight: PropTypes.bool,
  currency: PropTypes.string
};
