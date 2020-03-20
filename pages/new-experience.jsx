/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import { newExperienceFormItems } from '../helpers/createProjectFormFields';
import CustomFormModal from '../components/organisms/CustomFormModal/CustomFormModal';

const NewExperience = ({ onCreate }) => {
  const [visible, setVisible] = useState(false);

  const onShowModal = () => setVisible(true);

  return (
    <Col className="CardNewExperience vertical" xs={24} lg={24}>
      <button type="button" onClick={onShowModal}>
        <img src="./static/images/Icon-experience.svg" alt="new-experience" />
        Add New Experience
      </button>
      <CustomFormModal
        title="Write your experience!"
        formItems={newExperienceFormItems}
        visible={visible}
        onConfirm={onCreate}
        onClose={() => setVisible(false)}
      />
    </Col>
  );
};

NewExperience.propTypes = {
  onCreate: PropTypes.func.isRequired
};

export default NewExperience;
