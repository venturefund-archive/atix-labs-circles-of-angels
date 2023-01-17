import { Collapse, Form, message } from 'antd';
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
  item,
  totalKeys,
  onRemove,
  countries,
  ...rest
}) => {
  const [activeKey, setActiveKey] = useState(0);
  const [userState, setUserState] = useState(USER_STATES.UNKNOWN);
  const [prevUserState, setPrevUserState] = useState(USER_STATES.UNKNOWN);
  const { validateFields, setFieldsValue, getFieldValue } = form;
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const userId = getFieldValue('id');

  const handleError = () => {
    if (userState !== USER_STATES.WITH_ERROR) setPrevUserState(userState);
    setUserState(USER_STATES.WITH_ERROR);
    onError();
  };

  const handleCreateAndAssignUser = () => {
    validateFields(async (err, values) => {
      if (!err) {
        setIsFormSubmitted(true);
        const dataToSend = { ...values };
        const countryId = countries?.content?.find(country => values?.country === country?.name)
          ?.id;

        const response = await createUser({ ...dataToSend, isAdmin: false, country: countryId });
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
      }
    });
  };

  const handleUnassignUser = async () => {
    try {
      setIsFormSubmitted(false);
      const { status } = await removeUserFromProject({
        projectId,
        roleId: ROLES_IDS[entity],
        userId
      });
      if (status !== 200) return message.error('Unassigned failed');
      if (status === 200) message.success('Unassigned successful');
      if (item !== undefined && totalKeys !== 1) return onRemove();
      setFieldsValue({
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        country: undefined,
        email: undefined
      });
      setUserState(USER_STATES.UNKNOWN);
      setActiveKey(0);
    } catch (error) {
      message.error(error);
    }
  };

  const handleAssignUser = async () => {
    setIsFormSubmitted(true);
    const addUserToProjectResponse = await addUserToProject({
      projectId,
      roleId: ROLES_IDS[entity],
      userId
    });
    if (addUserToProjectResponse.errors) return handleError();
    if (setCanAddAdditionalAuditor) setCanAddAdditionalAuditor(true);
    if (userState === USER_STATES.PENDING_WITH_TEXT) return setUserState(USER_STATES.PENDING);
    return setUserState(USER_STATES.EXIST);
  };

  const handleResendEmail = async e => {
    e.stopPropagation();
    const { errors } = await sendWelcomeEmail({ userId, projectId });
    if (errors) return message.error('Error when sending email');
    return message.success('Email was sent!');
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
              handleResendEmail={handleResendEmail}
              countries={countries}
            />
          }
          key={1}
        >
          {children({
            setActiveKey,
            setUserState,
            userState,
            form,
            handleCreateAndAssignUser,
            handleAssignUser,
            isFormSubmitted,
            handleUnassignUser,
            prevUserState
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
  onError: () => {},
  setCanAddAdditionalAuditor: undefined,
  totalKeys: undefined,
  item: undefined,
  onRemove: undefined
};

CustomCollapse.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
  entity: PropTypes.string,
  form: PropTypes.objectOf(PropTypes.any),
  initialData: PropTypes.objectOf(PropTypes.any),
  projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onError: PropTypes.func,
  setCanAddAdditionalAuditor: PropTypes.func,
  totalKeys: PropTypes.number,
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRemove: PropTypes.func
};
