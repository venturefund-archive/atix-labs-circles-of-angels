import BackofficeProjects from '../../../pages/back-office-projects';
import CreateProject from '../../../pages/create-project';
import ExploreProjects from '../../../pages/explore-projects';
import MyProjects from '../../../pages/my-projects';
import FundAdministration from '../../../pages/fund-administration';
import BackOfficeUsers from '../../../pages/back-office-users';
import BackOfficeMilestones from '../../../pages/back-office-milestones';
import PasswordChange from '../../../pages/password-change';
import Landing from '../../../pages/landing/landing';
import Dao from '../../../pages/dao/dao-list';
import DaoProposalDetail from '../../../pages/dao/dao-proposal-detail';
import DaoDetail from '../../../pages/dao/dao-detail';
import Recovery from '../../../pages/recovery';
import RegisterSteps from '../../../pages/registerSteps/registersteps';
import ProjectDetail from '../../../pages/project-detail';
import Roles from '../../../constants/RolesMap';

const {
  COA_ADMIN,
  ENTREPRENEUR,
  PROJECT_SUPPORTER,
  PROJECT_CURATOR,
  BANK_OPERATOR
} = Roles;

export const routesConfig = [
  {
    path: '/',
    component: Landing,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false
  },
  {
    path: '/landing',
    component: Landing,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false
  },
  {
    path: '/recovery',
    component: Recovery,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false
  },
  {
    path: '/password-change',
    component: PasswordChange,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, PROJECT_SUPPORTER, PROJECT_CURATOR]
    }
  },
  {
    path: '/register',
    component: RegisterSteps,
    authentication: { required: false },
    withHeader: false,
    withSideBar: false
  },
  {
    path: '/explore-projects',
    component: ExploreProjects,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, PROJECT_SUPPORTER]
    }
  },
  {
    path: '/create-project',
    component: CreateProject,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR]
    }
  },
  {
    path: '/project-detail',
    component: ProjectDetail,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, PROJECT_SUPPORTER, PROJECT_CURATOR]
    }
  },
  {
    path: '/back-office-projects',
    component: BackofficeProjects,
    authentication: {
      required: true,
      roles: [PROJECT_CURATOR]
    }
  },
  {
    path: '/my-projects',
    component: MyProjects,
    authentication: {
      required: true,
      roles: [ENTREPRENEUR, PROJECT_SUPPORTER]
    }
  },
  {
    path: '/fund-administration',
    component: FundAdministration,
    authentication: {
      required: true,
      roles: [BANK_OPERATOR]
    }
  },
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
  }
];
