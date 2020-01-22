import React from 'react';
import PropTypes from 'prop-types';
import { Col, Tag, Row } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import GeneralItem from '../../atoms/GeneralItem/GeneralItem';
import projectStatusMap from '../../../model/projectStatus';

// TODO: show default if status not valid?
const getTagStatus = status =>
  Object.keys(projectStatusMap).includes(status) && (
    <Tag color={projectStatusMap[status].color}>
      {projectStatusMap[status].name}
    </Tag>
  );

const ProjectDetailHeader = ({
  location,
  timeframe,
  goalAmount,
  projectName,
  faqLink,
  status,
  onFollowProject
}) => {
  const itemsData = [
    {
      label: 'Country of Impact',
      value: location,
      img: './static/images/world-icon.svg'
    },
    {
      label: 'Timeframe',
      value: timeframe,
      img: './static/images/calendar-icon.svg'
    },
    {
      label: 'Amount',
      value: goalAmount,
      img: './static/images/amount-icon.svg'
    }
  ];
  return (
    <div className="ProjectHeader">
      <img
        className="Banner"
        src="./static/images/imgcard.png"
        alt="Circles of Angels"
      />
      <div className="ProjectEnterprice">
        <Row className="BlockTop">
          <p>Organization Name</p>
          <Col span={21} className="flex">
            <h1>{projectName}</h1>
            {getTagStatus(status)}
          </Col>
          <Col span={3}>
            <CustomButton
              theme="Primary"
              buttonText="Follow Project"
              onClick={onFollowProject}
            />
          </Col>
        </Row>
        <Row type="flex" justify="space-between" className="BlockBottom">
          <Col className="flex">
            <GeneralItem
              type="link"
              value={faqLink} // TODO: fix styles when link too long
              label="FAQ-Funders and SE´s Questions & Answers"
            />
          </Col>
          <Col className="flex">
            {itemsData.map(item => (
              <GeneralItem {...item} key={`data-${item.value}`} />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

ProjectDetailHeader.defaultProps = {
  location: '-',
  timeframe: '-',
  goalAmount: 0,
  projectName: '-',
  faqLink: '#'
};

ProjectDetailHeader.propTypes = {
  location: PropTypes.string,
  timeframe: PropTypes.string,
  goalAmount: PropTypes.number,
  projectName: PropTypes.string,
  faqLink: PropTypes.string,
  status: PropTypes.oneOf(Object.keys(projectStatusMap)).isRequired,
  onFollowProject: PropTypes.func.isRequired
};

export default ProjectDetailHeader;
