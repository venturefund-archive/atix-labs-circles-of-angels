import React from 'react';
import PropTypes from 'prop-types';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { Button, Typography } from 'antd';
import { CoaBaseModal } from '../CoaModals/CoaBaseModal/CoaBaseModal';

export default function ModalEvidencesReviewSuccess({ visible, onCancel }) {
  return (
    <CoaBaseModal
      visible={visible}
      onCancel={onCancel}
      footerButtonPosition="center"
      footer={
        <Button className="CoaModal__Primary" onClick={onCancel}>
          Continue
        </Button>
      }
    >
      <LogoWrapper textTitle="The activity was sent successfully!" />
      <Typography.Paragraph className="CoaModal__Paragraph--centered">
        The evidences of the activity will be reviewed by an auditor.
      </Typography.Paragraph>
    </CoaBaseModal>
  );
}

ModalEvidencesReviewSuccess.defaultProps = {
  visible: false,
  onCancel: () => undefined
};

ModalEvidencesReviewSuccess.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func
};
