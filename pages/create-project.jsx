/* eslint-disable react-hooks/exhaustive-deps */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, useContext } from 'react';
import { Icon, message } from 'antd';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
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
import ModalPublishError from 'components/organisms/ModalPublishError/ModalPublishError';
import { PROJECT_STATUS_ENUM } from 'model/projectStatus';
import { UserContext } from 'components/utils/UserContext';
import CoaRejectButton from 'components/atoms/CoaRejectButton/CoaRejectButton';
import CoaApproveButton from 'components/atoms/CoaApproveButton/CoaApproveButton';
import { EDITOR_VARIANT, PROJECT_FORM_NAMES } from '../constants/constants';
import { getProject, publish, deleteProject, cancelReview, sendToReview, approveCloneProject, rejectCloneProject } from '../api/projectApi';
import { showModalConfirm } from '../components/utils/Modals';
import CreateProject from '../components/organisms/CreateProject/CreateProject';
import { signMessage } from '../helpers/blockchain/wallet';

const wizards = {
  main: CreateProject,
  thumbnails: FormProjectBasicInformation,
  details: FormProjectDetail,
  proposal: AssignProjectUsers,
  milestones: CoaMilestonesView
};

const EDITING_LOGIC = ({ status, isMainWizardActive, completedSteps }) => ({
  FIRST_EDITING: {
    finishButtonDisabled:
      ![PROJECT_STATUS_ENUM.DRAFT, PROJECT_STATUS_ENUM.IN_REVIEW].includes(status) ||
      (isMainWizardActive && Object.values(completedSteps).some(completed => !completed)),
    nextStepButtonDisabled: ![PROJECT_STATUS_ENUM.DRAFT, PROJECT_STATUS_ENUM.IN_REVIEW].includes(
      status
    ),
    prevStepButtonDisabled: ![PROJECT_STATUS_ENUM.DRAFT, PROJECT_STATUS_ENUM.IN_REVIEW].includes(
      status
    ),
    prevButtonText: isMainWizardActive ? 'Delete Project' : 'Back',
    nextStepButtonText: isMainWizardActive ? 'Publish project' : 'Save and continue'
  },
  EDITING_CLONE: {
    finishButtonDisabled:
      ![PROJECT_STATUS_ENUM.OPEN_REVIEW].includes(status) ||
      (isMainWizardActive && Object.values(completedSteps).some(completed => !completed)),
    nextStepButtonDisabled: ![PROJECT_STATUS_ENUM.OPEN_REVIEW].includes(status),
    prevStepButtonDisabled: false,
    prevButtonText: isMainWizardActive ? 'Delete Edition' : 'Back',
    nextStepButtonText: isMainWizardActive ? 'Send to review' : 'Save and continue'
  }
});

const CreateProjectContainer = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [currentWizard, setCurrentWizard] = useState(PROJECT_FORM_NAMES.MAIN);
  const [confirmPublishVisible, setConfirmPublishVisible] = useState(false);
  const [secretKeyVisible, setSecretKeyVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [loadingSendToReviewModalVisible, setLoadingSendToReviewModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successSendToReviewModalVisible, setSuccessSendToReviewModalVisible] = useState(false);
  const [successApproveCloneModalVisible, setSuccessApproveCloneModalVisible] = useState(false);
  const [successRejectCloneModalVisible, setSuccessRejectCloneModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [confirmSendToReviewVisible, setConfirmSendToReviewVisible] = useState(false);
  const [confirmApprovalVisible, setApprovalVisible] = useState(false);
  const [confirmRejectionVisible, setRejectionVisible] = useState(false);

  const [project, setProject] = useState();
  const [completedSteps, setCompletedSteps] = useState({
    thumbnails: false,
    details: false,
    proposal: false,
    milestones: false
  });

  const { projectId } = useParams();

  const isACloneBeingEdited = project?.editing;
  const isACloneInReview = project?.inReview;
  const { isAdmin } = user;
  const isApprovalRejectionAvailable = isAdmin && isACloneInReview;

  const editorVariant = isACloneBeingEdited
    ? EDITOR_VARIANT.EDITING_CLONE
    : EDITOR_VARIANT.FIRST_EDITING;

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

    const hasAMilestoneWithActivity = milestones?.some(
      milestone => milestone?.activities?.length > 0
    );

    const stepsStatus = {
      thumbnails: basicInformation?.location,
      details: details?.mission,
      proposal: projectHasAllUsersRoles && projectHasAllUsersWithFirstLogin,
      milestones: hasAMilestoneWithActivity
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

  const askDeleteEditionConfirmation = () => {
    if (!project || !project.id) return;
    showModalConfirm(
      'Warning!',
      'Are you sure you want to delete this edition?',
      deleteCurrentProjectEdition
    );
  };

  const deleteCurrentProjectEdition = async () => {
    if (!project || !project.id) return;
    const response = await cancelReview(project.id);
    if (response.error || !response.data) {
      message.error(response.errors);
      return;
    }
    message.success('Your project edition was successfully deleted!');
    history.push(`/${project.parent}`);
  };

  const publishProject = async () => {
    goToNextModal(setSecretKeyVisible, setLoadingModalVisible);

    const { errors } = await publish(project.id);

    goToNextModal(setLoadingModalVisible, errors ? setErrorModalVisible : setSuccessModalVisible);
  };

const sendToReviewProject = async () => {
    goToNextModal(setSecretKeyVisible, setLoadingSendToReviewModalVisible);

    const { errors } = await sendToReview(project.id);

    goToNextModal(
      setLoadingSendToReviewModalVisible,
      errors ? setErrorModalVisible : setSuccessSendToReviewModalVisible
    );
  };

  const approveClonedProject = async () => {
    goToNextModal(setSecretKeyVisible, setLoadingModalVisible);

    const { errors } = await approveCloneProject(project.id);

    goToNextModal(
      setLoadingModalVisible,
      errors ? setErrorModalVisible : setSuccessApproveCloneModalVisible
    );
  };

  const rejectClonedProject = async () => {
    goToNextModal(setSecretKeyVisible, setLoadingModalVisible);

    const { errors } = await rejectCloneProject(project.id);

    goToNextModal(
      setLoadingModalVisible,
      errors ? setErrorModalVisible : setSuccessRejectCloneModalVisible
    );
  };

  const goToMyProjects = () => history.push('/my-projects');
  const goToParentProject = () => history.push(`/${project?.parent}`);

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
  }, [projectId]);

  const CurrentComponent = wizards[currentWizard];
  const props = {};

  if (currentWizard === PROJECT_FORM_NAMES.MAIN) props.completedSteps = completedSteps;

  const status = project?.status;

  const isMainWizardActive = currentWizard === PROJECT_FORM_NAMES.MAIN;

  const getFinishButton = onSubmit => {
    const handleFinishEdit = isACloneBeingEdited
      ? setConfirmSendToReviewVisible
      : setConfirmPublishVisible;

    if(isApprovalRejectionAvailable) return (
      <CoaApproveButton
        onClick={() => {setApprovalVisible(true)}}
      >
        Approve
      </CoaApproveButton>
    );

    return (
      <CoaButton
        type="primary"
        onClick={() => (isMainWizardActive ? handleFinishEdit(true) : successCallback(onSubmit))}
        disabled={
          EDITING_LOGIC({ status, isMainWizardActive, completedSteps })?.[editorVariant]
            ?.finishButtonDisabled
        }
      >
        {
          EDITING_LOGIC?.({ completedSteps, isMainWizardActive, status })?.[editorVariant]
            ?.nextStepButtonText
        }
        <Icon type="arrow-right" />
      </CoaButton>
    );
  };

  const getContinueLaterButton = () => {
    if (!isMainWizardActive) return;

    if(isApprovalRejectionAvailable)
      return (
        <CoaRejectButton
          onClick={() => {setRejectionVisible(true)}}
        >
        Reject
        </CoaRejectButton>
      );

    return (
      <CoaTextButton
        disabled={
          EDITING_LOGIC({ status, completedSteps, isMainWizardActive })?.[editorVariant]
            ?.nextStepButtonDisabled
        }
        onClick={isACloneBeingEdited ? goToParentProject : goToMyProjects}
      >
        Save & Continue Later
      </CoaTextButton>
    );
  };

  const getPrevButton = () => {
    const onPrevOnClick = {
      [PROJECT_FORM_NAMES.DETAILS]: () => handleGoBack(),
      [PROJECT_FORM_NAMES.MAIN]: () => {
        if(isACloneInReview) return history.goBack();
        if(isACloneBeingEdited) return askDeleteEditionConfirmation();
        return askDeleteConfirmation();
      },
      [PROJECT_FORM_NAMES.MILESTONES]: () => handleGoBack({ withUpdate: true }),
      [PROJECT_FORM_NAMES.PROPOSAL]: () => handleGoBack({ withUpdate: true }),
      [PROJECT_FORM_NAMES.THUMBNAILS]: () => handleGoBack()
    };

    const argumentsForText = isACloneInReview
      ? { status, isMainWizardActive: false, completedSteps }
      : { status, isMainWizardActive, completedSteps };
    return (
      <CoaButton
        type="secondary"
        icon={isMainWizardActive && !isACloneInReview? 'delete' : 'arrow-left'}
        onClick={onPrevOnClick[currentWizard]}
        disabled={
          EDITING_LOGIC({ status, isMainWizardActive, completedSteps })?.[editorVariant]
            ?.prevStepButtonDisabled
        }
      >
        {
          EDITING_LOGIC(argumentsForText)?.[editorVariant]
            ?.prevButtonText
        }
      </CoaButton>
    );
  };

  const goToNextModal = (currentModal, nextModal) => {
    currentModal(false);
    nextModal(true);
  };

  return (
    <>
      <div className="p-createProject__container">
        <CurrentComponent
          project={project}
          setCurrentWizard={setCurrentWizard}
          goToMyProjects={goToMyProjects}
          editorVariant={editorVariant}
          isACloneBeingEdited={isACloneBeingEdited}
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
        onCancel={() => setConfirmPublishVisible(false)}
      />
      <ModalConfirmWithSK
        visible={secretKeyVisible}
        onCancel={() => setSecretKeyVisible(false)}
        onSuccess={publishProject}
      />
      <ModalConfirmWithSK
        visible={confirmSendToReviewVisible}
        onCancel={() => setSecretKeyVisible(false)}
        onSuccess={sendToReviewProject}
        title="You are about to send the project to be reviewed by the admin"
        description="To confirm the process please enter your administrator password and secret key"
        okText="Confirm"
        cancelText="Cancel"
      />
      <ModalConfirmWithSK
        visible={confirmApprovalVisible}
        onCancel={() => setApprovalVisible(false)}
        onSuccess={approveClonedProject}
        title="Are you sure you want to approve this changes?"
        description="To confirm the process please enter your administrator password and secret key"
        okText="Approve"
        cancelText="Cancel"
      />
      <ModalConfirmWithSK
        visible={confirmRejectionVisible}
        onCancel={() => setRejectionVisible(false)}
        onSuccess={rejectClonedProject}
        title="Are you sure you want to reject this changes?"
        description="To confirm the process please enter your administrator password and secret key"
        okText="Reject"
        cancelText="Cancel"
        leaveAComment
      />
      <ModalPublishLoading visible={loadingModalVisible} />
      <ModalPublishLoading
        visible={loadingSendToReviewModalVisible}
        textTitle="Sending to review"
      />
      <ModalPublishSuccess
        visible={successModalVisible}
        onCancel={() => setSuccessModalVisible(false)}
        onSave={() => history.push('/my-projects')}
      >
        <Link to={`/${projectId}`} style={{ display: 'block', textAlign: 'center' }}>
          Project Link
        </Link>
      </ModalPublishSuccess>
      <ModalPublishSuccess
        visible={successSendToReviewModalVisible}
        onCancel={() => setSuccessModalVisible(false)}
        textTitle="The project was sent successfully!"
        description="The project will be reviewed by the administrator."
        onSave={() => history.push(`/${project?.parent}`)}
      />
      <ModalPublishSuccess
        visible={successApproveCloneModalVisible}
        onCancel={() => {
          history.push(`/project/edit/${project?.parent}`);
          setSuccessApproveCloneModalVisible(false);
        }}
        textTitle="The project was published successfully!"
        description="A new version of the project was published. Now you will be able to see all the changes made on the project’s landing page"
        onSave={() => {
          history.push(`/project/edit/${project?.parent}`);
          setSuccessApproveCloneModalVisible(false);
        }}
      />
      <ModalPublishSuccess
        visible={successRejectCloneModalVisible}
        onCancel={() => {
          history.push(`/project/edit/${project?.parent}`);
          setSuccessRejectCloneModalVisible(false);
        }}
        textTitle="You have rejected the changes"
        description="No changes have been applied to the project"
        onSave={() =>{
          history.push(`/project/edit/${project?.parent}`);
          setSuccessRejectCloneModalVisible(false);
        }}
      />
      <ModalPublishError
        visible={errorModalVisible}
        onCancel={() => history.push(`/${project?.parent || project?.id}`)}
        onSave={() => history.push(`/${project?.parent || project?.id}`)}
      />
    </>
  );
};
export default CreateProjectContainer;
