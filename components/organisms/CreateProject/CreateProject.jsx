import React, { useState } from 'react';
import { Breadcrumb, Icon, message } from 'antd';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import PropTypes from 'prop-types';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import FooterButtons from '../FooterButtons/FooterButtons';
import ModalProjectCreated from '../ModalProjectCreated/ModalProjectCreated';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import { PROJECT_FORM_NAMES, projectStatuses } from '../../../constants/constants';
import './_style.scss';
import ModalConfirmProjectPublish from '../ModalConfirmProjectPublish/ModalConfirmProjectPublish';
import ModalConfirmWithSK from '../ModalConfirmWithSK/ModalConfirmWithSK';
import ModalPublishSuccess from '../ModalPublishSuccess/ModalPublishSuccess';
import ModalPublishLoading from '../ModalPublishLoading/ModalPublishLoading';

const Items = ({ title, subtitle, onClick, completed, disabled }) => (
  <div className="createProject__content__steps__step">
    <div className="createProject__content__steps__step__left">
      <img
        src={completed ? '/static/images/checked.svg' : '/static/images/unchecked.svg'}
        alt="unchecked"
      />
      <div>
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
      </div>
    </div>

    <CoaButton
      type="ghost"
      className="createProject__content__steps__step__button"
      onClick={onClick}
      disabled={disabled}
    >
      Edit
    </CoaButton>
  </div>
);

const CreateProject = ({
  project,
  setCurrentWizard,
  goToMyProjects,
  sendToReview,
  completedSteps,
  deleteProject
}) => {
  const [confirmPublishVisible, setConfirmPublishVisible] = useState(false);
  const [secretKeyVisible, setSecretKeyVisible] = useState(true);
  const [loadingModalVisible, setLoadinModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const { status, basicInformation } = project || {};
  const projectName = basicInformation?.projectName || 'My project';

  const getContinueLaterButton = () => (
    <CoaTextButton onClick={goToMyProjects}>{getContinueLaterLabel()}</CoaTextButton>
  );

  const getContinueLaterLabel = () => {
    if (anyStepCompleted()) {
      return status === projectStatuses.CONSENSUS ? 'Save changes' : 'Save & Continue later';
    }
    return 'Go back';
  };

  const goToNextModal = (currentModal, nextModal) => {
    currentModal(false);
    nextModal(true);
  }

  const anyStepCompleted = () => Object.values(completedSteps).some(completed => completed);

  const sendToReviewButton = () => {
    if (status === projectStatuses.CONSENSUS) return;
    const disabled = Object.values(completedSteps).some(completed => !completed);

    return (
      <CoaButton type="primary" onClick={() => setConfirmPublishVisible(true)} disabled={disabled}>
        Publish project <Icon type="arrow-right" />
      </CoaButton>
    );
  };

  const publishProject = async () => {
    setSecretKeyVisible(false);
    setLoadinModalVisible(true);
    const { errors } = await sendToReview();
    if (!errors) {
      message.error(errors);
      setLoadinModalVisible(false);
      return;
    }
    setLoadinModalVisible(false);
    setSuccessModalVisible(true);
  }

  const deleteProjectButton = () => (
    <CoaButton type="secondary" icon="delete" onClick={deleteProject}>
      Delete Project
    </CoaButton>
  );

  return (
    <>
      <div className="createProject__content">
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">Create Project</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <TitlePage textTitle={projectName} />

        <div className="createProject__content__steps">
          <Items
            title="Basic Information"
            subtitle="Here you can assign or create users to different roles"
            onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.THUMBNAILS)}
            disabled={status === projectStatuses.CONSENSUS}
            completed={completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
          />

          <Items
            title="Project Detail"
            subtitle="Here you can complete the project information"
            onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.DETAILS)}
            completed={completedSteps[PROJECT_FORM_NAMES.DETAILS]}
            disabled={!completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
          />

          <Items
            title="Project Users"
            subtitle="Here you can assign or create users to different roles"
            onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.PROPOSAL)}
            disabled={!completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
            completed={completedSteps[PROJECT_FORM_NAMES.PROPOSAL]}
          />
          <Items
            title="Project Milestones"
            subtitle="Here you can upload the required milestones for your project"
            onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.MILESTONES)}
            disabled={!completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
            completed={completedSteps[PROJECT_FORM_NAMES.MILESTONES]}
          />
        </div>
      </div>
      <FooterButtons
        finishButton={sendToReviewButton()}
        nextStepButton={getContinueLaterButton()}
        prevStepButton={deleteProjectButton()}
      >
        <ModalProjectCreated />
      </FooterButtons>
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
      <ModalPublishLoading visible={loadingModalVisible} />
      <ModalPublishSuccess visible={successModalVisible} />
    </>
  );
};

CreateProject.defaultProps = {
  project: {},
  completedSteps: {
    thumbnails: false,
    details: false,
    proposal: false,
    milestones: false
  }
};

CreateProject.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  sendToReview: PropTypes.func.isRequired,
  setCurrentWizard: PropTypes.func.isRequired,
  goToMyProjects: PropTypes.func.isRequired,
  project: PropTypes.shape({
    projectName: PropTypes.string.isRequired
  }),
  completedSteps: PropTypes.shape({
    thumnails: PropTypes.bool,
    details: PropTypes.bool,
    proposal: PropTypes.bool,
    milestones: PropTypes.bool
  })
};

Items.defaultProps = {
  disabled: false,
  completed: false
};

Items.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  completed: PropTypes.bool
};

export default CreateProject;
