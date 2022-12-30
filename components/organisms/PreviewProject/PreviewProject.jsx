import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { message, Divider } from 'antd';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from 'components/utils/UserContext';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import customConfig from 'custom-config';
import { formatCurrency, formatTimeframeValue } from 'helpers/formatter';
import { ProjectDetailsIcon } from 'components/atoms/CustomIcons/ProjectDetailsIcon';
import { MilestonesIcon } from 'components/atoms/CustomIcons/MilestonesIcon';
import { BlockchainIcon } from 'components/atoms/CustomIcons/BlockchainIcon';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import { CoaProjectMembersCard } from 'components/molecules/CoaProjectMembersCard/CoaProjectMembersCard';
import { CoaProjectProgressPill } from 'components/molecules/CoaProjectProgressPill/CoaProjectProgressPill';
import { getUsersByRole } from 'helpers/modules/projectUsers';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { scrollToTargetAdjusted } from 'components/utils';
import { PROJECT_STATUS_ENUM } from 'model/projectStatus';
import { MILESTONE_STATUS_ENUM } from 'model/milestoneStatus';
import { LandingLayout } from 'components/Layouts/LandingLayout/LandingLayout';
import ProjectHeroSection from '../../molecules/ProjectHeroSection/ProjectHeroSection';
import { getProject, cloneProject } from '../../../api/projectApi';
import Loading from '../../molecules/Loading/Loading';
import { ProjectInfoSection } from '../ProjectInfoSection/ProjectInfoSection';
import './preview-project.scss';
import { CoaMilestoneItem } from '../CoaMilestones/CoaMilestoneItem/CoaMilestoneItem';
import { ROLES_IDS } from '../AssignProjectUsers/constants';
import { canAddEvidences } from '../../../helpers/canAddEvidence';
import { checkIsBeneficiaryOrInvestorByProject } from '../../../helpers/roles';
import { CoaChangelogContainer } from '../CoaChangelogContainer/CoaChangelogContainer';

const PreviewProject = ({ id, preview }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { texts } = useContext(DictionaryContext);

  const goBack = () => history.push('/');

  const isAdmin = user?.isAdmin;

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

    const _milestones = data?.milestones || [];
    setMilestones([..._milestones]);

    setLoading(prevState => !prevState);
  };

  useEffect(() => {
    fetchProject(id);

    // eslint-disable-next-line
  }, [id]);

  const { basicInformation, status, details, users, budget, editing, cloneId } = project;
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, problemAddressed, mission, legalAgreementFile, projectProposalFile } =
    details || {};
  const beneficiaryFirstName = beneficiary?.firstName;
  const beneficiaryLastName = beneficiary?.lastName;
  const beneficiaryCompleteName =
    beneficiaryFirstName || beneficiaryLastName
      ? `${beneficiaryFirstName} ${beneficiaryLastName}`
      : texts?.general?.noName || 'No name';
  const beneficiaryUser = getUsersByRole(ROLES_IDS.beneficiary, users)?.map(usr => ({
    ...usr,
    rol: texts?.roles?.beneficiary || 'Beneficiary'
  }))[0];
  const investorUser = getUsersByRole(ROLES_IDS.investor, users)?.map(usr => ({
    ...usr,
    rol: texts?.roles?.investor || 'Investor'
  }))[0];
  const auditorsUsers =
    getUsersByRole(ROLES_IDS.auditor, users)?.map(usr => ({
      ...usr,
      rol: texts?.roles?.auditor || 'Auditor'
    })) || [];
  const members = [beneficiaryUser, investorUser, ...auditorsUsers];

  const toggleAreActivitiesOpened = milestoneId => {
    const _milestones = [...milestones];
    const milestoneFound = _milestones.find(milestone => milestone?.id === milestoneId);
    milestoneFound.areActivitiesOpen = !milestoneFound.areActivitiesOpen;
    setMilestones(_milestones);
  };

  const totalMilestonesQuantity = milestones?.length;
  const approvedMilestonesQuantity = milestones?.filter(
    milestone => milestone?.status === MILESTONE_STATUS_ENUM.APPROVED
  )?.length;

  const totalCurrentDeposited = milestones?.reduce(
    (prev, curr) => prev + parseFloat?.(curr?.deposited),
    0
  );
  const totalCurrentSpent = milestones?.reduce((prev, curr) => prev + parseFloat?.(curr?.spent), 0);

  const isBeneficiaryOrInvestor = checkIsBeneficiaryOrInvestorByProject({ user, project });
  const isPublishedOrInProgressProject = [
    PROJECT_STATUS_ENUM.PUBLISHED,
    PROJECT_STATUS_ENUM.IN_PROGRESS
  ].includes(status);

  const handleRequestChanges = async e => {
    e.preventDefault();
    if (editing) {
      return history.push(`/project/edit/${cloneId}`);
    }
    setLoading(true);
    const response = await cloneProject(id);
    setLoading(false);
    if (response.error || !response.data) {
      return message.error('An error occurred while fetching the project');
    }
    const _cloneId = await response.data.projectId;
    return history.push(`/project/edit/${_cloneId}`);
  };

  if (loading) return <Loading />;

  const isACloneBeingEdited = project?.editing || project?.revision !== 1;

  return (
    <LandingLayout
      project={project}
      showPreviewAlert={
        isACloneBeingEdited ? preview && isBeneficiaryOrInvestor : preview && isAdmin
      }
      projectId={project?.id}
      header={
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
          onClickProgressButton={() => scrollToTargetAdjusted('project-progress', 70)}
          blockchainHistoryUrl={`${id}/changelog`}
        />
      }
      thumbnailPhoto={thumbnailPhoto}
    >
      {(isAdmin || status !== PROJECT_STATUS_ENUM.DRAFT) && (
        <div className="o-previewProject__content">
          { editing &&
            <div className='o-previewProject__alertEditedProject'>
              This project is being edited.
              The project is not enable until the edition is finished
            </div>
          }
          <div className="o-previewProject__buttons__container">
            <div className="o-previewProject__buttons">
              <CoaButton
                shape="round"
                className="o-previewProject__buttons__button"
                onClick={() => scrollToTargetAdjusted('project-progress', 70)}
              >
                <ProjectDetailsIcon /> {texts?.general?.projectProgress || 'Project Progress'}
              </CoaButton>
              <CoaButton
                shape="round"
                className="o-previewProject__buttons__button"
                onClick={() => scrollToTargetAdjusted('milestones', 70)}
              >
                <MilestonesIcon /> {texts?.landingSubheader?.btnMilestones || 'Milestones'}
              </CoaButton>
              <Link to={`${id}/changelog`} className="o-previewProject__buttons__buttonContainer">
                <CoaButton shape="round" className="o-previewProject__buttons__button">
                  <BlockchainIcon />{' '}
                  {texts?.landingSubheader?.btnChangelog || 'Blockchain Changelog'}
                </CoaButton>
              </Link>
            </div>
            {isBeneficiaryOrInvestor && isPublishedOrInProgressProject && (
              <CoaButton
                type="primary"
                onClick={handleRequestChanges}
                className="o-previewProject__buttons__requestChanges"
              >
                {texts?.landingSubheader?.btnRequestChanges || 'Request changes'}
              </CoaButton>
            )}
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
              onClickSeeMilestones={() => scrollToTargetAdjusted('milestones', 70)}
            />
          </div>
          <div className="o-previewProject__members">
            <TitlePage
              underlinePosition="none"
              textTitle={texts?.landingProjectMembers?.title || 'Project Members'}
              className="o-previewProject__title"
              textColor="#4C7FF7"
            />
            <div className="o-previewProject__members__container">
              {members.map(member => (
                <CoaProjectMembersCard {...member} />
              ))}
            </div>
          </div>
          <div className="o-previewProject__progressSection" id="project-progress">
            <TitlePage
              underlinePosition="none"
              textTitle={texts?.general?.projectProgress || 'Project Progress'}
              className="o-previewProject__title"
              textColor="#4C7FF7"
            />
            <div className="o-previewProject__progressSection__pills">
              <CoaProjectProgressPill
                indicator={texts?.landingProjectProgress?.milestone || 'Milestones Progress'}
                current={approvedMilestonesQuantity}
                total={totalMilestonesQuantity}
                startBarContent={
                  <p className="o-previewProject__progressSection__pills__normalText">
                    {texts?.landingProjectProgress?.project || 'Project'}{' '}
                    <span className="o-previewProject__progressSection__pills__boldText">
                      {texts?.landingProjectProgress?.started || 'Started'}
                    </span>
                  </p>
                }
                endBarContent={
                  <p className="o-previewProject__progressSection__pills__normalText">
                    {texts?.landingProjectProgress?.project || 'Project'}{' '}
                    <span className="o-previewProject__progressSection__pills__boldText">
                      {texts?.landingProjectProgress?.finished || 'Finished!'}
                    </span>
                  </p>
                }
                progressBarColor="#58C984"
              />
              <Divider
                type="horizontal"
                className="o-previewProject__progressSection__pills__divider"
              />
              <CoaProjectProgressPill
                indicator={texts?.landingProjectProgress?.milestone || 'Amount Income'}
                current={totalCurrentDeposited}
                total={budget}
                startBarContent={
                  <p className="o-previewProject__progressSection__pills__normalText">
                    <span className="o-previewProject__progressSection__pills__boldText">
                      {texts?.landingProjectProgress?.available || 'Available Amount'}
                    </span>{' '}
                    <span className="o-previewProject__progressSection__pills__currentAmount">
                      {formatCurrency(currency, totalCurrentDeposited)}
                    </span>
                  </p>
                }
                endBarContent={
                  <p className="o-previewProject__progressSection__pills__normalText">
                    <span className="o-previewProject__progressSection__pills__boldText">
                      {texts?.landingProjectProgress?.total || 'Total Amount'}
                    </span>{' '}
                    <span className="o-previewProject__progressSection__pills__targetAmount">
                      {formatCurrency(currency, budget)}
                    </span>
                  </p>
                }
                progressBarColor="#4C7FF7"
              />
              <Divider
                type="horizontal"
                className="o-previewProject__progressSection__pills__divider"
              />
              <CoaProjectProgressPill
                indicator={texts?.landingProjectProgress?.outcome || 'Amount Outcome'}
                current={totalCurrentSpent}
                total={budget}
                startBarContent={
                  <p className="o-previewProject__progressSection__pills__normalText">
                    <span className="o-previewProject__progressSection__pills__boldText">
                      {texts?.landingProjectProgress?.spent || 'Amount Spent'}
                    </span>{' '}
                    <span className="o-previewProject__progressSection__pills__currentAmount">
                      {formatCurrency(currency, totalCurrentSpent)}
                    </span>
                  </p>
                }
                endBarContent={
                  <p className="o-previewProject__progressSection__pills__normalText">
                    <span className="o-previewProject__progressSection__pills__boldText">
                      {texts?.landingProjectProgress?.goal || 'Goal Amount'}
                    </span>{' '}
                    <span className="o-previewProject__progressSection__pills__targetAmount">
                      {formatCurrency(currency, budget)}
                    </span>
                  </p>
                }
                progressBarColor="#26385B"
              />
            </div>
          </div>
          <div className="o-previewProject__milestonesSection" id="milestones">
            <TitlePage
              underlinePosition="none"
              textTitle={texts?.landingMilestones?.title || 'Milestones'}
              className="o-previewProject__title"
              textColor="#4C7FF7"
            />
            <div className="o-previewProject__milestonesSection__milestones">
              {milestones.map((milestone, index) => (
                <CoaMilestoneItem
                  isProjectEditing={editing}
                  canAddEvidences={canAddEvidences(user, id)}
                  projectId={id}
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
          <div className="o-previewProject__changelogSection">
            <TitlePage
              underlinePosition="none"
              textTitle={texts?.changelog?.title || 'Project Changelog'}
              className="o-previewProject__title"
              textColor="#4C7FF7"
            />
            <CoaChangelogContainer
              title={texts?.changelog?.title || 'Project Changelog'}
              projectId={id}
              currency={currency}
            />
          </div>
        </div>
      )}
    </LandingLayout>
  );
};

PreviewProject.propTypes = {
  id: PropTypes.string,
  preview: PropTypes.bool
};

PreviewProject.defaultProps = {
  id: undefined,
  preview: false
};

export default PreviewProject;
