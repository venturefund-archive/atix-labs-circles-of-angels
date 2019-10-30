import { message } from 'antd';
import { isEmpty } from 'lodash';
import mime from 'mime-types';

export const projectCardPhotoType = 'projectCardPhoto';
export const projectCoverPhotoType = 'projectCoverPhoto';
export const projectAgreementType = 'projectAgreement';
export const projectProposalType = 'projectProposal';

// TODO this could be more abstracted and only have differents texts
export const getBlockUploadProps = type => parameters => {
  const blockUploadProps = {
    projectProposal: getProjectProposalProps(parameters),
    projectCardPhoto: getProjectCardPhotoProps(parameters),
    projectCoverPhoto: getProjectCoverPhotoProps(parameters),
    projectAgreement: getProjectAgreementProps(parameters)
  };
  return blockUploadProps[type];
};

const getProjectAgreementProps = ({
  project,
  setProjectAgreement,
  hideButton,
  isButtonHide,
  showButton,
  changeProjectFile,
  projectList
}) => ({
  subtitle: 'Project Agreement',
  text: 'Lorem ipsum text description',
  name: projectAgreementType,
  typeAccepts: '.pdf, .docx, .doc',
  buttonText: 'Upload File',
  change: info =>
    verifyFileType(
      project,
      projectList,
      info,
      setProjectAgreement,
      changeProjectFile,
      hideButton,
      projectAgreementType
    ),
  fileList: projectList,
  defaultFileList: getValidFile(project.files[projectAgreementType]),
  hideButton: isButtonHide,
  remove: info =>
    removeFromFilelist({
      projectFile: projectList,
      info,
      changeProjectFile,
      project,
      showButton,
      setProjectAgreement
    })
});

const getProjectProposalProps = ({
  project,
  setProjectProposal,
  hideButton,
  isButtonHide,
  showButton,
  changeProjectFile,
  projectList
}) => ({
  subtitle: 'Project Proposal - Upload',
  text: 'Please upload the pitch proposal document',
  name: projectProposalType,
  typeAccepts: '.pdf, .ppt, .docx, .doc',
  buttonText: 'Upload Project Proposal',
  change: info =>
    verifyFileType(
      project,
      projectList,
      info,
      setProjectProposal,
      changeProjectFile,
      hideButton,
      projectProposalType
    ),
  fileList: projectList,
  defaultFileList: getValidFile(project.files[projectProposalType]),
  hideButton: isButtonHide,
  remove: info =>
    removeFromFilelist({
      projectFile: projectList,
      info,
      changeProjectFile,
      project,
      showButton,
      setProjectProposal
    })
});

const getProjectCoverPhotoProps = ({
  project,
  setProjectCoverPhoto,
  hideButton,
  isButtonHide,
  showButton,
  changeProjectFile,
  projectList
}) => ({
  subtitle: "Project's Cover Image",
  text:
    'This will be a cover image for your project summary. Image Size: 1400x400 ',
  name: projectCoverPhotoType,
  typeAccepts: 'image/*',
  buttonText: 'Upload Image',
  change: info =>
    verifyFileType(
      project,
      projectList,
      info,
      setProjectCoverPhoto,
      changeProjectFile,
      hideButton,
      projectCoverPhotoType
    ),
  fileList: projectList,
  defaultFileList: getValidFile(project.files[projectCoverPhotoType]),
  hideButton: isButtonHide,
  remove: info =>
    removeFromFilelist({
      projectFile: projectList,
      info,
      changeProjectFile,
      project,
      showButton,
      setProjectCoverPhoto
    })
});

const getProjectCardPhotoProps = ({
  project,
  setProjectCardPhoto,
  hideButton,
  isButtonHide,
  showButton,
  changeProjectFile,
  projectList
}) => ({
  subtitle: 'Project Thumbnail Image',
  text:
    'This will allow funders to identify your project in the discovery phase Image Size: 700x400',
  name: projectCardPhotoType,
  typeAccepts: 'image/*',
  buttonText: 'Upload Image',
  change: info =>
    verifyFileType(
      project,
      projectList,
      info,
      setProjectCardPhoto,
      changeProjectFile,
      hideButton,
      projectCardPhotoType
    ),
  fileList: projectList,
  defaultFileList: getValidFile(project.files[projectCardPhotoType]),
  hideButton: isButtonHide,
  remove: info =>
    removeFromFilelist({
      projectFile: projectList,
      info,
      changeProjectFile,
      project,
      showButton,
      setProjectCardPhoto
    })
});

const getFileTypesAllowed = type => {
  const fileTypesAllowed = {
    projectProposal: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ],
    projectCardPhoto: ['image/'],
    projectCoverPhoto: ['image/'],
    projectAgreement: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf'
    ]
  };
  return fileTypesAllowed[type];
};

const removeFromFilelist = async ({
  projectFile,
  info,
  changeProjectFile,
  project,
  setInitialState,
  showButton
}) => {
  showButton(projectFile);
  setEmptyState(setInitialState);
  return changeProjectFile(project, projectFile, info.file);
};

const getValidFile = file => (!isEmpty(file) ? [file] : false);

const setEmptyState = setState => setState([]);

const isValidFileType = (fileType, fileTypesAllowed) =>
  fileTypesAllowed.reduce(
    (acum, currentType) => acum || fileType.includes(currentType),
    false
  );

const verifyFileType = async (
  project,
  projectFile,
  info,
  setState,
  changeProjectFile,
  hideButton,
  type
) => {
  if (info && info.file) {
    if (
      isValidFileType(mime.lookup(info.file.name), getFileTypesAllowed(type))
    ) {
      setState(info.file);
      hideButton(type);
      return changeProjectFile(project, projectFile, info.file);
    }
  }
  message.error(`${info.file.name} file type is invalid`);
};
