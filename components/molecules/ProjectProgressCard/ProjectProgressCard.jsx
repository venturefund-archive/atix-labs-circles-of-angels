import React from 'react';
import PropTypes from 'prop-types';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import './project-progress-card.scss';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { formatCurrency } from 'helpers/formatter';
import { RadialBarChart } from '../RadialBarChart/RadialBarChart';

export const ProjectProgressCard = ({
  progressCurrentValue,
  progressTotalValue,
  balanceCurrentValue,
  balanceTotalValue,
  currency,
  onClickSeeMilestones
}) => (
  <div className="m-projectProgressCard">
    <TitlePage
      textTitle="Project progress"
      underlinePosition="center"
      className="m-projectProgressCard__title"
      textColor="#4C7FF7"
    />
    <RadialBarChart
      className="m-projectProgressCard__radialBarChart"
      externalDonutColor="#08ceaa"
      currentExternalDonutValue={progressCurrentValue}
      totalExternalDonutValue={progressTotalValue}
      currentInternalDonutValue={balanceCurrentValue}
      totalInternalDonutValue={balanceTotalValue}
      internalDonutColor="#26385b"
      externalDonutLabel="Project Progress"
      internalDonutLabel="Project Balance"
      externalDonutSymbol="%"
      internalDonutSymbol="$"
    />
    <div className="m-projectProgressCard__infoContainer">
      <div className="m-projectProgressCard__info">
        <div className="m-projectProgressCard__icon --progress">%</div>
        <div>
          <p className="m-projectProgressCard__title --progress">Total Progress</p>
          <p className="m-projectProgressCard__value --progress">
            %{(progressCurrentValue / progressTotalValue) * 100}
          </p>
        </div>
      </div>
      <div className="m-projectProgressCard__info">
        <div className="m-projectProgressCard__icon --expenses">$</div>
        <div>
          <p className="m-projectProgressCard__title --expenses">Total Expenses</p>
          <p className="m-projectProgressCard__value --expenses">
            {formatCurrency(currency, balanceCurrentValue)}
          </p>
        </div>
      </div>
    </div>
    <CoaButton
      type="primary"
      className="m-projectProgressCard__milestoneButton"
      onClick={onClickSeeMilestones}
    >
      See milestones
    </CoaButton>
  </div>
);

ProjectProgressCard.propTypes = {
  progressCurrentValue: PropTypes.number,
  progressTotalValue: PropTypes.number,
  balanceCurrentValue: PropTypes.number,
  balanceTotalValue: PropTypes.number,
  onClickSeeMilestones: PropTypes.func,
  currency: PropTypes.string
};

ProjectProgressCard.defaultProps = {
  progressCurrentValue: 0,
  progressTotalValue: 0,
  balanceCurrentValue: 0,
  balanceTotalValue: 0,
  onClickSeeMilestones: undefined,
  currency: undefined
};
