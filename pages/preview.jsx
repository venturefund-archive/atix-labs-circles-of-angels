import React from 'react';
import { useParams } from 'react-router';
import useQuery from 'hooks/useQuery';
import PreviewProject from '../components/organisms/PreviewProject/PreviewProject';

const Preview = () => {
  const { projectId } = useParams();
  const { preview } = useQuery();
  return <PreviewProject id={projectId} preview={Boolean(preview)} />;
};
export default Preview;
