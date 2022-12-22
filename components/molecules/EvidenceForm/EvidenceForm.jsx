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
import GoBackButton from 'components/atoms/GoBackButton/GoBackButton';

import './_style.scss';
import classNames from 'classnames';
import Breadcrumb from 'components/atoms/BreadCrumb/BreadCrumb';
import { useProject } from '../../../hooks/useProject';
import Loading from '../Loading/Loading';
import { createEvidence } from '../../../api/activityApi';
import { UserContext } from '../../utils/UserContext';
import { getProjectTransactions } from '../../../api/projectApi';
import { EvidenceContext } from '../../utils/EvidenceContext';


const CURRENCY_TYPE_ENUM = { FIAT: 'fiat', CRYPTO: 'crypto' };
const transactionQueryParam = {
  income: 'received',
  outcome: 'sent'
}

const EvidenceFormContent = (props) => {
  const { form, breadCrumbPath } = props;

  const { Option } = Select;

  const { getFieldDecorator } = form;
  const { projectId, activityId } = useParams();
  const history = useHistory();
  const { project, loading } = useProject(projectId);
  const { user } = useContext(UserContext);
  const { setMessage } = useContext(EvidenceContext);

  const [state, setState] = useState({
    type: 'impact',
    title: '',
    description: '',
    files: [],
    transferTxHash: '',
  });
  const { type } = state;


  const [currencyType, setCurrencyType] = useState(CURRENCY_TYPE_ENUM.FIAT);
  const [currency, setCurrency] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [amount, setAmount] = useState(type === 'impact' ? 0 : 1);
  const [userType, setUserType] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState('outcome');

  const getTransactions = async (_transactionType) => {
    const _transactionQueryParam = transactionQueryParam[_transactionType];
    if(!_transactionQueryParam) return message.error('An error occurred while fetching the project transactions');

    const response = await getProjectTransactions(project.id, _transactionQueryParam);
    if (response.errors || !response.data) {
      message.error('An error occurred while fetching the project transactions');
      return;
    }

    const transactionHashes = response.data.transactions.map((hash) => ({
      txHash: hash.txHash,
      value: hash.value,
      label: `${_transactionType}: ${hash.timestamp}/${hash.value} ${hash.tokenSymbol}`
    }))

    setTransactions(transactionHashes);
  }

  useEffect(() => {
    if (!loading) {
      setCurrencyType(project?.details?.currencyType.toLowerCase());
      setCurrency(project?.details?.currency);
      const { users } = project;

      const beneficiaries = users.find((item) => item.role === '1')?.users;
      const investors = users.find((item) => item.role === '2')?.users;

      const isBeneficiary = beneficiaries.some((beneficiary) => beneficiary.id === user.id);
      const isInvestor = investors.some((investor) => investor.id === user.id);
      if (!isBeneficiary &&!isInvestor) {
        message.error('User is not a beneficiary or founder of the project');
        history.push(`/${project.id}`)
      }

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
    if (currencyType === CURRENCY_TYPE_ENUM.CRYPTO) {
      getTransactions(transactionType);
    }

    // eslint-disable-next-line
  }, [currencyType]);


  const onChangeAmount = (e) => setAmount(e.currentTarget.value);

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
    const fieldErrors = form.getFieldsError();
    const isThereAnyError = Object.values(fieldErrors).some(err=> !!err);

    if(isThereAnyError) {
      setButtonLoading(false);
      return;
    };

    // outcome amount is designated with negative
    const newAmount = transactionType === 'outcome' ? -amount : amount;
    const data = { ...state, amount: newAmount };

    const response = await createEvidence(activityId, data);
    if (response.errors || !response.data) {
      message.error('An error occurred while creating evidence');
      history.push(`/${project.id}`);
    }

    if (response.status === 200) {
      setMessage('The evidence has been created successfully.');
      history.push(`/${project.id}/activity/${activityId}/evidences`);
    }

    setButtonLoading(false);
  }

  if (loading) return <Loading></Loading>;

  return (
    <div className="evidenceForm">
      <GoBackButton goBackTo={() => history.goBack()} />
      <Breadcrumb route={breadCrumbPath} />
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
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          setTransactionType(inputValue);
                          getTransactions(inputValue);
                        }}
                        checked={transactionType === 'outcome'}
                        type='radio'
                        name='transactionType'
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
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          setTransactionType(inputValue);
                          getTransactions(inputValue);
                        }}
                        checked={transactionType === 'income'}
                        type="radio"
                        name="transactionType"
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
          {(currencyType === CURRENCY_TYPE_ENUM.CRYPTO) && (type === 'transfer') && (<div className="evidenceForm__body__form__group">
            <p className="formDivTitle formDivInfo">Select the corresponding transaction</p>
            <div className="formDivInput itemInput">
              <Form.Item>
                {getFieldDecorator('transferTxHash', {
                    rules: [
                      {
                        required: currencyType === CURRENCY_TYPE_ENUM.CRYPTO,
                        message: 'Please choose the transaction hash',
                      }
                    ]
                  })(
                    <Select
                        placeholder='Select the transaction'
                        onChange={(txHash) => {
                          setAmount(transactions.find(item => item.txHash ===txHash)?.value || 0);
                          setState({
                            ...state,
                            transferTxHash: txHash,
                          });
                        }}
                    >
                      {transactions.map(({ txHash, label }) => (
                        <Option value={txHash} key={txHash}>
                          {label}
                        </Option>
                        ))}
                    </Select>
                  )}
              </Form.Item>
            </div>
            </div>)}
          {(type === 'transfer') && (<div className="evidenceForm__body__form__group">
            <p className="formDivTitle formDivInfo">Amount Spent</p>
            <div className="formDivInput formDivAmount">
              <input
                    type='number'
                    name='amount'
                    value={amount}
                    placeholder='Enter the amount spent'
                    onChange={onChangeAmount}
                    disabled={currencyType === CURRENCY_TYPE_ENUM.CRYPTO}
                    className={classNames({ 'formCurrencyValue': currencyType === CURRENCY_TYPE_ENUM.CRYPTO })}
              />
              <div className="formCurrency">{currency}</div>
            </div>
            </div>)}
          {(currencyType === CURRENCY_TYPE_ENUM.FIAT || type === 'impact') && (<div className="evidenceForm__body__form__group">
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
                          required: type === 'impact' || currencyType === CURRENCY_TYPE_ENUM.FIAT,
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
  );
}

EvidenceFormContent.defaultProps = {
  form: () => undefined,
  breadCrumbPath: '',
};

EvidenceFormContent.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  breadCrumbPath: PropTypes.string,
}

export const EvidenceForm = Form.create({
  name: 'EvidenceForm',
})(EvidenceFormContent);
