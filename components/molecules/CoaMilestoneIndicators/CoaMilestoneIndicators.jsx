import classNames from 'classnames';
import { formatCurrency } from 'helpers/formatter';
import React from 'react';
import './coa-milestone-indicators.scss';

export const CoaMilestoneIndicators = ({ funding, spending, payback, currency }) => {
  const { budget: fundingBudget, current: fundingCurrent } = funding || {};
  const { budget: spendingBudget, current: spendingCurrent } = spending || {};
  const { budget: paybackBudget, current: paybackCurrent } = payback || {};
  return (
    <div className="m-coaMilestoneIndicators">
      <div className={classNames('m-coaMilestoneIndicators__indicatorContainer', '--green')}>
        <h3 className={classNames('m-coaMilestoneIndicators__title', '--green')}>Funding</h3>
        <div className="m-coaMilestoneIndicators__indicators">
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Budget</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">
              {formatCurrency(currency, fundingBudget || 0)}
            </p>
          </div>
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Current</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">
              {formatCurrency(currency, fundingCurrent || 0)}
            </p>
          </div>
        </div>
      </div>
      <div className={classNames('m-coaMilestoneIndicators__indicatorContainer', '--orange')}>
        <h3 className={classNames('m-coaMilestoneIndicators__title', '--orange')}>Spending</h3>
        <div className="m-coaMilestoneIndicators__indicators">
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Budget</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">
              {formatCurrency(currency, spendingBudget || 0)}
            </p>
          </div>
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Current</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">
              {formatCurrency(currency, spendingCurrent || 0)}
            </p>
          </div>
        </div>
      </div>
      <div className={classNames('m-coaMilestoneIndicators__indicatorContainer', '--violet')}>
        <h3 className={classNames('m-coaMilestoneIndicators__title', '--violet')}>Payback</h3>
        <div className="m-coaMilestoneIndicators__indicators">
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Budget</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">
              {formatCurrency(currency, paybackBudget || 0)}
            </p>
          </div>
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Current</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">
              {formatCurrency(currency, paybackCurrent || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
