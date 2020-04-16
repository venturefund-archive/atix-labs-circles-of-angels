import moment from 'moment';

// TODO: delete mock data

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
  creationDate,
  blockNumber,
  txHash,
  receipt,
  status
}) => [
  {
    image: '/static/images/icon-number.svg',
    label: "Validator's Address",
    link: {
      url: '#',
      text: validatorAddress || '0x8e19747326a8f0b46056a09330a...'
    }
  },
  {
    image: '/static/images/icon-date.svg',
    label: 'Date',
    info: creationDate || '14/03/2020'
  },
  {
    image: '/static/images/icon-block.svg',
    label: 'Block Number',
    link: { url: '#', text: blockNumber || '69,818' }
  },
  {
    image: '/static/images/icon-transaction.svg',
    label: 'Transaction Hash',
    link: { url: '#', text: txHash || '0x8e19747326a8f0b46056a09330a...' }
  },
  {
    image: '/static/images/icon-link.svg',
    label: 'Transfer Receipt',
    link: { url: receipt || '#', text: 'View Receipt' }
  },
  {
    label: 'Status',
    info: status || 'Verified'
  }
];

export const buildOracleBlockchainData = ({ oracleName, oracleAddress }) => [
  {
    image: '/static/images/icon-user.svg',
    label: "Oracle's Name",
    info: oracleName || 'John Doe'
  },
  {
    image: '/static/images/icon-number.svg',
    label: "Oracle's Address",
    link: { url: '#', text: oracleAddress || '0x8e19747326a8a...' }
  }
];

export const buildEvidenceBlockchainData = ({
  creationDate,
  blockNumber,
  txHash,
  proof,
  status
}) => [
  {
    image: '/static/images/icon-date.svg',
    label: 'Date',
    info: creationDate || '14/03/2020'
  },
  {
    image: '/static/images/icon-block.svg',
    label: 'Block Number',
    link: { url: '#', text: blockNumber || '69,818' }
  },
  {
    image: '/static/images/icon-transaction.svg',
    label: 'Transaction Hash',
    link: { url: '#', text: txHash || '0x8e19747326a8f0b46056a09330a...' }
  },
  {
    image: '/static/images/icon-link.svg',
    label: 'Proof',
    link: { url: proof || '#', text: 'View Proof' }
  },
  {
    label: 'Status',
    info: status || 'Approved'
  }
];
