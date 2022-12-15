/* eslint-disable func-names */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Upload, Icon, Input, message, Select } from 'antd';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import EvidenceNavigation from '../../atoms/EvidenceNavigation/EvidenceNavigation';

import './_style.scss';
import EvidenceFormFooter from '../../atoms/EvidenceFormFooter/EvidenceFormFooter';
import { useProject } from '../../../hooks/useProject';
import Loading from '../Loading/Loading';
import { createEvidence } from '../../../api/activityApi';
import { UserContext } from '../../utils/UserContext';
import { getProjectTransactions } from '../../../api/projectApi';

const EvidenceFormContent = ({ form }) => {
  const { Option } = Select;

  const { getFieldDecorator } = form;
  const { id } = useParams();
  const history = useHistory();
  const { project, loading } = useProject(id);
  const { user } = useContext(UserContext);

  const pathParts = window.location.pathname.split('/');

  const activityId = pathParts[3];

  const [state, setState] = useState({
    type: 'impact',
    title: '',
    description: '',
    files: [],
    transferTxHash: '',
  });
  const { type } = state;


  const [currencyType, setCurrencyType] = useState('Fiat');
  const [currency, setCurrency] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [amount, setAmount] = useState(type === 'impact' ? 0 : 1);
  const [userType, setUserType] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isIncome, setIsIncome] = useState(false);

  useEffect(() => {
    if (!loading) {
      setCurrencyType(project?.details?.currencyType.toLowerCase());
      setCurrency(project?.details?.currency);
      const { users } = project;

      const beneficiaries = users.find((item) => item.role === '1')?.users;
      const investors = users.find((item) => item.role === '2')?.users;

      const isBeneficiary = beneficiaries.some((beneficiary) => beneficiary.id === user.id);
      const isInvestor = investors.some((investor) => investor.id === user.id);
      if (isBeneficiary) {
        setUserType('beneficiary')
      }

      if (isInvestor) {
        setUserType('investor')
      }
    }
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    if (currencyType === 'crypto') {
      const getTransactions = async () => {
        const transactionType = userType === 'investor' ? 'received' : 'sent';
        const response = await getProjectTransactions(project.id, transactionType);
        if (response.errors || !response.data) {
          message.error('An error occurred while fetching the project transactions');
          return;
        }

        const transactionHashes = response.data.transactions.map((hash) => ({
          value: hash.txHash,
          label: `${hash.timestamp}/${hash.value} ${hash.tokenSymbol}`
        }))

        setTransactions(transactionHashes)
      }
      if (userType.length > 0) {
        getTransactions()
      }
    }

    // eslint-disable-next-line
  }, [userType, currencyType]);

  useEffect(() => {
    if (isAmountIncome(amount)) {
      setIsIncome(true)
    } else {
      setIsIncome(false);
    }
  }, [amount])


  const onChangeAmount = (e) => setAmount(e.currentTarget.value);

  const isAmountIncome = (amt) => amt >= 0;

  const handleFileChange = async (value) => {
    if (value?.file?.status !== 'removed') {
      const { files } = state;
      files.push(value.file);
      setState({ ...state, files })
    }
  };

  const handleFileRemove = field => {
    const { files } = state;

    const newFiles = files.filter((file) => file.uid !== field.uid);

    setState({ ...state, files: newFiles });
  };

  const onCancel = () => history.push(`/${project.id}`);


  const uploadProps = {
    name: 'files',
    accept: '.jpg,.png,.pdf',
    multiple: true,
    listType: 'text',
    beforeUpload: () => false,
    onChange: handleFileChange,
    onRemove: handleFileRemove,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    form.validateFields();
      const data = { ...state, amount };

      const response = await createEvidence(activityId, data);
      if (response.errors || !response.data) {
        message.error('An error occurred while creating evidence');
        history.push(`/${project.id}`);
      }

      if (response.status === 200) {
        history.push(`/${project.id}/activity/${activityId}/evidence`);
      }

      setButtonLoading(false);
  }

  // mock
  const onTransactionTypeChange = () => {}

  if (loading) return <Loading></Loading>;

  return (
    <>
      <div className="evidenceForm">
        <EvidenceNavigation />

        <div className="evidenceForm__body">
          <p className="evidenceForm__body__title">
            <span>Add</span>
            <span> new evidence</span>
          </p>
          <div className="evidenceForm__body__text">
            <p className='evidenceForm__body__text_top'>
              Select the type of evidence you want to upload and then complete the
              information required for the activity.
            </p>
            <p className='evidenceForm__body__text_bottom'>Activity 1: Pay 50% deposit to yarn company for cotton yarn</p>
          </div>

          <Form className='evidenceForm__body__form' onSubmit={handleSubmit}>
            <div className="evidenceForm__body__form__group">
              <div className="formDivInfo">
                <p className="formDivTitle">Evidence Type</p>
                <p className="formDIvInfo">
                  <span>Transfer:</span> related to expenses or deposits
                </p>
                <p className="formDIvInfo">
                  <span>Impact:</span> related to the progress of the activity. You
                  can upload photos, documents, etc
                </p>
              </div>
              <div className="evidenceType">
                <div className="formDivBorder">
                  <div className="customRadioDiv">
                    <input
                        type="radio"
                        name="evidenceType"
                        id=""
                        checked={type === 'transfer'}
                        value='transfer'
                        onChange={(e) => setState({ ...state, type: e.target.value })}
                    />
                    <div className="customRadio">
                      <div></div>
                    </div>
                  </div>
                  <span>Transfer</span>
                </div>
                <div className="formDivBorder">
                  <div className="customRadioDiv">
                    <input
                        type="radio"
                        name="evidenceType"
                        id=""
                        value='impact'
                        checked={type === 'impact'}
                        onChange={(e) => setState({ ...state, type: e.target.value })}
                    />
                    <div className="customRadio">
                      <div></div>
                    </div>
                  </div>
                  <span>Impact</span>
                </div>
              </div>
            </div>
            <div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Evidence Title</p>
              <div className="formDivInput itemInput">
                <Form.Item>
                  {getFieldDecorator('title', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter title',
                      },
                    ],
                  })(
                    <Input
                          name='title'
                          placeholder='Enter the title'
                          onChange={(e) => {
                            setState({
                              ...state,
                              title: e.target.value,
                            })
                          }}
                    />
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Evidence Description</p>
              <div className="formDivInput">
                <Form.Item>
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter description',
                      },
                    ],
                  })(
                    <Input.TextArea
                        name='description'
                        rows={5}
                        maxLength={500}
                        placeholder='Enter the description'
                        onChange={(e) => {
                          setState({
                            ...state,
                            description: e.target.value,
                          })
                        }}
                    />
                  )}
                </Form.Item>
              </div>
            </div>
            {(type === 'transfer') && (<div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Transaction Type</p>
              <div className="transactionType">
                <div className="formDivBorder">
                  <div className="customRadioDiv">
                    <input
                        onChange={onTransactionTypeChange}
                        checked={!isIncome}
                        type="radio"
                        name="transaction_type"
                        value='outcome'
                    />
                    <div className="customRadio">
                      <div></div>
                    </div>
                  </div>

                  <span>Outcome</span>
                </div>
                <div className="formDivBorder">
                  <div className="customRadioDiv">
                    <input
                        onChange={onTransactionTypeChange}
                        checked={isIncome}
                        type="radio"
                        name="transaction_type"
                        value='income'
                    />
                    <div className="customRadio">
                      <div></div>
                    </div>
                  </div>

                  <span>Income</span>
                </div>
              </div>
            </div>)}
            {(currencyType === 'fiat') && (type === 'transfer') && (<div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Amount Spent</p>
              <div className="formDivInput formDivAmount">
                <input
                    type="number"
                    name="amount_spent"
                    value={amount}
                    id=""
                    placeholder="Enter the amount spent"
                    disabled={type === 'impact'}
                    onChange={onChangeAmount}
                />
                <div className="formCurrency">{currency}</div>
              </div>
            </div>)}
            {(currencyType === 'crypto') && (type === 'transfer') && (<div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Select the corresponding transaction</p>
              <div className="formDivInput itemInput">
                <Form.Item>
                  {getFieldDecorator('transferTxHash', {
                    rules: [
                      {
                        required: currencyType === 'crypto',
                        message: 'Please choose the transaction hash',
                      }
                    ]
                  })(
                    <Select
                        placeholder='Select the transaction'
                        onChange={(value) => {
                          setState({
                            ...state,
                            transferTxHash: value,
                          })
                        }}
                    >
                      {transactions.map(({ value, label }) => (
                        <Option value={value} key={value}>
                          {label}
                        </Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>)}
            {(currencyType === 'fiat' || type === 'impact') && (<div className="evidenceForm__body__form__group">
              <div className="formDivInfo">
                <p className="formDivTitle">Upload Evidence Documents</p>
                <p className="formDIvInfo">Check that the evidence is legible</p>
                <p className="formDIvInfo">
                  <span>Formats:</span> PNG, JPG, PDF
                </p>
              </div>
              <div className="formDivInput">
                <div className="uploadBtnDiv">
                  <Form.Item>
                    {getFieldDecorator('files', {
                      rules: [
                        {
                          required: type === 'impact' || currencyType === 'fiat',
                          message: 'Please select the files',
                        }
                      ]
                    })(
                      <Upload {...uploadProps}>
                        <Button className="uploadBtn">
                          <Icon type="upload"/> Click to upload
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                </div>
              </div>
            </div>)}
            <div className="evidenceForm__body__form__group evidenceForm__body__form__btns">
              <Button type='button' onClick={() => onCancel()}>Cancel</Button>
              <Button loading={buttonLoading} htmlType='submit'>Add Evidence</Button>
            </div>
          </Form>
        </div>
      </div>
      <EvidenceFormFooter />
    </>
  );
}

EvidenceFormContent.defaultProps = {
  form: () => undefined,
};

EvidenceFormContent.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
}

export const EvidenceForm = Form.create({
  name: 'EvidenceForm',
})(EvidenceFormContent);
