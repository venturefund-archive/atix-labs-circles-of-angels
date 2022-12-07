import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useHistory, useParams } from 'react-router';
import PropTypes from 'prop-types';

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
    setMilestones([...data?.milestones]);

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

  return (
    <Layout>
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
          <ProjectInfoSection mission={mission} about={problemAddressed} />
        </div>
        <div className="o-previewProject__graphic">
          <ProjectProgressCard
            progressCurrentValue={90}
            progressTotalValue={100}
            balanceCurrentValue={90}
            balanceTotalValue={100}
          />
        </div>
        <div className="o-previewProject__members">
          <CoaProjectMembersCard
            beneficiary={beneficiaryUser}
            investor={investorUser}
            auditors={auditorsUsers}
          />
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
              current={15}
              total={100}
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
              pr
              progressBarColor="#58C984"
            />
            <CoaProjectProgressPill
              indicator="Amount Income"
              current={41.6}
              total={100}
              startBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Available Amount
                  </span>{' '}
                  $20.000
                </p>
              }
              endBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Total Amount
                  </span>{' '}
                  $48.000
                </p>
              }
              progressBarColor="#4C7FF7"
            />
            <CoaProjectProgressPill
              indicator="Amount Outcome"
              current={10}
              total={100}
              startBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Amount Spent
                  </span>{' '}
                  $4.800
                </p>
              }
              endBarContent={
                <p className="o-previewProject__progressSection__pills__normalText">
                  <span className="o-previewProject__progressSection__pills__boldText">
                    Goal Amount
                  </span>{' '}
                  $48.000
                </p>
              }
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
                withEvidences
                withStateTag
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
