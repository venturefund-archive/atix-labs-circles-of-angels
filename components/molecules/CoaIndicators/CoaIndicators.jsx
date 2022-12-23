import React from 'react';
import { Divider, Icon } from 'antd';
import { formatCurrency } from 'helpers/formatter';
import './coa-indicators.scss';
import PropTypes from 'prop-types';

export const CoaIndicators = ({
  currency,
  budget,
  spent,
  deposited,
  remaining,
  transferQuantity,
  impactQuantity,
  withEvidences
}) => (
  <div className="indicators">
    <div className="indicators__container">
      <Icon type="wallet" className="indicators__iconIndicator" />
      <div className="indicators__container__left">
        <div className="indicators__indicator">
          <p className="indicators__indicator__title">Budget</p>
          <p className="indicators__indicator__value">{formatCurrency(currency, budget)}</p>
        </div>
        <div className="indicators__indicator">
          <p className="indicators__indicator__title">Outcome</p>
          <p className="indicators__indicator__value">{formatCurrency(currency, spent)}</p>
        </div>
        <div className="indicators__indicator">
          <p className="indicators__indicator__title">Income</p>
          <p className="indicators__indicator__value">{formatCurrency(currency, deposited)}</p>
        </div>
        <div className="indicators__indicator">
          <p className="indicators__indicator__title">Remaining</p>
          <p className="indicators__indicator__value">{formatCurrency(currency, remaining)}</p>
        </div>
      </div>
    </div>
    {withEvidences && (
      <>
        <Divider type="vertical" style={{ height: '32px', margin: '0 1.31rem' }} />
        <div className="indicators__container">
          <Icon type="file-text" className="o-coaIndicatorsCard__iconIndicator" />
          <div className="indicators__indicator">
            <p className="indicators__indicator__title">Evidences</p>
            <p className="indicators__indicator__value">
              {transferQuantity} Transfer <Divider type="vertical" />
              {impactQuantity} Impact
            </p>
          </div>
        </div>
      </>
    )}
  </div>
);

CoaIndicators.defaultProps = {
  currency: undefined,
  budget: undefined,
  spent: undefined,
  deposited: undefined,
  remaining: undefined,
  transferQuantity: undefined,
  impactQuantity: undefined,
  withEvidences: undefined
};

CoaIndicators.propTypes = {
  currency: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  budget: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  spent: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  deposited: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  remaining: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  transferQuantity: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  impactQuantity: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  withEvidences: PropTypes.bool
};
