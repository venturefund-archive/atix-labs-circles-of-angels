const transferStatusMap = {
  '3': {
    name: 'cancel',
    show: 'Cancelled',
    icon: './static/images/icon-cancel.svg'
  },
  '0': {
    name: 'pending',
    show: 'Pending Verification',
    icon: './static/images/icon-clock.svg'
  },
  '1': {
    name: 'pending',
    show: 'Reconciliation',
    icon: './static/images/icon-clock.svg'
  },
  '2': {
    name: 'success',
    show: 'Verified',
    icon: './static/images/icon-check.svg'
  }
};

export default transferStatusMap;
