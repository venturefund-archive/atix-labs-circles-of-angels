import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import DrawerUsers from '../../organisms/DrawerUsers/DrawerUsers';
import AvatarUser from '../../atoms/AvatarUser/AvatarUser';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import UsersPanelCard from './UsersPanelCard';
import { userAvatarPropTypes } from '../../../helpers/proptypes';
import { supporterRoles, projectStatuses } from '../../../constants/constants';

const { PUBLISHED, CONSENSUS, FUNDING } = projectStatuses;

const ProjectUsersPanel = ({
  entrepreneur,
  funders,
  oracles,
  followers,
  onApply,
  applied,
  status,
  isSupporter
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const allowAssignOracleStatuses = [PUBLISHED, CONSENSUS];
  const allowAssignFunderStatuses = [PUBLISHED, CONSENSUS, FUNDING];

  const allowApplyOracle =
    !applied && isSupporter && allowAssignOracleStatuses.includes(status);

  const allowApplyFunder =
    !applied && isSupporter && allowAssignFunderStatuses.includes(status);

  // TODO: this could be a different component
  const followerList = () => (
    <Fragment>
      <Col span={12}>
        <h4>Followers</h4>
      </Col>
      <Col span={12} className="flex-end">
        <DrawerUsers
          users={followers}
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          title="Followers"
          onClick={() => setDrawerVisible(true)}
        />
      </Col>
      <Col span={24} className="flex" >
        {followers.map(user => (
          <AvatarUser user={user} />
        ))}
      </Col>
    </Fragment>
  );

  return (
    <Fragment>
      <h3>Related users</h3>
      {followerList()}
      <UsersPanelCard
        theme="Orange"
        category="Project Social"
        userRole="Entrepreneur"
        users={entrepreneur ? [entrepreneur] : []}
      />
      <UsersPanelCard
        theme="Blue"
        type="funders"
        category="Interested in"
        userRole="Funding"
        users={funders}
      />
      <UsersPanelCard
        theme="Red"
        category="Interested in being"
        userRole="Oracles"
        users={oracles}
      />
      <Col span={24} className="BlockActions">
        <Col span={24}>
          <CustomButton
            theme="Primary"
            buttonText="I want to be an Oracle"
            hidden={!allowApplyOracle}
            onClick={() => onApply(supporterRoles.ORACLE)}
          />
        </Col>
        <Col span={24}>
          <CustomButton
            theme="Alternative"
            buttonText="I want to be a Funder"
            hidden={!allowApplyFunder}
            onClick={() => onApply(supporterRoles.FUNDER)}
          />
        </Col>
      </Col>
    </Fragment>
  );
};

ProjectUsersPanel.defaultProps = {
  funders: [],
  oracles: [],
  followers: [],
  applied: true,
  isSupporter: false
};

ProjectUsersPanel.propTypes = {
  entrepreneur: PropTypes.shape(userAvatarPropTypes).isRequired,
  funders: PropTypes.arrayOf(PropTypes.shape(userAvatarPropTypes)),
  oracles: PropTypes.arrayOf(PropTypes.shape(userAvatarPropTypes)),
  followers: PropTypes.arrayOf(PropTypes.shape(userAvatarPropTypes)),
  onApply: PropTypes.func.isRequired,
  applied: PropTypes.bool,
  status: PropTypes.string.isRequired,
  isSupporter: PropTypes.bool
};

export default ProjectUsersPanel;
