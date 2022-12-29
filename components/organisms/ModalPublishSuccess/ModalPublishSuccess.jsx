/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React from 'react';
import { Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import './_style.scss';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import PropTypes from 'prop-types';
import { CoaFormModal } from '../CoaModals/CoaFormModal/CoaFormModal';

const ModalPublishSuccess = ({ visible, onCancel, projectId }) => {
  const { push } = useHistory();
  return (
    <CoaFormModal
      visible={visible}
      onCancel={onCancel}
      title={
        <TitlePage
          centeredText
          textTitle="The project has been published"
          underlinePosition="none"
          textColor="#4C7FF7"
        />
      }
      withoutCancelButton
      withLogo
      okText="Continue"
      buttonsPosition="center"
      onSave={() => push('/my-projects')}
    >
      <Typography.Paragraph className="CoaModal__Paragraph--centered">
        The project has been published successfully. you can see it from here.
      </Typography.Paragraph>

      <Link
        className="textcenter"
        style={{ textAlign: 'center', display: 'block' }}
        to={`/${projectId}`}
      >
        Project Link
      </Link>
    </CoaFormModal>
  );
};

ModalPublishSuccess.defaultProps = {
  visible: false,
  onCancel: () => undefined,
  projectId: undefined
};
ModalPublishSuccess.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  projectId: PropTypes.string
};
export default ModalPublishSuccess;
