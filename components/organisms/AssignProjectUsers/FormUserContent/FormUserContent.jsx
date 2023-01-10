import React from 'react';
import { Form, Input, Select } from 'antd';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import { ERROR_MESSAGES } from 'constants/constants';
import { onlyAlphanumerics } from 'constants/Regex';
import { FeedbackMessage } from 'components/atoms/FeedbackMessage/FeedbackMessage';
import PropTypes from 'prop-types';
import { FEEDBACK_MESSAGE_TYPES, USER_STATES } from '../constants';
import './form-user-content.module.scss';

const { Option } = Select;

const SUBMIT_BUTTON_DICT = ({ assign, unassign, inviteAndAssign, prevFunc, prevText }) => ({
  [USER_STATES.NO_EXIST]: {
    func: inviteAndAssign,
    text: 'Invite & Assign user'
  },
  [USER_STATES.PENDING_WITH_TEXT]: {
    func: assign,
    text: 'Assign user'
  },
  [USER_STATES.EXIST_WITH_TEXT]: {
    func: assign,
    text: 'Assign user'
  },
  [USER_STATES.PENDING]: {
    func: unassign,
    text: 'Unassign user'
  },
  [USER_STATES.EXIST]: {
    func: unassign,
    text: 'Unassign user'
  },
  [USER_STATES.UNKNOWN]: {
    func: () => {},
    text: 'Assign user'
  },
  [USER_STATES.LOADING]: {
    func: () => {},
    text: 'Assign user'
  },
  [USER_STATES.WITH_ERROR]: {
    text: prevText,
    func: prevFunc
  }
});

export const FormUserContent = ({
  form,
  countries = {},
  userState,
  handleCreateAndAssignUser,
  handleAssignUser,
  handleUnassignUser,
  initialData,
  isFormSubmitted,
  prevUserState
}) => {
  const { getFieldDecorator, getFieldValue } = form;
  const country = getFieldValue('country');
  const firstName = getFieldValue('firstName');
  const lastName = getFieldValue('lastName');
  const email = getFieldValue('email');

  const initialCountryName = countries?.content?.find(
    _country => _country?.id === initialData?.country
  )?.name;

  return (
    <div
      onClick={e => e.stopPropagation()}
      aria-hidden="true"
      className="formUserContent__container"
    >
      <Form.Item className="formUserContent__container__formItem" label="First name">
        {getFieldDecorator('firstName', {
          rules: [
            {
              required: true,
              message: ERROR_MESSAGES.EMPTY,
              whitespace: true
            },
            {
              pattern: onlyAlphanumerics,
              message: ERROR_MESSAGES.ALPHANUMERIC
            }
          ],
          initialValue: initialData?.firstName
        })(
          <Input
            maxLength={50}
            placeholder="Enter first name"
            disabled={
              userState === USER_STATES.EXIST ||
              userState === USER_STATES.LOADING ||
              userState === USER_STATES.PENDING ||
              userState === USER_STATES.PENDING_WITH_TEXT ||
              userState === USER_STATES.EXIST_WITH_TEXT
            }
          />
        )}
      </Form.Item>
      <Form.Item className="formUserContent__container__formItem" label="Last name">
        {getFieldDecorator('lastName', {
          rules: [
            {
              required: true,
              message: ERROR_MESSAGES.EMPTY,
              whitespace: true
            },
            {
              pattern: onlyAlphanumerics,
              message: ERROR_MESSAGES.ALPHANUMERIC
            }
          ],
          initialValue: initialData?.lastName
        })(
          <Input
            maxLength={50}
            placeholder="Enter last name"
            disabled={
              userState === USER_STATES.EXIST ||
              userState === USER_STATES.LOADING ||
              userState === USER_STATES.PENDING ||
              userState === USER_STATES.PENDING_WITH_TEXT ||
              userState === USER_STATES.EXIST_WITH_TEXT
            }
          />
        )}
      </Form.Item>
      <Form.Item className="formUserContent__container__formItem" label="Country/Region">
        {getFieldDecorator('country', {
          initialValue: initialCountryName,
          rules: [
            {
              required: true,
              message: ERROR_MESSAGES.EMPTY
            }
          ]
        })(
          <Select
            loading={countries?.isLoading}
            placeholder="Select country or region"
            disabled={
              userState === USER_STATES.EXIST ||
              userState === USER_STATES.LOADING ||
              userState === USER_STATES.PENDING ||
              userState === USER_STATES.PENDING_WITH_TEXT ||
              userState === USER_STATES.EXIST_WITH_TEXT
            }
            showSearch
          >
            {countries?.content?.map(_country => (
              <Option value={_country?.name} key={_country?.id}>
                {_country?.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <div className="formUserContent__container__buttonsContainer">
        <CoaButton
          type="primary"
          onClick={
            SUBMIT_BUTTON_DICT({
              assign: handleAssignUser,
              inviteAndAssign: handleCreateAndAssignUser,
              unassign: handleUnassignUser,
              prevFunc: SUBMIT_BUTTON_DICT({
                assign: handleAssignUser,
                inviteAndAssign: handleCreateAndAssignUser,
                unassign: handleUnassignUser
              })[prevUserState]?.func
            })[userState]?.func
          }
          htmlType="submit"
          disabled={
            ((!country || !firstName || !lastName || !email) && !initialData) ||
            userState === USER_STATES.LOADING
          }
        >
          {
            SUBMIT_BUTTON_DICT({
              assign: handleAssignUser,
              inviteAndAssign: handleCreateAndAssignUser,
              unassign: handleUnassignUser,
              prevText: SUBMIT_BUTTON_DICT({
                assign: handleAssignUser,
                inviteAndAssign: handleCreateAndAssignUser,
                unassign: handleUnassignUser
              })[prevUserState]?.text
            })[userState]?.text
          }
        </CoaButton>

        <FeedbackMessage
          message={
            userState === USER_STATES.PENDING || userState === USER_STATES.PENDING_WITH_TEXT
              ? 'Invitation and instructions have been sent!'
              : 'User assigned successfully'
          }
          type={FEEDBACK_MESSAGE_TYPES.SUCCESS}
          show={isFormSubmitted && userState !== USER_STATES.WITH_ERROR}
          seconds={2}
        />
        <FeedbackMessage
          type={FEEDBACK_MESSAGE_TYPES.ERROR}
          message="There was an error!"
          show={userState === USER_STATES.WITH_ERROR}
          seconds={2}
        />
      </div>
    </div>
  );
};

FormUserContent.defaultProps = {
  form: undefined,
  countries: undefined,
  userState: undefined,
  handleCreateAndAssignUser: undefined,
  handleAssignUser: undefined,
  initialData: undefined,
  isFormSubmitted: undefined,
  handleUnassignUser: undefined
};

FormUserContent.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    setFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func
  }),
  countries: PropTypes.shape({
    isLoading: PropTypes.bool,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    )
  }),
  userState: PropTypes.string,
  handleCreateAndAssignUser: PropTypes.func,
  handleAssignUser: PropTypes.func,
  initialData: PropTypes.objectOf(PropTypes.any),
  isFormSubmitted: PropTypes.bool,
  handleUnassignUser: PropTypes.func
};
