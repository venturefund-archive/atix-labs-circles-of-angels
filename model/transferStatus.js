
const transferStatusMap = {
  "-1": {
    name: 'cancelled',
    show: 'Funds Cancelled',
    icon: ""
  },
  "0": {
    name: 'pending',
    show: 'Funds Pending',
    icon: './static/images/icon-clock.svg'
  },
  "1": {
    name: 'pending',
    show: 'Funds Pending',
    icon: './static/images/icon-clock.svg'
  },
  "2": {
    name: 'success',
    show: 'Funds Received',
    icon: './static/images/icon-check.svg'
  }
};

export default transferStatusMap;