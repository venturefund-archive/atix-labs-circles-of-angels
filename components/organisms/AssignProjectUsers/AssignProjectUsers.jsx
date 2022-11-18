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
import { Divider, Icon } from 'antd';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import './assign-project-users.scss';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import _ from 'lodash';
import { getCountries } from 'api/countriesApi';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { CoaAlert } from 'components/molecules/CoaAlert/CoaAlert';
import { SentIcon } from 'components/atoms/CustomIcons/SentIcon';
import {
  checkProjectHasAnyUserWithoutFirstLogin,
  getUsersByRole
} from 'helpers/modules/projectUsers';
import { ROLES_IDS } from './constants';
import { FormUserContainer } from './FormUserContainer/FormUserContainer';
import { FormUserContent } from './FormUserContent/FormUserContent';

export const AssignProjectUsers = ({ onSuccess, goBack, project, onError }) => {
  const [countries, setCountries] = useState({});
  const [hasPendingUsers, setHasPendingUsers] = useState(false);

  const initialBeneficiariesUserData = getUsersByRole(ROLES_IDS.beneficiary, project?.users);
  const initialInvestorsUserData = getUsersByRole(ROLES_IDS.investor, project?.users);
  const initialAuditorsUserData = getUsersByRole(ROLES_IDS.auditor, project?.users);

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

    const projectHasAnyUserWithoutFirstLogin = checkProjectHasAnyUserWithoutFirstLogin({
      auditors: initialAuditorsUserData,
      beneficiaries: initialBeneficiariesUserData,
      investors: initialInvestorsUserData
    });
    setHasPendingUsers(projectHasAnyUserWithoutFirstLogin);
  }, [initialBeneficiariesUserData, initialAuditorsUserData, initialInvestorsUserData]);

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

  const addAuditor = () => {
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
    initialBeneficiariesUserData?.[0],
    initialInvestorsUserData?.[0],
    initialAuditorsUserData
  ];

  return (
    <>
      <CoaAlert
        className="assignProjectUsers__warningAlert"
        Icon={<Icon className="assignProjectUsers__warningAlert__icon" component={SentIcon} />}
        highlightedText="You have pending users!"
        message="The indicated users have not entered the platform for their first login yet. The project cannot be published until all users have registered."
        customColor="yellow"
        closable
        show={hasPendingUsers}
      />
      <div className="assignProjectUsers__content">
        <TitlePage textTitle="Assign project users" />
        {Object.keys(ROLES_IDS).map((key, index) => (
          <div key={key} className="assignProjectUsers__content__itemsContainer">
            <div className="assignProjectUsers__content__itemsContainer__titleContainer">
              <h3 className="assignProjectUsers__content__itemsContainer__titleContainer__title">
                {key}
              </h3>
              {ROLES_IDS[key] === ROLES_IDS.auditor && (
                <CoaTextButton onClick={addAuditor} disabled={!canAddAdditionalAuditor}>
                  <Icon type="plus" /> Add Auditor
                </CoaTextButton>
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
                    initialData={initialData[index]}
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
            {index + 1 < Object.keys(ROLES_IDS).length && (
              <Divider type="horizontal" className="assignProjectUsers__content__divider" />
            )}
          </div>
        ))}
      </div>
      <FooterButtons
        prevStepButton={(() => (
          <CoaButton type="secondary" onClick={goBack}>
            <Icon type="arrow-left" /> Back
          </CoaButton>
        ))()}
        nextStepButton={(() => (
          <div className="footerButtonsContainer__right">
            <CoaButton type="primary" onClick={handleSubmitAssign}>
              Save and continue
            </CoaButton>
          </div>
        ))()}
      />
    </>
  );
};

AssignProjectUsers.propTypes = {
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
