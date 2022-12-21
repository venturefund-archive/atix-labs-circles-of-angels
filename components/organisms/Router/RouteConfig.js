import SecretKey from 'pages/secret-key';
import ProjectChangeLog from 'pages/project-changelog';
// import BackofficeProjects from '../../../pages/back-office-projects';
import EvidenceDetail from 'pages/evidence-detail';
import CreateProject from '../../../pages/create-project';
import MyProjects from '../../../pages/my-projects';
// import FundAdministration from '../../../pages/fund-administration';
import BackOfficeUsers from '../../../pages/back-office-users';
import BackOfficeMilestones from '../../../pages/back-office-milestones';
// import PasswordChange from '../../../pages/password-change';
// import ForgotPassword from '../../../pages/forgot-password';
import Landing from '../../../pages/landing/landing';
// import Dao from '../../../pages/dao/dao-list';
// import DaoProposalDetail from '../../../pages/dao/dao-proposal-detail';
// import DaoDetail from '../../../pages/dao/dao-detail';
// import Recovery from '../../../pages/recovery';
// import RegisterSteps from '../../../pages/registerSteps/registersteps';
// import ProjectDetail from '../../../pages/project-detail';
// import ConfirmEmail from '../../../pages/confirm-email';
import Roles from '../../../constants/RolesMap';
import Login from '../../../pages/login';
import ResetPassword from '../../../pages/reset-password';
import ChangePasswordSuccess from '../../../pages/change-password-success';
import Preview from '../../../pages/preview';
import CreateEvidence from '../../../pages/create-evidence';
import EvidencesContainer from '../../../pages/evidences';
import TermsAndConditions from '../../../pages/terms-and-conditions';

const { COA_ADMIN, ENTREPRENEUR, PROJECT_SUPPORTER, PROJECT_CURATOR, BANK_OPERATOR } = Roles;

export const routesConfig = [
  {
    path: '/',
    component: Landing,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false
  },
  {
    path: '/projects/:id/preview',
    component: Preview,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, COA_ADMIN]
    },
    withHeader: false,
    withSideBar: false
  },
  /*
  {
    path: '/landing',
    component: Landing,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false
  },
  */
  {
    path: '/:projectId/secret-key',
    component: SecretKey,
    withHeader: false,
    withSideBar: false,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, COA_ADMIN, PROJECT_SUPPORTER, PROJECT_CURATOR, BANK_OPERATOR]
    }
  },
  {
    path: '/:projectId/reset-password',
    component: ResetPassword,
    withHeader: false,
    withSideBar: false,
    authentication: {
      required: false
    }
  },
  {
    path: '/:projectId/change-password-success',
    component: ChangePasswordSuccess,
    withSideBar: false,
    authentication: {
      required: false
    }
  },
  {
    // Evidences get from the api using only the evidence id.
    // your should compact this route into
    // /evidences/:detailEvidenceId
    path: '/:projectId/activity/:activityId/evidences/:detailEvidenceId',
    component: EvidenceDetail,
    withHeader: false,
    withSideBar: false,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, COA_ADMIN, PROJECT_SUPPORTER, PROJECT_CURATOR, BANK_OPERATOR]
    }
  },
  {
    path: '/project/edit/:projectId',
    component: CreateProject,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, COA_ADMIN]
    }
  },
  /*
  {
    path: '/project-detail',
    component: ProjectDetail,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, PROJECT_SUPPORTER, PROJECT_CURATOR]
    }
  },
  */
  /*
  {
    path: '/back-office-projects',
    component: BackofficeProjects,
    authentication: {
      required: true,
      roles: [PROJECT_CURATOR, COA_ADMIN]
    }
  },
  */
  {
    path: '/my-projects',
    component: MyProjects,
    authentication: {
      required: true,
      roles: [COA_ADMIN]
    }
  },
  {
    path: '/terms-and-conditions',
    component: TermsAndConditions,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false
  },
  /*
  {
    path: '/fund-administration',
    component: FundAdministration,
    authentication: {
      required: true,
      roles: [BANK_OPERATOR]
    }
  },
  */
  {
    path: '/back-office-users',
    component: BackOfficeUsers,
    authentication: {
      required: true,
      roles: [COA_ADMIN]
    }
  },
  {
    path: '/back-office-milestones',
    component: BackOfficeMilestones,
    authentication: {
      required: true,
      roles: [BANK_OPERATOR]
    }
  },
  /*
  {
    path: '/dao-list',
    component: Dao,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, PROJECT_SUPPORTER, PROJECT_CURATOR]
    }
  },
  {
    path: '/dao-detail',
    component: DaoDetail,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, PROJECT_SUPPORTER, PROJECT_CURATOR]
    }
  },
  {
    path: '/dao-proposal-detail',
    component: DaoProposalDetail,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, PROJECT_SUPPORTER, PROJECT_CURATOR]
    }
  },
  */
  /*
  {
    path: '/confirm',
    component: ConfirmEmail,
    authentication: {
      required: false
    }
  },
  */
  {
    path: '/:projectId/login',
    component: Login,
    authentication: {
      required: false
    }
  },
  {
    path: '/:id',
    component: Preview,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false,
    withoutMainLayout: true
  },
  {
    path: '/:id/activity/:activityId/create-evidence',
    component: CreateEvidence,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR]
    },
    withHeader: false,
    withSideBar: false,
    withoutMainLayout: true
  },
  {
    path: '/:id/activity/:activityId/evidences',
    component: EvidencesContainer,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false,
    withoutMainLayout: true
  },
  {
    path: '/:id/changelog',
    component: ProjectChangeLog,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false,
    withoutMainLayout: true
  }
];
