import { Collapse, Form } from 'antd';
import { createUser, sendWelcomeEmail } from 'api/userApi';
import { addUserToProject, removeUserFromProject } from 'api/userProjectApi';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  setCanAddAdditionalAuditor,
  ...rest
}) => {
  const [activeKey, setActiveKey] = useState(0);
  const [userState, setUserState] = useState(USER_STATES.UNKNOWN);
  const { validateFields, setFieldsValue, getFieldValue } = form;
  const [isFormSubmitted, setIsFormSubmitted] = useState(Boolean(initialData?.email));
  const userId = getFieldValue('id');
  const [currentUserId, setCurrentUserId] = useState(initialData?.id);

  const handleError = () => {
    setUserState(USER_STATES.WITH_ERROR);
    onError();
  };

  const handleSubmitNewUser = () => {
    validateFields(async (err, values) => {
      if (!err) {
        setIsFormSubmitted(true);
        const dataToSend = { ...values };

        if (initialData?.id !== undefined || currentUserId === userId) {
          await removeUserFromProject({
            projectId,
            roleId: ROLES_IDS[entity],
            userId: currentUserId
          });
        }
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
        if (setCanAddAdditionalAuditor) setCanAddAdditionalAuditor(true);
        setCurrentUserId(userId);
      }
    });
  };

  const removeCurrentUserFromProject = () => {
    const _userId = getFieldValue('id');
    removeUserFromProject({ projectId, roleId: ROLES_IDS[entity], userId: _userId });
  };

  const handleSubmitConfirmUser = async () => {
    setIsFormSubmitted(true);

    if (initialData?.id) {
      await removeUserFromProject({
        projectId,
        roleId: ROLES_IDS[entity],
        userId: currentUserId
      });
    }
    const addUserToProjectResponse = await addUserToProject({
      projectId,
      roleId: ROLES_IDS[entity],
      userId
    });
    if (addUserToProjectResponse.errors) return handleError();
    if (setCanAddAdditionalAuditor) setCanAddAdditionalAuditor(true);
    setCurrentUserId(userId);
    setUserState(USER_STATES.EXIST);
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
              setIsFormSubmitted={setIsFormSubmitted}
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
            isFormSubmitted,
            removeCurrentUserFromProject
          })}
        </Panel>
      </Collapse>
    </Form>
  );
};

export const FormUserContainer = Form.create({
  name: 'FormUserContainer'
})(CustomCollapse);

CustomCollapse.defaultProps = {
  children: undefined,
  entity: '',
  form: undefined,
  initialData: undefined,
  projectId: undefined,
  onError: undefined,
  setCanAddAdditionalAuditor: undefined
};

CustomCollapse.propTypes = {
  children: React.ReactNode,
  entity: PropTypes.string,
  form: PropTypes.objectOf(PropTypes.any),
  initialData: PropTypes.objectOf(PropTypes.any),
  projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onError: PropTypes.func,
  setCanAddAdditionalAuditor: PropTypes.func
};
