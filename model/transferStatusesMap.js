const transferStatusesMap = {
  pending: { name: 'Pending', color: 'yellow' },
  reconciliation: { name: 'Reconciliation', color: 'yellow' },
  verified: { name: 'Verified', color: 'green' },
  cancelled: { name: 'Cancelled', color: 'red' },
  failed: { name: 'Failed', color: 'red' },
  rejected: { name: 'Rejected', color: 'red' },
  pending_verification: { name: 'Pending verification', color: 'yellow' },
};

export default transferStatusesMap;
