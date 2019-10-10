/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Input, Icon, Select } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';
import { signUpUser } from '../../../api/userApi';
import { showModalSuccess, showModalError } from '../../utils/Modals';
import Routing from '../../utils/Routes';
import PersonalInfoStep from './steps/RoleSelection';

// https://stackoverflow.com/questions/56878813/how-to-use-getfielddecorator-with-stateless-components
// const FormInput = (props) => {
//   const { }
//   const rules = formRules[name];
//   return (
//     <Form.Item>
//     {

//       getFieldDecorator(name, { rules })
//       (
//       <Input
//         placeholder="Full Name"
//         prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//       />
//     )}
//   </Form.Item>
//   )
// }

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    // console.log('aaaa', props)
    this.state = {
      currentStep: 1,
      steps: props.steps
    };
    // console.log(this.state);
  }

  componentDidMount = async () => {
    // const seQuestionnaire = await getQuestionnaire(Roles.SocialEntrepreneur);
    // const funderQuestionnaire = await getQuestionnaire(Roles.Funder);
    // this.setState({ seQuestionnaire, funderQuestionnaire });
  };

  goToLogin() {
    Routes.toLogin();
  }

  nextStep = () => {
    console.log('next step!');
    this.setCurrentStep(this.state.currentStep + 1);
  };

  setCurrentStep = next => {
    const current = this.state.currentStep;
    if (current === next) return;
    if (next < 0 || next > 4) {
      console.log('invalid step', next);
    }
    // this.setState({
    //   currentStep: next
    // });
  };

  render() {
    const props = {
      nextStep: this.nextStep,
      currentStep: this.state.currentStep

    };

    // const steps = React.Children.map(this.state.steps, (step, i) => {
    const steps = this.state.steps.map((step, i) => {
      props.isActive = (i === props.currentStep);
      // console.log(step, React.isValidElement(step));
      return React.cloneElement(step, props)
    });
    // console.log(steps);
    return (
      <div className={this.props.className}>
        { steps }
      </div>
    )
    // <RegistrationStep />
  }
}

// class AngelsForm extends React.Component {
//   handleSubmit = e => {
//     const { form, seQuestionnaire, funderQuestionnaire } = this.props;
//     e.preventDefault();
//     form.validateFields(async (err, values) => {
//       if (!err) {
//         const user = {
//           username: values.name,
//           email: values.email,
//           pwd: values.password,
//           role: values.role
//         };

//         if (values.role !== '4') {
//           let formQuestionnaire = {};
//           if (values.role === '2') {
//             formQuestionnaire = seQuestionnaire;
//             if (values.phone) {
//               user.detail = {
//                 phoneNumber: values.phone
//               };
//             }

//             if (values.company) {
//               user.detail = {
//                 ...user.detail,
//                 company: values.company
//               };
//             }
//           } else if (values.role === '3') {
//             formQuestionnaire = funderQuestionnaire;
//             if (values.phone) {
//               user.detail = {
//                 phoneNumber: values.phone
//               };
//             }
//           }

//           user.questionnaire = [];
//           formQuestionnaire.questions.forEach(question => {
//             const answers = [];

//             if (values[`question${question.id}`].length > 0) {
//               values[`question${question.id}`].forEach(answer => {
//                 const toSaveAnswer = {
//                   answer
//                 };
//                 if (values[`customAnswer${question.id}`]) {
//                   toSaveAnswer.customAnswer =
//                     values[`customAnswer${question.id}`];
//                 }
//                 answers.push(toSaveAnswer);
//               });
//             } else {
//               const toSaveAnswer = {
//                 answer: values[`question${question.id}`]
//               };
//               if (values[`customAnswer${question.id}`]) {
//                 toSaveAnswer.customAnswer =
//                   values[`customAnswer${question.id}`];
//               }
//               answers.push(toSaveAnswer);
//             }
//             user.questionnaire.push({
//               question: question.id,
//               answers
//             });
//           });
//         }

//         const response = await signUpUser(user);

//         if (!response || response.error) {
//           const { error } = response;
//           const title = error.response ? 'Error!' : error.message;
//           const content = error.response
//             ? error.response.data.error
//             : error.message;
//           showModalError(title, content);
//           return response;
//         }

//         showModalSuccess('Success!', 'User created successfully!');
//         Routing.toLogin();
//         return response;
//       }
//     });
//   };

//   render() {
//     const {
//       form,
//       seQuestionnaire,
//       funderQuestionnaire,
//       goBackHandler
//     } = this.props;
//     const { getFieldDecorator } = form;

//     const tailFormItemLayout = {
//       wrapperCol: {
//         xs: {
//           span: 24,
//           offset: 0
//         },
//         sm: {
//           span: 18,
//           offset: 0
//         }
//       }
//     };

//     const funderInformation = (
//       <span>
//         <Form.Item>
//           {getFieldDecorator('phone', {
//             rules: [
//               { required: false, message: 'Please input your phone number!' }
//             ]
//           })(
//             <Input
//               placeholder="Phone Number"
//               prefix={
//                 <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
//               }
//               style={{ width: '100%' }}
//             />
//           )}
//         </Form.Item>
//       </span>
//     );

//     const seInformation = (
//       <span>
//         <Form.Item>
//           {getFieldDecorator('phone', {
//             rules: [
//               { required: false, message: 'Please input your phone number!' }
//             ]
//           })(
//             <Input
//               placeholder="Phone Number"
//               prefix={
//                 <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
//               }
//               style={{ width: '100%' }}
//             />
//           )}
//         </Form.Item>
//         <Form.Item>
//           {getFieldDecorator('company', {
//             rules: [
//               {
//                 required: false,
//                 whitespace: true
//               }
//             ]
//           })(
//             <Input
//               placeholder="Company Name"
//               prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
//             />
//           )}
//         </Form.Item>
//       </span>
//     );

//     const questionnaireBuilder = questionnaire =>
//       questionnaire.questions.map(question => (
//         <span>
//           <Form.Item
//             className="BlockQuestions"
//             label={question.question}
//             key={question.id}
//           >
//             {getFieldDecorator(`question${question.id}`, {
//               rules: [
//                 {
//                   required: true,
//                   message: 'Please select at least one answer',
//                   type: question.answerLimit > 1 ? 'array' : 'number'
//                 },
//                 {
//                   validator: (rule, value, callback) => {
//                     if (value && question.answerLimit > 1) {
//                       if (value.length > question.answerLimit) {
//                         callback(
//                           `No more than ${question.answerLimit} answers`
//                         );
//                       } else {
//                         callback();
//                       }
//                     } else {
//                       callback();
//                     }
//                   }
//                 }
//               ]
//             })(
//               <Select
//                 prefix={
//                   <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
//                 }
//                 mode={question.answerLimit > 1 ? 'multiple' : 'default'}
//               >
//                 {question.answers.map(answer => (
//                   <Option value={answer.id} key={answer.id}>
//                     {answer.answer}
//                   </Option>
//                 ))}
//               </Select>
//             )}
//           </Form.Item>
//           {question.answerLimit === 1 &&
//             (form.getFieldValue(`question${question.id}`) === 7 ||
//               form.getFieldValue(`question${question.id}`) === 30) && (
//               <Form.Item>
//                 {getFieldDecorator(`customAnswer${question.id}`, {
//                   rules: [
//                     {
//                       required:
//                         question.answerLimit === 1 &&
//                         form.getFieldValue(`question${question.id}`) === 7,
//                       message: 'Please especify',
//                       whitespace: true
//                     }
//                   ]
//                 })(<TextArea placeholder="Answer" rows={2} />)}
//               </Form.Item>
//             )}
//         </span>
//       ));

//     return (
//       <Form layout="vertical">
//         <Form.Item>
//           {getFieldDecorator('role', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Please select your role!'
//               }
//             ]
//           })(
//             <Select
//               placeholder="Role"
//               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               initialValue="2"
//             >
//               <Option value="2">SE</Option>
//               <Option value="3">Funder</Option>
//               <Option value="4">Oracle</Option>
//             </Select>
//           )}
//         </Form.Item>

//         {form.getFieldValue('role') === '3' && funderInformation}
//         {form.getFieldValue('role') === '3' &&
//           questionnaireBuilder(funderQuestionnaire)}
//         {form.getFieldValue('role') === '2' && seInformation}
//         {form.getFieldValue('role') === '2' &&
//           questionnaireBuilder(seQuestionnaire)}

//         <Form.Item {...tailFormItemLayout}>
//           <CustomButton
//             theme="Primary"
//             buttonText="Create your angels account"
//             onClick={this.handleSubmit}
//           />
//         </Form.Item>
//         <Form.Item>
//           <CustomButton
//             theme="Cancel"
//             buttonText="Cancel"
//             onClick={goBackHandler}
//           />
//         </Form.Item>
//       </Form>
//     );
//   }
// }

// const FormRegister = Form.create({ name: 'AngelsForm' })(RegisterForm);

// export default FormRegister;
