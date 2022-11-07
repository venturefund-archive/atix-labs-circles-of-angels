import { Collapse, Form } from 'antd';
import { createUser } from 'api/userApi';
import React, { useState } from 'react';
import { USER_STATES } from '../constants';
import { CustomCollapseHeader } from '../CustomCollapseHeader/CustomCollapseHeader';
import './form-user-container.scss';

const { Panel } = Collapse;

const CustomCollapse = ({ children, entity, form, ...rest }) => {
  const [activeKey, setActiveKey] = useState(0);
  const [userState, setUserState] = useState(USER_STATES.UNKNOWN);
  const { validateFields, setFieldsValue } = form;

  const handleSubmitUser = e => {
    validateFields(async (err, values) => {
      if (!err) {
        const dataToSend = { ...values };
        setUserState(USER_STATES.PENDING);
        const response = await createUser({ ...dataToSend, isAdmin: false });
        if (!response.errors) {
          setUserState(USER_STATES.PENDING);
          setFieldsValue({ ...dataToSend, id: response?.data?.id });
        } else {
          setUserState(USER_STATES.WITH_ERROR);
        }
      }
    });
  };

  return (
    <Form
      aria-hidden="true"
      onClick={() => {
        if (activeKey === 0) setActiveKey(1);
        if (activeKey === 1) setActiveKey(0);
      }}
    >
      <Collapse
        {...rest}
        className="formUserContainer__collapse"
        bordered={false}
        activeKey={activeKey}
      >
        <Panel
          header={
            <CustomCollapseHeader
              setActiveKey={setActiveKey}
              entity={entity}
              setUserState={setUserState}
              userState={userState}
              form={form}
            />
          }
          key={1}
        >
          {children({ setActiveKey, setUserState, userState, form, handleSubmitUser })}
        </Panel>
      </Collapse>
    </Form>
  );
};

export const FormUser = Form.create({
  name: 'FormUser',
  onValuesChange(props, values) {
    props.onChange(values);
  }
})(CustomCollapse);
