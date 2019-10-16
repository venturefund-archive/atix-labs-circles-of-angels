// /**
//  * AGPL License
//  * Circle of Angels aims to democratize social impact financing.
//  * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
//  *
//  * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
//  */

// import React from 'react';
// import RegistrationStep from './RegistrationStep';
// // import RegistrationStep from './RegistrationStep';
// // import { Form, Input, Icon, Select } from 'antd';
// // import './_style.scss';

// const RoleOption = (props) => {
//   const { role, title, image, selected, onClick } = props;
//   return (
//     <div onClick={onClick} className={ selected ? 'selected' : ''}>
//       <span>{title}</span>
//       <span>{role}</span>
//       <img src={image} />
//     </div>
//   );
// }

// const rolesProps = [
//   {
//     name: 'Social Entrepreneur',
//     title: 'Create a project',
//     image: 'fill me... with water',
//   },
//   {
//     name: 'Impact Funder',
//     title: 'Fund a project',
//     image: 'fill me... with water',
//   },
//   {
//     name: 'Oracle',
//     title: 'Monitor a project',
//     image: 'fill me... with water',
//   }
// ]

// class RoleSelection extends React.Component {
//   constructor() {
//     this.state = {
//       selectedRole: ''
//     }
//     this.selectRole = this.selectRole.bind(this);
//   }
//   selectRole(event) {
//     console.log(event)
//     this.setState({
//       selectedRole: 'bleep'
//     })
//   }
//   render() {
//     const { selectedRole } = this.state;

//     // TODO : could this be async?
//     rolesProps.forEach(roleProps => {
//       const props = {
//         selected: selectedRole === roleProps.role,
//         onClick: this.selectRole,
//         ...roleProps
//       };
//       <RoleOption { ...props } />
//     })
//     // <RoleOption 
//     //   role="Social Entrepreneur"
//     //   title="Create a project"
//     //   image="fill me... with water"
//     //   selected={ selectedRole === "Social Entrepreneur" }
//     //   onClick={ this.selectRole }
//     // />
//     // <RoleOption 
//     //   role="Impact Funder"
//     //   title="Fund a project"
//     //   image="fill me... with water"
//     //   selected={ selectedRole === "Impact Funder" }
//     // />
//     // <RoleOption 
//     //   role="Oracle"
//     //   title="Monitor a project"
//     //   image="fill me... with water"
//     //   selected={ selectedRole === "Oracle" }
//     // />
//   };
// }

// export default class RoleSelectionStep extends RegistrationStep {
//   render() {
//     return (
//       <div>
//         <RoleOption />
//         {
//           /*
//           <Form.Item>
//             {
//             getFieldDecorator(
//               'password',
//                 {
//                   rules: formRules.password
//                 }
//               )
//               (
//                 <Input
//                   placeholder="Password"
//                   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                   type="password"
//                 />
//               )
//             }
//           </Form.Item>
//           */
//         }
//       </div>
//     )

//   };
// }



// // // const FormRegister = Form.create({ name: 'AngelsForm' })(AngelsForm);
// // const PersonalInfoStep = Form.create({ name: 'PersonalInfoStep'})(PersonalInfoStep)

// // export default RoleSelectionStep;
