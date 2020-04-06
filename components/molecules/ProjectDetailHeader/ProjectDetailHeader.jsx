import React from 'react';
import PropTypes from 'prop-types';
import { Col, Tag, Row } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import GeneralItem from '../../atoms/GeneralItem/GeneralItem';
import projectStatusMap from '../../../model/projectStatus';
import { publicProjectStatuses } from '../../../constants/constants';
import LinkButton from '../../atoms/LinkButton/LinkButton';

// TODO: show default if status not valid?
const getTagStatus = status =>
  Object.keys(projectStatusMap).includes(status) && (
    <Tag color={projectStatusMap[status].color}>
      {projectStatusMap[status].name}
      {/* TODO: receive props  */}
      {/* <b>- 10 days left</b> */}
    </Tag>
  );

const ProjectDetailHeader = ({
  coverPhotoPath,
  location,
  timeframe,
  goalAmount,
  fundedAmount,
  projectName,
  proposalFilePath,
  agreementFilePath,
  faqLink,
  status,
  onFollowProject,
  onUnfollowProject,
  onEditProject,
  allowEdit,
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
      label: 'Goal Amount',
      value: goalAmount,
      extra: 'USD',
      img: './static/images/amount-icon.svg'
    },
    {
      type: 'link',
      url: proposalFilePath,
      value: (
        <LinkButton
          text="Download Project Proposal"
          className="Separate link"
        />
      ),
      hide: !proposalFilePath
    },
    {
      type: 'link',
      url: agreementFilePath,
      value: <LinkButton text="Download Legal Agreement" className="link" />,
      hide: !agreementFilePath
    }
  ];

  if (Object.values(publicProjectStatuses).includes(status))
    itemsData.push({
      label: 'Funded Amount',
      value: fundedAmount,
      extra: 'USD',
      img: './static/images/amount-icon.svg'
    });

  return (
    <div className="ProjectHeader">
      <img
        className="Banner"
        // {coverPhotoPath || './static/images/imgcard.png'}
        src="./static/images/cover-project.jpg"
        alt="Circles of Angels"
      />
      <div className="ProjectEnterprice">
        <Row className="BlockTop">
          <p>Organization Name</p>
          <div className="space-between blockverticalrsp">
            <Col className="flex">
              <h1>{projectName}</h1>
              {getTagStatus(status)}
            </Col>
            <Col className="flex">
              {allowEdit && (
                <CustomButton
                  theme="Alternative"
                  buttonText="Edit"
                  icon="edit"
                  classNameIcon="iconDisplay"
                  onClick={onEditProject}
                />
              )}

              <CustomButton
                theme={isFollower ? 'Primary' : 'Primary'}
                buttonText={isFollower ? 'Following' : 'Follow Project'}
                icon="check"
                classNameIcon={isFollower ? 'iconDisplay' : 'none'}
                onClick={isFollower ? onUnfollowProject : onFollowProject}
              />
            </Col>
          </div>
        </Row>
        <Row type="flex" justify="space-between" className="BlockBottom">
          {/* <Col className="flex">
            <GeneralItem
              type="link"
              value={faqLink} // TODO: fix styles when link too long
              label="FAQ-Funders and SE´s Questions & Answers"
            />
          </Col> */}
          <Col className="flex">
            {itemsData.map(
              item =>
                !item.hide && (
                  <GeneralItem {...item} key={`data-${item.value}`} />
                )
            )}
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
  fundedAmount: 0,
  projectName: '-',
  faqLink: '#',
  isFollower: false,
  allowEdit: false,
  onEditProject: () => undefined,
  agreementFilePath: undefined,
  proposalFilePath: undefined
};

ProjectDetailHeader.propTypes = {
  coverPhotoPath: PropTypes.string,
  location: PropTypes.string,
  timeframe: PropTypes.string,
  goalAmount: PropTypes.number,
  fundedAmount: PropTypes.number,
  projectName: PropTypes.string,
  faqLink: PropTypes.string,
  status: PropTypes.oneOf(Object.keys(projectStatusMap)).isRequired,
  onFollowProject: PropTypes.func.isRequired,
  onUnfollowProject: PropTypes.func.isRequired,
  onEditProject: PropTypes.func,
  allowEdit: PropTypes.bool,
  isFollower: PropTypes.bool,
  agreementFilePath: PropTypes.string,
  proposalFilePath: PropTypes.string
};

export default ProjectDetailHeader;
