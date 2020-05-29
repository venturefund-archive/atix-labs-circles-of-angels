import moment from 'moment';

const ADDRESS_ICON = '/static/images/icon-number.svg';
const DATE_ICON = '/static/images/icon-date.svg';
const BLOCK_ICON = '/static/images/icon-block.svg';
const TX_ICON = '/static/images/icon-transaction.svg';
const AGREEMENT_ICON = '/static/images/icon-agreement.svg';
const LINK_ICON = '/static/images/icon-link.svg';
const USER_ICON = '/static/images/icon-user.svg';

export const buildProjectBlockchainData = ({
  address,
  addressUrl,
  creationDate,
  blockNumber,
  blockNumberUrl,
  txHash,
  txHashUrl,
  agreement
}) => [
  {
    image: ADDRESS_ICON,
    label: 'Project Address',
    link: { url: addressUrl, text: address || 'Not Found' }
  },
  {
    image: DATE_ICON,
    label: 'Creation Date',
    info: creationDate
      ? moment(creationDate).format('MMMM, Do YYYY')
      : 'Not Found'
  },
  {
    image: BLOCK_ICON,
    label: 'Block Number',
    link: { url: blockNumberUrl, text: blockNumber || 'Not Found' }
  },
  {
    image: TX_ICON,
    label: 'Transaction Hash',
    link: { url: txHashUrl, text: txHash || 'Not Found' }
  },
  {
    image: AGREEMENT_ICON,
    label: 'Agreement',
    info:
      'The agreement on milestones, tasks and funds were saved ' +
      'and cannot be altered by any means. ' +
      'This file can be audited from the following link',
    link: {
      url: agreement,
      text: agreement ? 'View Agreement' : 'Not Found'
    }
  }
];

export const buildTransferBlockchainData = ({
  validatorAddress,
  validatorAddressUrl,
  creationDate,
  blockNumber,
  blockNumberUrl,
  txHash,
  txHashUrl,
  receipt,
  status
}) => [
  {
    image: ADDRESS_ICON,
    label: "Validator's Address",
    link: {
      url: validatorAddressUrl,
      text: validatorAddress
    }
  },
  {
    image: DATE_ICON,
    label: 'Date',
    info: creationDate
      ? moment(creationDate).format('MMMM, Do YYYY')
      : 'Not Found'
  },
  {
    image: BLOCK_ICON,
    label: 'Block Number',
    link: { url: blockNumberUrl, text: blockNumber || 'Not Found' }
  },
  {
    image: TX_ICON,
    label: 'Transaction Hash',
    link: { url: txHashUrl, text: txHash || 'Not Found' }
  },
  {
    image: LINK_ICON,
    label: 'Transfer Receipt',
    link: { url: receipt, text: receipt ? 'View Receipt' : 'Not Found' }
  },
  {
    label: 'Status',
    info: status || 'Not Found'
  }
];

export const buildOracleBlockchainData = ({
  oracleName,
  oracleAddress,
  oracleAddressUrl
}) => [
  {
    image: USER_ICON,
    label: "Oracle's Name",
    info: oracleName || 'Not Found'
  },
  {
    image: ADDRESS_ICON,
    label: "Oracle's Address",
    link: { url: oracleAddressUrl, text: oracleAddress || 'Not Found' }
  }
];

export const buildEvidenceBlockchainData = ({
  creationDate,
  blockNumber,
  blockNumberUrl,
  txHash,
  txHashUrl,
  proof,
  status
}) => [
  {
    image: DATE_ICON,
    label: 'Date',
    info: creationDate
      ? moment(creationDate).format('MMMM, Do YYYY')
      : 'Not Found'
  },
  {
    image: BLOCK_ICON,
    label: 'Block Number',
    link: { url: blockNumberUrl, text: blockNumber || 'Not Found' }
  },
  {
    image: TX_ICON,
    label: 'Transaction Hash',
    link: { url: txHashUrl, text: txHash || 'Not Found' }
  },
  {
    image: LINK_ICON,
    label: 'Proof',
    link: { url: proof, text: proof ? 'View Proof' : 'Not Found' }
  },
  {
    label: 'Status',
    info: status || 'Not Found'
  }
];
