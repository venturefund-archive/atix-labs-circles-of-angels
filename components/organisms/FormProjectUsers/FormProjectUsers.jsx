/* eslint-disable react/no-array-index-key */
/* eslint-disable func-names */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Icon, Collapse, Row, Col, Select, Alert } from 'antd';

import { onlyAlphanumerics, VALID_EMAIL_REGEX } from 'constants/Regex';
import { ERROR_MESSAGES, ERROR_TYPES, TIMEFRAME_UNITS } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import { putBasicInformation } from 'api/projectApi';
import { getErrorMessagesFields } from 'helpers/utils';
import './form-project-users.scss';
import _ from 'lodash';
import { createUser, getUsers } from 'api/userApi';
import { useEffect } from 'react';
import { getCountries } from 'api/countriesApi';

const { Option } = Select;

const { Panel } = Collapse;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
};

const CustomCollapse = ({ children, entity, form, ...rest }) => {
  const [activeKey, setActiveKey] = useState(0);
  const [userFound, setUserFound] = useState();
  const [userState, setUserState] = useState(USER_STATES.UNKNOWN);
  const { validateFields, getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (userFound?.id) {
      setFieldsValue(userFound);
    }
  }, [userFound]);

  const handleSubmitUser = e => {
    e.stopPropagation();
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        const dataToSend = { ...values };
        setUserState(USER_STATES.PENDING);
        console.log({ dataToSend });
        /* const response = await createUser(dataToSend);
        if (!response.errors) {
          setUserState(USER_STATES.PENDING);
        } */
      }
    });
  };

  return (
    <form
      onClick={() => {
        activeKey === 0 && setActiveKey(1);
        activeKey === 1 && setActiveKey(0);
      }}
    >
      <Collapse
        {...rest}
        className="formProjectUsers__collapse"
        bordered={false}
        activeKey={activeKey}
      >
        <Panel
          header={
            <HeaderCustom
              setActiveKey={setActiveKey}
              entity={entity}
              setUserFound={setUserFound}
              setUserState={setUserState}
              userState={userState}
              getFieldDecorator={getFieldDecorator}
            />
          }
          key={1}
        >
          {children(setActiveKey, userFound, setUserState, userState, form, handleSubmitUser)}
        </Panel>
      </Collapse>
    </form>
  );
};

export const UserForm = Form.create({
  name: 'UserForm',
  onValuesChange(props, values) {
    props.onChange(values);
  }
})(CustomCollapse);

const checkEmail = input => {
  return VALID_EMAIL_REGEX.test(input);
};

const USER_STATES = {
  PENDING: 'PENDING',
  EXIST: 'EXIST',
  UNKNOWN: 'UNKNOWN',
  LOADING: 'LOADING',
  NO_EXIST: 'NO_EXIST'
};

const USER_STATE_ICONS = {
  PENDING: 'clock-circle',
  EXIST: 'check-circle',
  LOADING: 'loading',
  NO_EXIST: 'info-circle'
};

const HeaderCustom = ({
  index,
  setActiveKey,
  entity,
  setUserFound,
  userState,
  setUserState,
  getFieldDecorator
}) => {
  const searchUser = async inputValue => {
    if (!checkEmail(inputValue)) return setUserState(USER_STATES.UNKNOWN);

    const users = (await getUsers({ email: inputValue }))?.data?.users;
    if (users?.length > 0) {
      console.log(users[0]);
      setUserFound(users[0]);
      setUserState(USER_STATES.EXIST);
    } else {
      setUserFound({ email: inputValue });
      setUserState(USER_STATES.NO_EXIST);
    }
    setActiveKey(1);
  };

  const searchUserDebounced = useCallback(_.debounce(value => searchUser(value), 2600), []);

  const onChange = ({ target }) => {
    setUserState(USER_STATES.LOADING);
    searchUserDebounced(target.value);
  };

  return (
    <>
      <Form.Item label={`${entity} email`} className="formProjectUsers__customHeader__formItem">
        {getFieldDecorator('email', {})(
          <Input
            placeholder={`Insert the email of the ${entity} user`}
            onClick={e => e.stopPropagation()}
            onChange={onChange}
          />
        )}

        {userState !== USER_STATES.UNKNOWN && (
          <Icon
            type={USER_STATE_ICONS[userState]}
            theme={userState !== USER_STATES.LOADING && 'filled'}
            className="formProjectUsers__customHeader__icon --success"
          />
        )}
        {userState === USER_STATES.NO_EXIST && (
          <p>The {entity} is not registered. Fill in the information below</p>
        )}
      </Form.Item>
    </>
  );
};

const UserFormContent = ({
  remove,
  entity,
  setActiveKey,
  userFound,
  form,
  countries = {},
  setUserState,
  userState,
  item,
  handleSubmitUser
}) => {
  const { getFieldDecorator } = form;

  return (
    <div onClick={e => e.stopPropagation()}>
      <Row>
        <Col span={12}>
          <Form.Item label="First name">
            {getFieldDecorator('firstName', {})(
              <Input placeholder="Enter first name" disabled={!!userFound?.id} />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last name">
            {getFieldDecorator('lastName', {})(
              <Input placeholder="Enter last name" disabled={!!userFound?.id} />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="Country/Region">
            {getFieldDecorator('country', {})(
              <Select
                loading={countries?.isLoading}
                placeholder="Select country or region"
                disabled={!!userFound?.id}
              >
                {countries?.content?.map(country => (
                  <Option value={country?.id} key={country?.id}>
                    {country?.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          {(userState === USER_STATES.NO_EXIST || userState === USER_STATES.UNKNOWN) && (
            <>
              <Button
                onClick={e => {
                  e.preventDefault();
                  remove(item);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={handleSubmitUser}>
                Invite User
              </Button>
            </>
          )}
          {userState === USER_STATES.PENDING && (
            <Alert message="Instructions have been sent!" type="success" showIcon />
          )}
        </Col>
      </Row>
    </div>
  );
};

const formItems = ({ remove, keys, countries = {}, handleChangeSingleUserForm }) => {
  return keys.map((item, index) => (
    <div key={item}>
      <UserForm
        defaultActiveKey={['0']}
        expandIconPosition="right"
        accordion
        entity="Auditor"
        onChange={value => handleChangeSingleUserForm(`auditor-${item}`, value)}
      >
        {(setActiveKey, userFound, setUserState, userState, form, handleSubmitUser) => (
          <UserFormContent
            remove={remove}
            entity="Auditor"
            setActiveKey={setActiveKey}
            userFound={userFound}
            countries={countries}
            setUserState={setUserState}
            userState={userState}
            item={item}
            form={form}
            handleSubmitUser={handleSubmitUser}
          />
        )}
      </UserForm>
    </div>
  ));
};

const FormProjectUsersContent = ({ form, onSuccess, goBack, project, onError }) => {
  const { getFieldDecorator, getFieldsError, getFieldValue } = form;
  const [keys, setKeys] = useState([0]);
  const [countries, setCountries] = useState({});
  const [projectUsers, setProjectUsers] = useState();

  useEffect(() => {
    (async () => {
      setCountries({ isLoading: true });
      const _countries = await getCountries();
      setCountries({ content: _countries, isLoading: false });
    })();
  }, []);

  const handleChangeSingleUserForm = (entity, changedFields) =>
    setProjectUsers({
      ...projectUsers,
      [entity]: { ...projectUsers?.[entity], ...changedFields }
    });

  const handleSubmitAssign = e => {
    // TODO: Check if all has id to send the request. If not, not do anything
    e.preventDefault();
    console.log({ projectUsers });
  };

  const updateProjectProcess = async (projectId, formData) => {
    const response = await putBasicInformation(projectId, formData);

    if (response.errors) {
      return onError(response.errors);
    }

    onSuccess(response.data);
    goBack();
  };

  const remove = k => {
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
      <UserForm
        defaultActiveKey={['0']}
        expandIconPosition="right"
        accordion
        entity="Beneficiary"
        onChange={value => handleChangeSingleUserForm('beneficiary', value)}
      >
        {(setActiveKey, userFound, setUserState, userState, form, handleSubmitUser) => (
          <UserFormContent
            remove={remove}
            entity="Beneficiary"
            setActiveKey={setActiveKey}
            userFound={userFound}
            countries={countries}
            setUserState={setUserState}
            userState={userState}
            form={form}
            handleSubmitUser={handleSubmitUser}
          />
        )}
      </UserForm>
      <h3 className="formProjectUsers__section__title">Investor</h3>
      <UserForm
        defaultActiveKey={['0']}
        expandIconPosition="right"
        accordion
        entity="Investor"
        onChange={value => handleChangeSingleUserForm('investor', value)}
      >
        {(setActiveKey, userFound, setUserState, userState, form, handleSubmitUser) => (
          <UserFormContent
            remove={remove}
            entity="Investor"
            setActiveKey={setActiveKey}
            userFound={userFound}
            countries={countries}
            setUserState={setUserState}
            userState={userState}
            form={form}
            handleSubmitUser={handleSubmitUser}
          />
        )}
      </UserForm>
      <div className="formProjectUsers__section">
        <h3 className="formProjectUsers__section__title">Auditor</h3>
        <Button type="dashed" onClick={add}>
          Add Auditor +
        </Button>
      </div>
      {formItems({ remove, keys, countries, handleChangeSingleUserForm })}

      <FooterButtons
        prevStepButton={(() => (
          <Button onClick={goBack}>Back</Button>
        ))()}
        nextStepButton={(() => (
          <div>
            {getErrorMessagesFields(getFieldsError(), [ERROR_TYPES.EMPTY]).map(error => error)}
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

export const FormProjectUsers = Form.create({
  name: 'FormProjectUsers'
})(FormProjectUsersContent);

FormProjectUsersContent.propTypes = {
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
