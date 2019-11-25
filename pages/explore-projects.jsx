/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CardProject from '../components/molecules/CardProject/CardProject';
import { getProjectsPreview, getProjectsAsOracle } from '../api/projectApi';
import { withUser } from '../components/utils/UserContext';
import './_style.scss';
import './_explore-projects.scss';
import Roles from '../constants/RolesMap';
import projectStatus from '../constants/ProjectStatus';
import milestoneActivityStatus from '../constants/MilestoneActivityStatus';
import TitlePage from '../components/atoms/TitlePage/TitlePage';
import { Row, Col, Input, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

export default function ExploreProjects() {
  const history = useHistory();

  useEffect(async() => {

  }, []);

  const goToProjectDetail = projectId => {
    Routing.toProjectDetail({ projectId });
  }

  const goToProjectProgress = (projectId) => {
    Routing.toProjectProgress({ projectId });
  }

    // const { activeOracleProjects, projects } = this.state;
  return (
    <div className="Content ExploreProject">
      <Row>
        <Col span={14}>
          <TitlePage textTitle="Explore Project´s" />
        </Col>
        <Col span={10}>
          <Row gutter={10}>
            <Col span={8}>
              <Search
                placeholder="Project Name"
                onSearch={value => console.log(value)}
              />
            </Col>
            <Col span={8}>
              <Search
                placeholder="Country"
                onSearch={value => console.log(value)}
              />
            </Col>
            <Col span={8}>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="ProjectsCardsContainer" gutter={16}>
        {projects &&
          projects.map(project => {
            const showTag =
              project.hasOpenMilestones &&
              project.status === projectStatus.IN_PROGRESS &&
              activeOracleProjects.indexOf(project.id) !== -1;
            return (
              <CardProject
                enterpriseName={project.projectName}
                enterpriseLocation={project.location}
                timeframe={project.timeframe}
                amount={project.goalAmount}
                showTag={showTag}
                tagClick={() => goToProjectProgress(project.id)}
                milestoneProgress={project.milestoneProgress}
                projectId={project.id}
                key={project.id}
                onClick={() => goToProjectDetail(project.id)}
              />
            );
          })}
      </Row>
    </div>
  );
}

export default ExploreProjects;
