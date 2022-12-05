import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useHistory, useParams } from 'react-router';
import PropTypes from 'prop-types';

import customConfig from 'custom-config';
import { formatCurrency, formatTimeframeValue } from 'helpers/formatter';
import Layout from '../../molecules/Layout/Layout';
import ProjectHeroSection from '../../molecules/ProjectHeroSection/ProjectHeroSection';
import { getProject } from '../../../api/projectApi';
import Loading from '../../molecules/Loading/Loading';
import { ProjectInfoSection } from '../ProjectInfoSection/ProjectInfoSection';
import './preview-project.scss';

const PreviewProject = () => {
  const { id } = useParams();
  const history = useHistory();

  const goBack = () => history.push('/');

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    title: '',
    status: ''
  });

  const fetchProject = async projectId => {
    const response = await getProject(projectId);
    if (response.errors || !response.data) {
      message.error('An error occurred while fetching the project');
      goBack();
      return;
    }

    const { data } = response;

    setProject(data);

    setLoading(prevState => !prevState);
  };

  useEffect(() => {
    fetchProject(id);

    // eslint-disable-next-line
  }, [id]);

  if (loading) return <Loading />;

  const { basicInformation, status, projectDetails } = project;
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, budget } = projectDetails || {};
  const beneficiaryFirstName = beneficiary?.firstName;
  const beneficiaryLastName = beneficiary?.lastName;
  const beneficiaryCompleteName =
    beneficiaryFirstName || beneficiaryLastName
      ? `${beneficiaryFirstName} ${beneficiaryLastName}`
      : 'No name';

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
      />
      <div className="o-previewProject__content">
        <ProjectInfoSection />
      </div>
    </Layout>
  );
};

export default PreviewProject;

PreviewProject.defaultProps = {
  children: <></>
};

PreviewProject.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired
};
