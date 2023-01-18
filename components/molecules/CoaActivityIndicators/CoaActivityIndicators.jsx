import React from 'react';
import { Divider } from 'antd';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import './coa-activity-indicators.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const CoaActivityIndicators = ({
  withEvidences,
  transferQuantity,
  impactQuantity,
  predefinedColor
}) => {
  const { texts } = React.useContext(DictionaryContext);
  return (
    <div className="m-coaMilestoneIndicators">
      <div
        className={classNames(
          'm-coaMilestoneIndicators__indicatorContainer',
          `--${predefinedColor}`
        )}
      >
        <div className="m-coaMilestoneIndicators__indicators">
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Committed</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">$5.000</p>
          </div>
          <div>
            <h4 className="m-coaMilestoneIndicators__indicators__title">Current</h4>
            <p className="m-coaMilestoneIndicators__indicators__value">$0</p>
          </div>
        </div>
      </div>
      {withEvidences && (
        <div
          className={classNames(
            'm-coaMilestoneIndicators__indicatorContainer',
            `--${predefinedColor}`
          )}
        >
          <h4 className="m-coaMilestoneIndicators__indicators__title">Evidences</h4>
          <p className="m-coaMilestoneIndicators__indicators__value">
            {transferQuantity} {texts?.general?.transfer || 'Transfer'} <Divider type="vertical" />
            {impactQuantity} {texts?.general?.impact || 'Impact'}
          </p>
        </div>
      )}
    </div>
  );
};

CoaActivityIndicators.defaultProps = {
  predefinedColor: 'green',
  withEvidences: false
};

CoaActivityIndicators.propTypes = {
  predefinedColor: PropTypes.string,
  withEvidences: PropTypes.bool
};
