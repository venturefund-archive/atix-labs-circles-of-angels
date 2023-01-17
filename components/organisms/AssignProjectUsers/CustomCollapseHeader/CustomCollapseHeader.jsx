/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Icon, Input, Tooltip } from 'antd';
import { getUsers } from 'api/userApi';
import { ERROR_MESSAGES } from 'constants/constants';
import { capitalizeFirstLetter, checkValidEmail } from 'helpers/utils';
import _ from 'lodash';
import { ConditionalWrapper } from 'components/atoms/ConditionalWrapper/ConditionalWrapper';
import React, { useCallback, useEffect } from 'react';
import { FeedbackMessage } from 'components/atoms/FeedbackMessage/FeedbackMessage';
import PropTypes from 'prop-types';
import { VALID_EMAIL_REGEX } from 'constants/Regex';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import {
  FEEDBACK_MESSAGE_BY_USER_STATE,
  FEEDBACK_MESSAGE_TYPES_BY_USER_STATE,
  TOOLTIP_TITLES_BY_USER_STATE,
  USER_STATES
} from '../constants';
import './custom-collapse-header.scss';

export const CustomCollapseHeader = ({
  setActiveKey,
  entity,
  userState,
  setUserState,
  form,
  initialData,
  handleResendEmail,
  countries
}) => {
  const { setFieldsValue, getFieldDecorator } = form;

  const searchUser = async inputValue => {
    if (!checkValidEmail(inputValue)) return setUserState(USER_STATES.UNKNOWN);

    const users = (await getUsers({ email: inputValue }))?.data?.users;
    setActiveKey(1);
    if (users?.length > 0) {
      const countryName = countries?.content?.find(country => country?.id === users[0]?.country)
        ?.name;

      setFieldsValue({
        id: users[0]?.id,
        firstName: users[0]?.firstName,
        lastName: users[0]?.lastName,
        country: countryName
      });
      if (!users[0]?.first) {
        setUserState(USER_STATES.EXIST_WITH_TEXT);
      } else {
        setUserState(USER_STATES.PENDING_WITH_TEXT);
      }
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

  const searchUserDebounced = useCallback(_.debounce(value => searchUser(value), 2600), [
    countries
  ]);

  const onChange = event => {
    const {
      target: { value }
    } = event;
    setUserState(USER_STATES.LOADING);
    searchUserDebounced(value);
  };

  useEffect(() => {
    if (initialData?.first !== undefined) {
      if (initialData.first) return setUserState(USER_STATES.PENDING);
      setUserState(USER_STATES.EXIST);
    }
  }, []);

  return (
    <>
      <Form.Item label="id" style={{ display: 'none' }}>
        {getFieldDecorator('id', { initialValue: initialData?.id })(<Input />)}
      </Form.Item>
      <Form.Item
        label={`${capitalizeFirstLetter(entity)} email`}
        className="customCollapseHeader__customHeader__formItem"
      >
        {getFieldDecorator('email', {
          rules: [
            {
              required: true,
              message: ERROR_MESSAGES.EMPTY,
              whitespace: true
            },
            {
              pattern: VALID_EMAIL_REGEX,
              message: ERROR_MESSAGES.INVALID_EMAIL
            }
          ],
          initialValue: initialData?.email
        })(
          <Input
            placeholder={`Insert the email of the ${entity} user`}
            onChange={onChange}
            onClick={e => e.stopPropagation()}
            disabled={userState === USER_STATES.EXIST || userState === USER_STATES.PENDING}
          />
        )}

        <ConditionalWrapper
          condition={userState === USER_STATES.EXIST || userState === USER_STATES.PENDING}
          wrapper={children => (
            <Tooltip
              placement="top"
              title={
                <div className="customCollapseHeader__customHeader__tooltip">
                  <FeedbackMessage
                    className="customCollapseHeader__customHeader__tooltip__title"
                    show
                    message={TOOLTIP_TITLES_BY_USER_STATE[userState]}
                    type={FEEDBACK_MESSAGE_TYPES_BY_USER_STATE[userState]}
                  />
                  <p className="customCollapseHeader__customHeader__tooltip__description">
                    {userState === USER_STATES.EXIST &&
                      'The user is already registered on the platform and will be assigned to the project in the chosen role.'}
                    {userState === USER_STATES.PENDING &&
                      'An email invitation has been sent for the user to enter the platform.'}
                  </p>
                </div>
              }
            >
              {children}
            </Tooltip>
          )}
        >
          {userState === USER_STATES.LOADING && <Icon type="loading" />}
          <FeedbackMessage
            className="customCollapseHeader__customHeader__feedbackMessage"
            message={FEEDBACK_MESSAGE_BY_USER_STATE(entity)[userState]}
            show={userState !== USER_STATES.UNKNOWN && userState !== USER_STATES.LOADING}
            type={FEEDBACK_MESSAGE_TYPES_BY_USER_STATE[userState]}
          />
        </ConditionalWrapper>
        {userState === USER_STATES.PENDING && (
          <CoaButton
            type="ghost"
            className="customCollapseHeader__customHeader__resendButton"
            onClick={handleResendEmail}
          >
            <Icon type="mail" />
            Resend Invitation
          </CoaButton>
        )}
      </Form.Item>
    </>
  );
};

CustomCollapseHeader.defaultProps = {
  setActiveKey: undefined,
  entity: '',
  userState: undefined,
  setUserState: undefined,
  form: {},
  initialData: undefined,
  handleResendEmail: undefined
};

CustomCollapseHeader.propTypes = {
  setActiveKey: PropTypes.func,
  entity: PropTypes.string,
  userState: PropTypes.string,
  setUserState: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  initialData: PropTypes.objectOf(PropTypes.any),
  handleResendEmail: PropTypes.func
};
