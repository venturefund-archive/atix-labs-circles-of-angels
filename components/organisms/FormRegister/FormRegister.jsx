import React from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Upload
} from 'antd';
import './_style.scss';


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const { TextArea } = Input;


function handleChange(value) {
  console.log(`selected ${value}`);
}

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
class AngelsForm extends React.Component { state = {
  confirmDirty: false,
  autoCompleteResult: [],
};

handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values);
    }
  });
}

handleConfirmBlur = (e) => {
  const value = e.target.value;
  this.setState({ confirmDirty: this.state.confirmDirty || !!value });
}

compareToFirstPassword = (rule, value, callback) => {
  const form = this.props.form;
  if (value && value !== form.getFieldValue('password')) {
    callback('Two passwords that you enter is inconsistent!');
  } else {
    callback();
  }
}

validateToNextPassword = (rule, value, callback) => {
  const form = this.props.form;
  if (value && this.state.confirmDirty) {
    form.validateFields(['confirm'], { force: true });
  }
  callback();
}

handleWebsiteChange = (value) => {
  let autoCompleteResult;
  if (!value) {
    autoCompleteResult = [];
  } else {
    autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
  }
  this.setState({ autoCompleteResult });
}

render() {
  const { getFieldDecorator } = this.props.form;
  const { autoCompleteResult } = this.state;
  const { formLayout } = this.state;
  const formItemLayout = formLayout === 'horizontal' ? {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  } : null;
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 18,
        offset: 0,
      },
    },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  );

  const websiteOptions = autoCompleteResult.map(website => (
    <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
  ));

  return (
    <Form  layout="vertical" onSubmit={this.handleSubmit}>

<Form.Item
      >
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
        })(
          <Input placeholder="name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
        )}
      </Form.Item>
      <Form.Item
      >
        {getFieldDecorator('email', {
          rules: [{
            type: 'email', message: 'The input is not valid E-mail!',
          }, {
            required: true, message: 'Please input your E-mail!',
          }],
        })(
          <Input placeholder="mail" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
        )}
      </Form.Item>

      <Form.Item
      >
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: 'Please input your password!',
          }, {
            validator: this.validateToNextPassword,
          }],
        })(
          <Input placeholder="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  type="password" />
        )}
      </Form.Item>


      <Form.Item
      >
        {getFieldDecorator('rol', {
          rules: [{ type: 'array', required: false, message: 'Please select your rol!' }],
        })(
          <Select placeholder="Rol" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  defaultValue="1">
          <Option value="1">Funder</Option>
          <Option value="2">SE</Option>
        </Select>
        )}
      </Form.Item>


      <Form.Item
      >
        {getFieldDecorator('residence', {
          initialValue: ['zhejiang', 'hangzhou', 'xihu'],
          rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
        })(
          <Cascader placeholder="Residence" prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}   options={residences} />
        )}
      </Form.Item>

      <Form.Item
          label="ID or Passport:"
          className="Inline"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />} name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>

      <Form.Item
      >
        {getFieldDecorator('phone', {
          rules: [{ required: true, message: 'Please input your phone number!' }],
        })(
          <Input placeholder="Phone" prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} addonBefore={prefixSelector} style={{ width: '100%' }} />
        )}
      </Form.Item>
      
      <Form.Item
      className="BlockQuestions"
        label="How often do you or your firm make angel impact investments?"
      >
        {getFieldDecorator('questionone', {
          rules: [{ type: 'array', required: false, message: 'Please answer!' }],
        })(
          <Select prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  defaultValue="1">
          <Option value="1">Not yet</Option>
          <Option value="2">Less than 1 investment in the last 12 months</Option>
          <Option value="3">1 to 3 investments in the last 12 months</Option>
          <Option value="4">4-5 investments in the last 12 months</Option>
          <Option value="5">More than 5 investments in the last 12 months</Option>
          <Option value="6">I currently only do philanthropy eg: donate to charitable causes online & offline</Option>
          <Option value="7">Other</Option>
        </Select>

        )}
      </Form.Item>
      <Form.Item>
      <TextArea placeholder="Answer" rows={2} />
      </Form.Item>
      <Form.Item
      className="BlockQuestions"
        label="Are you currently an advocate/ volunteer or donor for a social cause? If yes, what are the top 3 impact areas you focus on? Please select up to 3 UN Sustainable Development Goals"
      >
        {getFieldDecorator('questiontwo', {
          rules: [{ type: 'array', required: false, message: 'Please answer!'}],
        })(
          <Select
          prefix={<Icon type="question-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={handleChange}
        >
                    <Option value="1">No poverty</Option>
          <Option value="2">Zero Hunger</Option>
          <Option value="3">Good Health and Well-Being</Option>
          <Option value="4">Quality Education</Option>
          <Option value="5">Gender Equality</Option>
          <Option value="6">Clean Water and Sanitation</Option>
          <Option value="7">Affordable and Clean Energy</Option>
          <Option value="8">Decent Work and Economic Growth</Option>
          <Option value="9"> Industry, Innovation and Infrastructure</Option>
          <Option value="10">Reduced Inequality</Option>
          <Option value="11">Sustainable Cities and Communities</Option>
          <Option value="12">Responsible Consumption and Production</Option>
          <Option value="13">Climate Action</Option>
          <Option value="14">Life Below Water</Option>
          <Option value="15">Life on Land</Option>
          <Option value="16">Peace and Justice Strong Institutions</Option>
          <Option value="17">Partnerships to Achieve the Goal</Option>
          
        </Select>,
        )}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">Create your angels account
        <Icon type="arrow-right" style={{ fontSize: '12px', color: '#fff' }} />
        </Button>
      </Form.Item>
    </Form>
  );
}
}

const FormRegister = Form.create({ name: 'AngelsForm' })(AngelsForm);

export default FormRegister;
