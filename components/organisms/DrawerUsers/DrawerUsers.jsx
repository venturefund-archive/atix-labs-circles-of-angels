import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import './_style.scss';
import { userAvatarPropTypes } from '../../../helpers/proptypes';

const DrawerUsers = ({ users, visible, onClose, title }) => (
  <div>
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
  title: PropTypes.string.isRequired
};

export default DrawerUsers;
