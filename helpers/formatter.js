/* eslint-disable radix */
export const getPreviewValue = value => value || '-';

export const getInitials = fullName => {
  if (!fullName) return;
  let initials = fullName.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};

export const formatTimeframeValue = (timeframe, timeframeUnit = '') =>
  `${parseFloat(timeframe)?.toFixed(1)} ${timeframeUnit}`;

export const formatCurrency = (currency, value) => {
  if (!value && value !== 0) return (0).toFixed(2);
  if (!currency) return Number(value).toFixed(2);
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(value);
  } catch (error) {
    return `${currency} ${Number(value).toFixed(2)}`;
  }
};

export const removeDecimals = number => number?.toString().split('.')[0];
