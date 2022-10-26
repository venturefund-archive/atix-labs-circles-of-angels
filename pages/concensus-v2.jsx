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
import { Row, Col, Tag, Tabs } from 'antd';
import TitlePage from '../components/atoms/TitlePage/TitlePage';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import DrawerUsers from '../components/organisms/DrawerUsers/DrawerUsers';
import RowMilestones from '../components/organisms/RowMilestones/RowMilestones';
import AvatarUser from '../components/atoms/AvatarUser/AvatarUser';
import BlockDiscussion from '../components/molecules/BlockDiscussion/BlockDiscussion';
import BlockChat from '../components/molecules/BlockChat/BlockChat';

const { TabPane } = Tabs;

const Cards = ({ theme, category, user, usersName, avatarImage }) => {
  const classname = `Cards ${theme}`;
  return (
    <Col span={24} className={classname}>
      <Col span={24}>
        <h3>{category}</h3>
      </Col>
      <Col span={24}>
        <h3 className="bold"> {user}</h3>
      </Col>
      <Col span={24} className="flex">
        <Col span={3}>
          <AvatarUser tooltipText={usersName} avatarImage={avatarImage} />
        </Col>
        <Col span={21}>
          <span>{usersName}</span>
        </Col>
      </Col>
    </Col>
  );
};
const Consensusv2 = () => (
  <div className="ConsensusView">
    <Col span={18} className="Left">
      <Row type="flex" align="middle" className="Top">
        <Col span={21} className="">
          <Col span={24} className="flex">
            <TitlePage textTitle="Wellness for Families in Asia" />
            <Tag color="cyan">Consensus Phase</Tag>
          </Col>
          <Col span={9} className="vertical">
            <a href="https://questionsanswers.com">
              https://questionsanswers.com
            </a>
            <span>FAQ-Funders and SE´s Questions & Answers</span>
          </Col>
          <Col span={9} className="vertical">
            <p>$12,000</p>
            <span>Goal Amount</span>
          </Col>
        </Col>
        <Col span={3} className="">
          <CustomButton buttonText="Follow Project" theme="Primary" />
        </Col>
      </Row>
      <Row className="Bottom">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Milestones" key="1">
            <RowMilestones />
          </TabPane>
          <TabPane tab="Discussions" key="2">
            <BlockDiscussion />
            <BlockChat />
          </TabPane>
        </Tabs>
      </Row>
    </Col>
    <Col span={6} className="Right">
      <h3>Related users</h3>
      <Col span={12}>
        <h4>Followers</h4>
      </Col>
      <Col span={12} className="flex-end">
        <DrawerUsers />
      </Col>
      <Col span={24}>
        <AvatarUser tooltipText="UserName" avatarImage="images/user1.png" />
        <AvatarUser tooltipText="UserName" avatarImage="images/user2.png" />
        <AvatarUser tooltipText="UserName" avatarImage="images/user3.png" />
        <AvatarUser tooltipText="UserName" avatarImage="images/user4.png" />
      </Col>
      <Cards
        theme="Orange"
        category="Project Social"
        user="Entrepreneur"
        usersName="Jenny Steward"
        avatarImage="images/user1.png"
      />
      <Cards
        theme="Blue"
        category="Interested in"
        user="Funding"
        usersName="Marvin Mccoy"
        avatarImage="images/user2.png"
      />
      <Cards
        theme="Red"
        category="Interested in being"
        user="Oracles"
        usersName="Jorge Howard"
        avatarImage="images/user3.png"
      />
      <Col span={24} className="BlockActions">
        <Col span={24}>
          <CustomButton
            theme="Alternative"
            buttonText="I want to be an Oracle"
          />
        </Col>
        <Col span={24}>
          <CustomButton theme="Secondary" buttonText="Invite Someone" />
        </Col>
      </Col>
    </Col>
  </div>
);
export default Consensusv2;

Cards.propTypes = {
  theme: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  user: PropTypes.element.isRequired,
  usersName: PropTypes.string.isRequired,
  avatarImage: PropTypes.string.isRequired
};
