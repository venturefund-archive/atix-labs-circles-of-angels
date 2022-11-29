/* eslint-disable react-hooks/exhaustive-deps */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { Icon, message } from 'antd';
import { useHistory, useParams } from 'react-router';
import './_createproject.scss';
import './_style.scss';
import { AssignProjectUsers } from 'components/organisms/AssignProjectUsers/AssignProjectUsers';
import { FormProjectDetail } from 'components/molecules/FormProjectDetail/FormProjectDetail';
import { FormProjectBasicInformation } from 'components/molecules/FormProjectBasicInformation/FormProjectBasicInformation';
import {
  checkProjectHasAllUsersRoles,
  checkProjectHasAllUsersWithFirstLogin,
  getProjectUsersPerRol
} from 'helpers/modules/projectUsers';
import { CoaMilestonesView } from 'components/organisms/CoaMilestones/CoaMilestonesView/CoaMilestonesView';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import ModalProjectCreated from 'components/organisms/ModalProjectCreated/ModalProjectCreated';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import ModalConfirmProjectPublish from 'components/organisms/ModalConfirmProjectPublish/ModalConfirmProjectPublish';
import ModalConfirmWithSK from 'components/organisms/ModalConfirmWithSK/ModalConfirmWithSK';
import ModalPublishLoading from 'components/organisms/ModalPublishLoading/ModalPublishLoading';
import ModalPublishSuccess from 'components/organisms/ModalPublishSuccess/ModalPublishSuccess';
import { projectStatuses, PROJECT_FORM_NAMES } from '../constants/constants';
import { getProject, publish, deleteProject } from '../api/projectApi';
import { showModalConfirm } from '../components/utils/Modals';
import CreateProject from '../components/organisms/CreateProject/CreateProject';

const wizards = {
  main: CreateProject,
  thumbnails: FormProjectBasicInformation,
  details: FormProjectDetail,
  proposal: AssignProjectUsers,
  milestones: CoaMilestonesView
};

const CreateProjectContainer = () => {
  const history = useHistory();
  const [confirmPublishVisible, setConfirmPublishVisible] = useState(false);
  const [currentWizard, setCurrentWizard] = useState(PROJECT_FORM_NAMES.MAIN);
  const [secretKeyVisible, setSecretKeyVisible] = useState(false);
  const [loadingModalVisible, setLoadinModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [project, setProject] = useState();
  const [completedSteps, setCompletedSteps] = useState({
    thumbnails: false,
    details: false,
    proposal: false,
    milestones: false
  });

  const { projectId } = useParams();

  const checkStepsStatus = async projectToCheck => {
    const { details = {}, basicInformation = {}, users = [], milestones = [] } = projectToCheck;

    const { beneficiaries = [], investors = [], auditors = [] } = getProjectUsersPerRol(users);

    const projectHasAllUsersRoles = checkProjectHasAllUsersRoles({
      beneficiaries,
      investors,
      auditors
    });

    const projectHasAllUsersWithFirstLogin = checkProjectHasAllUsersWithFirstLogin({
      beneficiaries,
      investors,
      auditors
    });

    const stepsStatus = {
      thumbnails: basicInformation?.location,
      details:
        details?.mission && details?.problemAddressed && details?.currency && details?.currencyType,
      proposal: projectHasAllUsersRoles && projectHasAllUsersWithFirstLogin,
      milestones: milestones?.length > 0
    };

    setCompletedSteps(stepsStatus);
  };

  const handleGoBack = async ({ withUpdate } = { withUpdate: false }) => {
    if (withUpdate) await fetchProject();
    setCurrentWizard(PROJECT_FORM_NAMES.MAIN);
  };

  const successCallback = async onSubmit => {
    try {
      await onSubmit?.();
      await handleGoBack({ withUpdate: true });
      message.success('Saved successfully');
    } catch (error) {
      errorCallback(error);
    }
  };

  // TODO validate with UX team
  const errorCallback = errorMsg =>
    message.error(errorMsg || 'An error ocurred while saving the information');

  const askDeleteConfirmation = () => {
    if (project && project.id) {
      showModalConfirm(
        'Warning!',
        'Are you sure you want to delete your project?',
        deleteCurrentProject
      );
    }
  };

  const deleteCurrentProject = async () => {
    if (project && project.id) {
      const response = await deleteProject(project.id);
      if (response.errors) {
        message.error(response.errors);
        return;
      }
      message.success('Your project was successfully deleted!');
      goToMyProjects();
    }
  };

  const publishProject = async () => {
    setSecretKeyVisible(false);
    setLoadinModalVisible(true);
    const { errors } = await publish(project.id);
    if (!errors) {
      message.error(errors);
      setLoadinModalVisible(false);
      return;
    }
    setLoadinModalVisible(false);
    setSuccessModalVisible(true);
  };

  const goToMyProjects = () => history.push('/my-projects');

  const fetchProject = async () => {
    const response = await getProject(projectId);
    if (response.errors || !response.data) {
      message.error('An error occurred while fetching the project');
      goToMyProjects();
    }
    const { data } = response;
    setProject({ ...data });
    await checkStepsStatus(data);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const CurrentComponent = wizards[currentWizard];
  const props = {};

  if (currentWizard === PROJECT_FORM_NAMES.MAIN) props.completedSteps = completedSteps;

  const status = project?.status;

  const isMainWizardActive = currentWizard === PROJECT_FORM_NAMES.MAIN;

  const getFinishButton = onSubmit => {
    if (status === projectStatuses.CONSENSUS) return;
    const disabled =
      isMainWizardActive && Object.values(completedSteps).some(completed => !completed);

    return (
      <CoaButton
        type="primary"
        onClick={() => (isMainWizardActive ? publishProject : successCallback(onSubmit))}
        disabled={disabled}
      >
        {isMainWizardActive ? 'Publish project' : 'Save and continue'} <Icon type="arrow-right" />
      </CoaButton>
    );
  };

  const getContinueLaterButton = () => {
    if (!isMainWizardActive) return;
    return <CoaTextButton onClick={goToMyProjects}>Save & Continue Later</CoaTextButton>;
  };

  const getPrevButton = () => {
    const onPrevOnClick = {
      [PROJECT_FORM_NAMES.DETAILS]: () => handleGoBack(),
      [PROJECT_FORM_NAMES.MAIN]: () => askDeleteConfirmation(),
      [PROJECT_FORM_NAMES.MILESTONES]: () => handleGoBack({ withUpdate: true }),
      [PROJECT_FORM_NAMES.PROPOSAL]: () => handleGoBack({ withUpdate: true }),
      [PROJECT_FORM_NAMES.THUMBNAILS]: () => handleGoBack()
    };
    return (
      <CoaButton
        type="secondary"
        icon={isMainWizardActive ? 'delete' : 'arrow-left'}
        onClick={onPrevOnClick[currentWizard]}
      >
        {isMainWizardActive ? 'Delete Project' : 'Back'}
      </CoaButton>
    );
  };

  const goToNextModal = (currentModal, nextModal) => {
    currentModal(false);
    nextModal(true);
  };

  // TODO add loading when "isSubmitting"
  return (
    <>
      <div className="p-createProject__container">
        <CurrentComponent
          project={project}
          setCurrentWizard={setCurrentWizard}
          goToMyProjects={goToMyProjects}
          Footer={({ errors, onSubmit } = {}) => (
            <FooterButtons
              errors={errors}
              className="p-createProject__footerButtons"
              finishButton={getFinishButton(onSubmit)}
              nextStepButton={getContinueLaterButton()}
              prevStepButton={getPrevButton()}
            >
              <ModalProjectCreated />
            </FooterButtons>
          )}
          {...props}
        />
      </div>
      <ModalConfirmProjectPublish
        visible={confirmPublishVisible}
        onSuccess={() => goToNextModal(setConfirmPublishVisible, setSecretKeyVisible)}
        onCancel={() => setSecretKeyVisible(false)}
      />
      <ModalConfirmWithSK
        visible={secretKeyVisible}
        setVisible={setSecretKeyVisible}
        onSuccess={publishProject}
      />
      <ModalPublishLoading
        visible={loadingModalVisible}
      />
      <ModalPublishSuccess
        visible={successModalVisible}
        setVisible={setSuccessModalVisible}
      />
    </>
  );
};
export default CreateProjectContainer;
