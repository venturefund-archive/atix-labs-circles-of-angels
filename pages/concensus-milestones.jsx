import React, { Component } from 'react';
import { Tabs, message } from 'antd';
import ButtonPrimary from '../components/atoms/ButtonPrimary/ButtonPrimary';
import ButtonCancel from '../components/atoms/ButtonCancel/ButtonCancel';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import UploadFile from '../components/molecules/UploadFile/UploadFile';
import DownloadAgreement from '../components/molecules/DownloadAgreement/DownloadAgreement';
import FileUploadStatus from '../constants/FileUploadStatus';
import './_style.scss';
import './_concensus.scss';
import './_steps.scss';
import TableMilestones from '../components/organisms/TableMilestones/TableMilestones';
import {
  getProjectMilestones,
  downloadAgreement,
  downloadProposal,
  uploadAgreement
} from '../api/projectApi';
import DownloadFile from '../components/molecules/DownloadFile/DownloadFile';
import SignatoryItem from '../components/molecules/SignatoryItem/SignatoryItem';
import { getUsers, signAgreement } from '../api/userProjectApi';
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

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

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
      currentStep: props.initialStep ? props.initialStep : 0,
      transferId: '',
      amount: '',
      confirmationStatus: null
    };
  }

  static async getInitialProps(query) {
    const { projectJSON } = query.query;
    const project = JSON.parse(projectJSON);
    const projectId = project.id;
    const response = await getProjectMilestones(projectId);
    const users = await getUsers(projectId);
    const transfers = await getTransferListOfProject(projectId);

    return {
      milestones: response.data,
      project,
      userProjects: users.data,
      projectId,
      transfers
    };
  }

  updateState = (evnt, field, value) => {
    evnt.preventDefault();
    this.setState({ [field]: value });
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
    const result = await sendTransferInformation(toSubmit);

    if (result.error) alert(`Error: ${result.error}`);
    else {
      // Routing.toTransferFundsConfirmation();
      this.nextStep();
      alert('Success: Transfer submited correctly!');
    }
  };

  goToTransferFunds = () => {
    const { projectId } = this.props;
    Routing.toTransferFunds({ projectId });
  };

  downloadAgreementClick = async () => {
    const { project } = this.props;

    const response = await downloadAgreement(project.id);
    console.log(response);
  };

  changeProjectAgreement = async info => {
    const { project } = this.props;
    const { status } = info.file;
    const projectAgreement = info.file;
    if (status !== FileUploadStatus.UPLOADING) {
      console.log(info.file, info.fileList);
    }
    if (status === FileUploadStatus.DONE) {
      const response = await uploadAgreement(
        project.id,
        projectAgreement.originFileObj
      );

      console.log(response);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  clickDownloadProposal = async () => {
    const { project } = this.props;
    const res = await downloadProposal(project.id);
    console.log(res);
  };

  signAgreementOk = async () => {
    const { user, projectId, project } = this.props;
    const response = await signAgreement(user.id, projectId);

    // reload page
    if (!response.error) {
      Routing.toConsensusMilestones({
        projectJSON: JSON.stringify(project),
        initialStep: 1
      });
    } else {
      console.log(response.error);
    }

    return response;
  };

  previousStep = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep - 1 });
  };

  nextStep = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep + 1 });
  };

  getCurrentStep = () => {
    const {
      project,
      milestones,
      userProjects,
      projectId,
      transfers
    } = this.props;

    const { currentStep, confirmationStatus } = this.state;

    const milestonesAndActivities = [];

    milestones.forEach(milestone => {
      milestonesAndActivities.push(milestone);
      milestone.activities.forEach((activity, j) => {
        const activityWithId = {
          ...activity,
          type: `Activity ${j + 1}`
        };
        milestonesAndActivities.push(activityWithId);
      });
    });

    const step1 = (
      <span>
        <StepsIf stepNumber={0} />
        <div className="ProjectStepsContainer">
          <p className="LabelSteps">Consensus Step</p>
          <h3 className="StepDescription">
            Collaborate with the definition of milestones, share your
            experiences, talk to project owner and other funders, download the
            latest agreements
          </h3>
          <p className="LabelSteps">Project Name</p>
          <h1>{project.projectName}</h1>
          <div className="SignatoryList">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Milestones" key="1">
                <TableMilestones dataSource={milestonesAndActivities} />
              </TabPane>
              <TabPane tab="Collaboration" key="2">
                <div className="TabCollaboration">
                  <h2>Project's Agreement File</h2>
                  <DownloadAgreement click={this.downloadAgreementClick} />
                  <UploadFile
                    name="projectAgreement"
                    change={this.changeProjectAgreement}
                    buttonText="Upload Project Agreement File"
                  />
                </div>
              </TabPane>
              <TabPane tab="FAQ & Project Proposal" key="3">
                <div>
                  <h2>FAQ Document</h2>
                  <a
                    href={project.faqLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.faqLink}
                  </a>
                  <br /> <br />
                  <DownloadFile
                    subtitle="Project's Pitch Proposal"
                    text="Lorem ipsum text description"
                    buttonText="Download Pitch Proposal"
                    click={this.clickDownloadProposal}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="ControlSteps StepOne">
          <ButtonPrimary text="Continue" onClick={this.nextStep} />
        </div>
      </span>
    );

    const step2 = (
      <span>
        <StepsIf stepNumber={1} />
        <div className="ProjectStepsContainer">
          <p className="LabelSteps">Signatories Step</p>
          <h3 className="StepDescription">
            Sign your agreement and pledge to help this project come to true
          </h3>
          <p className="LabelSteps">Project Name</p>
          <h1>Lorem Ipsum</h1>
          <div className="SignatoryList">
            {userProjects.map(userProject => {
              let userTransfer = transfers.filter(
                transfer => transfer.sender === userProject.user.id
              )[0];

              if (!userTransfer || userTransfer == null) {
                userTransfer = { state: 0 };
              }

              return (
                <SignatoryItem
                  key={userProject.id}
                  userId={userProject.user.id}
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
          <ButtonCancel text="Cancel" onClick={this.previousStep} />
          <ButtonPrimary text="Continue" onClick={this.nextStep} />
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
          <ButtonCancel text="Cancel" onClick={this.previousStep} />
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
          <ButtonCancel text="Cancel" onClick={this.previousStep} />
          <ButtonPrimary text="Confirm" onClick={Routing.toExploreProjects} />
        </div>
      </span>
    );

    switch (currentStep) {
      case 0:
        return step1;
      case 1:
        return step2;
      case 2:
        return step3;
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
