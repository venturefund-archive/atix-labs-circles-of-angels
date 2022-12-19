const activityStatusMap = {
  new: { name: 'Not Started', color: 'gray' },
  approved: { name: 'Approved', color: 'green' },
  'to-review': { name: 'In review', color: 'violet' },
  rejected: { name: 'Rejected', color: 'red' },
  in_progress: { name: 'In Progress', color: 'orange' }
};

export const ACTIVITY_STATUS_ENUM = {
  NEW: 'new',
  APPROVED: 'approved',
  TO_REVIEW: 'to-review',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in_progress'
};

export default activityStatusMap;
