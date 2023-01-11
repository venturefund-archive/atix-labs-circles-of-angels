import React, { useContext, useEffect, useState, useCallback } from 'react';
import { message } from 'antd';
import { useHistory, useParams } from 'react-router';
import useQuery from 'hooks/useQuery';
import { PROJECT_STATUS_ENUM } from 'model/projectStatus';
import { getProject } from 'api/projectApi';
import { UserContext } from 'components/utils/UserContext';
import PreviewProject from '../components/organisms/PreviewProject/PreviewProject';
import { PreviewDraftProject } from 'components/organisms/PreviewDraftProject/PreviewDraftProject';

const Preview = () => {
  const { projectId } = useParams();
  const { preview } = useQuery();

  const history = useHistory();
  const { user } = useContext(UserContext);
  const isAdmin = user?.isAdmin;

  const [project, setProject] = useState({
    title: '',
    status: ''
  });
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProject = useCallback(
    async _projectId => {
      const response = await getProject(_projectId);
      if (response.errors || !response.data) {
        message.error('An error occurred while fetching the project');
        history.push('/');
        return;
      }

      const { data } = response;

      setProject(data);

      const _milestones = data?.milestones || [];
      setMilestones([..._milestones]);

      setLoading(prevState => !prevState);
    },
    [history]
  );

  useEffect(() => {
    fetchProject(projectId);
  }, [projectId, fetchProject]);

  const isProjectDraftAndNotPreview = !isAdmin & (project?.status === PROJECT_STATUS_ENUM.DRAFT);

  return isProjectDraftAndNotPreview ? (
    <PreviewDraftProject
      id={projectId}
      preview={Boolean(preview)}
      project={project}
      milestones={milestones}
      loading={loading}
      isAdmin={isAdmin}
      setLoading={setLoading}
      setMilestones={setMilestones}
    />
  ) : (
    <PreviewProject
      id={projectId}
      preview={Boolean(preview)}
      project={project}
      milestones={milestones}
      loading={loading}
      isAdmin={isAdmin}
      setLoading={setLoading}
      setMilestones={setMilestones}
    />
  );
};
export default Preview;
