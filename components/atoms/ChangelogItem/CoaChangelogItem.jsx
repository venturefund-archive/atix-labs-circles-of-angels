import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils';
import changelogActions from '../../../constants/ChangelogActions';

const CoaChangelogItem = ({ changelog }) => {
    const { user, transaction, datetime, action } = changelog;
    return (
      <div>
        <div>
          <p>{formatDate(datetime)} - <b>{`${user.firstName || ''} ${user.lastName || ''}`}</b> {changelogActions[action]}</p>
          <span>REV-00</span>
        </div>
        <div>
          {/* eslint-disable-next-line max-len */}
                Juan Pablo Yoroi -Beneficiary- sent the ‘Activity Name’ activity of ‘Milestone Name’ Milestone to be reviewed by ‘Auditor name’ auditor
        </div>
        {transaction && (
        <div>
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
            lastName: 'Yoroi',
        }
    },
}

CoaChangelogItem.propTypes = {
    changelog: PropTypes.shape({
        id: PropTypes.number,
        project: PropTypes.number,
        revision: PropTypes.number,
        milestone: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        }),
        activity: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        }),
        evidence: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        }),
        user: PropTypes.shape({
            id: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            roles: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string,
                description: PropTypes.string,
            })),
        }),
        transaction: PropTypes.string,
        description: PropTypes.string,
        action: PropTypes.string.isRequired,
        datetime: PropTypes.string.isRequired,
    }),
}