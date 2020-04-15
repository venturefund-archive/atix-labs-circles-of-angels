import React from 'react';
import PropTypes from 'prop-types';
import { Col, Tag, Row } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import DrawerBlockchain from '../../organisms/DrawerBlockchain/DrawerBlockchain';
import GeneralItem from '../../atoms/GeneralItem/GeneralItem';
import projectStatusMap from '../../../model/projectStatus';
import {
  publicProjectStatuses,
  SHOW_BLOCKCHAIN_INFO_STATUS
} from '../../../constants/constants';
import LinkButton from '../../atoms/LinkButton/LinkButton';
import { buildProjectBlockchainData } from '../../../helpers/blockchainData';

// TODO: show default if status not valid?
const getTagStatus = status =>
  Object.keys(projectStatusMap).includes(status) && (
    <Tag color={projectStatusMap[status].color}>
      {projectStatusMap[status].name}
      {/* TODO: receive props  */}
      {/* <b>- 10 days left</b> */}
    </Tag>
  );

const blockchainDrawerTitle = (
  <p>
    This project was saved on the
    <b> Blockchain</b>
  </p>
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
      key: 1,
      label: 'Country of Impact',
      value: location,
      img: './static/images/world-icon.svg'
    },
    {
      key: 2,
      label: 'Timeframe',
      value: timeframe,
      img: './static/images/calendar-icon.svg'
    },
    {
      key: 3,
      label: 'Goal Amount',
      value: goalAmount,
      extra: 'USD',
      img: './static/images/amount-icon.svg'
    },
    {
      key: 4,
      label: 'Funded Amount',
      value: fundedAmount,
      extra: 'USD',
      hide: !Object.values(publicProjectStatuses).includes(status)
},
    {
      key: 5,
      type: 'link',
      url: proposalFilePath,
      value: (
        <LinkButton
          text="Project Proposal"
          className="Separate link"
        />
      ),
      hide: !proposalFilePath
    },
    {
      key: 6,
      type: 'link',
      url: agreementFilePath,
      value: <LinkButton text="Legal Agreement" className="link" />,
      hide: !agreementFilePath
    }
  ];


  return (
    <div className="ProjectHeader">
      <img
        className="Banner"
        src={coverPhotoPath || './static/images/cover-project.jpg'}
        alt="Circles of Angels"
      />
      <div className="ProjectEnterprice">
        <Row className="BlockTop">
          {getTagStatus(status)}
          <div className="space-between blockverticalrsp">
            <Col className="flex">
              <h1>{projectName}</h1>
              {SHOW_BLOCKCHAIN_INFO_STATUS.includes(status) && (
                // TODO: get blockchain info from API
                <DrawerBlockchain
                  data={buildProjectBlockchainData({})}
                  title={blockchainDrawerTitle}
                />
              )}
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
                  <GeneralItem {...item} />
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
