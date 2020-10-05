const transferStatusesMap = {
  pending: { name: 'Pending', color: 'yellow' },
  reconciliation: { name: 'Reconciliation', color: 'yellow' },
  verified: { name: 'Verified', color: 'green' },
  cancelled: { name: 'Cancelled', color: 'red' },
  failed: { name: 'Failed', color: 'red' },
  rejected: { name: 'Rejected', color: 'red' }
};

export default transferStatusesMap;
