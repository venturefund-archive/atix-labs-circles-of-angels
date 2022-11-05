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
import './form-project-users.scss';
import { getCountries } from 'api/countriesApi';
import { addUserToProject } from 'api/userProjectApi';
import { cleanObject } from 'helpers/utils';
import { ROLES_IDS } from './constants';
import { FormUser } from './FormUser';
import { FormUserContent } from './FormUserContent';

export const FormProjectUsers = ({ onSuccess, goBack, project, onError }) => {
  const [keys, setKeys] = useState([0]);
  const [countries, setCountries] = useState({});
  const [projectUsers, setProjectUsers] = useState({});
  const [formWithMissingFieldsError, setFormWithMissingFieldsError] = useState(false);

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

  const handleSubmitAssign = async e => {
    setFormWithMissingFieldsError(false);
    const projectId = parseInt(project?.id, 10);
    const processedUsers = Object.entries(projectUsers).map(([key, value]) => {
      const keyProcessed = key.split('-')[0].toLowerCase();
      return {
        id: value?.id,
        roleId: ROLES_IDS[keyProcessed],
        projectId,
        email: value?.email
      };
    });

    const withRoleId1 = processedUsers.some(el => el.roleId === 1);
    const withRoleId2 = processedUsers.some(el => el.roleId === 2);
    const withRoleId3 = processedUsers.some(el => el.roleId === 3);

    if (!withRoleId1 || !withRoleId2 || !withRoleId3) {
      return setFormWithMissingFieldsError(true);
    }

    const tasks = processedUsers.map(source => addUserToProject({ ...source, userId: source?.id }));

    const responses = await Promise.allSettled(tasks);

    const withErrors = responses?.filter(response => response?.value?.status !== 200);

    if (withErrors) {
      const mappedUsers = withErrors.map(error => {
        const userFound = processedUsers?.find(user => user?.id === error?.value?.body?.userId);
        return userFound?.email;
      });
      return onError(
        `Ocurrió un error al asignar los siguientes usuarios: ${mappedUsers.join(', ')}`
      );
    }

    onSuccess(project?.id);
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

  return (
    <>
      <TitlePage textTitle="Assign project users" />
      <h3 className="formProjectUsers__section__title">Beneficiary</h3>
      <FormUser
        expandIconPosition="right"
        entity="Beneficiary"
        onChange={value => handleChangeUserForm('beneficiary', value)}
      >
        {({ setActiveKey, setUserState, userState, form, handleSubmitUser }) => (
          <FormUserContent
            setActiveKey={setActiveKey}
            countries={countries}
            setUserState={setUserState}
            userState={userState}
            form={form}
            handleSubmitUser={handleSubmitUser}
          />
        )}
      </FormUser>
      <h3 className="formProjectUsers__section__title">Investor</h3>
      <FormUser
        expandIconPosition="right"
        entity="Investor"
        onChange={value => handleChangeUserForm('investor', value)}
      >
        {({ setActiveKey, setUserState, userState, form, handleSubmitUser }) => (
          <FormUserContent
            setActiveKey={setActiveKey}
            countries={countries}
            setUserState={setUserState}
            userState={userState}
            form={form}
            handleSubmitUser={handleSubmitUser}
          />
        )}
      </FormUser>
      <div className="formProjectUsers__section">
        <h3 className="formProjectUsers__section__title">Auditor</h3>
        <Button type="dashed" onClick={add}>
          Add Auditor +
        </Button>
      </div>
      {keys.map(item => (
        <div key={item}>
          <FormUser
            expandIconPosition="right"
            entity="Auditor"
            onChange={value => handleChangeUserForm(`auditor-${item}`, value)}
          >
            {({ setActiveKey, setUserState, userState, form, handleSubmitUser }) => (
              <FormUserContent
                onRemove={onRemove}
                setActiveKey={setActiveKey}
                countries={countries}
                setUserState={setUserState}
                userState={userState}
                item={item}
                form={form}
                handleSubmitUser={handleSubmitUser}
                totalKeys={keys?.length}
              />
            )}
          </FormUser>
        </div>
      ))}

      <FooterButtons
        prevStepButton={(() => (
          <Button onClick={goBack}>Back</Button>
        ))()}
        nextStepButton={(() => (
          <div className="formProjectUsers__buttons__right">
            {formWithMissingFieldsError && (
              <p>Debes completar todos los usuarios para poder realizar la asignación</p>
            )}
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
