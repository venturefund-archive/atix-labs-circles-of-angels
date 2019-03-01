import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import TableAdmin from "../components/organisms/TableAdmin/TableAdmin.jsx";
import "./_style.scss";
import "./_fund-administration.scss";
import {
  getTransferListOfProject,
  updateStateOfTransference
} from "../api/transferApi";

class FundAdministration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transfers: []
    };
  }

  saveStatus = (transferId, state) => {
    updateStateOfTransference(transferId, state);
    alert(`Status changed successfuly!`);
  };

  componentDidMount = async () => {
    const transfers = await getTransferListOfProject(1);
    console.log(transfers);
    this.setState({ transfers: transfers });
  };

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="FundAdminContainer">
            <h1>Funds Administration</h1>
            <TableAdmin
              data={this.state.transfers}
              saveStatus={this.saveStatus}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FundAdministration;
