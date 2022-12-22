import { CURRENCIES } from '../constants/constants';

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

export const formatCurrency = (currency, value, isCurrencyLabelAtEnd = false) => {
  if (!value && value !== 0) return (0).toFixed(2);
  if (!currency) return Number(value).toFixed(2);

  const isFiat = CURRENCIES.fiat.find((_currency) => _currency.value === currency?.toUpperCase());
  const decimals = isFiat? 2 : 8;

  if(isCurrencyLabelAtEnd) {
    return `${Number(value).toFixed(decimals)} ${currency}`;
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(Number(value).toFixed(decimals));
  } catch (error) {
    return `${currency} ${Number(value).toFixed(decimals)}`;
  }
};

export const removeDecimals = number => number?.toString().split('.')[0];
