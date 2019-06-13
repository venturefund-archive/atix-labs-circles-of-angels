/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Icon, Skeleton } from 'antd';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import TransferLabel from '../components/atoms/TransferLabel/TransferLabel';
import { getTransferStatus } from '../api/transferApi';
import { withUser } from '../components/utils/UserContext';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import './_style.scss';
import './_transfer-funds-confirmation.scss';
import './_steps.scss';

const statusMap = {
  '-1': 'theme-cancel',
  '0': 'theme-pending',
  '1': 'theme-pending',
  '2': 'theme-success'
};

class TransferFundsConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null
    };
  }

  static async getInitialProps(query) {
    const { projectId } = query.query;
    return { projectId };
  }

  componentDidMount = async () => {
    const { user, projectId } = this.props;
    const status = await getTransferStatus({
      userId: user.id,
      projectId
    });
    this.setState({ status });
  };

  render() {
    const { status } = this.state;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
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
              {status ? (
                <TransferLabel
                  text={status.name}
                  theme={statusMap[status.status]}
                />
              ) : (
                ''
              )}
              <h2>Circles will be checking your funds transfer</h2>
              {/* <div className="MoreInfo">
                <Icon type="exclamation-circle" />

                <div>
                <h3> Singapore Bank</h3>
                <div></div>
                <h4>  Account #: 0012345678</h4>
                <h4>  Account owner: CirclesOfAngels</h4>
                </div>


              </div> */}
            </div>
          </div>
          <div className="ControlSteps">
            <CustomButton theme="Cancel" buttonText="Cancel" />
            <CustomButton theme="Primary" buttonText="Confirm" />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(TransferFundsConfirmation);
