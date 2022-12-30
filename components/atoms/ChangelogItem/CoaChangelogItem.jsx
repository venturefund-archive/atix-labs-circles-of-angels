import React from 'react';
import { Divider } from 'antd';
import PropTypes from 'prop-types';
import { formatLeadWithZero } from 'helpers/formatter';
import TransactionLink from 'components/molecules/TransactionLink/TransactionLink';
import { getDateAndTime } from 'helpers/utils';
import changelogActions from '../../../constants/ChangelogActions';
import './coa-changelog-item.scss';

const CoaChangelogItem = ({ changelog, currency, texts }) => {
  const { transaction, datetime, action, revision } = changelog;
  return (
    <div className="coaChangelogItem">
      <div className="coaChangelogItem__header">
        <p>
          <span className="coaChangelogItem__date">{getDateAndTime(datetime, 'minimal')}</span> -{' '}
          <span className="coaChangelogItem__title">
            {changelogActions(changelog, texts)?.[action]?.title?.()}
          </span>
        </p>
        <span className="coaChangelogItem__rev">REV-{formatLeadWithZero(revision)}</span>
      </div>
      <Divider type="horizontal" style={{ marginBlock: '0.6875rem' }} />
      <div className="coaChangelogItem__body">
        {changelogActions(changelog, texts)?.[action]?.description?.()}
      </div>
      {transaction && (
        <div className="coaChangelogItem__footer">
          <TransactionLink txHash={transaction} currency={currency} />
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
  },
  currency: undefined,
  texts: { }
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
  }),
  currency: PropTypes.string,
  texts: PropTypes.shape({})
};
