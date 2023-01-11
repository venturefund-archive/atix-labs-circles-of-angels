import React from 'react';
import Navbar from 'components/atoms/Navbar/Navbar';

export const LandingDraftLayout = props => {
  const {
    children,
    header,
    thumbnailPhoto,
    disappearHeaderInMobile,
    headerAnimation,
    showPreviewAlert,
    showEditingAlert,
    project
  } = props;
  return (
    <div className="landingDraftLayout">
      <Navbar project={project} />
    </div>
  );
};
