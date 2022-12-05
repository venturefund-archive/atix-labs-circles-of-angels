import React from 'react';
import Layout from 'components/molecules/Layout/Layout';
import EvidenceDetail, { EvidenceTop } from 'components/organisms/EvidenceDetail/EvidenceDetail';

export default function EvidenceDetailPage() {
  return (
    <Layout>
      <EvidenceTop />
      <EvidenceDetail />
    </Layout>
  )
}
