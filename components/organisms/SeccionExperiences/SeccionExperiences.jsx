/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Col, Row } from 'antd';
import NewExperience from '../../../pages/new-experience';
import CardExperience from '../../molecules/CardExperience/CardExperience';
import { experiencePropType } from '../../../helpers/proptypes';

const SeccionExperience = ({ experiences, onCreate, showCreateExperience }) => (
  <div className="Experiences">
    <Row gutter={12} className="wrap">
      {showCreateExperience && (
        <Col xs={24} lg={8}>
          <NewExperience onCreate={onCreate} />
        </Col>
      )}
      {!isEmpty(experiences) &&
        experiences.map(experience => (
          <CardExperience experience={experience} key={experience.id} />
        ))}
    </Row>
    {!showCreateExperience && isEmpty(experiences) && (
      <div className="messageContainer">
        <div className="messageNoExperiences">
          There&apos;re no experiences to display
        </div>
      </div>
    )}
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
  onCreate: PropTypes.func
};

export default SeccionExperience;
