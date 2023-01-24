import React from 'react';
import PropTypes from 'prop-types';
import { CoaCard } from 'components/atoms/CoaCard/CoaCard';
import './_style.scss';
import { formatCurrencyAtTheBeginning } from 'helpers/formatter';

const budgetColor = '#5CAEFA';
const fundingColor = '#58C984';
const spendingColor = '#FFAA29';
const paybackColor = '#BC66FF';

const StatementPill = ({ initialLabel, endLabel, percentage, className, barColor, currency }) => (
  <div
    className={className}
    style={{ '--barColor': barColor, '--barPercentage': `${percentage / 100}` }}
  >
    <div>{initialLabel}</div>
    <div></div>
    <div> {formatCurrencyAtTheBeginning(currency, endLabel)}</div>
  </div>
);

export const ProjectStatement = ({ budget, funding, spending, payback, currency }) => {
  const maxNumber = Math.max(budget, funding, spending, payback);
  const getPercentage = data => (data / maxNumber) * 100;
  return (
    <CoaCard>
      <h2 className="projectStatement__title">Project Statement</h2>
      <StatementPill
        initialLabel="Budget"
        endLabel={budget}
        percentage={getPercentage(budget)}
        className="projectStatement__bar"
        barColor={budgetColor}
        currency={currency}
      />
      <StatementPill
        initialLabel="Funding"
        endLabel={funding}
        percentage={getPercentage(funding)}
        className="projectStatement__bar"
        barColor={fundingColor}
        currency={currency}
      />
      <StatementPill
        initialLabel="Spending"
        endLabel={spending}
        percentage={getPercentage(spending)}
        className="projectStatement__bar"
        barColor={spendingColor}
        currency={currency}
      />
      <StatementPill
        initialLabel="Payback"
        endLabel={payback}
        percentage={getPercentage(payback)}
        className="projectStatement__bar"
        barColor={paybackColor}
        currency={currency}
      />
    </CoaCard>
  );
};

StatementPill.propTypes = {
  initialLabel: PropTypes.string,
  endLabel: PropTypes.string,
  percentage: PropTypes.number,
  className: PropTypes.string,
  barColor: PropTypes.string,
  currency: PropTypes.string
};
StatementPill.defaultProps = {
  initialLabel: '',
  endLabel: '',
  percentage: 0,
  className: '',
  barColor: '',
  currency: 'USD'
};

ProjectStatement.propTypes = {
  budget: PropTypes.number,
  funding: PropTypes.number,
  spending: PropTypes.number,
  payback: PropTypes.number,
  currency: PropTypes.string
};

ProjectStatement.defaultProps = {
  budget: 0,
  funding: 0,
  spending: 0,
  payback: 0,
  currency: 'USD'
};
