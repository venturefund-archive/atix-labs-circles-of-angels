import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router';

import Layout from '../../molecules/Layout/Layout';
import ProjectHeroSection from '../../molecules/ProjectHeroSection/ProjectHeroSection';
import { getProject } from '../../../api/projectApi';
import Loading from '../../molecules/Loading/Loading';


const getIdFromPath = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
};


const PreviewProject = () => {
    const id = getIdFromPath();
    const history = useHistory();

    const goBack = () => history.push('/');

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState({
        title: '',
        status: '',
    });

    const fetchProject = async (projectId) => {
        const response = await getProject(projectId);
        console.log('wtf im doing here hahahahha')
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
        <ProjectHeroSection
                title={title}
                status={status}
        />
      </Layout>
    )
};

export default PreviewProject;
