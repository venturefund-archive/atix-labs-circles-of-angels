/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Component } from 'react';
import Linkify from 'linkifyjs/react';
import { message, Divider, Button, Icon, Alert } from 'antd';
import { values, isEmpty } from 'lodash';
import customConfig from 'custom-config';
import animationData from '../components/molecules/Steps/success.json';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import FileUploadStatus from '../constants/FileUploadStatus';
/* import './_transfer-funds-confirmation.scss'; */
import TableMilestones from '../components/organisms/TableMilestones/TableMilestones';
import {
  getProjectMilestones,
  downloadAgreement,
  downloadProposal,
  startProject,
  getProject
} from '../api/projectApi';
import SignatoryItem from '../components/molecules/SignatoryItem/SignatoryItem';
import { getUsers, signAgreement } from '../api/userProjectApi';
import { getDestinationCOAAccount } from '../api/generalApi';
import { getOracles } from '../api/userApi';
import {
  getTransferListOfProject,
  sendTransferInformation
} from '../api/transferApi';
import signStatusMap from '../model/signStatusMap';
import SignStatus from '../constants/SignStatus';
import transferStatusMap from '../model/transferStatus';
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
  unassignOracleToActivity,
  createActivity
} from '../api/activityApi';
import Roles from '../constants/RolesMap';
import ButtonUpload from '../components/atoms/ButtonUpload/ButtonUpload';
import StepsSe from '../components/molecules/StepsSe/StepsSe';
import Label from '../components/atoms/Label/Label';
import LottieFiles from '../components/molecules/LottieFiles';
import TransferStatus from '../constants/TransferStatuses';
import BlockchainStatus from '../constants/BlockchainStatus';

class ConcensusMilestones extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: props.initialStep ? parseInt(props.initialStep, 10) : 0,
      transferId: '',
      amount: '',
      project: {},
      userProjects: [],
      transfers: [],
      oracles: [],
      actualAmount: 0,
      milestones: [],
      accountInfo: {
        address: '',
        owner: '',
        bank: ''
      },
      loading: true
    };
  }

  static async getInitialProps(query) {
    const { projectId, initialStep } = query.query;
    return { projectId, initialStep };
  }

  componentDidMount = async () => {
    await this.fetchDataFromApi();
  };

  async getMilestones(projectId) {
    const response = await getProjectMilestones(projectId);
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
    return milestonesAndActivities;
  }

  updateState = (evnt, field, value) => {
    evnt.preventDefault();
    this.setState({ [field]: value });
  };

  startProjectHandle = () => {
    const { projectId } = this.props;
    const { project, actualAmount } = this.state;
    const { goalAmount } = project;

    const onConfirm = response => {
      if (response.error) {
        const { error } = response;
        const content = error.response
          ? error.response.data.error
          : error.message;
        showModalError('Error starting project', content);
      } else {
        showModalSuccess(
          'Success!',
          'Project start petition sent successfully. ' +
            'It will start once it is confirmed on the blockchain'
        );
        this.fetchDataFromApi();
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
        'Do you want to start this project?',
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

  goToConcensusMilestones = () => {
    const { projectId, initialStep } = this.props;
    Routing.toConsensusMilestones({ projectId, initialStep });
  };

  save = async (index, actualField) => {
    const isActivity = Boolean(actualField.data.milestone);
    const response = isActivity
      ? await updateActivity(actualField.data)
      : await updateMilestone(actualField.data);
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
    const { milestones } = this.state;
    milestones[index] = actualField.data;
    this.setState({ milestones });
  };

  deleteActivity = async task => {
    const { projectId } = this.props;
    let response;

    const handleError = async type => {
      if (!response.error) {
        showModalSuccess('Success!', `${type} deleted successfully!`);
        const milestones = await this.getMilestones(projectId);
        this.setState({ milestones });
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
    };

    if (task.type.includes('Milestone')) {
      response = await deleteMilestone(task.id);
      await handleError('Milestone');
    } else if (task.type.includes('Activity')) {
      response = await deleteActivity(task.id);
      await handleError('Activity');
    }

    return response;
  };

  submitTransfer = async evnt => {
    evnt.preventDefault();
    const { transferId, amount, accountInfo } = this.state;
    const { user, projectId } = this.props;

    if (!transferId || !amount) {
      showModalError('Error!', 'Please complete both fields');
      return false;
    }

    if (amount && Number.isNaN(parseFloat(amount))) {
      showModalError('Error!', 'Amount must be a number');
      return false;
    }

    const toSubmit = {
      transferId,
      amount,
      currency: 'usd',
      senderId: user.id,
      projectId,
      destinationAccount: accountInfo.address
    };
    const response = await sendTransferInformation(toSubmit);

    if (response.error) {
      const { error } = response;
      const title = 'Error!';
      const content = error.response
        ? error.response.data.error
        : 'There was an error submitting the information.';
      showModalError(title, content);
      return response;
    }
    this.setState({ actualTransferState: TransferStatus.PENDING_VERIFICATION });
    this.nextStep();
    showModalSuccess('Success', 'Transfer submitted correctly!');
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
    const { status } = info.file;

    // TODO : this was locally modified on production.
    //        nobody knows who made it.
    try {
      if (
        status === FileUploadStatus.DONE ||
        status === FileUploadStatus.UPLOADING
      ) {
        // TODO : unused variable.
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (status === FileUploadStatus.ERROR) {
        message.error(`${info.file.name} file upload failed.`);
      }
    } catch (error) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  actualUserNeedsTransfer = () => {
    const { actualTransferState } = this.state;
    return (
      actualTransferState === null ||
      actualTransferState === TransferStatus.CANCELLED
    );
  };

  clickDownloadProposal = async () => {
    const { projectId } = this.props;
    const response = await downloadProposal(projectId);
    if (response.error) {
      const { error } = response;
      if (error.response) {
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

  signAgreementOk = async userProject => {
    // const { user, projectId } = this.props;
    const { userProjects } = this.state;
    const response = await signAgreement(userProject.id);

    if (!response.error) {
      const signed = userProjects.find(
        signatory => signatory.id === response.data[0].id
      );
      signed.status = response.data[0].status;
      this.setState({ userProjects });
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

  validateActivity = activity => {
    const valid = !values(activity).some(isEmpty);
    return valid;
  };

  createNewActivity = async (activity, milestoneId, hideModal) => {
    const { projectId } = this.props;
    if (milestoneId > 0 && this.validateActivity(activity)) {
      const response = await createActivity(activity, milestoneId);
      if (response.error) {
        const { error } = response;
        const content = error.response
          ? error.response.data.error
          : error.message;
        showModalError('Error creating Activiy', content);
        return false;
      }
      hideModal();
      showModalSuccess('Success!', 'Activity created successfully!');
      const milestones = await this.getMilestones(projectId);
      this.setState({ milestones });

      return true;
    }

    showModalError(
      'Error creating Activiy',
      'Activity is not valid. Please complete all fields and try again.'
    );
    return false;
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
      userProjects,
      transfers,
      oracles,
      actualAmount,
      currentStep,
      milestones,
      actualTransferState,
      project,
      accountInfo
    } = this.state;
    const { faqLink, goalAmount, projectName } = project;
    const { user, projectId } = this.props;
    const isSocialEntrepreneur =
      user && user.role && user.role.id === Roles.ENTREPRENEUR;
    const isFunder =
      user && user.role && user.role.id === Roles.PROJECT_SUPPORTER;
    const signedAgreement = Object.values(userProjects).some(
      userProject =>
        userProject.user.id === user.id &&
        isFunder &&
        userProject.status === SignStatus.SIGNED
    );
    const Steps = props =>
      !isFunder ? <StepsSe {...props} /> : <StepsIf {...props} />;

    const step1 = (
      <div className="ContentStep">
        <Steps stepNumber={0} />
        <div className="ProjectStepsContainerNS">
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
                <p className="LabelSteps">Project Name</p>
                <h1>{projectName}</h1>
              </div>
              {isSocialEntrepreneur &&
                actualAmount > 0 &&
                project.startBlockchainStatus === BlockchainStatus.PENDING && (
                  <CustomButton
                    buttonText="Start Project"
                    theme="Primary"
                    disabled={
                      project.startBlockchainStatus !== BlockchainStatus.PENDING
                    }
                    onClick={this.startProjectHandle}
                  />
                )}
            </div>
            <div className="flex">
              <div className="vertical  Data">
                <Linkify tag="a">{faqLink}</Linkify>

                <span className="Overline">
                  FAQ-Funders and SE&apos;s Questions & Answers Link
                </span>
              </div>
              <Divider type="vertical" />
              <div className="vertical  Data">
                <p className="TextBlue">$ {goalAmount}</p>
                <span className="Overline">Goal Amount</span>
              </div>
              <Divider type="vertical" />
              <div className="vertical  Data">
                {actualAmount >= goalAmount ? (
                  <p className="TextGreen">$ {actualAmount || 0}</p>
                ) : (
                  <p className="TextGray">$ {actualAmount || 0}</p>
                )}
                <span className="Overline">Amounts Pledged</span>
              </div>
              <Divider type="vertical" />
              <div className="vertical Data">
                <Button onClick={this.clickDownloadProposal}>
                  Project Proposal <Icon type="download" />
                </Button>
              </div>
              <div className="vertical Data">
                <Button onClick={this.downloadAgreementClick}>
                  Download Agreement <Icon type="download" />
                </Button>
              </div>
              <div className="vertical Data">
                {isSocialEntrepreneur && (
                  <ButtonUpload
                    change={this.changeProjectAgreement}
                    buttonText="Upload Agreement"
                    showUploadList={false}
                  />
                )}
              </div>
              <Divider type="vertical" />
              {(isSocialEntrepreneur &&
                (project.startBlockchainStatus === BlockchainStatus.PENDING &&
                  (actualAmount >= goalAmount ? (
                    <Alert
                      message="You have reached your goal!"
                      type="success"
                      showIcon
                    />
                  ) : (
                    actualAmount > 0 && (
                      <Alert
                        message="You can start the project with the current funded amount"
                        type="info"
                        showIcon
                      />
                    )
                  )))) ||
                (isSocialEntrepreneur &&
                project.startBlockchainStatus === BlockchainStatus.SENT ? (
                  <Alert
                    message="Waiting for Blockchain confirmation to start"
                    type="info"
                    showIcon
                  />
                ) : (
                  project.startBlockchainStatus ===
                    BlockchainStatus.CONFIRMED && (
                    <Alert
                      message="Project already started"
                      type="info"
                      showIcon
                    />
                  )
                ))}
            </div>
          </div>
          <Divider />
          <div className="ContainerTableScroll">
            <TableMilestones
              dataSource={milestones}
              onDelete={this.deleteActivity}
              onEdit={this.save}
              oracles={oracles}
              onAssignOracle={this.onAssignOracle}
              isSocialEntrepreneur={isSocialEntrepreneur}
              onCreateActivity={this.createNewActivity}
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
      <div className="ContentStep">
        <Steps stepNumber={1} />
        <div className="ProjectStepsContainer">
          <div className="StepDescription">
            <p className="LabelSteps">Signatories Step</p>
            <h3>
              Sign your agreement and pledge to help this project come to true
            </h3>
          </div>
          <p className="LabelSteps">Project Name</p>
          <h1>{projectName}</h1>
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
                  loggedUser={user}
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
                  handleOk={() => this.signAgreementOk(userProject)}
                />
              );
            })}
          </div>
        </div>
        <div className="ControlSteps">
          <CustomButton
            theme="Download"
            buttonText="Previous"
            onClick={this.previousStep}
          />

          {!isSocialEntrepreneur ? (
            <CustomButton
              theme="Primary"
              buttonText="Continue"
              onClick={this.nextStep}
              disabled={!signedAgreement}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );

    const step3 = (
      <div className="ContentStep">
        <Steps stepNumber={2} />
        <div className="ProjectStepsContainer">
          <div className="StepDescription">
            <p className="LabelSteps">Funding Step</p>
            <h3>
              Transfer your pledged funds, help the world become a better place
              for everyone
            </h3>
          </div>
          <Label labelText="Project Name" />
          <h1>{projectName}</h1>
          <div className="TransferContent">
            <h2>{customConfig.NAME} Bank Account Information</h2>
            <div className="TransferBankInfo">
              <h3>{accountInfo.bank}</h3>
              <h4> Account #: {accountInfo.address}</h4>
              <h4> Account owner: {accountInfo.owner}</h4>
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
            theme="Download"
            buttonText="Previous"
            onClick={this.previousStep}
          />
        </div>
      </div>
    );

    const confirmationStep = (
      <div className="ContentStep">
        <Steps stepNumber={2} />
        <div className="ProjectStepsContainer">
          <div className="StepDescription">
            <p className="LabelSteps">Funding Step</p>
            <h3>
              Transfer your pledged funds, help the world become a better place
              for everyone
            </h3>
          </div>
          <Label labelText="Project Name" />
          <h1>{projectName}</h1>
          <div className="TransferConfirmationContent">
            {/*             <img
              src="images/funds-pending.svg"
              alt="Clock"
              width="40"
            /> */}
            <LottieFiles
              animationData={animationData}
              height={140}
              width={140}
            />
            <h1>Funds information received!</h1>
            <h2>
              We are checking the information, your current funds transfer
              status is:
            </h2>
            {actualTransferState !== undefined &&
              actualTransferState !== null && (
                <TransferLabel
                  text={transferStatusMap[actualTransferState].show}
                  theme={transferStatusMap[actualTransferState].theme}
                />
              )}
          </div>
        </div>
        <div className="ControlSteps">
          <CustomButton
            theme="Download"
            buttonText="Previous"
            onClick={this.previousStep}
          />
        </div>
      </div>
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

  async fetchDataFromApi() {
    const { projectId, user } = this.props;
    const project = (await getProject(projectId)).data;
    const userProjects = (await getUsers(projectId)).data;
    const transfers = await getTransferListOfProject(projectId);
    const oracles = await getOracles();
    const actualAmount = project.totalFunded;
    const milestones = await this.getMilestones(projectId);
    const actualUserTransfer = transfers.find(
      transfer => transfer.sender === user.id
    );
    const accountInfo = await getDestinationCOAAccount();

    this.setState({
      actualTransferState: actualUserTransfer ? actualUserTransfer.state : null,
      project,
      userProjects,
      transfers,
      oracles,
      actualAmount,
      milestones,
      accountInfo,
      loading: false
    });
  }

  render() {
    const { loading } = this.state;
    return !loading ? (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          {this.getCurrentStep()}
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default withUser(ConcensusMilestones);
