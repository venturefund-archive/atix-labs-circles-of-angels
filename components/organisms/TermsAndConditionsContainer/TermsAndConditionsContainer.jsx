/* eslint-disable max-len */
import GoBackButton from 'components/atoms/GoBackButton/GoBackButton';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './_style.scss';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import customConfig from '../../../custom-config'

const TermsAndConditionsContainer = () => {
  const history = useHistory();
  const { texts } = React.useContext(DictionaryContext);
  return (
    <div className='termAndConditionsContainer'>
      <GoBackButton goBackTo={() => history.goBack()} />
      <div className='termAndConditionsContainer__content'>
        <h1 className='termAndConditionsContainer__title'>{texts?.general?.['terms&Conditions'] || 'Terms & conditions'}</h1>
        <p>
          { customConfig.TERMS_AND_CONDITIONS }
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditionsContainer;
