import React, { useEffect, useState } from 'react';
import { message, Divider } from 'antd';
import { useHistory, useParams } from 'react-router';

import customConfig from 'custom-config';
import { formatCurrency, formatTimeframeValue } from 'helpers/formatter';
import { ProjectDetailsIcon } from 'components/atoms/CustomIcons/ProjectDetailsIcon';
import { MilestonesIcon } from 'components/atoms/CustomIcons/MilestonesIcon';
import { BlockchainIcon } from 'components/atoms/CustomIcons/BlockchainIcon';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import { ProjectProgressCard } from 'components/molecules/ProjectProgressCard/ProjectProgressCard';
import { CoaProjectMembersCard } from 'components/molecules/CoaProjectMembersCard/CoaProjectMembersCard';
import { CoaProjectProgressPill } from 'components/molecules/CoaProjectProgressPill/CoaProjectProgressPill';
import { getUsersByRole } from 'helpers/modules/projectUsers';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import Layout from '../../molecules/Layout/Layout';
import ProjectHeroSection from '../../molecules/ProjectHeroSection/ProjectHeroSection';
import { getProject } from '../../../api/projectApi';
import Loading from '../../molecules/Loading/Loading';
import { ProjectInfoSection } from '../ProjectInfoSection/ProjectInfoSection';
import './preview-project.scss';
import { CoaMilestoneItem } from '../CoaMilestones/CoaMilestoneItem/CoaMilestoneItem';
import { ROLES_IDS } from '../AssignProjectUsers/constants';

const ACTIVITY_STATUS = {
  NEW: 'new',
  TO_REVIEW: 'to-review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in-progress'
};

const MILESTONE_STATUS = {
  NEW: 'new',
  APPROVED: 'approved',
  IN_PROGRESS: 'in-progress'
};

const getMilestoneStatus = (activities = []) => {
  const areaAllActivitiesNew = activities?.every(
    activity => activity?.status === ACTIVITY_STATUS.NEW
  );
  if (areaAllActivitiesNew) return MILESTONE_STATUS.NEW;
  const areAllActivitiesApproved = activities?.every(
    activity => activity?.status === ACTIVITY_STATUS.APPROVED
  );
  if (areAllActivitiesApproved) return MILESTONE_STATUS.APPROVED;
  return MILESTONE_STATUS.IN_PROGRESS;
};

const PreviewProject = () => {
  const { id } = useParams();
  const history = useHistory();

  const goBack = () => history.push('/');

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    title: '',
    status: ''
  });
  const [milestones, setMilestones] = useState([]);

  const fetchProject = async projectId => {
    const response = await getProject(projectId);
    if (response.errors || !response.data) {
      message.error('An error occurred while fetching the project');
      goBack();
      return;
    }

    const { data } = response;

    setProject(data);

    let _milestones = [...data?.milestones];
    _milestones = _milestones.map(milestone => {
      const milestoneStatus = getMilestoneStatus(milestone?.activities);
      return { ...milestone, status: milestoneStatus };
    });

    setMilestones(_milestones);

    setLoading(prevState => !prevState);
  };

  useEffect(() => {
    fetchProject(id);

    // eslint-disable-next-line
  }, [id]);

  if (loading) return <Loading />;

  const { basicInformation, status, details, users, budget } = project;
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, problemAddressed, mission, legalAgreementFile, projectProposalFile } =
    details || {};
  const beneficiaryFirstName = beneficiary?.firstName;
  const beneficiaryLastName = beneficiary?.lastName;
  const beneficiaryCompleteName =
    beneficiaryFirstName || beneficiaryLastName
      ? `${beneficiaryFirstName} ${beneficiaryLastName}`
      : 'No name';
  const beneficiaryUser = getUsersByRole(ROLES_IDS.beneficiary, users)?.[0];
  const investorUser = getUsersByRole(ROLES_IDS.investor, users)?.[0];
  const auditorsUsers = getUsersByRole(ROLES_IDS.auditor, users);

  const toggleAreActivitiesOpened = milestoneId => {
    const _milestones = [...milestones];
    const milestoneFound = _milestones.find(milestone => milestone?.id === milestoneId);
    milestoneFound.areActivitiesOpen = !milestoneFound.areActivitiesOpen;
    setMilestones(_milestones);
  };

  const totalMilestonesQuantity = milestones?.length;
  const approvedMilestonesQuantity = milestones?.filter(
    milestone => milestone?.status === MILESTONE_STATUS.APPROVED
  );

  const totalCurrentDeposited = milestones?.reduce((prev, curr) => prev + curr?.deposited, 0);
  const totalCurrentSpent = milestones?.reduce((prev, curr) => prev + curr?.spent, 0);

  return (
    <Layout hasBackgroundImage>
      <ProjectHeroSection
        title={projectName}
        status={status}
        subtitle={customConfig.NAME}
        country={location}
        beneficiary={beneficiaryCompleteName}
        timeframe={formatTimeframeValue(timeframe, timeframeUnit)}
        budget={formatCurrency(currency, budget)}
        thumbnailPhoto={thumbnailPhoto}
        legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
        projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
      />
      <div className="o-previewProject__content">
        <div className="o-previewProject__buttons">
          <CoaButton shape="round" className="o-previewProject__buttons__button">
            <ProjectDetailsIcon /> Project Details
          </CoaButton>
          <CoaButton shape="round" className="o-previewProject__buttons__button">
            <MilestonesIcon /> Milestones
          </CoaButton>
          <CoaButton shape="round" className="o-previewProject__buttons__button">
            <BlockchainIcon /> Blockchain History
          </CoaButton>
        </div>
        <div className="o-previewProject__infoSection">
          <ProjectInfoSection
            mission={mission}
            about={problemAddressed}
            progressCurrentValue={approvedMilestonesQuantity}
            progressTotalValue={totalMilestonesQuantity}
            balanceCurrentValue={totalCurrentSpent}
            balanceTotalValue={budget}
            currency={currency}
          />
        </div>
        <div className="o-previewProject__members">
          {/* <CoaProjectMembersCard
            beneficiary={beneficiaryUser}
            investor={investorUser}
            auditors={auditorsUsers}
          /> */}
        </div>
        <div className="o-previewProject__progressSection">
          <TitlePage
            underlinePosition="none"
            textTitle="Project Progress"
            className="o-previewProject__title"
            textColor="#4C7FF7"
          />
          <div className="o-previewProject__progressSection__pills">
            <CoaProjectProgressPill
              indicator="Milestones Progress"
              current={approvedMilestonesQuantity}
              total={totalMilestonesQuantity}
              startBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  Project{' '}
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Started
                  </span>
                </p>
              }
              endBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  Project{' '}
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Finished !
                  </span>
                </p>
              }
              progressBarColor="#58C984"
              barColor="#DEF4E6"
            />
            <Divider
              type="horizontal"
              className="o-previewProject__progressSection__pills__divider"
            />
            <CoaProjectProgressPill
              indicator="Amount Income"
              current={totalCurrentDeposited}
              total={budget}
              startBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Available Amount
                  </span>{' '}
                  <span className="o-previewProject__progressSection__pills__currentAmount">
                    {formatCurrency(currency, totalCurrentDeposited)}
                  </span>
                </p>
              }
              endBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Total Amount
                  </span>{' '}
                  <span className="o-previewProject__progressSection__pills__targetAmount">
                    {formatCurrency(currency, budget)}
                  </span>
                </p>
              }
              progressBarColor="#4C7FF7"
              barColor="#C1DCE9"
            />
            <Divider
              type="horizontal"
              className="o-previewProject__progressSection__pills__divider"
            />
            <CoaProjectProgressPill
              indicator="Amount Outcome"
              current={totalCurrentSpent}
              total={budget}
              startBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Amount Spent
                  </span>{' '}
                  <span className="o-previewProject__progressSection__pills__currentAmount">
                    {formatCurrency(currency, totalCurrentSpent)}
                  </span>
                </p>
              }
              endBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Goal Amount
                  </span>{' '}
                  <span className="o-previewProject__progressSection__pills__targetAmount">
                    {formatCurrency(currency, budget)}
                  </span>
                </p>
              }
              barColor="#EAECEF"
            />
          </div>
        </div>
        <div className="o-previewProject__milestonesSection">
          <TitlePage
            underlinePosition="none"
            textTitle="Milestones"
            className="o-previewProject__title"
            textColor="#4C7FF7"
          />
          <div className="o-previewProject__milestonesSection__milestones">
            {milestones.map((milestone, index) => (
              <CoaMilestoneItem
                projectId={project?.id}
                withEvidences
                withStatusTag
                toggleAreActivitiesOpened={toggleAreActivitiesOpened}
                {...{
                  currency,
                  milestone
                }}
                {...{ milestoneNumber: index + 1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PreviewProject;
