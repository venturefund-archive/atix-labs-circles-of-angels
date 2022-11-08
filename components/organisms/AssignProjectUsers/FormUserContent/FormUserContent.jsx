import { Alert, Button, Col, Form, Input, Row, Select } from 'antd';
import { ERROR_MESSAGES } from 'constants/constants';
import { onlyAlphanumerics } from 'constants/Regex';
import React from 'react';
import { USER_STATES } from '../constants';

const { Option } = Select;

export const FormUserContent = ({
  onRemove,
  setActiveKey,
  form,
  countries = {},
  setUserState,
  userState,
  item,
  handleSubmitUser,
  totalKeys,
  initialData
}) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
  const country = getFieldValue('country');
  const firstName = getFieldValue('firstName');
  const lastName = getFieldValue('lastName');
  const email = getFieldValue('email');

  const handleRemove = () => {
    if (item && totalKeys !== 1) {
      return onRemove(item);
    }
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
    <div onClick={e => e.stopPropagation()} aria-hidden="true">
      <Row>
        <Col span={12}>
          <Form.Item label="id" style={{ display: 'none' }}>
            {getFieldDecorator('id', {})(<Input />)}
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
        </Col>
        <Col span={12}>
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
        </Col>
      </Row>
      <Row>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <>
            {userState !== USER_STATES.PENDING && <Button onClick={handleRemove}>Cancel</Button>}
            {(userState === USER_STATES.NO_EXIST || userState === USER_STATES.UNKNOWN) && (
              <Button
                type="primary"
                onClick={handleSubmitUser}
                disabled={!country || !firstName || !lastName || !email}
              >
                Invite User
              </Button>
            )}
          </>

          {userState === USER_STATES.PENDING && (
            <Alert message="Instructions have been sent!" type="success" showIcon />
          )}
          {userState === USER_STATES.WITH_ERROR && (
            <Alert message="There was an error!" type="error" showIcon />
          )}
        </Col>
      </Row>
    </div>
  );
};
