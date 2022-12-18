import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import { CoaTextButton } from '../CoaTextButton/CoaTextButton';
import './_style.scss';

export const AddEvidenceButton = ({ onClickAddEvidence, disabled, responsiveLayout }) => (
  <CoaTextButton
      onClick={onClickAddEvidence}
      className={classNames( { 'addEvidenceButton': responsiveLayout } )}
      disabled={disabled}
  >
    <Icon type="plus" /> Add&nbsp;
    <span className={classNames( { 'addEvidenceButton__text': responsiveLayout } )}>
    evidences
    </span>
  </CoaTextButton>
)

AddEvidenceButton.defaultProps = {
  disabled: false,
  onClickAddEvidence: () => {},
  responsiveLayout: true
};
