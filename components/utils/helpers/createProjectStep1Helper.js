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

const getProjectProposalProps = ({
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
  name: projectCoverAgreementType,
  typeAccepts: '.pdf, .docx, .doc',
  buttonText: 'Upload File',
  change: info =>
    verifyFileType(projectCoverAgreementType)(
      project,
      projectList,
      info,
      setProjectAgreement,
      changeProjectFile,
      hideButton
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
  setProjectCoverPhoto,
  hideButton,
  isButtonHide,
  showButton,
  changeProjectFile,
  projectList
}) => ({
  subtitle: 'Project Proposal - Upload',
  text: 'Please upload the pitch proposal document',
  name: projectCoverPhotoType,
  typeAccepts: '.pdf, .ppt, .docx, .doc',
  buttonText: 'Upload Project Proposal',
  change: info =>
    verifyFileType(projectCoverPhotoType)(
      project,
      projectList,
      info,
      setProjectCoverPhoto,
      changeProjectFile,
      hideButton
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
    verifyFileType(projectCoverPhotoType)(
      project,
      projectList,
      info,
      setProjectCoverPhoto,
      changeProjectFile,
      hideButton
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
      hideButton
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


const fileTypeProcesor = type => {
  const procesors = {
    projectProposal: getProcesor(projectProposalType)(parameters),
    projectCardPhoto: getProcesor(projectCardPhotoType)(parameters),
    projectCoverPhoto: getProcesor(projectCoverPhotoType)(parameters),
    projectAgreement: getProcesor(projectAgreementType)(parameters)
  };
  return procesors[type](type);
};

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

const removeFromFilelist = ({
  projectFile,
  info,
  changeProjectFile,
  project,
  setInitialState,
  showButton
}) => {
  showButton(projectFile);
  setEmptyState(setInitialState);
  return changeProjectFile(project, projectFile, info);
};

const getValidFile = file => (!isEmpty(file) ? [file] : false);

const setEmptyState = setState => setState([]);

const getProcesor = type => (
  setState,
  hideButton,
  changeProjectFile,
  project,
  info,
  fileType,
  projectFile
) => {
  if (getFileTypesAllowed(type).includes(fileType)) {
    setState(info.file);
    hideButton(type);
    return changeProjectFile(project, projectFile, info.file);
  }
};

const verifyFileType = type => async (
  project,
  projectFile,
  info,
  setState,
  changeProjectFile,
  hideButton
) => {
  if (info && info.file) {
    const fileTypeProcesorResult = fileTypeProcesor(type)({
      project,
      projectFile,
      info,
      fileType: mime.lookup(info.file.name),
      changeProjectFile,
      hideButton,
      setState
    });
    if (fileTypeProcesorResult) return fileTypeProcesorResult;
    message.error(`${info.file.name} file type is invalid`);
  }
};
