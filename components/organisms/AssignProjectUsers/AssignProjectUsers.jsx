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
import './assign-project-users.scss';
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

export const AssignProjectUsers = ({ project, onError, Footer }) => {
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
                  handleCreateAndAssignUser,
                  handleAssignUser,
                  handleUnassignUser,
                  isFormSubmitted,
                  removeCurrentUserFromProject
                }) => (
                  <FormUserContent
                    setActiveKey={setActiveKey}
                    countries={countries}
                    setUserState={setUserState}
                    userState={userState}
                    form={form}
                    handleAssignUser={handleAssignUser}
                    handleCreateAndAssignUser={handleCreateAndAssignUser}
                    handleUnassignUser={handleUnassignUser}
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
                    totalKeys={currentAuditorsElements?.length}
                    item={item}
                    onRemove={() => onRemove(item)}
                  >
                    {({
                      setActiveKey,
                      setUserState,
                      userState,
                      form,
                      handleCreateAndAssignUser,
                      handleAssignUser,
                      handleUnassignUser,
                      isFormSubmitted,
                      removeCurrentUserFromProject
                    }) => (
                      <FormUserContent
                        removeCurrentUserFromProject={removeCurrentUserFromProject}
                        setActiveKey={setActiveKey}
                        countries={countries}
                        setUserState={setUserState}
                        userState={userState}
                        form={form}
                        handleAssignUser={handleAssignUser}
                        handleCreateAndAssignUser={handleCreateAndAssignUser}
                        handleUnassignUser={handleUnassignUser}
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
      {Footer()}
    </>
  );
};

AssignProjectUsers.defaultProps = {
  Footer: undefined
};

AssignProjectUsers.propTypes = {
  project: PropTypes.shape({
    details: PropTypes.shape({
      problemAddressed: PropTypes.string,
      mission: PropTypes.string,
      currencyType: PropTypes.string,
      currency: PropTypes.string,
      additionalCurrencyInformation: PropTypes.string
    })
  }).isRequired,
  onError: PropTypes.func.isRequired,
  Footer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
