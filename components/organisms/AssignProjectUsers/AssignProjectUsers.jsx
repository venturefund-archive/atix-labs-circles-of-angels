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
import { getCountries } from 'api/countriesApi';
import { cleanObject } from 'helpers/utils';
import { ROLES_IDS } from './constants';
import { FormUserContainer } from './FormUserContainer/FormUserContainer';
import { FormUserContent } from './FormUserContent/FormUserContent';

export const FormProjectUsers = ({ onSuccess, goBack, project, onError }) => {
  const [keys, setKeys] = useState([0]);
  const [countries, setCountries] = useState({});
  const [projectUsers, setProjectUsers] = useState({});

  useEffect(() => {
    (async () => {
      setCountries({ isLoading: true });
      const _countries = await getCountries();
      setCountries({ content: _countries, isLoading: false });
    })();
  }, []);

  const handleChangeUserForm = (entity, changedFields) => {
    const _updatedProjectUsers = {
      ...projectUsers,
      [entity]: { ...projectUsers?.[entity], ...changedFields }
    };
    const _updatedProjectUsersProcessed = cleanObject(_updatedProjectUsers);
    setProjectUsers(_updatedProjectUsersProcessed);
  };

  const handleSubmitAssign = () => {
    onSuccess({ projectId: project?.id });
    goBack();
  };

  const onRemove = k => {
    const indexToDelete = keys.indexOf(k);
    if (keys.length === 1) {
      return;
    }
    const values = [...keys];
    values.splice(indexToDelete, 1);
    setKeys(values);

    /*  */
    const updatedProjectUsers = Object.fromEntries(
      Object.entries(projectUsers).filter(([key]) => !key.includes(`auditor-${k}`))
    );
    setProjectUsers(updatedProjectUsers);
  };

  const add = () => {
    setKeys([...keys, keys[keys.length - 1] + 1]);
  };

  const getUsersByRole = role =>
    project?.users?.filter(user => user?.role === role.toString())?.[0]?.users;

  const initialBeneficiaryUserData = getUsersByRole(ROLES_IDS.beneficiary)?.[0];
  const initialInvestorUserData = getUsersByRole(ROLES_IDS.investor)?.[0];
  const initialAuditorsUserData = getUsersByRole(ROLES_IDS.auditor);

  useEffect(() => {
    if (initialAuditorsUserData) {
      const _keys = [...Array(initialAuditorsUserData.length).keys()];
      setKeys(_keys);
    }
  }, [initialAuditorsUserData]);

  return (
    <>
      <TitlePage textTitle="Assign project users" />
      <h3 className="formProjectUsers__section__title">Beneficiary</h3>
      <FormUserContainer
        expandIconPosition="right"
        entity="beneficiary"
        onChange={value => handleChangeUserForm('beneficiary', value)}
        initialData={{
          userEmail: initialBeneficiaryUserData?.email,
          isFirst: initialBeneficiaryUserData?.first
        }}
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
          isFormSubmitted
        }) => (
          <FormUserContent
            setActiveKey={setActiveKey}
            countries={countries}
            setUserState={setUserState}
            userState={userState}
            form={form}
            handleSubmitConfirmUser={handleSubmitConfirmUser}
            handleSubmitNewUser={handleSubmitNewUser}
            initialData={{
              firstName: initialBeneficiaryUserData?.firstName,
              lastName: initialBeneficiaryUserData?.lastName,
              country: initialBeneficiaryUserData?.country
            }}
            isFormSubmitted={isFormSubmitted}
          />
        )}
      </FormUserContainer>
      <h3 className="formProjectUsers__section__title">Investor</h3>
      <FormUserContainer
        expandIconPosition="right"
        entity="investor"
        onChange={value => handleChangeUserForm('investor', value)}
        initialData={{
          userEmail: initialInvestorUserData?.email,
          isFirst: initialInvestorUserData?.first
        }}
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
          isFormSubmitted
        }) => (
          <FormUserContent
            setActiveKey={setActiveKey}
            countries={countries}
            setUserState={setUserState}
            userState={userState}
            form={form}
            handleSubmitConfirmUser={handleSubmitConfirmUser}
            handleSubmitNewUser={handleSubmitNewUser}
            initialData={{
              firstName: initialInvestorUserData?.firstName,
              lastName: initialInvestorUserData?.lastName,
              country: initialInvestorUserData?.country
            }}
            isFormSubmitted={isFormSubmitted}
          />
        )}
      </FormUserContainer>
      <div className="formProjectUsers__section">
        <h3 className="formProjectUsers__section__title">Auditor</h3>
        <Button type="dashed" onClick={add}>
          Add Auditor +
        </Button>
      </div>
      {keys.map(item => (
        <div key={item}>
          <FormUserContainer
            expandIconPosition="right"
            entity="auditor"
            onChange={value => handleChangeUserForm(`auditor-${item}`, value)}
            initialData={{
              userEmail: initialAuditorsUserData?.[item]?.email,
              isFirst: initialAuditorsUserData?.[item]?.first
            }}
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
              isFormSubmitted
            }) => (
              <FormUserContent
                onRemove={onRemove}
                setActiveKey={setActiveKey}
                countries={countries}
                setUserState={setUserState}
                userState={userState}
                item={item}
                form={form}
                handleSubmitConfirmUser={handleSubmitConfirmUser}
                handleSubmitNewUser={handleSubmitNewUser}
                totalKeys={keys?.length}
                initialData={{
                  firstName: initialAuditorsUserData?.[item]?.firstName,
                  lastName: initialAuditorsUserData?.[item]?.lastName,
                  country: initialAuditorsUserData?.[item]?.country
                }}
                isFormSubmitted={isFormSubmitted}
              />
            )}
          </FormUserContainer>
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
