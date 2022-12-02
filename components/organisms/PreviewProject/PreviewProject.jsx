import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import Layout from '../../molecules/Layout/Layout';
import ProjectHeroSection from '../../molecules/ProjectHeroSection/ProjectHeroSection';
import { getProject } from '../../../api/projectApi';
import Loading from '../../molecules/Loading/Loading';


const PreviewProject = ({ children, id }) => {
    const history = useHistory();

    const goBack = () => history.push('/');

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState({
        title: '',
        status: '',
    });

    const fetchProject = async (projectId) => {
        const response = await getProject(projectId);
        if (response.errors || !response.data) {
            message.error('An error occurred while fetching the project');
            goBack();
            return;
        }

        const { data } = response;

        setProject({
            status: data.status,
            title: data.basicInformation.projectName,
        });

        setLoading((prevState) => !prevState)
    }

    useEffect(() => {
        fetchProject(id);

        // eslint-disable-next-line
    }, [id]);

    if (loading) return <Loading />;

    const { title, status } = project;

    return (
      <Layout>
        <ProjectHeroSection title={title} status={status} />
        {children}
      </Layout>
    )
};

export default PreviewProject;

PreviewProject.defaultProps = {
    children: <></>,
}

PreviewProject.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
}
