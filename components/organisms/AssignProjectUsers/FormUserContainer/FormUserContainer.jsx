import { Collapse, Form } from 'antd';
import { createUser, sendWelcomeEmail } from 'api/userApi';
import React, { useState } from 'react';
import { USER_STATES } from '../constants';
import { CustomCollapseHeader } from '../CustomCollapseHeader/CustomCollapseHeader';
import './form-user-container.scss';

const { Panel } = Collapse;

const CustomCollapse = ({ children, entity, form, initialData, projectId, ...rest }) => {
  const [activeKey, setActiveKey] = useState(0);
  const [userState, setUserState] = useState(USER_STATES.UNKNOWN);
  const { validateFields, setFieldsValue } = form;

  const handleSubmitUser = () => {
    validateFields(async (err, values) => {
      if (!err) {
        const dataToSend = { ...values };
        setUserState(USER_STATES.PENDING);
        const response = await createUser({ ...dataToSend, isAdmin: false });
        if (!response.errors) {
          /* const sendWelcomeEmailResponse = await sendWelcomeEmail({
            userId: response?.data?.id,
            projectId
          });
          if (!sendWelcomeEmailResponse.errors) {
          }
          setUserState(USER_STATES.WITH_ERROR); */
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
              initialData={initialData}
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

export const FormUserContainer = Form.create({
  name: 'FormUserContainer',
  onValuesChange(props, values) {
    props.onChange(values);
  }
})(CustomCollapse);
