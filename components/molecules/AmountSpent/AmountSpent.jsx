import React from 'react';
import PropTypes from 'prop-types';

export default function AmountSpent({ currency, amount }) {
  return (
    <div className='amount-spent'>
      <div className='amount-spent__left'>
        <div className='amount-spent__symbol'>
          <p>$</p>
        </div>
        <h3 className='amount-spent__legend'>Amount Spent</h3>
      </div>
      <div className='amount-spent__right'>
        <h4 className='amount-spent__amount'>{amount} {currency}</h4>
      </div>
    </div>
  )
}

AmountSpent.defaultProps = {
  currency: '',
  amount: '',
}

AmountSpent.propTypes = {
  currency: PropTypes.string,
  amount: PropTypes.string
}

