import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import AvatarUser from '../../atoms/AvatarUser/AvatarUser';
import { userAvatarPropTypes } from '../../../helpers/proptypes';

const UsersPanelCard = ({ theme, category, userRole, users }) => {
  const classname = `Cards ${theme}`;
  return (
    <Col span={24} className={classname}>
      <Col span={24}>
        <h3>{category}</h3>
      </Col>
      <Col span={24}>
        <h3 className="bold">{userRole}</h3>
      </Col>
      {users.map(user => {
        const userFullName = `${user.firstName} ${user.lastName}`;
        return (
          <Col span={24} className="flex">
            <Col span={3}>
              <AvatarUser user={user} />
            </Col>
            <Col span={21}>
              <span>{userFullName}</span>
            </Col>
          </Col>
        );
      })}
    </Col>
  );
};

UsersPanelCard.defaultProps = {
  theme: '',
  users: []
};

UsersPanelCard.propTypes = {
  theme: PropTypes.string,
  category: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(userAvatarPropTypes))
};

export default UsersPanelCard;
