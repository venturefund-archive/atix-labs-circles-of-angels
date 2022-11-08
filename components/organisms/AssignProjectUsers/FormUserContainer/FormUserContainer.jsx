import { Collapse, Form } from 'antd';
import { createUser, sendWelcomeEmail } from 'api/userApi';
import { addUserToProject } from 'api/userProjectApi';
import React, { useState } from 'react';
import { ROLES_IDS, USER_STATES } from '../constants';
import { CustomCollapseHeader } from '../CustomCollapseHeader/CustomCollapseHeader';
import './form-user-container.scss';

const { Panel } = Collapse;

const CustomCollapse = ({
  children,
  entity,
  form,
  initialData,
  projectId,
  onError,
  isFirst,
  ...rest
}) => {
  const [activeKey, setActiveKey] = useState(0);
  const [userState, setUserState] = useState(USER_STATES.UNKNOWN);
  const { validateFields, setFieldsValue, getFieldValue } = form;
  const [isFormSubmitted, setFormSubmitted] = useState(Boolean(initialData?.email));
  const userId = getFieldValue('id');

  const handleError = () => {
    setUserState(USER_STATES.WITH_ERROR);
    onError();
  };

  const handleSubmitNewUser = () => {
    validateFields(async (err, values) => {
      if (!err) {
        setFormSubmitted(true);
        const dataToSend = { ...values };

        const response = await createUser({ ...dataToSend, isAdmin: false });
        if (response.errors) return handleError();

        const addUserToProjectResponse = await addUserToProject({
          projectId,
          roleId: ROLES_IDS[entity],
          userId: response?.data?.id
        });
        if (addUserToProjectResponse.errors) return handleError();

        const sendWelcomeEmailResponse = await sendWelcomeEmail({
          userId: response?.data?.id,
          projectId
        });

        if (sendWelcomeEmailResponse.errors) return handleError();

        setUserState(USER_STATES.PENDING);
        setFieldsValue({ ...dataToSend, id: response?.data?.id });
      }
    });
  };

  const handleSubmitConfirmUser = async () => {
    setFormSubmitted(true);
    const addUserToProjectResponse = await addUserToProject({
      projectId,
      roleId: ROLES_IDS[entity],
      userId
    });
    if (addUserToProjectResponse.errors) return handleError();
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
          {children({
            setActiveKey,
            setUserState,
            userState,
            form,
            handleSubmitNewUser,
            handleSubmitConfirmUser,
            isFormSubmitted
          })}
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
