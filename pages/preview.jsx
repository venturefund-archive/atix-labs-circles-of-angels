import React from 'react';
import PreviewProject from '../components/organisms/PreviewProject/PreviewProject';

const Preview = () => {
  const pathParts = window.location.pathname.split('/');
  const id = pathParts[pathParts.length - 1];
  return (
    <PreviewProject id={id} />
  );
}
export default Preview;
