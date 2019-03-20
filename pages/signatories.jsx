import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsIf from "../components/molecules/StepsIf/StepsIf.jsx";
import "./_style.scss";
import "./_concensus.scss";
import SignatoryItem from "../components/molecules/SignatoryItem/SignatoryItem.jsx";

const signatories = [
  {
    username: "Juan Perez",
    show: "Signed Agreement",
    icon: "/static/images/icon-check.svg",
    name: "success",
    namesinitials: "JP"
  },
  {
    username: "Antonella Troiano",
    show: "Signed Agreement",
    icon: "/static/images/icon-check.svg",
    name: "success",
    namesinitials: "AT"
  }
];
const SignatoriesIf = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <StepsIf />
      <div className="SignatoriesContainer">
        <h1>Signatories</h1>
        <p>Sign your agreement and pledge to help this project come to true</p>
        <div className="SignatoryList">
          {signatories.map((status, i) => (
            <SignatoryItem
              key={i}
              username={status.username}
              tfStatusShow={status.show}
              tfStatusIcon={status.icon}
              tfStatusName={status.name}
              nameInitials={status.namesinitials}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default SignatoriesIf;
