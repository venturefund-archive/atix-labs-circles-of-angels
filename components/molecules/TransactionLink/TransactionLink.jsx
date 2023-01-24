import React from 'react';
import { Link } from 'react-router-dom';
import './_style.scss';
import PropTypes from 'prop-types';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CRYPTO_CURRENCY_PATH_SCANNER } from '../../../constants/constants';

const TransactionLink = props => {
  const { texts } = React.useContext(DictionaryContext);
  const { txHash, currency, showTitle, isChangelogActive } = props;

  const isProduction = process.env.NODE_ENV === 'production';
  // TODO: temporal change
  const txPathInChangelog = false
    ? `https://blockscout.com/rsk/mainnet/tx/${txHash}`
    : `https://explorer.testnet.rsk.co/tx/${txHash}`;

  const txPath = isChangelogActive
    ? txPathInChangelog
    : CRYPTO_CURRENCY_PATH_SCANNER[currency](txHash);

  return (
    <>
      {showTitle && (
        <h5 className="transactionLink__title">{texts?.general?.transaction || 'Transaction'}</h5>
      )}
      <div className="transactionLink__linkContainer">
        <span className="transactionLink__linkContainer__title">Hash:&nbsp;</span>
        <Link to={{ pathname: txPath }} target="_blank" className="transactionLink__link">
          {txHash}
        </Link>
      </div>
    </>
  );
};

TransactionLink.defaultProps = {
  txHash: '',
  currency: '',
  showTitle: false
};

TransactionLink.propTypes = {
  txHash: PropTypes.string,
  currency: PropTypes.string,
  showTitle: PropTypes.bool
};

export default TransactionLink;
