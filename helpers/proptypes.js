import PropTypes from 'prop-types';

// TODO: improve to allow check for more than one requiredProps
export const requiredIf = (
  props,
  thisProp,
  requiredProps,
  propType,
  componentName
) => {
  if (props[requiredProps] && !props[thisProp]) {
    return new Error(`Prop ${thisProp} is required in ${componentName}`);
  }
  if (props[requiredProps] && props[thisProp]) {
    PropTypes.checkPropTypes(
      { [thisProp]: propType },
      props,
      thisProp,
      componentName
    );
  }
};

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
  oracle: PropTypes.number,
  impact: PropTypes.string
};

export const milestonePropType = {
  id: PropTypes.number,
  description: PropTypes.string,
  quarter: PropTypes.string,
  category: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.shape(taskPropType))
};

export const photoPropType = {
  id: PropTypes.number,
  path: PropTypes.string
};

export const experiencePropType = {
  id: PropTypes.number,
  comment: PropTypes.string,
  user: PropTypes.shape(userPropTypes),
  photos: PropTypes.arrayOf(PropTypes.arrayOf(photoPropType))
};

export const transferPropType = {
  id: PropTypes.number,
  transferId: PropTypes.string,
  destinationAccount: PropTypes.string,
  amount: PropTypes.number,
  currency: PropTypes.string,
  status: PropTypes.string,
  createdAt: PropTypes.string,
  sender: PropTypes.number,
  project: PropTypes.number
};

export const projectPropTypes = {
  id: PropTypes.number,
  projectName: PropTypes.string,
  mission: PropTypes.string,
  problemAddressed: PropTypes.string,
  location: PropTypes.string,
  timeframe: PropTypes.string,
  proposal: PropTypes.string,
  faqLink: PropTypes.string,
  coverPhotoPath: PropTypes.string,
  cardPhotoPath: PropTypes.string,
  milestonePath: PropTypes.string,
  goalAmount: PropTypes.number,
  status: PropTypes.string
};
