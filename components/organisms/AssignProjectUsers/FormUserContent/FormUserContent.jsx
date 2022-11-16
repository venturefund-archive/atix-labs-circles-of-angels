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

export const FormUserContent = ({
  onRemove,
  setActiveKey,
  form,
  countries = {},
  setUserState,
  userState,
  item,
  handleSubmitNewUser,
  handleSubmitConfirmUser,
  totalKeys,
  initialData,
  isFormSubmitted,
  removeCurrentUserFromProject
}) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
  const country = getFieldValue('country');
  const firstName = getFieldValue('firstName');
  const lastName = getFieldValue('lastName');
  const email = getFieldValue('email');

  const handleRemove = async () => {
    if (item !== undefined && totalKeys !== 1) {
      await removeCurrentUserFromProject();
      return onRemove();
    }
    await removeCurrentUserFromProject();
    setFieldsValue({
      id: undefined,
      firstName: undefined,
      lastName: undefined,
      country: undefined,
      email: undefined
    });
    setUserState(USER_STATES.UNKNOWN);
    setActiveKey(0);
  };

  return (
    <div
      onClick={e => e.stopPropagation()}
      aria-hidden="true"
      className="formUserContent__container"
    >
      <Form.Item label="id" style={{ display: 'none' }}>
        {getFieldDecorator('id', { initialValue: initialData?.id })(<Input />)}
      </Form.Item>
      <Form.Item label="First name">
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
      <Form.Item label="Last name">
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
      <Form.Item label="Country/Region">
        {getFieldDecorator('country', {
          initialValue: initialData?.country
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
          >
            {countries?.content?.map(_country => (
              <Option value={_country?.id} key={_country?.id}>
                {_country?.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <div className="formUserContent__container__buttonsContainer">
        <CoaButton onClick={handleRemove} type="ghost" disabled={userState === USER_STATES.LOADING}>
          Cancel
        </CoaButton>

        <CoaButton
          type="primary"
          onClick={
            userState === USER_STATES.NO_EXIST ? handleSubmitNewUser : handleSubmitConfirmUser
          }
          htmlType="submit"
          visible
          disabled={
            !country ||
            !firstName ||
            !lastName ||
            !email ||
            isFormSubmitted ||
            userState === USER_STATES.LOADING
          }
        >
          {userState === USER_STATES.NO_EXIST ? 'Invite User' : 'Assign user'}
        </CoaButton>

        <FeedbackMessage
          message={
            userState === USER_STATES.PENDING || USER_STATES.PENDING_WITH_TEXT
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
  onRemove: undefined,
  setActiveKey: undefined,
  form: undefined,
  countries: undefined,
  setUserState: undefined,
  userState: undefined,
  item: undefined,
  handleSubmitNewUser: undefined,
  handleSubmitConfirmUser: undefined,
  totalKeys: undefined,
  initialData: undefined,
  isFormSubmitted: undefined,
  removeCurrentUserFromProject: undefined
};

FormUserContent.propTypes = {
  onRemove: PropTypes.func,
  setActiveKey: PropTypes.func,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    setFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func
  }),
  countries: PropTypes.shape({
    isLoading: PropTypes.bool,
    content: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  }),
  setUserState: PropTypes.func,
  userState: PropTypes.func,
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleSubmitNewUser: PropTypes.func,
  handleSubmitConfirmUser: PropTypes.func,
  totalKeys: PropTypes.number,
  initialData: PropTypes.objectOf(PropTypes.any),
  isFormSubmitted: PropTypes.bool,
  removeCurrentUserFromProject: PropTypes.func
};
