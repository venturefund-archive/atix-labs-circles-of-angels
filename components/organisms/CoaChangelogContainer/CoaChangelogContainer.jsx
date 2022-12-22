import React, { useEffect, useRef, useState } from 'react';
import './coa-changelog-container.scss';
import { Divider, message } from 'antd';
import PropTypes from 'prop-types';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { getChangelog } from '../../../api/projectApi';
import { sortArrayByDate } from '../../utils';
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
}) => {
    const fetchChangelog = useRef();
    const [changelogs, setChangelogs] = useState([]);
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
        setChangelogs(sortedChangelogs);
        setLoading((prevState) => !prevState);
    }

    useEffect(() => {
        fetchChangelog.current();
    }, [])

    if (loading) return <Loading></Loading>
  return (
    <div className="o-coaChangelogContainer">
      <div className="o-coaChangelogContainer__header">
        <h3>{title}</h3>
        <CoaTextButton>Download</CoaTextButton>
      </div>
      <Divider type="horizontal" />
      {changelogs.length > 0 && (
        <div>
          {changelogs.map((changelog) => (
            <CoaChangelogItem changelog={changelog} key={changelog.id} />
                ))}
        </div>
        )}
    </div>
  );
};

CoaChangelogContainer.defaultProps = {
    title: 'Project Changelog',
    milestoneId: undefined,
    activityId: undefined,
    revisionId: undefined,
    evidenceId: undefined,
    userId: undefined,
}

CoaChangelogContainer.propTypes = {
    title: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    milestoneId: PropTypes.string,
    activityId: PropTypes.string,
    revisionId: PropTypes.string,
    evidenceId: PropTypes.string,
    userId: PropTypes.string,
}
