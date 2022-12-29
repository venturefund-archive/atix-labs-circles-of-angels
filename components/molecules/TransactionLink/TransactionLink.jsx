import React from 'react';
import { Link } from 'react-router-dom';
import './_style.scss';
import PropTypes from 'prop-types';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CRYPTO_CURRENCY_PATH_SCANNER, CURRENCIES } from '../../../constants/constants';

const TransactionLink = (props) => {
  const { texts } = React.useContext(DictionaryContext);
  const { txHash, currency, showTitle } = props;
  const _cryptoCurrency = Object.values(CURRENCIES.crypto)
    .map(item => item.value)
    .find(curr => currency === curr);
  if(!_cryptoCurrency) return <h5 className="transactionLink__title">
    {texts?.transactionLink?.errorPart1 || 'Crypto currency'} ({currency}) {texts?.transactionLink?.errorPart2 || 'is not supported'}
  </h5>;

  return (
    <>
      { showTitle && <h5 className="transactionLink__title">{texts?.general?.transaction || 'Transaction'}</h5> }
      <div className='transactionLink__linkContainer'>
        <span className='transactionLink__linkContainer__title'>Hash:&nbsp;</span>
        <Link
          to={{ pathname: CRYPTO_CURRENCY_PATH_SCANNER[currency](txHash) }}
          target="_blank"
          className="transactionLink__link"
        >
          {txHash}
        </Link>
      </div>
    </>
  );
}

TransactionLink.defaultProps = {
  txHash: '',
  currency: '',
  showTitle: false,
}

TransactionLink.propTypes = {
  txHash: PropTypes.string,
  currency: PropTypes.string,
  showTitle: PropTypes.bool
}

export default TransactionLink;
