import PropTypes from 'prop-types';

export const userPropTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
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
