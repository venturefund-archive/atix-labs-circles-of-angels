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
  let finalFormat = '';

  if(isCurrencyLabelAtEnd) {
    finalFormat = `${Number(value).toFixed(decimals)} ${currency}`;
  } else {
    try {
      finalFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      }).format(Number(value).toFixed(decimals));
    } catch (error) {
      finalFormat = `${currency} ${Number(value).toFixed(decimals)}`;
    }
  }

  const [integerPart, decimalPart] = finalFormat.split('.');
  return `${integerPart}.${isFiat? decimalPart.padEnd(2, '0') : decimalPart.padEnd(8, '0')}`;
};

export const removeDecimals = number => number?.toString().split('.')[0];
