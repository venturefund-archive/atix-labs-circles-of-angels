import PropTypes from 'prop-types';

export const userPropTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number,
  role: PropTypes.string
};

export const userAvatarPropTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatarImage: PropTypes.string,
  id: PropTypes.number,
  role: PropTypes.string
};

export const projectCardPropType = {
  projectName: PropTypes.string,
  location: PropTypes.string,
  timeframe: PropTypes.string,
  goalAmount: PropTypes.number,
  id: PropTypes.number,
  cardPhotoPath: PropTypes.string
};

export const fieldPropType = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.array,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  row: PropTypes.number
};

export const taskPropType = {
  id: PropTypes.number,
  taskHash: PropTypes.string,
  description: PropTypes.string,
  reviewCriteria: PropTypes.string,
  category: PropTypes.string,
  keyPersonnel: PropTypes.string,
  budget: PropTypes.string,
  oracle: PropTypes.string,
  impact: PropTypes.string
};

export const milestonePropType = {
  id: PropTypes.number,
  description: PropTypes.string,
  quarter: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.shape(taskPropType))
};
