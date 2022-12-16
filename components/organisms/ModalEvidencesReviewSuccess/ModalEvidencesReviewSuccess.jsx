import React from 'react';
import PropTypes from 'prop-types';
import CoaModal from 'components/atoms/CoaModal/CoaModal';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { Button, Typography } from 'antd';

export default function ModalEvidencesReviewSuccess({
  visible,
  onCancel,
}) {
  return (
    <CoaModal
      visible={visible}
      onCancel={onCancel}
      footer={
        <Button className='CoaModal__Primary' onClick={onCancel}>
        Continue
      </Button>}
    >
      <LogoWrapper textTitle='The activity was sent successfully!' />
      <Typography.Paragraph className='CoaModal__Paragraph--centered'>
        The evidences of the activity will be reviewed by an auditor.
      </Typography.Paragraph>
    </CoaModal>
  )
}

ModalEvidencesReviewSuccess.defaultProps = {
  visible: false,
  onCancel: () => undefined,
}

ModalEvidencesReviewSuccess.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func
}
