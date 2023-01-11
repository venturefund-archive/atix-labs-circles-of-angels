import React from 'react';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { lookup } from 'mime-types';
import { Icon } from 'antd';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';

export default function AttachedFiles({ files }) {
  const { texts } = React.useContext(DictionaryContext);
  return (
    <div className="attached-files">
      <h2 className="attached-files__header">{texts?.attachedFiles?.title || 'Attached Files'}</h2>

      {files &&
        files.map(file => (
          <div className="attached-files__file" key={file.name}>
            {lookup(file.name).includes('image') && (
              <>
                <img src={`${process.env.NEXT_PUBLIC_URL_HOST}${file.path}`} alt={file.name} />
                <CoaButton
                  href={`${process.env.NEXT_PUBLIC_URL_HOST}${file.path}`}
                  className="attached-files__file__button"
                  type="primary"
                >
                  <Icon type="download" /> Download
                </CoaButton>
              </>
            )}
            {lookup(file.name).includes('pdf') && (
              <iframe
                title={file.name}
                src={`${process.env.NEXT_PUBLIC_URL_HOST}${file.path}`}
                width="100%"
                height="100%"
              ></iframe>
            )}
          </div>
        ))}
    </div>
  );
}
