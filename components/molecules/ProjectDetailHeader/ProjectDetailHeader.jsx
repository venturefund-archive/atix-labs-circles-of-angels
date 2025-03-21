import React from 'react';
import PropTypes from 'prop-types';
import { Col, Tag, Row } from 'antd';
import moment from 'moment';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import DrawerBlockchain from '../../organisms/DrawerBlockchain/DrawerBlockchain';
import GeneralItem from '../../atoms/GeneralItem/GeneralItem';
import { PROJECT_STATUS_MAP } from '../../../model/projectStatus';
import { publicProjectStatuses, SHOW_BLOCKCHAIN_INFO_STATUS } from '../../../constants/constants';
import LinkButton from '../../atoms/LinkButton/LinkButton';
import { buildProjectBlockchainData } from '../../../helpers/blockchainData';
import { formatTimeframeValue } from '../../../helpers/formatter';

// TODO: show default if status not valid?
const getTagStatus = (status, daysToGo) =>
  Object.keys(PROJECT_STATUS_MAP).includes(status) && (
    <Tag color={PROJECT_STATUS_MAP[status].color}>
      {PROJECT_STATUS_MAP[status].name} {daysToGo}
    </Tag>
  );

const blockchainDrawerTitle = (
  <p>
    This project was saved on the
    <b> Blockchain</b>
  </p>
);

const getDaysToGo = nextStatusUpdateAt => {
  if (!nextStatusUpdateAt) return null;
  const daysToGo = moment(nextStatusUpdateAt).diff(moment(), 'days');
  return daysToGo >= 0 ? <b> - {daysToGo} days left</b> : null;
};

const ProjectDetailHeader = ({
  coverPhotoPath,
  location,
  timeframe,
  goalAmount,
  fundedAmount,
  projectName,
  proposalFilePath,
  agreementFilePath,
  status,
  allowFollow,
  onFollowProject,
  onUnfollowProject,
  onEditProject,
  allowEdit,
  isFollower,
  fetchBlockchainData,
  nextStatusUpdateAt,
  countries
}) => {
  const locationsNames = () => {
    const countriesIds = countries.filter(
      // eslint-disable-next-line radix
      country => location.split(',').includes(String(country.value))
    );
    return countriesIds.map(country => country.name).join(', ');
  };

  const itemsData = [
    {
      key: 1,
      label: 'Country of Impact',
      value: locationsNames(),
      img: './static/images/world-icon.svg'
    },
    {
      key: 2,
      label: 'Timeframe',
      value: formatTimeframeValue({ timeframe }),
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
      value: <LinkButton text="Project Proposal" className="Separate link" />,
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
  const daysToGo = getDaysToGo(nextStatusUpdateAt);

  return (
    <div className="ProjectHeader">
      <img
        className="Banner"
        src={coverPhotoPath || './static/images/cover-project.jpg'}
        alt="Circles of Angels"
      />
      <div className="ProjectEnterprice">
        <Row className="BlockTop">
          {getTagStatus(status, daysToGo)}
          <div className="space-between blockverticalrsp">
            <Col className="flex">
              <h1>{projectName}</h1>
              {SHOW_BLOCKCHAIN_INFO_STATUS.includes(status) && (
                <DrawerBlockchain
                  title={blockchainDrawerTitle}
                  onLoad={fetchBlockchainData}
                  noDataMessage="Could not fetch the blockchain information for this project"
                  dataBuilder={buildProjectBlockchainData}
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

              {allowFollow && status && status !== 'aborted' && (
                <CustomButton
                  theme={isFollower ? 'Primary' : 'Primary'}
                  buttonText={isFollower ? 'Following' : 'Follow Project'}
                  icon="check"
                  classNameIcon={isFollower ? 'iconDisplay' : 'none'}
                  onClick={isFollower ? onUnfollowProject : onFollowProject}
                />
              )}
              {/* TODO: uncomment when we confirm who has the ability to abort a project
              status && status === 'executing' && (
                <CustomButton
                  theme="Alternative"
                  buttonText="Abort"
                  onClick={onAbortProject}
                />
              ) */}
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
            {itemsData.map(item => !item.hide && <GeneralItem {...item} />)}
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
  isFollower: false,
  allowEdit: false,
  allowFollow: true,
  onEditProject: () => undefined,
  agreementFilePath: undefined,
  proposalFilePath: undefined,
  countries: []
};

ProjectDetailHeader.propTypes = {
  coverPhotoPath: PropTypes.string,
  location: PropTypes.string,
  timeframe: PropTypes.string,
  goalAmount: PropTypes.number,
  fundedAmount: PropTypes.number,
  projectName: PropTypes.string,
  status: PropTypes.oneOf(Object.keys(PROJECT_STATUS_MAP)).isRequired,
  allowFollow: PropTypes.bool,
  onFollowProject: PropTypes.func.isRequired,
  onUnfollowProject: PropTypes.func.isRequired,
  onEditProject: PropTypes.func,
  allowEdit: PropTypes.bool,
  isFollower: PropTypes.bool,
  agreementFilePath: PropTypes.string,
  proposalFilePath: PropTypes.string,
  fetchBlockchainData: PropTypes.func.isRequired,
  nextStatusUpdateAt: PropTypes.number.isRequired,
  countries: PropTypes.arrayOf({
    name: PropTypes.string,
    value: PropTypes.number
  })
};

export default ProjectDetailHeader;
