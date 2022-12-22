import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Icon } from 'antd';
import './_style.scss';
import { formatCurrency } from '../../../helpers/formatter';

export default function EvidenceDetailType(props) {
  const { evidenceType, currency, outcome, income } = props;
  const isTransfer = evidenceType === 'transfer';
  const type = evidenceType? evidenceType.charAt(0).toUpperCase() + evidenceType.slice(1) : '';
  const incomeValue = parseFloat(income);
  const outcomeValue = parseFloat(outcome);
  const amount = incomeValue || outcomeValue;
  return (
    <div className=''>
      <Divider />
      <div className='evidenceDetailType__container'>
        <div className='evidenceDetailType__block'>
          <h3 className='evidenceDetailType__block__label'>
            <Icon
              type="file-text"
              theme="filled"
              className='evidenceDetailType__block__label__icon'
            />
            Evidence type:
          </h3>
          <h3 className='evidenceDetailType__block__labelValue'>{type}</h3>
        </div>
        {
          isTransfer &&
          <div className='evidenceDetailType__block'>
            <h3 className='evidenceDetailType__block__label'>
              <Icon
                type="dollar-circle"
                theme="filled"
                className='evidenceDetailType__block__label__icon'
              />
              { incomeValue? 'Income:' : 'Outcome:' }
            </h3>
            <h3 className='evidenceDetailType__block__labelValue'>{formatCurrency(currency, amount, true)}</h3>
          </div>
        }
      </div>
      <Divider />
    </div>
  )
}

EvidenceDetailType.defaultProps = {
  currency: '',
  evidenceType: '',
  outcome: '',
  income: '',
}

EvidenceDetailType.propTypes = {
  currency: PropTypes.string,
  evidenceType: PropTypes.string,
  outcome: PropTypes.string,
  income: PropTypes.string,
}
