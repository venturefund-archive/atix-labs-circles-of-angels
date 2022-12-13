import React from 'react';
import { useHistory } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function GoBack() {
  const history = useHistory()
  return (
    <button
      className='go-back'
      type='button'
      onClick={() => history.goBack()}>
      <ArrowLeftOutlined />
      <h3 className='go-back__text'>Go back</h3>
    </button>
  )
}
