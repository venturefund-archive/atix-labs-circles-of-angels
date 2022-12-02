import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import React from 'react';
import './project-progress-card.scss';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { RadialBarChart } from '../RadialBarChart/RadialBarChart';

export const ProjectProgressCard = ({
  progressCurrentValue,
  progressTotalValue,
  balanceCurrentValue,
  balanceTotalValue
}) => {
  return (
    <div className="m-projectProgressCard">
      <TitlePage
        textTitle="Project progress"
        underlinePosition="center"
        className="m-projectProgressCard__title"
      />
      <RadialBarChart
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
            <p className="m-projectProgressCard__value --expenses">${balanceTotalValue}</p>
          </div>
        </div>
      </div>
      <CoaButton type="primary">See milestones</CoaButton>
    </div>
  );
};
