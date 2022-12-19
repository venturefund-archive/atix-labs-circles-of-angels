import React from 'react';
import { useHistory } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './_style.scss'

const GoBackButton = ({ goBackTo }) => {
  const history = useHistory()
  return (
    <div className='goBack'>
      <button
        className='goBack__button'
        type='button'
        onClick={() => {
          history.push(goBackTo)
        }}
      >
        <ArrowLeftOutlined />
        <h3 className='goBack__button__text'>Go back</h3>
      </button>
    </div>
  )
}

export default GoBackButton;
