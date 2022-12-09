import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import { message } from 'antd';
import { getProject } from '../../../api/projectApi';
import Loading from '../../molecules/Loading/Loading';
import Layout from '../../molecules/Layout/Layout';
import ProjectHeroSection from '../../molecules/ProjectHeroSection/ProjectHeroSection';
import customConfig from '../../../custom-config';
import { formatCurrency, formatTimeframeValue } from '../../../helpers/formatter';

const ProjectHeader = ({ children, id }) => {
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

    const { basicInformation, status, details, budget } = project;
    const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
    const { currency, legalAgreementFile, projectProposalFile } =
    details || {};
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
                legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
                projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
        />
          {children}
      </Layout>
    );
}

export default ProjectHeader;

ProjectHeader.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
};
