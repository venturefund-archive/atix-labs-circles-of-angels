import React from 'react';
import { useParams } from 'react-router';
import useQuery from 'hooks/useQuery';
import PreviewProject from '../components/organisms/PreviewProject/PreviewProject';

const Preview = () => {
  const { id } = useParams();
  const { preview } = useQuery();
  return <PreviewProject id={id} preview={Boolean(preview)} />;
};
export default Preview;
