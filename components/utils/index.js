/* eslint-disable no-restricted-syntax */
export const addElipsesToText = (text, number) => `${text.slice(0, number)}...`;

export const scrollToTargetAdjusted = (id, headerOffset = 45) => {
  const element = document.getElementById(id);
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

export const sortArrayByDate = (arr, field) =>
    arr.sort((a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime());

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export const formatDate = (date) => {
  const newDate = new Date(date);
  return [
    padTo2Digits(newDate.getDate()),
    padTo2Digits(newDate.getMonth() + 1),
    newDate.getFullYear(),
  ].join('-');
}
