import { Alert, Button, Col, Form, Input, Row, Select } from 'antd';
import CustomButton from 'components/atoms/CustomButton/CustomButton';
import { ERROR_MESSAGES } from 'constants/constants';
import { onlyAlphanumerics } from 'constants/Regex';
import React from 'react';
import { USER_STATES } from '../constants';
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
              userState === USER_STATES.PENDING
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
              userState === USER_STATES.PENDING
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
              userState === USER_STATES.PENDING
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
      <div>
        {userState !== USER_STATES.LOADING && <Button onClick={handleRemove}>Cancel</Button>}
        {
          <CustomButton
            theme="Primary"
            buttonText={userState === USER_STATES.NO_EXIST ? 'Invite User' : 'Confirm'}
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
          />
        }

        {isFormSubmitted && userState !== USER_STATES.WITH_ERROR && (
          <Alert
            message={
              userState === USER_STATES.PENDING ? 'Instructions have been sent!' : 'User assigned'
            }
            type="success"
            showIcon
          />
        )}
        {userState === USER_STATES.WITH_ERROR && (
          <Alert message="There was an error!" type="error" showIcon />
        )}
      </div>
    </div>
  );
};
