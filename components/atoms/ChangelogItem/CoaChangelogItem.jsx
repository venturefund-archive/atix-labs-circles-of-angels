import React from 'react';
import PropTypes from 'prop-types';
import { formatLeadWithZero } from 'helpers/formatter';
import { formatDate } from '../../utils';
import changelogActions from '../../../constants/ChangelogActions';
import './coa-changelog-item.scss';

const CoaChangelogItem = ({ changelog }) => {
  const { user, transaction, datetime, action, revision } = changelog;
  return (
    <div className="coaChangelogItem">
      <div className="coaChangelogItem__header">
        <p>
          <span className="coaChangelogItem__date">{formatDate(datetime)}</span> -{' '}
          <span className="coaChangelogItem__title">
            {/* <span className="coaChangelogItem__title --bold">{`${user.firstName ||
              ''} ${user.lastName || ''}`}</span>{' '}
            {changelogActions(changelog)?.[action]?.actionText} */}
            {changelogActions(changelog)?.[action]?.title}
          </span>
        </p>
        <span className="coaChangelogItem__rev">REV-{formatLeadWithZero(revision)}</span>
      </div>
      <div className="coaChangelogItem__body">
        {changelogActions(changelog)?.[action]?.description}
      </div>
      {transaction && (
        <div className="coaChangelogItem__footer">
          <span>{transaction}</span>
        </div>
      )}
    </div>
  );
};

export default CoaChangelogItem;

CoaChangelogItem.defaultProps = {
  changelog: {
    user: {
      firstName: 'Juan Pablo',
      lastName: 'Yoroi'
    }
  }
};

CoaChangelogItem.propTypes = {
  changelog: PropTypes.shape({
    id: PropTypes.number,
    project: PropTypes.number,
    revision: PropTypes.number,
    milestone: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    }),
    activity: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    }),
    evidence: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    }),
    user: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      roles: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          description: PropTypes.string
        })
      )
    }),
    transaction: PropTypes.string,
    description: PropTypes.string,
    action: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired
  })
};
