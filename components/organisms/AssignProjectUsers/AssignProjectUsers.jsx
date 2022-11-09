/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import './assign-project-users.scss';
import _ from 'lodash';
import { getCountries } from 'api/countriesApi';
import { ROLES_IDS } from './constants';
import { FormUserContainer } from './FormUserContainer/FormUserContainer';
import { FormUserContent } from './FormUserContent/FormUserContent';

export const FormProjectUsers = ({ onSuccess, goBack, project, onError }) => {
  const [countries, setCountries] = useState({});

  const getUsersByRole = role =>
    project?.users?.filter(user => user?.role === role.toString())?.[0]?.users;

  const initialBeneficiaryUserData = getUsersByRole(ROLES_IDS.beneficiary)?.[0];
  const initialInvestorUserData = getUsersByRole(ROLES_IDS.investor)?.[0];
  const initialAuditorsUserData = getUsersByRole(ROLES_IDS.auditor);

  const [currentAuditorsElements, setCurrentAuditorsElements] = useState([_.uniqueId()]);

  const [canAddAdditionalAuditor, setCanAddAdditionalAuditor] = useState(
    initialAuditorsUserData?.length > 0
  );

  useEffect(() => {
    (async () => {
      setCountries({ isLoading: true });
      const _countries = await getCountries();
      setCountries({ content: _countries, isLoading: false });
    })();
  }, []);

  const handleSubmitAssign = () => {
    onSuccess({ projectId: project?.id });
    goBack();
  };

  const onRemove = k => {
    if (currentAuditorsElements.length === 1) {
      return;
    }

    const updatedArray = currentAuditorsElements.filter(key => key !== k);

    setCurrentAuditorsElements([...updatedArray]);
  };

  const add = () => {
    setCurrentAuditorsElements([...currentAuditorsElements, _.uniqueId()]);
    setCanAddAdditionalAuditor(false);
  };

  useEffect(() => {
    if (initialAuditorsUserData) {
      const _keys = initialAuditorsUserData?.map(
        initialAuditorUserData => initialAuditorUserData?.id
      );

      setCurrentAuditorsElements([..._keys]);
    }
  }, [initialAuditorsUserData]);

  const initialData = [
    initialBeneficiaryUserData,
    initialInvestorUserData,
    initialAuditorsUserData
  ];

  return (
    <>
      <TitlePage textTitle="Assign project users" />
      {Object.keys(ROLES_IDS).map((key, index) => (
        <div key={key}>
          <div className="formProjectUsers__section">
            <h3 className="formProjectUsers__section__title">{key}</h3>
            {ROLES_IDS[key] === ROLES_IDS.auditor && (
              <Button type="dashed" onClick={add} disabled={!canAddAdditionalAuditor}>
                Add Auditor +
              </Button>
            )}
          </div>
          {ROLES_IDS[key] !== ROLES_IDS.auditor && (
            <FormUserContainer
              expandIconPosition="right"
              entity={key}
              initialData={initialData[index]}
              projectId={project?.id}
              onError={onError}
            >
              {({
                setActiveKey,
                setUserState,
                userState,
                form,
                handleSubmitNewUser,
                handleSubmitConfirmUser,
                isFormSubmitted,
                removeCurrentUserFromProject
              }) => (
                <FormUserContent
                  setActiveKey={setActiveKey}
                  countries={countries}
                  setUserState={setUserState}
                  userState={userState}
                  form={form}
                  handleSubmitConfirmUser={handleSubmitConfirmUser}
                  handleSubmitNewUser={handleSubmitNewUser}
                  initialData={{}}
                  isFormSubmitted={isFormSubmitted}
                  removeCurrentUserFromProject={removeCurrentUserFromProject}
                />
              )}
            </FormUserContainer>
          )}
          {ROLES_IDS[key] === ROLES_IDS.auditor &&
            currentAuditorsElements.map(item => {
              const _initialData = initialData[index]?.find(
                _initialAuditorsUserData => _initialAuditorsUserData?.id === item
              );
              return (
                <FormUserContainer
                  expandIconPosition="right"
                  entity={key}
                  initialData={_initialData}
                  projectId={project?.id}
                  onError={onError}
                  setCanAddAdditionalAuditor={setCanAddAdditionalAuditor}
                  key={item}
                >
                  {({
                    setActiveKey,
                    setUserState,
                    userState,
                    form,
                    handleSubmitNewUser,
                    handleSubmitConfirmUser,
                    isFormSubmitted,
                    removeCurrentUserFromProject
                  }) => (
                    <FormUserContent
                      removeCurrentUserFromProject={removeCurrentUserFromProject}
                      onRemove={() => onRemove(item)}
                      setActiveKey={setActiveKey}
                      countries={countries}
                      setUserState={setUserState}
                      userState={userState}
                      item={item}
                      form={form}
                      handleSubmitConfirmUser={handleSubmitConfirmUser}
                      handleSubmitNewUser={handleSubmitNewUser}
                      totalKeys={currentAuditorsElements?.length}
                      initialData={_initialData}
                      isFormSubmitted={isFormSubmitted}
                    />
                  )}
                </FormUserContainer>
              );
            })}
        </div>
      ))}

      <FooterButtons
        prevStepButton={(() => (
          <Button onClick={goBack}>Back</Button>
        ))()}
        nextStepButton={(() => (
          <div className="formProjectUsers__buttons__right">
            <Button
              type="primary"
              className="formProjectUsers__footer"
              onClick={handleSubmitAssign}
            >
              Save and continue
            </Button>
          </div>
        ))()}
      />
    </>
  );
};

FormProjectUsers.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  project: PropTypes.shape({
    details: PropTypes.shape({
      problemAddressed: PropTypes.string,
      mission: PropTypes.string,
      currencyType: PropTypes.string,
      currency: PropTypes.string,
      additionalCurrencyInformation: PropTypes.string
    })
  }).isRequired,
  onError: PropTypes.func.isRequired
};
