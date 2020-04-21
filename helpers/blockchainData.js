import moment from 'moment';

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
    image: '/static/images/icon-number.svg',
    label: 'Project Address',
    link: { url: addressUrl, text: address || 'Not Found' }
  },
  {
    image: '/static/images/icon-date.svg',
    label: 'Creation Date',
    info: creationDate
      ? moment(creationDate).format('MMMM, Do YYYY')
      : 'Not Found'
  },
  {
    image: '/static/images/icon-block.svg',
    label: 'Block Number',
    link: { url: blockNumberUrl, text: blockNumber || 'Not Found' }
  },
  {
    image: '/static/images/icon-transaction.svg',
    label: 'Transaction Hash',
    link: { url: txHashUrl, text: txHash || 'Not Found' }
  },
  {
    image: '/static/images/icon-agreement.svg',
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
    image: '/static/images/icon-number.svg',
    label: "Validator's Address",
    link: {
      url: validatorAddressUrl,
      text: validatorAddress || 'Not Found'
    }
  },
  {
    image: '/static/images/icon-date.svg',
    label: 'Date',
    info: creationDate
      ? moment(creationDate).format('MMMM, Do YYYY')
      : 'Not Found'
  },
  {
    image: '/static/images/icon-block.svg',
    label: 'Block Number',
    link: { url: blockNumberUrl, text: blockNumber || 'Not Found' }
  },
  {
    image: '/static/images/icon-transaction.svg',
    label: 'Transaction Hash',
    link: { url: txHashUrl, text: txHash || 'Not Found' }
  },
  {
    image: '/static/images/icon-link.svg',
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
    image: '/static/images/icon-user.svg',
    label: "Oracle's Name",
    info: oracleName || 'Not Found'
  },
  {
    image: '/static/images/icon-number.svg',
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
    image: '/static/images/icon-date.svg',
    label: 'Date',
    info: creationDate
      ? moment(creationDate).format('MMMM, Do YYYY')
      : 'Not Found'
  },
  {
    image: '/static/images/icon-block.svg',
    label: 'Block Number',
    link: { url: blockNumberUrl, text: blockNumber || 'Not Found' }
  },
  {
    image: '/static/images/icon-transaction.svg',
    label: 'Transaction Hash',
    link: { url: txHashUrl, text: txHash || 'Not Found' }
  },
  {
    image: '/static/images/icon-link.svg',
    label: 'Proof',
    link: { url: proof, text: proof ? 'View Proof' : 'Not Found' }
  },
  {
    label: 'Status',
    info: status || 'Not Found'
  }
];
