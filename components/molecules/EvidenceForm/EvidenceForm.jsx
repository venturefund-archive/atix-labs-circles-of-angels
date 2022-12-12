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
import { Form, Button, Upload, Icon } from 'antd';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import EvidenceNavigation from '../../atoms/EvidenceNavigation/EvidenceNavigation';

import './_style.scss';
import EvidenceFormFooter from '../../atoms/EvidenceFormFooter/EvidenceFormFooter';
import { useProject } from '../../../hooks/useProject';
import Loading from '../Loading/Loading';
import { ERROR_TYPES } from '../../../constants/constants';
import { onlyAlphanumerics } from '../../../constants/Regex';
import { CoaFormItemInput } from '../CoaFormItems/CoaFormItemInput/CoaFormItemInput';
import { CoaFormItemTextArea } from '../CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { CoaFormItemSelect } from '../CoaFormItems/CoaFormItemSelect/CoaFormItemSelect';
import { toBase64 } from '../../utils/FileUtils';
import { createEvidence } from '../../../api/activityApi';

const EvidenceFormContent = ({ form }) => {
  const { id } = useParams();
  const { project, loading } = useProject(id);
  const { getFieldDecorator } = form;

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
      const b64Photo = await toBase64(value?.file);
      const { files } = state;
      files.push({
        file: b64Photo,
        uid: value?.file?.uid,
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    form.validateFields(async (err) => {
      if (!err) {
        console.log('TADADADADA')
        const response = await createEvidence(activityId, {
          ...state,
          amount,
        });

        console.log('RESPONSE', response)

        setButtonLoading(false);
      }
    });
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
              </div>
            </div>
            <div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Evidence Description</p>
              <div className="formDivInput">
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
                      rules: [
                        {
                          required: true,
                          message: ERROR_TYPES.EMPTY,
                          whitespace: true
                        }
                      ],
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
                    <Upload {...uploadProps}>
                      <Button className="uploadBtn">
                        <Icon type="upload"/> Click to upload
                      </Button>
                    </Upload>
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
