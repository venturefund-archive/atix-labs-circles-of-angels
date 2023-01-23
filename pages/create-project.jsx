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
import { DictionaryContext } from 'components/utils/DictionaryContext';
import CoaApproveButton from 'components/atoms/CoaApproveButton/CoaApproveButton';
import BackOfficeLayout from 'components/Layouts/BackOfficeLayout/BackOfficeLayout';
import { signMessage } from 'helpers/blockchain/wallet';
import { checkIsBeneficiaryOrInvestorByProject } from 'helpers/roles';
import Loading from 'components/molecules/Loading/Loading';
import { EDITOR_VARIANT, PROJECT_FORM_NAMES } from '../constants/constants';
import {
  getProject,
  publish,
  deleteProject,
  cancelReview,
  sendToReview,
  approveCloneProject,
  rejectCloneProject,
  signProject
} from '../api/projectApi';
import { showModalConfirm } from '../components/utils/Modals';
import CreateProject from '../components/organisms/CreateProject/CreateProject';

const wizards = {
  main: CreateProject,
  thumbnails: FormProjectBasicInformation,
  details: FormProjectDetail,
  proposal: AssignProjectUsers,
  milestones: CoaMilestonesView
};

const EDITING_LOGIC = ({ status, isMainWizardActive, completedSteps, texts }) => ({
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
    prevButtonText: isMainWizardActive
      ? `${texts?.createProject?.deleteProject || 'Delete Project'}`
      : `${texts?.general?.back || 'Back'}`,
    nextStepButtonText: isMainWizardActive
      ? `${texts?.createProject?.publishProject || 'Publish project'}`
      : `${texts?.createProject?.saveAndContinue || 'Save and continue'}`
  },
  EDITING_CLONE: {
    finishButtonDisabled:
      ![PROJECT_STATUS_ENUM.OPEN_REVIEW].includes(status) ||
      (isMainWizardActive && Object.values(completedSteps).some(completed => !completed)),
    nextStepButtonDisabled: ![PROJECT_STATUS_ENUM.OPEN_REVIEW].includes(status),
    prevStepButtonDisabled: false,
    prevButtonText: isMainWizardActive
      ? `${texts?.createProject?.deleteEdition || 'Delete Edition'}`
      : `${texts?.general?.back || 'Back'}`,
    nextStepButtonText: isMainWizardActive
      ? `${texts?.createProject?.sendToReview || 'Send to review'}`
      : `${texts?.createProject?.saveAndContinue || 'Save and continue'}`
  }
});

const CreateProjectContainer = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { texts } = useContext(DictionaryContext);
  const [currentWizard, setCurrentWizard] = useState(PROJECT_FORM_NAMES.MAIN);
  const [confirmPublishVisible, setConfirmPublishVisible] = useState(false);

  const [loadingModal, setLoadingModal] = useState({ isVisible: false });
  const [modalConfirmWithSk, setModalConfirmWithSk] = useState({ isVisible: false });
  const [modalSuccess, setModalSuccess] = useState({ isVisible: false });

  const [errorModal, setErrorModal] = useState({ isVisible: false });
  const [isLoadingPage, setIsLoadingPage] = useState(true);

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
    const { details = {}, basicInformation = {}, users = [], milestones = [] } =
      projectToCheck || {};

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
      // are project funding budget equal to project spending budget?
      /* if (isMainWizardActive) {
        const fundingBudgetSum = project?.milestones?.reduce?.(() => (curr, next) =>
          parseFloat(curr) + parseFloat(next?.funding?.budget)
        );
        const spendingBudgetSum = project?.milestones?.reduce?.(() => (curr, next) =>
          parseFloat(curr) + parseFloat(next?.spending?.budget)
        );
        if (fundingBudgetSum !== spendingBudgetSum) return setErrorModal({ isVisible: true });
      } */
      await onSubmit?.();
      await handleGoBack({ withUpdate: true });
      message.success(texts?.createProject?.saved || 'Saved successfully');
    } catch (error) {
      errorCallback(error);
    }
  };

  // TODO validate with UX team
  const errorCallback = errorMsg =>
    message.error(
      texts?.general?.errorSavingInfo || 'An error ocurred while saving the information'
    );

  const askDeleteConfirmation = () => {
    if (project && project.id) {
      showModalConfirm(
        texts?.createProject?.warning || 'Warning!',
        texts?.createProject?.deleteProjectConfirmation ||
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
      message.success(
        texts?.createProject?.rightDeleted || 'Your project was successfully deleted!'
      );
      goToMyProjects();
    }
  };

  const askDeleteEditionConfirmation = () => {
    if (!project || !project.id) return;
    showModalConfirm(
      texts?.createProject?.warning || 'Warning!',
      texts?.createProject?.deleteConfirmation || 'Are you sure you want to delete this edition?',
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
    message.success(
      texts?.general?.projectDeleted || 'Your project edition was successfully deleted!'
    );
    history.push(`/${project.parent}`);
  };

  const publishProject = async () => {
    setModalConfirmWithSk({ isVisible: false });
    setLoadingModal({ isVisible: true });

    const { errors } = await publish(project.id);

    setLoadingModal({ isVisible: false });
    if (errors) setErrorModal({ isVisible: true });
    if (!errors)
      setModalSuccess({
        isVisible: true,
        onCancel: () => setModalSuccess({ ...modalSuccess, isVisible: false }),
        onSave: () => history.push('/back-office/projects'),
        children: (
          <Link to={`/${projectId}`} style={{ display: 'block', textAlign: 'center' }}>
            {texts?.createProject?.projectLink || 'Project Link'}
          </Link>
        )
      });
  };

  const sendToReviewProject = async (_pin, _password, wallet, key) => {
    setModalConfirmWithSk({ isVisible: false });
    setLoadingModal({
      isVisible: true,
      title: texts?.createProject?.sendingToReview || 'Sending to review'
    });

    const result = await sendToReview(project.id);
    if (result.errors) {
      message.error('An error occurred while sending to review the project');
      setLoadingModal({ isVisible: false, ...loadingModal });
      setErrorModal({ isVisible: true });
      return;
    }

    const messageToSign = result?.data?.toSign;
    try {
      const authorizationSignature = await signMessage(wallet, messageToSign, key);
      const response = await signProject({ authorizationSignature, projectId });
      if (response.errors) {
        throw new Error(response.errors);
      }

      setModalSuccess({
        isVisible: true,
        onCancel: () => setModalSuccess({ ...modalSuccess, isVisible: false }),
        onSave: () => history.push(`/${project?.parent}`),
        title: texts?.createProject?.ttSent || 'The project was sent successfully!',
        description:
          texts?.createProject?.dSent || 'The project will be reviewed by the administrator.'
      });
    } catch (error) {
      message.error('An error occurred while sending to review the project');
      setErrorModal({ isVisible: true });
    } finally {
      setLoadingModal({ isVisible: false });
    }
  };

  const approveClonedProject = async () => {
    setModalConfirmWithSk({ isVisible: false });
    setLoadingModal({ isVisible: true });

    const { errors } = await approveCloneProject(project.id);

    setLoadingModal({ isVisible: false });
    if (errors) setErrorModal({ isVisible: true });
    if (!errors)
      setModalSuccess({
        isVisible: true,
        onCancel: () => {
          history.push(`/back-office/project/edit/${project?.parent}`);
          setModalSuccess({ ...modalSuccess, isVisible: false });
        },
        onSave: () => {
          history.push(`/back-office/project/edit/${project?.parent}`);
          setModalSuccess({ ...modalSuccess, isVisible: false });
        },
        title: texts?.createProject?.ttPublished || 'The project was published successfully!',
        description:
          texts?.createProject?.dPublished ||
          'A new version of the project was published. Now you will be able to see all the changes made on the project’s landing page'
      });
  };

  const rejectClonedProject = async () => {
    setModalConfirmWithSk({ isVisible: false });
    setLoadingModal({ isVisible: true });

    const { errors } = await rejectCloneProject(project.id);

    setLoadingModal({ isVisible: false });
    if (errors) setErrorModal({ isVisible: true });
    if (!errors)
      setModalSuccess({
        isVisible: true,
        onCancel: () => {
          history.push(`/back-office/project/edit/${project?.parent}`);
          setModalSuccess({ ...modalSuccess, isVisible: false });
        },
        onSave: () => {
          history.push(`/back-office/project/edit/${project?.parent}`);
          setModalSuccess({ ...modalSuccess, isVisible: false });
        },
        title: texts?.createProject?.ttRejected || 'You have rejected the changes',
        description:
          texts?.createProject?.dRejected || 'No changes have been applied to the project'
      });
  };

  const goToMyProjects = () => history.push('/back-office/projects');
  const goToParentProject = () => history.push(`/${project?.parent}`);

  const fetchProject = async () => {
    setIsLoadingPage(true);
    const response = await getProject(projectId);
    if (response.errors || !response.data) {
      message.error(
        texts?.general?.errorFetchingProject || 'An error occurred while fetching the project'
      );
      goToMyProjects();
    }
    const { data } = response;
    setProject({ ...data });
    await checkStepsStatus(data);
    setIsLoadingPage(false);

    const isBeneficiaryOrInvestor = checkIsBeneficiaryOrInvestorByProject({ user, project: data });
    const mustSignBeneficiaryOrInvestor =
      data?.step === 1 && isBeneficiaryOrInvestor && data?.status === PROJECT_STATUS_ENUM.IN_REVIEW;
    setModalConfirmWithSk({
      isVisible: mustSignBeneficiaryOrInvestor,
      title: 'You are about to sign the project to finish the process',
      description: 'To confirm the process enter your password and secret key',
      okText: 'Sign',
      onSuccess: signProjectInStepOne,
      cancelText: 'Go Back',
      onCancel: () => history.push(`/${projectId}`)
    });
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
      ? () =>
          setModalConfirmWithSk({
            isVisible: true,
            onCancel: () => setModalConfirmWithSk({ isVisible: false }),
            onSuccess: sendToReviewProject,
            title:
              texts?.createProject?.ttSend ||
              'You are about to send the project to be reviewed by the admin',
            description:
              texts?.createProject?.dConfirmation ||
              'To confirm the process please enter your administrator password and secret key',
            okText: texts?.general?.confirm || 'Confirm',
            cancelText: texts?.general?.btnCancel || 'Cancel'
          })
      : setConfirmPublishVisible;

    if (isApprovalRejectionAvailable)
      return (
        <CoaApproveButton
          disabled={project?.step === 1}
          onClick={() => {
            setModalConfirmWithSk({
              isVisible: true,
              onCancel: () =>
                setModalConfirmWithSk({
                  ...modalConfirmWithSk,
                  isVisible: false
                }),
              onSuccess: approveClonedProject,
              title:
                texts?.createProject?.ttApproveConfirmation ||
                'Are you sure you want to approve this changes?',
              description:
                texts?.createProject?.dConfirmation ||
                'To confirm the process please enter your administrator password and secret key',
              okText: texts?.general?.btnApprove || 'Approve',
              cancelText: texts?.general?.btnCancel || 'Cancel'
            });
          }}
        >
          {texts?.general?.btnApprove || 'Approve'}
        </CoaApproveButton>
      );

    return (
      <CoaButton
        type="primary"
        onClick={() => (isMainWizardActive ? handleFinishEdit() : successCallback(onSubmit))}
        disabled={
          EDITING_LOGIC({ status, isMainWizardActive, completedSteps, texts })?.[editorVariant]
            ?.finishButtonDisabled
        }
      >
        {
          EDITING_LOGIC?.({ completedSteps, isMainWizardActive, status, texts })?.[editorVariant]
            ?.nextStepButtonText
        }
        <Icon type="arrow-right" />
      </CoaButton>
    );
  };

  const getContinueLaterButton = () => {
    if (!isMainWizardActive) return;

    if (isApprovalRejectionAvailable)
      return (
        <CoaRejectButton
          disabled={project?.step === 1}
          onClick={() => {
            setModalConfirmWithSk({
              isVisible: true,
              onCancel: setModalConfirmWithSk({ ...modalConfirmWithSk, isVisible: false }),
              onSuccess: rejectClonedProject,
              title:
                texts?.createProject?.ttRejectConfirmation ||
                'Are you sure you want to reject this changes?',
              description:
                texts?.createProject?.dConfirmation ||
                'To confirm the process please enter your administrator password and secret key',
              okText: texts?.general?.btnReject || 'Reject',
              cancelText: texts?.general?.btnCancel || 'Cancel',
              leaveAComment: true
            });
          }}
        >
          {texts?.general?.btnReject || 'Reject'}
        </CoaRejectButton>
      );

    return (
      <CoaTextButton
        disabled={
          EDITING_LOGIC({ status, completedSteps, isMainWizardActive, texts })?.[editorVariant]
            ?.nextStepButtonDisabled
        }
        onClick={isACloneBeingEdited ? goToParentProject : goToMyProjects}
      >
        {texts?.createProject?.saveAndContinueLater || 'Save & Continue Later'}
      </CoaTextButton>
    );
  };

  const getPrevButton = () => {
    const onPrevOnClick = {
      [PROJECT_FORM_NAMES.DETAILS]: () => handleGoBack(),
      [PROJECT_FORM_NAMES.MAIN]: () => {
        if (isACloneInReview) return history.goBack();
        if (isACloneBeingEdited) return askDeleteEditionConfirmation();
        return askDeleteConfirmation();
      },
      [PROJECT_FORM_NAMES.MILESTONES]: () => handleGoBack({ withUpdate: true }),
      [PROJECT_FORM_NAMES.PROPOSAL]: () => handleGoBack({ withUpdate: true }),
      [PROJECT_FORM_NAMES.THUMBNAILS]: () => handleGoBack()
    };

    const argumentsForText = isACloneInReview
      ? { status, isMainWizardActive: false, completedSteps, texts }
      : { status, isMainWizardActive, completedSteps, texts };
    return (
      <CoaButton
        type="secondary"
        icon={isMainWizardActive && !isACloneInReview ? 'delete' : 'arrow-left'}
        onClick={onPrevOnClick[currentWizard]}
        disabled={
          EDITING_LOGIC({ status, isMainWizardActive, completedSteps, texts })?.[editorVariant]
            ?.prevStepButtonDisabled
        }
      >
        {EDITING_LOGIC(argumentsForText)?.[editorVariant]?.prevButtonText}
      </CoaButton>
    );
  };

  const signProjectInStepOne = async (_pin, _password, wallet, key) => {
    const messageToSign = project?.toSign;
    if (!messageToSign) {
      message.error('An error occurred while signing the project. Signature is missing');
      return;
    }
    setModalConfirmWithSk({ ...modalConfirmWithSk, isVisible: false });
    setLoadingModal({
      isVisible: true,
      title: texts?.createProject?.sendingToReview || 'Sending to review'
    });
    try {
      const authorizationSignature = await signMessage(wallet, messageToSign, key);
      const response = await signProject({ authorizationSignature, projectId });
      if (response.errors) {
        throw new Error(response.errors);
      }
      setLoadingModal({ isVisible: false, ...loadingModal });
    } catch (error) {
      message.error('An error occurred while signing the activity');
      history.push(`/${projectId}`);
    }
  };

  if (isLoadingPage) return <Loading />;

  return (
    <BackOfficeLayout project={project} user={user}>
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
        onSuccess={() => {
          setConfirmPublishVisible(false);
          setModalConfirmWithSk({
            isVisible: true,
            onCancel: () => setModalConfirmWithSk({ isVisible: true }),
            onSuccess: publishProject
          });
        }}
        onCancel={() => setConfirmPublishVisible(false)}
      />
      <ModalConfirmWithSK
        visible={modalConfirmWithSk?.isVisible}
        onCancel={modalConfirmWithSk?.onCancel}
        onSuccess={modalConfirmWithSk?.onSuccess}
        title={modalConfirmWithSk?.title}
        description={modalConfirmWithSk?.description}
        okText={modalConfirmWithSk?.okText}
        cancelText={modalConfirmWithSk?.cancelText}
        leaveAComment={modalConfirmWithSk?.leaveAComment}
      />

      <ModalPublishLoading visible={loadingModal?.isVisible} textTitle={loadingModal?.title} />
      <ModalPublishSuccess
        visible={modalSuccess?.isVisible}
        onCancel={modalSuccess?.onCancel}
        onSave={modalSuccess?.onSave}
        textTitle={modalSuccess?.title}
        description={modalSuccess?.description}
      >
        {modalSuccess?.children}
      </ModalPublishSuccess>
      <ModalPublishError
        visible={errorModal?.isVisible}
        onCancel={() => history.push(`/${project?.parent || project?.id}`)}
        onSave={() => history.push(`/${project?.parent || project?.id}`)}
      />
    </BackOfficeLayout>
  );
};
export default CreateProjectContainer;
