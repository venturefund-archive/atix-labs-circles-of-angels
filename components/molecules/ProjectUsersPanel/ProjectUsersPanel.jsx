import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import DrawerUsers from '../../organisms/DrawerUsers/DrawerUsers';
import AvatarUser from '../../atoms/AvatarUser/AvatarUser';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import UsersPanelCard from './UsersPanelCard';
import { userAvatarPropTypes } from '../../../helpers/proptypes';
import { supporterRoles, projectStatuses } from '../../../constants/constants';
import { showModalConfirm } from '../../utils/Modals';

const { PUBLISHED, CONSENSUS, FUNDING, EXECUTING, FINISHED } = projectStatuses;

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
  const {
    oracles: alreadyApplyAsOracle,
    funders: alreadyApplyAsFunder
  } = applied;

  const allowApplyOracle =
    !alreadyApplyAsOracle &&
    isSupporter &&
    allowAssignOracleStatuses.includes(status);

  const allowApplyFunder =
    !alreadyApplyAsFunder &&
    isSupporter &&
    allowAssignFunderStatuses.includes(status);

  const isExecutingOrFinished = [EXECUTING, FINISHED].includes(status);

  const askApplyConfirmation = role => {
    const roleText = role === supporterRoles.ORACLES ? 'an Oracle' : 'a Funder';
    const modalText = {
      title: `Applying to be ${roleText}`,
      description: `Are you sure you want to apply to be ${roleText} of this project?`
    };
    showModalConfirm(modalText.title, modalText.description, () =>
      onApply(role)
    );
  };

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
      <Col span={24} className="flex">
        {followers.map(user => (
          <AvatarUser user={user} />
        ))}
      </Col>
    </Fragment>
  );

  return (
    <Fragment>
      <div>
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
          category={isExecutingOrFinished ? 'Funders' : 'Interested in'}
          userRole={isExecutingOrFinished ? '' : 'Funding'}
          users={funders}
        />
        <UsersPanelCard
          theme="Red"
          category={isExecutingOrFinished ? 'Oracles' : 'Interested in being'}
          userRole={isExecutingOrFinished ? '' : 'Oracles'}
          users={oracles}
        />
      </div>
      <div>
        <Col span={24} className="BlockActions">
          <Col span={24}>
            <CustomButton
              theme="Primary"
              buttonText="I want to be an Oracle"
              hidden={!allowApplyOracle}
              onClick={() => askApplyConfirmation(supporterRoles.ORACLES)}
            />
          </Col>
          <Col span={24}>
            <CustomButton
              theme="Alternative"
              buttonText="I want to be a Funder"
              hidden={!allowApplyFunder}
              onClick={() => askApplyConfirmation(supporterRoles.FUNDERS)}
            />
          </Col>
        </Col>
      </div>
    </Fragment>
  );
};

ProjectUsersPanel.defaultProps = {
  funders: [],
  oracles: [],
  followers: [],
  applied: {
    oracles: true,
    funders: true
  },
  isSupporter: false
};

ProjectUsersPanel.propTypes = {
  entrepreneur: PropTypes.shape(userAvatarPropTypes).isRequired,
  funders: PropTypes.arrayOf(PropTypes.shape(userAvatarPropTypes)),
  oracles: PropTypes.arrayOf(PropTypes.shape(userAvatarPropTypes)),
  followers: PropTypes.arrayOf(PropTypes.shape(userAvatarPropTypes)),
  onApply: PropTypes.func.isRequired,
  applied: PropTypes.shape({
    oracles: PropTypes.bool,
    funders: PropTypes.bool
  }),
  status: PropTypes.string.isRequired,
  isSupporter: PropTypes.bool
};

export default ProjectUsersPanel;
