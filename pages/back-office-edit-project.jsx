import React from 'react';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import EditProject from '../components/molecules/EditProject/EditProject';
import './_style.scss';
import './_back-office-edit-project.scss';
import { updateProject, getProject } from '../api/projectApi';
import { getPhoto } from '../api/photoApi';
import { showModalError, showModalSuccess } from '../components/utils/Modals';

class BackOfficeEditProject extends React.Component {
  static async getInitialProps({ query }) {
    const { projectId } = query;
    const response = await getProject(projectId);

    const cardPhoto = await getPhoto(response.data.cardPhoto);
    const coverPhoto = await getPhoto(response.data.coverPhoto);

    const project = {
      data: {
        faqLink: response.data.faqLink,
        goalAmount: response.data.goalAmount,
        problemAddressed: response.data.problemAddressed,
        mission: response.data.mission,
        location: response.data.location,
        projectName: response.data.projectName,
        timeframe: response.data.timeframe
      },
      files: {
        cardPhoto: cardPhoto.data,
        coverPhoto: coverPhoto.data
      }
    };

    return { project, projectId };
  }

  updateProject = async (project, coverPhoto, cardPhoto) => {
    const { projectId } = this.props;
    const response = await updateProject(
      project.data,
      coverPhoto,
      cardPhoto,
      projectId
    );

    if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? 'Error Updating Project Information'
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    } else {
      showModalSuccess('Success!', response.data.success);
    }
  };

  render() {
    const { project } = this.props;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="BackOfficeEditProject">
            <EditProject project={project} onSubmit={this.updateProject} />
          </div>
        </div>
      </div>
    );
  }
}

export default BackOfficeEditProject;
