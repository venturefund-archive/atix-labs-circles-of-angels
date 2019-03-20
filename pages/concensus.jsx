import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsSe from "../components/molecules/StepsSe/StepsSe.jsx";
import "./_style.scss";
import "./_concensus.scss";
import SignatoryItem from "../components/molecules/SignatoryItem/SignatoryItem.jsx";
import { getTransferListOfProject } from "../api/transferApi";
import transferStatusMap from "../model/transferStatus";

const names = {
  "1": { name: "John Brown", initials: "JB" },
  "2": { name: "Jim Green", initials: "JG" },
  "3": { name: "Joe Black", initials: "JB" }
};

class Concensus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transfers: []
    };
  }

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
          <StepsSe />
          <div className="SignatoriesContainer">
            <h1>Signatories</h1>
            <p>Sign your agreement and pledge to help this project come to true</p>
            <div className="SignatoryList">
              {this.state.transfers
                ? this.state.transfers.map((transfer, i) => {
                    const status = transferStatusMap[transfer.state];
                    return (
                      <SignatoryItem
                        key={i}
                        username={names[transfer.senderId].name}
                        tfStatusShow={status.show}
                        tfStatusIcon={status.icon}
                        tfStatusName={status.name}
                        nameInitials={names[transfer.senderId].initials}
                      />
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Concensus;
