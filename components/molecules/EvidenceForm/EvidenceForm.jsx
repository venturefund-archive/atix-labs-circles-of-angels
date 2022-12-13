/* eslint-disable func-names */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState } from 'react';
import { Form, Button, Upload, Icon, Input } from 'antd';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import EvidenceNavigation from '../../atoms/EvidenceNavigation/EvidenceNavigation';

import './_style.scss';
import EvidenceFormFooter from '../../atoms/EvidenceFormFooter/EvidenceFormFooter';
import { useProject } from '../../../hooks/useProject';
import Loading from '../Loading/Loading';
import { CoaFormItemSelect } from '../CoaFormItems/CoaFormItemSelect/CoaFormItemSelect';
import { createEvidence } from '../../../api/activityApi';

const EvidenceFormContent = ({ form }) => {
  const { getFieldDecorator } = form;
  const { id } = useParams();
  const history = useHistory();
  const { project, loading } = useProject(id);

  const pathParts = window.location.pathname.split('/');

  const activityId = pathParts[3];

  const [state, setState] = useState({
    type: 'impact',
    title: '',
    description: '',
    files: [],
  });
  const { type } = state;


  const [currencyType, setCurrencyType] = useState('Fiat');
  const [currency, setCurrency] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [amount, setAmount] = useState(type === 'impact' ? 0 : 1);

  useEffect(() => {
    if (!loading) {
      setCurrencyType(project?.details?.currencyType.toLowerCase());
      setCurrency(project.details.currency);
    }
    // eslint-disable-next-line
  }, [loading]);


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
    // TODO: get transactionHash
    if (currencyType === 'crypto') {
      data.transferTxHash = 'addjddjdjdjk'
    }

<<<<<<< HEAD
      const response = await createEvidence(activityId, data);
      if (response.status === 200) {
        history.push(`/${project.id}/activity/${activityId}/evidence`);
      }
=======
    const response = await createEvidence(activityId, data);
    if (response.status === 200) {
      history.push(`/${project.id}/activity/${activityId}/evidence`)
    }
>>>>>>> 1a3d6733 (feat/evidence-api: files)

    setButtonLoading(false);
  }

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
<<<<<<< HEAD
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
=======
                <CoaFormItemInput
                  withErrorFeedback
                  name="title"
                  form={form}
                  fieldDecoratorOptions={{
                    rules: [
                      {
                        required: true,
                        message: ERROR_TYPES.EMPTY,
                        whitespace: true
                      },
                      {
                        pattern: onlyAlphanumerics,
                        message: ERROR_TYPES.ALPHANUMERIC
                      }
                    ],
                    validateTrigger: 'onSubmit'
                  }}
                  errorsToShow={[ERROR_TYPES.ALPHANUMERIC]}
                  inputProps={{
                    maxLength: 50,
                    placeholder: 'Enter the evidence title',
                    onChange: ({ currentTarget: { value } }) => {
                      setState({
                        ...state,
                        title: value
                      });
                    }
                  }}
                />
>>>>>>> 1a3d6733 (feat/evidence-api: files)
              </div>
            </div>
            <div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Evidence Description</p>
              <div className="formDivInput">
<<<<<<< HEAD
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
=======
                <CoaFormItemTextArea
                  form={form}
                  errorsToShow={[]}
                  name="description"
                  fieldDecoratorOptions={{
                    rules: [
                      {
                        required: true,
                        message: ERROR_TYPES.EMPTY,
                        whitespace: true
                      }
                    ],
                  }}
                  inputTextAreaProps={{
                    placeholder: 'Enter the description',
                    maxLength: 500,
                    rows: 5,
                    onChange: ({ currentTarget: { value } }) => {
                      setState({
                        ...state,
                        description: value
                      });
                    }
                  }}
                />
>>>>>>> 1a3d6733 (feat/evidence-api: files)
              </div>
            </div>
            <div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Transaction Type</p>
              <div className="transactionType">
                <div className="formDivBorder">
                  <div className="customRadioDiv">
                    <input defaultChecked={!isAmountIncome(amount)} type="radio" name="transaction_type" value='outcome' id="" />
                    <div className="customRadio">
                      <div></div>
                    </div>
                  </div>

                  <span>Outcome</span>
                </div>
                <div className="formDivBorder">
                  <div className="customRadioDiv">
                    <input defaultChecked={isAmountIncome(amount)} type="radio" name="transaction_type" value='income' id="" />
                    <div className="customRadio">
                      <div></div>
                    </div>
                  </div>

                  <span>Income</span>
                </div>
              </div>
            </div>
            {currencyType === 'fiat' && (<div className="evidenceForm__body__form__group">
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
            {currencyType === 'crypto' && (<div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Select the corresponding transaction</p>
              <div className="formDivInput itemInput">
                <CoaFormItemSelect
                  form={form}
                  errorsToShow={[]}
                  name="transaction"
                  fieldDecoratorOptions={{
                    rules: [],
                  }}
                  selectProps={{
                    placeholder: 'Select the transaction',
                  }}
                />
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
<<<<<<< HEAD
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
=======
                    <Upload {...uploadProps}>
                      <Button className="uploadBtn">
                        <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>
>>>>>>> 1a3d6733 (feat/evidence-api: files)
                  </Form.Item>
                </div>
              </div>
            </div>)}
            <div className="evidenceForm__body__form__group evidenceForm__body__form__btns">
              <Button type='button'>Cancel</Button>
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
