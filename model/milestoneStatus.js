const milestoneStatusMap = {
  'not started': { name: 'Not Started', color: 'gray' },
  approved: { name: 'Approved', color: 'green' },
  'in progress': { name: 'In Progress', color: 'orange' }
};

export const MILESTONE_STATUS_ENUM = {
  NEW: 'new',
  APPROVED: 'approved',
  IN_PROGRESS: 'in progress'
};

export default milestoneStatusMap;
