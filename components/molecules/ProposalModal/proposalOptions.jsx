import { proposalTypes } from '../../../constants/constants';

export const options = [
  {
    name: 'newMember',
    value: 'NEW MEMBER',
    proposalType: proposalTypes.NEW_MEMBER,
    title: 'Create a New Member',
    image: '../static/images/icon-modal-01.png',
    onlySuperDAO: false
  },
  {
    name: 'newRole',
    value: 'NEW ROLE',
    proposalType: proposalTypes.ASSIGN_BANK,
    title: 'Create a New Role',
    image: '../static/images/icon-modal-02.png',
    onlySuperDAO: false
  },
  {
    name: 'newDao',
    value: 'NEW DAO',
    proposalType: proposalTypes.NEW_DAO,
    title: 'Create a New DAO',
    image: '../static/images/icon-modal-03.png',
    onlySuperDAO: true
  }
];
