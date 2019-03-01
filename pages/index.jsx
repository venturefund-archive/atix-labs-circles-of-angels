import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import Link from "next/link";
import ButtonPrimary from "../components/atoms/ButtonPrimary/ButtonPrimary";
import "./_style.scss";

const Index = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div class="ButtonContainer">
        <h1>Login as:</h1>
        <Link href="/tranfer-funds">
          <ButtonPrimary text="As Funder" />
        </Link>

        <Link href="/tranfer-funds-confirmation">
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
