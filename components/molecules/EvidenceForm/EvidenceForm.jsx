/* eslint-disable func-names */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Input, Checkbox, Button, Upload, Icon } from 'antd';
import PropTypes from 'prop-types';
import EvidenceNavigation from '../../atoms/EvidenceNavigation/EvidenceNavigation';

import './_style.scss';
import EvidenceFormFooter from '../../atoms/EvidenceFormFooter/EvidenceFormFooter';

const EvidenceFormContent = ({ form }) => {
  const { getFieldDecorator } = form;
  const uploadProps = {
    name: 'file',
    beforeUpload: () => false,
    accept: '.jpg,.png',
    multiple: false
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


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

          <Form className='evidenceForm__body__form'>
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
                    <input type="radio" name="evidence_type" id="" />
                    <div className="customRadio">
                      <div></div>
                    </div>
                  </div>
                  <span>Transfer</span>
                </div>
                <div className="formDivBorder">
                  <div className="customRadioDiv">
                    <input type="radio" name="evidence_type" id="" />
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
              <div className="formDivInput">
                <input
                  type="text"
                  name="evidence_title"
                  // className="formDivBorder"
                  placeholder="Enter the evidence title"
                />
              </div>
            </div>
            <div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Evidence Description</p>
              <div className="formDivInput">
                <textarea
              name="evidence-description"
              id=""
              cols="30"
              rows="5"
              placeholder="Enter the description"
                ></textarea>
              </div>
            </div>
            <div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Transaction Type</p>
              <div className="transactionType">
                <div className="formDivBorder">
                  <div className="customRadioDiv">
                    <input type="radio" name="transaction_type" id="" />
                    <div className="customRadio">
                      <div></div>
                    </div>
                  </div>

                  <span>Outcome</span>
                </div>
                <div className="formDivBorder">
                  <div className="customRadioDiv">
                    <input type="radio" name="transaction_type" id="" />
                    <div className="customRadio">
                      <div></div>
                    </div>
                  </div>

                  <span>Income</span>
                </div>
              </div>
            </div>
            <div className="evidenceForm__body__form__group">
              <p className="formDivTitle formDivInfo">Amount Spent</p>
              <div className="formDivInput formDivAmount">
                <input
                  type="number"
                  name="amount_spent"
                  id=""
                  placeholder="Enter the amount spent"
                />
                <div className="formCurrency">USD</div>
              </div>
            </div>
            <div className="evidenceForm__body__form__group">
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
                    {getFieldDecorator('dragger', {
                      valuePropName: 'fileList',
                      getValueFromEvent: normFile,
                    })(
                      <Upload name="logo" action="/upload.do" listType="text">
                        <Button className='uploadBtn'>
                          <Icon type="upload" /> Click to upload
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="evidenceForm__body__form__group evidenceForm__body__form__btns">
              <button type='button'>Cancel</button>
              <button type='submit'>Add Evidence</button>
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
