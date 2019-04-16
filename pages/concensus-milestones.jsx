import React, { Component } from 'react';
import { message, Divider, Button, Icon } from 'antd';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import FileUploadStatus from '../constants/FileUploadStatus';
import './_style.scss';
import './_concensus.scss';
import './_steps.scss';
import TableMilestones from '../components/organisms/TableMilestones/TableMilestones';
import {
  getProjectMilestones,
  downloadAgreement,
  downloadProposal,
  uploadAgreement,
  getActualProjectAmount,
  startProject,
  getProject
} from '../api/projectApi';
import SignatoryItem from '../components/molecules/SignatoryItem/SignatoryItem';
import { getUsers, signAgreement } from '../api/userProjectApi';
import { getOracles } from '../api/userApi';
import {
  getTransferListOfProject,
  sendTransferInformation
} from '../api/transferApi';
import signStatusMap from '../model/signStatusMap';
import transferStatusMap from '../model/transferStatus';
import Routing from '../components/utils/Routes';
import FormTransfer from '../components/molecules/FormTransfer/FormTransfer';
import { withUser } from '../components/utils/UserContext';
import TransferLabel from '../components/atoms/TransferLabel/TransferLabel';
import {
  showModalSuccess,
  showModalError,
  showModalConfirm
} from '../components/utils/Modals';
import {
  deleteMilestone,
  deleteActivity,
  updateMilestone
} from '../api/milestonesApi';
import {
  updateActivity,
  assignOracleToActivity,
  unassignOracleToActivity
} from '../api/activityApi';
import Roles from '../constants/RolesMap';
import ButtonUpload from '../components/atoms/ButtonUpload/ButtonUpload';
import ProjectStatus from '../constants/ProjectStatus';

const statusMap = {
  '-1': 'theme-cancel',
  '0': 'theme-pending',
  '1': 'theme-pending',
  '2': 'theme-success'
};

class ConcensusMilestones extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: props.initialStep ? parseInt(props.initialStep, 10) : 0,
      transferId: '',
      amount: '',
      confirmationStatus: null
    };
  }

  static async getInitialProps(query) {
    const { projectId, initialStep } = query.query;
    const response = await getProjectMilestones(projectId);
    const project = (await getProject(projectId)).data;
    const users = await getUsers(projectId);
    const transfers = await getTransferListOfProject(projectId);
    const oracles = await getOracles();
    const actualAmount = (await getActualProjectAmount(projectId)).data;

    const milestonesAndActivities = [];
    response.data.forEach(milestone => {
      milestonesAndActivities.push(milestone);
      milestone.activities.forEach((activity, j) => {
        const activityWithId = {
          ...activity,
          type: `Activity ${j + 1}`
        };
        milestonesAndActivities.push(activityWithId);
      });
    });

    return {
      milestones: milestonesAndActivities,
      projectName: project.projectName,
      userProjects: users.data,
      projectId,
      transfers,
      faqLink: project.faqLink,
      oracles,
      initialStep,
      goalAmount: project.goalAmount,
      actualAmount,
      projectStatus: project.status
    };
  }

  componentDidMount = () => {
    const { milestones } = this.props;
    this.setState({ milestones });
  };

  updateState = (evnt, field, value) => {
    evnt.preventDefault();
    this.setState({ [field]: value });
  };

  startProjectHandle = () => {
    const { projectId, goalAmount, actualAmount } = this.props;
    const onConfirm = response => {
      if (response.error)
        showModalError('Error starting project', response.error);
      else {
        showModalSuccess('Success!', 'Project started correctly');
        Routing.toProjectProgress({
          projectId
        });
      }
    };
    if (actualAmount < goalAmount)
      showModalConfirm(
        'Start project',
        'Remember to adjust your plan according the current funded amount before you start your project',
        async () => {
          const response = await startProject(projectId);
          onConfirm(response);
        }
      );
    else
      showModalConfirm(
        'Start project',
        'Do you want start this project?',
        async () => {
          const response = await startProject(projectId);
          onConfirm(response);
        }
      );
  };

  onAssignOracle = (userId, activityId) => {
    if (!userId) unassignOracleToActivity(activityId);
    else assignOracleToActivity(userId, activityId);
  };

  save = async (record, actualField) => {
    const isActivity = Boolean(actualField.data.milestone);
    const response = isActivity
      ? await updateMilestone(actualField.data)
      : await updateActivity(actualField.data);
    if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
    record = actualField.data;
  };

  deleteTask = async task => {
    let response;
    if (task.type.includes('Milestone')) {
      response = await deleteMilestone(task.id);
    } else if (task.type.includes('Activity')) {
      response = await deleteActivity(task.id);
    }

    if (!response.error) {
      this.goToStep(0);
    } else {
      const { error } = response;
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return response;
    }

    return response;
  };

  submitTransfer = async evnt => {
    evnt.preventDefault();
    const { transferId, amount } = this.state;
    const { user, projectId } = this.props;
    const toSubmit = {
      transferId,
      amount,
      currency: 'usd',
      senderId: user.id,
      projectId,
      destinationAccount: 'asdf1234qwer5678' /** @TODO  unmock account */
    };
    const response = await sendTransferInformation(toSubmit);

    if (response.error) {
      const { error } = response;
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return response;
    }

    this.nextStep();
    showModalSuccess('Success', 'Transfer submited correctly!');
  };

  goToTransferFunds = () => {
    const { projectId } = this.props;
    Routing.toTransferFunds({ projectId });
  };

  downloadAgreementClick = async () => {
    const { projectId } = this.props;

    const response = await downloadAgreement(projectId);
    if (response.error) {
      const { error } = response;
      if (error.response) {
        // eslint-disable-next-line prettier/prettier
        error.response.data.error =
          "This project doesn't have an Agreement uploaded";
      }
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return response;
    }
  };

  changeProjectAgreement = async info => {
    const { projectId } = this.props;
    const { status } = info.file;
    const projectAgreement = info.file;
    if (status !== FileUploadStatus.UPLOADING) {
      console.log(info.file, info.fileList);
    }
    if (status === FileUploadStatus.DONE) {
      const response = await uploadAgreement(
        projectId,
        projectAgreement.originFileObj
      );

      console.log(response);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  actualUserNeedsTransfer = () => {
    const { user, transfers } = this.props;
    const response = transfers.find(transfer => transfer.sender == user.id);
    return !response || response.state == -1;
  };

  clickDownloadProposal = async () => {
    const { projectId } = this.props;
    const response = await downloadProposal(projectId);
    if (response.error) {
      const { error } = response;
      if (error.response) {
        // eslint-disable-next-line prettier/prettier
        error.response.data.error =
          "This project doesn't have a Proposal uploaded";
      }
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return response;
    }
  };

  signAgreementOk = async () => {
    const { user, faqLink, projectId, projectName } = this.props;
    const response = await signAgreement(user.id, projectId);

    // reload page
    if (!response.error) {
      this.goToStep(1);
    } else {
      const { error } = response;
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return response;
    }

    return response;
  };

  goToStep = step => {
    const { projectId } = this.props;
    this.setState({ currentStep: step });
    Routing.toConsensusMilestones({
      projectId,
      initialStep: step
    });
  };

  previousStep = () => {
    const { currentStep } = this.state;
    this.goToStep(currentStep - 1);
  };

  nextStep = () => {
    const { currentStep } = this.state;
    this.goToStep(currentStep + 1);
  };

  getCurrentStep = () => {
    const {
      projectName,
      userProjects,
      projectId,
      transfers,
      faqLink,
      oracles,
      goalAmount,
      user,
      actualAmount,
      projectStatus
    } = this.props;

    const { currentStep, confirmationStatus, milestones } = this.state;
    const isSocialEntrepreneur =
      user && user.role && user.role.id === Roles.SocialEntrepreneur;

    const step1 = (
      <div className="ContentStep">
        <StepsIf stepNumber={0} />
        <div className="ProjectStepsContainer">
          <div className="StepDescription">
            <p className="LabelSteps">Consensus Step</p>
            <h3>
              Collaborate with the definition of milestones, share your
              experiences, talk to project owner and other funders, download the
              latest agreements
            </h3>
          </div>
          <div className="ProjectInfoHeader">
            <div className="space-between">
              <div>
                <div>
                  <p className="LabelSteps">Project Name</p>
                  <h1>{projectName}</h1>
                </div>
                <div className="flex">
                  <div className="vertical  Data">
                    <p className="TextBlue">{goalAmount}</p>
                    <span className="Overline">Goal Amount</span>
                  </div>
                  <Divider type="vertical" />
                  <div className="vertical  Data">
                    <p className="TextGray">{actualAmount || 0}</p>
                    <span className="Overline">Already</span>
                  </div>
                  <Divider type="vertical" />
                  <div className="vertical  Data">
                    <a className="TextBlue" href={faqLink}>
                      {faqLink}
                    </a>
                    <span className="Overline">FAQ Document</span>
                  </div>
                  <Divider type="vertical" />
                  <div className="vertical Data">
                    <Button>
                      Proyect Proposal <Icon type="download" />
                    </Button>
                  </div>
                  <Divider type="vertical" />
                  <div className="vertical Data">
                    <Button onClick={this.downloadAgreementClick}>
                      Download Agreement <Icon type="download" />
                    </Button>
                  </div>
                  <Divider type="vertical" />
                  <div className="vertical Data">
                    <ButtonUpload
                      change={this.changeProjectAgreement}
                      buttonText="Upload Agreement"
                      showUploadList={false}
                    />
                  </div>
                </div>
              </div>
              {isSocialEntrepreneur &&
              ProjectStatus !== ProjectStatus.IN_PROGRESS &&
              actualAmount > 0 ? (
                <CustomButton
                  buttonText="Start Project"
                  theme="Primary"
                  onClick={this.startProjectHandle}
                />
              ) : (
                ''
              )}
            </div>
          </div>
          <Divider />
          <div>
            <TableMilestones
              dataSource={milestones}
              onDelete={this.deleteTask}
              onEdit={this.save}
              oracles={oracles}
              onAssignOracle={this.onAssignOracle}
              isSocialEntrepreneur={isSocialEntrepreneur}
            />
          </div>
        </div>
        <div className="ControlSteps StepOne">
          <CustomButton
            theme="Primary"
            buttonText="Continue"
            onClick={this.nextStep}
          />
        </div>
      </div>
    );

    const step2 = (
      <span>
        <StepsIf stepNumber={1} />
        <div className="ProjectStepsContainer">
          <div className="StepDescription">
            <p className="LabelSteps">Signatories Step</p>
            <h3>
              Sign your agreement and pledge to help this project come to true
            </h3>
          </div>
          <p className="LabelSteps">Project Name</p>
          <h1>Lorem Ipsum</h1>
          <div className="SignatoryList">
            {userProjects.map(userProject => {
              if (!userProject.user) return;
              let userTransfer = transfers.filter(
                transfer =>
                  parseInt(transfer.sender, 10) === userProject.user.id
              )[0];

              if (!userTransfer || userTransfer == null) {
                userTransfer = { state: 0 };
              }

              return (
                <SignatoryItem
                  key={userProject.id}
                  userId={userProject.user.id}
                  loggedUserId={user.id}
                  username={userProject.user.username}
                  tfStatusShow={transferStatusMap[userTransfer.state].show}
                  tfStatusIcon={transferStatusMap[userTransfer.state].icon}
                  tfStatusName={transferStatusMap[userTransfer.state].name}
                  sgStatusShow={signStatusMap[userProject.status].show}
                  sgStatusIcon={signStatusMap[userProject.status].icon}
                  sgStatusName={signStatusMap[userProject.status].name}
                  nameInitials={userProject.user.username
                    .charAt(0)
                    .toUpperCase()}
                  signStatus={userProject.status}
                  projectId={projectId}
                  handleOk={this.signAgreementOk}
                />
              );
            })}
          </div>
        </div>
        <div className="ControlSteps">
          <CustomButton
            theme="Cancel"
            buttonText="Cancel"
            onClick={this.previousStep}
          />

          <CustomButton
            theme="Primary"
            buttonText="Continue"
            onClick={this.nextStep}
          />
        </div>
      </span>
    );

    const step3 = (
      <span>
        <StepsIf stepNumber={2} />
        <div className="ProjectStepsContainer">
          <p className="LabelSteps">Funding Step</p>
          <h3 className="StepDescription">
            Transfer your pledged funds, help the world become a better place
            for everyone
          </h3>
          <p className="LabelSteps">Project Name</p>
          <h1>Lorem Ipsum</h1>
          <div className="TransferContent">
            <h2>Circles of Angels Bank Account Information</h2>
            <div className="TransferBankInfo">
              <h3>Singapore Bank</h3>
              <h4> Account #: 0012345678</h4>
              <h4> Account owner: CirclesOfAngels</h4>
            </div>
            <FormTransfer
              onTransferChange={evnt =>
                this.updateState(evnt, 'transferId', evnt.target.value)
              }
              onAmountChange={evnt =>
                this.updateState(evnt, 'amount', evnt.target.value)
              }
              submitTransfer={this.submitTransfer}
            />
          </div>
        </div>
        <div className="ControlSteps">
          <CustomButton
            theme="Cancel"
            buttonText="Cancel"
            onClick={this.previousStep}
          />
        </div>
      </span>
    );

    const confirmationStep = (
      <span>
        <StepsIf stepNumber={2} />
        <div className="ProjectStepsContainer">
          <p className="LabelSteps">Funding Step</p>
          <h3 className="StepDescription">
            Transfer your pledged funds, help the world become a better place
            for everyone
          </h3>
          <p className="LabelSteps">Project Name</p>
          <h1>Lorem Ipsum</h1>
          <div className="TransferConfirmationContent">
            <img src="./static/images/funds-pending.svg" alt="Clock" />
            {confirmationStatus ? (
              <TransferLabel
                text={confirmationStatus.name}
                theme={statusMap[confirmationStatus.status]}
              />
            ) : (
              ''
            )}
            <h2>Circles will be checking your funds transfer</h2>
          </div>
        </div>
        <div className="ControlSteps">
          <CustomButton
            theme="Cancel"
            buttonText="Cancel"
            onClick={this.previousStep}
          />
          <CustomButton
            theme="Primary"
            buttonText="Confirm"
            onClick={() => Routing.toExploreProjects()}
          />
        </div>
      </span>
    );

    switch (currentStep) {
      case 0:
        return step1;
      case 1:
        return step2;
      case 2:
        return this.actualUserNeedsTransfer() ? step3 : confirmationStep;
      case 3:
        return confirmationStep;
      default:
        return step1;
    }
  };

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          {this.getCurrentStep()}
        </div>
      </div>
    );
  }
}

export default withUser(ConcensusMilestones);
