const transferStatusMap = {
  '-1': {
    name: 'cancel',
    show: 'Funds Cancelled',
    icon: './static/images/icon-cancel.svg'
  },
  '0': {
    name: 'pending',
    show: 'Funds Pending',
    icon: './static/images/icon-clock.svg'
  },
  '1': {
    name: 'pending',
    show: 'Reconciliation',
    icon: './static/images/icon-clock.svg'
  },
  '2': {
    name: 'success',
    show: 'Funds Verified',
    icon: './static/images/icon-check.svg'
  }
};

export default transferStatusMap;
