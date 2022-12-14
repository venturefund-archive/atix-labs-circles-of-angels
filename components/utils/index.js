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
