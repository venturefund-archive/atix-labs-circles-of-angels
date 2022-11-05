import { Form, Icon, Input } from 'antd';
import { getUsers } from 'api/userApi';
import { ERROR_MESSAGES } from 'constants/constants';
import { checkValidEmail } from 'helpers/utils';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { USER_STATES, USER_STATE_ICONS } from './constants';

export const CustomCollapseHeader = ({ setActiveKey, entity, userState, setUserState, form }) => {
  const { setFieldsValue, getFieldDecorator } = form;
  const searchUser = async inputValue => {
    if (!checkValidEmail(inputValue)) return setUserState(USER_STATES.UNKNOWN);

    const users = (await getUsers({ email: inputValue }))?.data?.users;
    setActiveKey(1);
    if (users?.length > 0) {
      setFieldsValue({
        id: users[0]?.id,
        firstName: users[0]?.firstName,
        lastName: users[0]?.lastName,
        country: users[0]?.country
      });
      setUserState(USER_STATES.EXIST);
    } else {
      setFieldsValue({
        email: inputValue,
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        country: undefined
      });
      setUserState(USER_STATES.NO_EXIST);
    }
  };

  const searchUserDebounced = useCallback(_.debounce(value => searchUser(value), 2600), []);

  const onChange = ({ target }) => {
    setUserState(USER_STATES.LOADING);
    searchUserDebounced(target.value);
  };

  return (
    <>
      <Form.Item label={`${entity} email`} className="formProjectUsers__customHeader__formItem">
        {getFieldDecorator('email', {
          rules: [
            {
              required: true,
              message: ERROR_MESSAGES.EMPTY,
              whitespace: true
            }
          ]
        })(<Input placeholder={`Insert the email of the ${entity} user`} onChange={onChange} />)}

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
