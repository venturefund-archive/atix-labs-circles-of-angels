import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './_style.scss';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import { BigNumber } from 'ethers';
import PropTypes from 'prop-types';
import { getTransactionDetails } from '../../../helpers/getTransactionDetail';

const Detail = ({ _key, value }) => {
  const keyFormatted = _key
    .replaceAll('_', '')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  const _value = BigNumber.isBigNumber(value) ? value.toNumber() : value;
  return (
    <div className="transactionDetail__infoContainer__keyValue">
      <div className="transactionDetail__infoContainer__keyValue__item transactionDetail__keyText">
        {keyFormatted}
      </div>
      <div className="transactionDetail__infoContainer__keyValue__item transactionDetail__valueText">
        {['_proofHash', '_proposedIpfsHash'].includes(_key) ? (
          <Link
            to={{ pathname: `https://ipfs.io/ipfs/${value}` }}
            target="_blank"
            className="transactionLink__link"
          >
            {_value}
          </Link>
        ) : (
          _value
        )}
      </div>
    </div>
  );
};

export const TransactionDetail = ({ action, transactionHash }) => {
  const [txDetail, setTxDetail] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsButtonAvailable, setIsDetailsButtonAvailable] = useState(true);

  const Loader = () => (
    <div className="sk-chase">
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
    </div>
  );

  const handleClickSeeDetails = async () => {
    if (txDetail) return setIsDetailsButtonAvailable(false);

    setIsLoading(true);
    const _txDetail = await getTransactionDetails({ action, transactionHash });

    setTxDetail(_txDetail);
    setIsLoading(false);
    setIsDetailsButtonAvailable(false);
  };

  const handleClickHideDetails = () => {
    setIsDetailsButtonAvailable(true);
  };

  return (
    <div className="transactionDetail">
      <CoaButton
        type={isDetailsButtonAvailable ? 'primary' : 'ghost'}
        className="transactionDetail__button"
        disabled={isLoading}
        onClick={isDetailsButtonAvailable ? handleClickSeeDetails : handleClickHideDetails}
      >
        {isDetailsButtonAvailable ? 'See transaction details' : 'Hide information'}
      </CoaButton>
      {isLoading && (
        <div className="transactionDetail__loader">
          <Loader />
        </div>
      )}
      {!isDetailsButtonAvailable && txDetail && (
        <div className="transactionDetail__infoContainer">
          {Object.entries(txDetail).map(([_key, value]) => (
            <Detail key={_key} _key={_key} value={value} />
          ))}
        </div>
      )}
    </div>
  );
};

TransactionDetail.defaultProps = {
  action: '',
  transactionHash: ''
};

TransactionDetail.propTypes = {
  action: PropTypes.string,
  transactionHash: PropTypes.string
};

Detail.defaultProps = {
  _key: '',
  value: ''
};

Detail.propTypes = {
  _key: PropTypes.string,
  value: PropTypes.string
};
