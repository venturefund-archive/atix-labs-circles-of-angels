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
  coverPhotoPath,
  location,
  timeframe,
  goalAmount,
  projectName,
  faqLink,
  status,
  onFollowProject,
  onUnfollowProject,
  isFollower
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
        src={coverPhotoPath || './static/images/imgcard.png'}
        alt="Circles of Angels"
      />
      <div className="ProjectEnterprice">
        <Row className="BlockTop">
          <p>Organization Name</p>
          <Col xs={24} md={21} lg={21} className="flex">
            <h1>{projectName}</h1>
            {getTagStatus(status)}
          </Col>
          <Col xs={24} md={3} lg={3}>
            <CustomButton
              theme={isFollower ? 'Primary' : 'Primary'}
              buttonText={isFollower ? 'Following' : 'Follow Project'}
              icon='check'
              classNameIcon={isFollower ? 'iconDisplay' : 'none'}
              onClick={isFollower ? onUnfollowProject : onFollowProject}
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
  coverPhotoPath: undefined,
  location: '-',
  timeframe: '-',
  goalAmount: 0,
  projectName: '-',
  faqLink: '#',
  isFollower: false
};

ProjectDetailHeader.propTypes = {
  coverPhotoPath: PropTypes.string,
  location: PropTypes.string,
  timeframe: PropTypes.string,
  goalAmount: PropTypes.number,
  projectName: PropTypes.string,
  faqLink: PropTypes.string,
  status: PropTypes.oneOf(Object.keys(projectStatusMap)).isRequired,
  onFollowProject: PropTypes.func.isRequired,
  onUnfollowProject: PropTypes.func.isRequired,
  isFollower: PropTypes.bool
};

export default ProjectDetailHeader;
