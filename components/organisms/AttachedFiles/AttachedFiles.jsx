import { PaperClipOutlined } from '@ant-design/icons';
import React from 'react';
import { DictionaryContext } from 'components/utils/DictionaryContext';

export default function AttachedFiles({ files }) {
  const { texts } = React.useContext(DictionaryContext);
  return (
    <div className='attached-files'>
      <h2 className='attached-files__header'>{texts?.attachedFiles?.title || 'Attached Files'}</h2>
      {
        files && files.map((file) => (
          <div className='attached-files__file' key={file.name}>
            <div className='attached-files__file-left'>
              <PaperClipOutlined />
              <h4 className='attached-files__file-title'>{file.name}</h4>
            </div>
            <a
              className='attached-files__file-download'
              href={`${process.env.NEXT_PUBLIC_URL_HOST}${file.path}`}
              target="_blank"
              rel='noopener noreferrer'
              download
            >
              {texts?.general?.btnDownload || 'Download'}
            </a>
          </div>
        ))
      }
    </div>
  )
}
