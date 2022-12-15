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

export const getActivity = (project, activityId) => {
  let foundActivity;
  let foundMilestone;

  for (const milestone of project.milestones) {
    for (const activity of milestone.activities) {
      if (activity.id === Number(activityId)) {
        foundActivity = activity;
        foundMilestone = milestone;
        break;
      }
    }
  }
  return { activity: foundActivity, milestone: foundMilestone };
}
