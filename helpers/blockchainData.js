export const buildProjectBlockchainData = ({
  address,
  creationDate,
  blockNumber,
  txHash,
  agreement
}) => [
  {
    image: '/static/images/icon-number.svg',
    label: 'Project Address',
    link: { url: '#', text: '0x8e19747326a8f0b46056a09330a...' }
  },
  {
    image: '/static/images/icon-date.svg',
    label: 'Creation Date',
    info: '14/03/2020'
  },
  {
    image: '/static/images/icon-block.svg',
    label: 'Block Number',
    link: { url: '#', text: '69,818' }
  },
  {
    image: '/static/images/icon-transaction.svg',
    label: 'Transaction Hash',
    link: { url: '#', text: '0x8e19747326a8f0b46056a09330a...' }
  },
  {
    image: '/static/images/icon-agreement.svg',
    label: 'Agreement',
    info:
      'The agreement on milestones, tasks and funds were saved ' +
      'and cannot be altered by any means. ' +
      'This file can be audited from the following link',
    link: { url: '#', text: 'Go to Agreement' }
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
    link: { url: '#', text: '0x8e19747326a8f0b46056a09330a...' }
  },
  {
    image: '/static/images/icon-date.svg',
    label: 'Date',
    info: '14/03/2020'
  },
  {
    image: '/static/images/icon-block.svg',
    label: 'Block Number',
    link: { url: '#', text: '69,818' }
  },
  {
    image: '/static/images/icon-transaction.svg',
    label: 'Transaction Hash',
    link: { url: '#', text: '0x8e19747326a8f0b46056a09330a...' }
  },
  {
    image: '/static/images/icon-link.svg',
    label: 'Transfer Receipt',
    link: { url: '#', text: 'View Receipt' }
  },
  {
    label: 'Status',
    info: 'Approved'
  }
];

export const buildOracleBlockchainData = ({ oracleName, oracleAddress }) => [
  {
    image: '/static/images/icon-user.svg',
    label: "Oracle's Name",
    info: 'John Doe'
  },
  {
    image: '/static/images/icon-number.svg',
    label: "Oracle's Address",
    link: { url: '#', text: '0x8e19747326a8a...' }
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
    info: '14/03/2020'
  },
  {
    image: '/static/images/icon-block.svg',
    label: 'Block Number',
    link: { url: '#', text: '69,818' }
  },
  {
    image: '/static/images/icon-transaction.svg',
    label: 'Transaction Hash',
    link: { url: '#', text: '0x8e19747326a8f0b46056a09330a...' }
  },
  {
    image: '/static/images/icon-link.svg',
    label: 'Proof',
    link: { url: '#', text: 'View Proof' }
  },
  {
    label: 'Status',
    info: status
  }
];
