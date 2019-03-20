import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import Link from "next/link";
import ButtonPrimary from "../components/atoms/ButtonPrimary/ButtonPrimary";
import ExploreProjects from "./explore-projects";
import "./_style.scss";

const Index = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="ButtonContainer">
        <h1>Login as:</h1>

        <div className="FunderButtonContainer">
          <Link href={`/tranfer-funds?userId=1`}>
            <ButtonPrimary text="As Funder 1"/>
          </Link>
          <Link href={`/tranfer-funds?userId=2`}>
            <ButtonPrimary text="As Funder 2" />
          </Link>
        </div>

        <div className="FunderButtonContainer">
          <Link  href={`/tranfer-funds-confirmation?userId=1`}>
            <ButtonPrimary text="Funder 1 - Status" />
          </Link>
          <Link href={`/tranfer-funds-confirmation?userId=2`}>
            <ButtonPrimary text="Funder 2- Status" />
          </Link>
        </div>

        <Link href="/concensus">
          <ButtonPrimary text="As Social Entrepreneur" />
        </Link>
        <Link href="/fund-administration">
          <ButtonPrimary text="As Backoffice Administrator" />
        </Link>
      </div>
    </div>
  </div>
);

export default Index;
