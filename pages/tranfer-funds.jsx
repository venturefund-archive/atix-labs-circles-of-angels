import React from 'react';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import FormTransfer from '../components/molecules/FormTransfer/FormTransfer';
import ButtonPrimary from '../components/atoms/ButtonPrimary/ButtonPrimary';
import ButtonCancel from '../components/atoms/ButtonCancel/ButtonCancel';
import { sendTransferInformation } from '../api/transferApi';
import Routing from '../components/utils/Routes';
import { withUser } from '../components/utils/UserContext';

import './_style.scss';
import './_transfer-funds.scss';

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
          <div className="TransferContainer">
            <h1>Transfer Funds</h1>
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
            <div className="ControlSteps">
              <ButtonCancel text="Cancel" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(TransferFunds);
