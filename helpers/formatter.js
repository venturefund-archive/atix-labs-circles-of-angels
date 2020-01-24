export const getPreviewValue = value => value || '-';

export const getInitials = fullName => {
  if (!fullName) return;
  let initials = fullName.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};
