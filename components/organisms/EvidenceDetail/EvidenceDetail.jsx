import React from 'react';
import { ArrowLeftOutlined, PaperClipOutlined } from '@ant-design/icons';
import BlockIcon from 'components/atoms/BlockIcon/BlockIcon';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import ProjectHeroDetails from 'components/molecules/ProjectHeroDetails/ProjectHeroDetails';
import ProjectHeroDownload from 'components/molecules/ProjectHeroDownload/ProjectHeroDownload';
import './_style.scss';
import { useHistory } from 'react-router';

export function GoBack({ backRoute }) {
  const history = useHistory();
  return (
    <button
      className='go-back'
      type='button'
      onClick={() => history.push(backRoute)}>
      <ArrowLeftOutlined />
      <h3 className='go-back__text'>Go back</h3>
    </button>
  )
}

export function EvidenceTop() {
  return (
    <div className='evidence-top'>
      <div className='evidence-top__container'>
        <div className='evidence-top__header'>
          <CoaTag>In Progress</CoaTag>
          <BlockIcon url='/' />
        </div>
        <div className='evidence-top__organization'>
          <h3 className='evidence-top__indicator'>
            Organization name
          </h3>
          <h1
            className='evidence-top__org-name'
          >
            Wellness for families in Asia
          </h1>
          <div className='evidence-top__details'>
            <ProjectHeroDetails
              country='Thailand'
              timeframe='2 Months'
              budget='48000'
              beneficiary='Joe Demin'
            />
            <ProjectHeroDownload />
          </div>
        </div>
      </div>
    </div>
  )
}

export function EvidenceComments({ comments }) {
  return (
    <div className='evidence-comments'>
      <h2 className='evidence-comments__header'>
        Auditor&apos;s Review Comments
      </h2>
      {!comments && (
        <div className='evidence-comments__no-comments'>
          <img
            className='evidence-comments__image'
            src='/static/images/no-comments.svg' alt='no comments' />
          <h3 className='evidence-comments__message'>
            No activities on the blockchain yet
          </h3>
        </div>
      )}
    </div>
  )
}

export function EvidenceDetailContainer({
  evidence
}) {
  return (
    <div className='evidence-container'>
      {/* Evidence header */}
      <div className='evidence-container__header'>
        <h3 className='evidence-container__date'>
          March, 10th 2021 - 10:30
        </h3>
        <CoaTag>New</CoaTag>
      </div>
      { /* Evidence indicator */}
      <h3 className='evidence-container__indicator'>EVIDENCE N°1</h3>
      { /* Evidence title */}
      <h2 className='evidence-container__title'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </h2>
      <p className='evidence-container__description'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Aliquam in tellus dui. Phasellus cursus enim non tincidunt
        elementum. Quisque eget auctor ex. Proin ut sem arcu.
        Sed vel feugiat dui. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae;
        Duis a lacinia metus. Pellentesque ullamcorper
        mi porttitor erat euismod blandit. Duis
        vulputate arcu at lorem hendrerit,
        et lacinia tortor suscipit. Curabitur ultrices
        nisi eu sapien varius, eu dapibus enim finibus done.
      </p>
      {/* Evidence creator */}
      <h3 className='evidence-container__created-by'>
        Created by <b className='evidence-container__creator-name'>
          Juan Pablo Yoroi
        </b>
      </h3>
    </div>
  )
}

export function AttachedFiles({ files }) {
  return (
    <div className='attached-files'>
      <h2 className='attached-files__header'>Attached Files</h2>
      {
        files && files.map((file) => (
          <div className='attached-files__file' key={file.title}>
            <div className='attached-files__file-left'>
              <PaperClipOutlined />
              <h4 className='attached-files__file-title'>{file.title}</h4>
            </div>
            <a className='attached-files__file-download' href='/'>
              Download
            </a>
          </div>
        ))
      }
    </div>
  )
}

export function AmountSpent({ currency, amount }) {
  return (
    <div className='amount-spent'>
      <div className='amount-spent__left'>
        <div className='amount-spent__symbol'>
          <p>$</p>
        </div>
        <h3 className='amount-spent__legend'>Amount Spent</h3>
      </div>
      <div className='amount-spent__right'>
        <h4 className='amount-spent__amount'>{amount} {currency}</h4>
      </div>
    </div>
  )
}

export function Breadcrumb({ routes }) {
  return (
    <div className='evidence-breadcrumb'>
      {routes && routes.map((route) => (
        <div className='evidence-breadcrumb__element' key={route.title}>
          <h2 className='evidence-breadcrumb__title'>/ {route.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default function EvidenceDetail() {
  const breadcrumb = [
    {
      title: 'Milestone 1',
    },
    {
      title: 'Activity 1',
    },
    {
      title: 'Evidences',
    },
    {
      title: 'Evidence N°1'
    }
  ]
  const files = [
    {
      title: 'Deposit0028462.jpg'
    },
    {
      title: 'Deposit0028462.jpg'
    }
  ]
  return (
    <div className='evidence-detail'>
      <div className='evidence-detail__container'>
        <GoBack backRoute='' />
        <Breadcrumb routes={breadcrumb} />
        <EvidenceDetailContainer />
        <AmountSpent amount={5} currency='ETH' />
        <AttachedFiles files={files} />
      </div>
      <div className='evidence-detail__container'>
        <EvidenceComments />
      </div>
    </div>
  )
}
