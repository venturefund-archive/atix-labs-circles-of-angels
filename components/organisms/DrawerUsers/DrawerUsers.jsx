import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import { userAvatarPropTypes } from '../../../helpers/proptypes';
import './_style.scss';

const DrawerUsers = ({ users, visible, onClose, title, onClick }) => (
  <div>
    <CustomButton buttonText="View All" theme="Secondary" onClick={onClick} />
    <Drawer
      title={title}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      {users.map(user => (
        <p>{`${user.firstName} ${user.lastName}`}</p>
      ))}
    </Drawer>
  </div>
);

DrawerUsers.defaultProps = {
  visible: false
};

DrawerUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(userAvatarPropTypes)).isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DrawerUsers;
