/* eslint-disable no-alert */
/* eslint-disable no-undef */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import customConfig from 'custom-config';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import FormTransfer from '../components/molecules/FormTransfer/FormTransfer';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import { sendTransferInformation } from '../api/transferApi';
import { withUser } from '../components/utils/UserContext';

import './_style.scss';
import './_transfer-funds.scss';
import './_steps.scss';

class TransferFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferId: '',
      amount: ''
    };
  }

  static async getInitialProps(query) {
    const { projectId } = query.query;
    return { projectId };
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
      Routing.toTransferFundsConfirmation();
      alert('Success: Transfer submited correctly!');
    }
  };

  render() {
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
            <div className="TransferContent">
              <h2>{customConfig.NAME} Bank Account Information</h2>
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
            <div className="ControlSteps">
              <CustomButton theme="Cancel" buttonText="Cancel" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(TransferFunds);

TransferFunds.propTypes = {
  user: PropTypes.element.isRequired,
  projectId: PropTypes.number.isRequired
};
