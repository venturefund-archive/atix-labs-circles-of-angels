/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Col, Row } from 'antd';
import ModalNewExperience from '../../../pages/new-experiences';
import CardExperience from '../../molecules/CardExperience/CardExperience';
import './_style.scss';
import {
  userPropTypes,
  experiencePropType,
  requiredIf
} from '../../../helpers/proptypes';

const SeccionExperience = ({
  experiences,
  onCreate,
  user,
  showCreateExperience
}) => (
  <div className="Experiences">
    <Row gutter={12}>
      {showCreateExperience && (
        <Col span={8}>
          <ModalNewExperience onCreate={onCreate} user={user} />
        </Col>
      )}
      {!isEmpty(experiences) &&
        experiences.map(experience => (
          <CardExperience experience={experience} key={experience.id} />
        ))}
    </Row>
  </div>
);

SeccionExperience.defaultProps = {
  experiences: [],
  onCreate: undefined,
  showCreateExperience: false
};

SeccionExperience.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.shape(experiencePropType)),
  showCreateExperience: PropTypes.bool,
  onCreate: (props, propName, componentName) =>
    requiredIf(
      props,
      propName,
      'showCreateExperience',
      PropTypes.func,
      componentName
    ),
  user: PropTypes.shape(userPropTypes).isRequired
};

export default SeccionExperience;
