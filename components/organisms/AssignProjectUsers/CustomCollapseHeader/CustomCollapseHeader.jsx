import { Form, Icon, Input } from 'antd';
import { getUsers } from 'api/userApi';
import { ERROR_MESSAGES } from 'constants/constants';
import { checkValidEmail } from 'helpers/utils';
import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { USER_STATES, USER_STATE_ICONS } from '../constants';
import './custom-collapse-header.scss';

const ICON_CLASSES_BY_USER_STATE = {
  [USER_STATES.EXIST]: 'success',
  [USER_STATES.PENDING]: 'pending',
  [USER_STATES.NO_EXIST]: 'info'
};

export const CustomCollapseHeader = ({
  setActiveKey,
  entity,
  userState,
  setUserState,
  form,
  initialData
}) => {
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
      if (users[0]?.isActive) {
        return setUserState(USER_STATES.EXIST);
      }
      setUserState(USER_STATES.PENDING);
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

  const onChange = event => {
    const {
      target: { value }
    } = event;
    setUserState(USER_STATES.LOADING);
    searchUserDebounced(value);
  };

  useEffect(() => {
    if (initialData?.isFirst !== undefined) {
      if (!initialData.isFirst) return setUserState(USER_STATES.PENDING);
      setUserState(USER_STATES.EXIST);
    }
  }, []);

  return (
    <Form.Item label={`${entity} email`} className="customCollapseHeader__customHeader__formItem">
      {getFieldDecorator('email', {
        rules: [
          {
            required: true,
            message: ERROR_MESSAGES.EMPTY,
            whitespace: true
          }
        ],
        initialValue: initialData?.userEmail
      })(
        <Input
          placeholder={`Insert the email of the ${entity} user`}
          onChange={onChange}
          onClick={e => e.stopPropagation()}
        />
      )}

      {userState !== USER_STATES.UNKNOWN && (
        <Icon
          type={USER_STATE_ICONS[userState]}
          theme={userState !== USER_STATES.LOADING && 'filled'}
          className={`customCollapseHeader__customHeader__icon --${ICON_CLASSES_BY_USER_STATE[userState]}`}
        />
      )}
      {userState === USER_STATES.NO_EXIST && (
        <p>The {entity} is not registered. Fill in the information below</p>
      )}
    </Form.Item>
  );
};
