import React, { useEffect, useState } from 'react';
import EvidenceDetail from 'components/organisms/EvidenceDetail/EvidenceDetail';
import { useHistory, useParams } from 'react-router';
import { getEvidence } from 'api/activityApi';
import ProjectHeader from '../components/organisms/ProjectHeader/ProjectHeader';
import { useProject } from '../hooks/useProject';
import Loading from '../components/molecules/Loading/Loading';


export default function EvidenceDetailPage() {
  const [evidence, setEvidence] = useState({});
  const { location: { pathname } } = useHistory();
  const { detailEvidenceId, projectId } = useParams();
  const { loading, project } = useProject(projectId)

  useEffect(() => {
    const fetchEvidence = async (id) => {
      const result = await getEvidence(id)
      setEvidence(result.data)
    }

    fetchEvidence(detailEvidenceId);
  }, [detailEvidenceId, pathname]);

  if (loading) return <Loading />;

  return (
    <ProjectHeader project={project}>
      {evidence && <EvidenceDetail evidence={evidence} />}
    </ProjectHeader>
  )
}
