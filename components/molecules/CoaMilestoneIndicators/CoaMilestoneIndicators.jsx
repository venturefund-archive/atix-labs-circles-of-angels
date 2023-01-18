import classNames from 'classnames';
import React from 'react';
import './coa-milestone-indicators.scss';

export const CoaMilestoneIndicators = () => {
  return (
    <div className="m-coaMilestoneIndicators">
      <div className={classNames('m-coaMilestoneIndicators__indicatorContainer', '--green')}>
        <h3 className={classNames('m-coaMilestoneIndicators__title', '--green')}>Funding</h3>
        <div className="m-coaMilestoneIndicators__indicators">
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Budget</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">$5.000</p>
          </div>
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Current</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">$0</p>
          </div>
        </div>
      </div>
      <div className={classNames('m-coaMilestoneIndicators__indicatorContainer', '--orange')}>
        <h3 className={classNames('m-coaMilestoneIndicators__title', '--orange')}>Spending</h3>
        <div className="m-coaMilestoneIndicators__indicators">
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Budget</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">$5.000</p>
          </div>
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Current</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">$0</p>
          </div>
        </div>
      </div>
      <div className={classNames('m-coaMilestoneIndicators__indicatorContainer', '--violet')}>
        <h3 className={classNames('m-coaMilestoneIndicators__title', '--violet')}>Payback</h3>
        <div className="m-coaMilestoneIndicators__indicators">
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Budget</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">$5.000</p>
          </div>
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Current</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">$0</p>
          </div>
        </div>
      </div>
    </div>
  );
};
