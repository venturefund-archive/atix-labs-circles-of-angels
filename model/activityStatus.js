const activityStatusMap = {
  new: { name: 'Not Started', color: 'gray' },
  approved: { name: 'Approved', color: 'green' },
  'to review': { name: 'In review', color: 'violet' },
  rejected: { name: 'Rejected', color: 'red' },
  'in progress': { name: 'In Progress', color: 'orange' }
};

export default activityStatusMap;
