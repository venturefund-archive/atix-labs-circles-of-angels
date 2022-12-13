import React, { useEffect, useState } from 'react';
import Layout from 'components/molecules/Layout/Layout';
import EvidenceDetail from 'components/organisms/EvidenceDetail/EvidenceDetail';
import { useHistory } from 'react-router';
import { getEvidence } from 'api/activityApi';

export default function EvidenceDetailPage() {
  const [evidence, setEvidence] = useState({});
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const evidenceId = pathname.split('/').pop()

    const fetchEvidence = async (id) => {
      const result = await getEvidence(id)
      setEvidence(result.data)
    }

    fetchEvidence(evidenceId);
  }, []);

  return (
    <Layout>
      {evidence && <EvidenceDetail evidence={evidence} />}
    </Layout>
  )
}
