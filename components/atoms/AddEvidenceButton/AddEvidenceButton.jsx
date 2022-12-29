import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaTextButton } from '../CoaTextButton/CoaTextButton';
import './_style.scss';

export const AddEvidenceButton = ({ onClickAddEvidence, disabled, responsiveLayout }) => {
  const { texts } = React.useContext(DictionaryContext);
  return(
    <CoaTextButton
        onClick={onClickAddEvidence}
        className={classNames( { 'addEvidenceButton': responsiveLayout } )}
        disabled={disabled}
    >
      <Icon type="plus" /> {texts?.general?.btnAdd || 'Add'}&nbsp;
      <span className={classNames( { 'addEvidenceButton__text': responsiveLayout } )}>
        {texts?.coaIndicator?.evidences || 'Evidences'}
      </span>
    </CoaTextButton>
  );
}

AddEvidenceButton.defaultProps = {
  disabled: false,
  onClickAddEvidence: () => {},
  responsiveLayout: true
};
