/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { message, Progress, Avatar } from 'antd';
import { LeftOutlined, CopyFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
import '../_style.scss';
import './_style.scss';
import '../_transfer-funds.scss';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import Header from '../../components/molecules/Header/Header';
import SideBar from '../../components/organisms/SideBar/SideBar';
// import { getFeaturedProjects } from '../../api/projectApi';
import ProposalModal from '../../components/molecules/ProposalModal/ProposalModal';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';

function DaoProposalDetail() {
  const [visibility, setVisibility] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const history = useHistory();

  const fecthFeaturedProjects = async () => {
    try {
      const response = await getFeaturedProjects();
      setFeaturedProjects(response);
    } catch (error) {
      message.error(error);
    }
  };

  // TODO for the moment cards without redirection
  // const goToProjectDetail = project => {
  //   const state = { projectId: project.id };
  //   history.push(`/project-detail?id=${project.id}`, state);
  // };

  useEffect(() => {
    fecthFeaturedProjects();
  }, []);

  return (
    <div className="AppContainer">
      <SideBar />
      <div className="MainContent">
        <Header />
        <div className="DaoContainer">
          <div className="flex space-between titleSection borderBottom marginBottom">
            <div className="column marginBottom">
              <p className="LabelSteps">
                <LeftOutlined /> Back to proposal
              </p>
              <TitlePage textTitle="Name of the DAO 1" />
            </div>
            <ProposalModal />
          </div>
          <div className="ProposalContainer flex space-between">
            {/* First Column */}
            <div className="column col">
              <div className="flex marginBottom">
                <div className="flex marginRight">
                  <img
                    className="marginRight"
                    src="../static/images/icon-date.svg"
                    alt="img"
                  />
                  <p className="text">01 d : 21 h :09 m</p>
                </div>
                <div className="flex">
                  <img
                    className="marginRight"
                    src="../static/images/icon-time.png"
                    alt="img"
                  />
                  <p className="text">Due date: 13 days</p>
                </div>
              </div>
              <h2 className="proposalTitle">
                ProgPoW Signaling Vote (EIP-1057)
              </h2>
              <p className="text">
                Magna voluptate et est ad adipisicing amet occaecat exercitation
                officia consectetur commodo excepteur non do mollit culpa
                excepteur mollit excepteur reprehenderit culpa velit id nostrud
                nulla anim eu magna.
              </p>
              <div className="flex ProposerBox">
                <div className="ProposerSubBox">
                  <div className="flex">
                    <h2>Proposer</h2>
                  </div>
                  <div className="flex maragin">
                    <div className="marginRight">
                      <img src="../static/images/proposer1.png" />
                    </div>
                    <div>
                      <p className="bold">Matt Grindor</p>
                      <p>
                        0x2625f1c11... <CopyFilled />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ProposerSubBox">
                  <div className="flex">
                    <h2>Applicant</h2>
                  </div>
                  <div className="flex maragin">
                    <div className="marginRight">
                      <img src="../static/images/proposer2.png" />
                    </div>
                    <div>
                      <p className="bold">Eric Conner</p>
                      <p>
                        0x2625f1c11... <CopyFilled />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="margin column disclaimer">
                <h2>Disclaimer</h2>
                <p>
                  This is a vote for COADAO members to signal their support or
                  dissent for <strong>“Name of the proposal”. Yes means</strong>
                  you would like to see it implemented and released in core
                  clients by the core developers, <strong>no means</strong> you
                  would not.
                </p>
              </div>
            </div>
            {/* Second Column */}
            <div className="column col">
              <h3>CATEGORY</h3>
              <div className="flex categoryTag">
                <img src="../static/images/icon-add-member.png" />
                <h3>NEW MEMBER</h3>
              </div>
              <h3>PROGRESS</h3>
              <div className="columnn VoteProgressBox">
                <div className="flex space-between">
                  <div className="flex voteBox">
                    <div className="imgVote">
                      <img alt="img" src="../static/images/yes.svg" />
                    </div>
                    <div className="column">
                      <p className="voteBold">366 - 75%</p>
                      <p className="text">YES VOTES</p>
                    </div>
                  </div>
                  <div className="flex voteBox">
                    <div className="imgVote">
                      <img alt="img" src="../static/images/no.svg" />
                    </div>
                    <div className="column">
                      <p className="voteBold">366 - 75%</p>
                      <p className="text">NO VOTES</p>
                    </div>
                  </div>
                </div>
                <Progress percent={30} />
                <div className="subBox">
                  <h3>Participants</h3>
                  <div className="detail flex">
                    <div className="avatarBox flex">
                      <Avatar className="avatar-overlap">U</Avatar>
                      <Avatar className="avatar">A</Avatar>
                      <Avatar className="avatar">R</Avatar>
                      <Avatar className="avatar">S</Avatar>
                      <Avatar className="avatar">P</Avatar>
                    </div>
                    <div className="plusSign flex-start">
                      <h2>+</h2>
                      <p>334</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* buttons section */}

            <div className="flex VoteButton">
              <CustomButton theme="VoteYes" buttonText="Vote Yes" />
              <CustomButton theme="VoteNo" buttonText="Vote No" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DaoProposalDetail;

/*


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
          </div>
          <div className="ControlSteps">
            <CustomButton theme="Cancel" buttonText="Cancel" />
          </div>

*/
