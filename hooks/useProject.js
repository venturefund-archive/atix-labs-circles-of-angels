import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { getProject } from '../api/projectApi';

export const useProject = (id) => {
    const history = useHistory();
    const goBack = () => history.push('/');

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState();

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

    return { loading, project }
}