import Roles from '../constants/RolesMap';

const entrepreneurQuestionsMapping = {
  seeking: 'What type of funding are you seeking?',
  goals:
    'Which are the areas of impact that you tackle? Based on the UN Sustainable Development Goals'
};
const supporterQuestionsMapping = {
  seeking: 'How often do you make angel impact investments?',
  goals:
    'Which are the areas of impact that you tackle? Based on the UN Sustainable Development Goals'
};

const questionsToText = user => {
  if (user.role === Roles.PROJECT_SUPPORTER) {
    return JSON.stringify({
      [supporterQuestionsMapping.seeking]: user.seeking,
      [supporterQuestionsMapping.goals]: user.goals
    });
  }

  if (user.role === Roles.ENTREPRENEUR) {
    return JSON.stringify({
      [entrepreneurQuestionsMapping.seeking]: user.seeking,
      [entrepreneurQuestionsMapping.goals]: user.goals
    });
  }
};

export default questionsToText;
