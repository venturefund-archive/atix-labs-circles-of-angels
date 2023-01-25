import React from 'react';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import './project-info-section.scss';
import PropTypes from 'prop-types';
import { ProjectProgressCard } from 'components/molecules/ProjectProgressCard/ProjectProgressCard';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const HorizontalSmallBlockText = ({ subtitle, content, icon, currencyType, hasAddress }) => {
  const isCryptoProjectWithAddress = (currencyType || '').toLowerCase() === 'crypto' && hasAddress;
  return (
    <div className="horizontalSmallBlockText">
      <div className="horizontalSmallBlockText__subContainer">
        <span className="horizontalSmallBlockText__icon">{icon}</span>{' '}
        <span className="horizontalSmallBlockText__subtitle">{subtitle}</span>
      </div>
      <div
        className={classNames('horizontalSmallBlockText__content', {
          horizontalSmallBlockText__contentWrap: isCryptoProjectWithAddress
        })}
      >
        {isCryptoProjectWithAddress ? (
          <Link to={{ pathname: `https://etherscan.io/address/${content}` }} target="_blank">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

const HorizontalBlockText = ({
  title,
  content,
  orderNumber,
  projectType,
  accountInfo,
  currencyType
}) => (
  <div className="m-horizontalBlockText">
    <TitlePage
      className="m-horizontalBlockText__title"
      textTitle={title}
      textColor="#4C7FF7"
      underlineColor="#4C7FF7"
      orderNumber={orderNumber}
    />
    <div className="m-horizontalBlockText__content">
      {content}{' '}
      {orderNumber === '01' && (
        <>
          <Divider />
          <HorizontalSmallBlockText
            subtitle="Project Type"
            content={
              ((projectType || '')[0] || '').toUpperCase() +
              (projectType || '').slice(1).toLowerCase()
            }
            currencyType={currencyType}
            icon={<img src="static/images/document.svg" alt="document" />}
            className
          />
          <Divider />
          <HorizontalSmallBlockText
            subtitle="Account Information"
            content={accountInfo}
            currencyType={currencyType}
            icon={<img src="static/images/bank.svg" alt="bank" />}
            className
            hasAddress
          />
          <Divider />
        </>
      )}
    </div>
  </div>
);

export const ProjectInfoSection = ({
  about,
  mission,
  progressCurrentValue,
  progressTotalValue,
  balanceCurrentValue,
  balanceTotalValue,
  currency,
  onClickSeeMilestones,
  progressCurrentPercentage,
  projectType,
  accountInfo,
  currencyType
}) => {
  const { texts } = React.useContext(DictionaryContext);

  return (
    <div className="o-projectInfoSection">
      <div className="o-projectInfoSection__text">
        <HorizontalBlockText
          title={texts?.landingInfoSection?.about || 'About the Project'}
          content={about}
          orderNumber="01"
          projectType={projectType}
          accountInfo={accountInfo}
          currencyType={currencyType}
        />
        <HorizontalBlockText
          title={texts?.landingInfoSection?.missionVision || 'Mission and Vision'}
          content={mission}
          orderNumber="02"
        />
      </div>
      <div className="o-projectInfoSection__progressCard">
        <ProjectProgressCard
          onClickSeeMilestones={onClickSeeMilestones}
          currency={currency}
          progressCurrentValue={progressCurrentValue}
          progressTotalValue={progressTotalValue}
          balanceCurrentValue={balanceCurrentValue}
          balanceTotalValue={balanceTotalValue}
          progressCurrentPercentage={progressCurrentPercentage}
        />
      </div>
    </div>
  );
};

ProjectInfoSection.propTypes = {
  about: PropTypes.string,
  mission: PropTypes.string,
  progressCurrentValue: PropTypes.number,
  progressTotalValue: PropTypes.number,
  balanceCurrentValue: PropTypes.number,
  balanceTotalValue: PropTypes.number,
  currency: PropTypes.string,
  onClickSeeMilestones: PropTypes.func,
  projectType: PropTypes.string,
  accountInfo: PropTypes.string,
  currencyType: PropTypes.string
};

ProjectInfoSection.defaultProps = {
  about:
    'Having spent a lot of time volunteering for different charities across East Africa since 2008, Jacqueline got inspired by the many kids she has met over the years to launch Shule. The foundation’s ultimate goal is to bring quality education to boys who are denied this fundamental human right. \n\n Many of the children she meets on the streets of Uganda are very intelligent, despite having little to no access to education due to their family’s economic status. Resulting in their potential often being unfulfilled.',
  mission:
    'Our mission is to empower families + communities through job creation. Each handwoven Yellow Leaf Hammock is created by an artisan from the hill-tribe communities of rural Thailand. \n\n By creating safe, high-wage weaving jobs, we divert families from toxic slash + burn agriculture and end the cycle of debt slavery. \n\n Good jobs empower + transform communities for generations.',
  progressCurrentValue: 0,
  progressTotalValue: 0,
  balanceCurrentValue: 0,
  balanceTotalValue: 0,
  currency: undefined,
  onClickSeeMilestones: undefined,
  projectType: '',
  accountInfo: '',
  currencyType: ''
};

HorizontalBlockText.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  orderNumber: PropTypes.number,
  projectType: PropTypes.string,
  accountInfo: PropTypes.string,
  currencyType: PropTypes.string
};

HorizontalBlockText.defaultProps = {
  title: undefined,
  content: undefined,
  orderNumber: undefined,
  projectType: '',
  accountInfo: '',
  currencyType: ''
};

HorizontalSmallBlockText.propTypes = {
  subtitle: PropTypes.string,
  content: PropTypes.string,
  icon: PropTypes.string,
  currencyType: PropTypes.string,
  hasAddress: PropTypes.string
};

HorizontalSmallBlockText.defaultProps = {
  subtitle: '',
  content: '',
  icon: '',
  currencyType: '',
  hasAddress: ''
};
