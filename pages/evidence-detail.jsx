import React, { useEffect, useState } from 'react';
import Layout from 'components/molecules/Layout/Layout';
import EvidenceDetail from 'components/organisms/EvidenceDetail/EvidenceDetail';
import { useHistory } from 'react-router';
import { getEvidence } from 'api/activityApi';
import { getProject } from 'api/projectApi';

export default function EvidenceDetailPage() {
  const [evidence, setEvidence] = useState({});
  const [currency, setCurrency] = useState('')
  const { location: { pathname } } = useHistory();

  const getCurrency = async () => {
    const result = await getProject(pathname.split('/')[1])
    const { currency: _currency } = result.data.details
    setCurrency(_currency)
  }

  useEffect(() => {
    const evidenceId = pathname.split('/').pop()
    const fetchEvidence = async (id) => {
      const result = await getEvidence(id)
      setEvidence(result.data)
    }
    getCurrency();
    fetchEvidence(evidenceId);
  }, []);

  return (
    <Layout>
      {(evidence && currency) && <EvidenceDetail evidence={evidence} currency={currency}/>}
    </Layout>
  )
}
