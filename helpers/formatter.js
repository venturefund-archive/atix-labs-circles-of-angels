/* eslint-disable radix */
export const getPreviewValue = value => value || '-';

export const getInitials = fullName => {
  if (!fullName) return;
  let initials = fullName.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};

export const formatTimeframeValue = timeframe => {
  if (!timeframe) return '-';
  try {
    return `${parseInt(timeframe)} month/s`;
  } catch {
    return timeframe;
  }
};
