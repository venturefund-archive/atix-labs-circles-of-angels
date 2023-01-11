import React, { useState } from 'react';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { lookup } from 'mime-types';
import { Icon } from 'antd';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';

const getImageBlob = url => {
  return new Promise(async resolve => {
    const response = await fetch(url);
    const blob = response.blob();
    resolve(blob);
  });
};
// convert a blob to base64
const blobToBase64 = blob => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      resolve(dataUrl);
    };
    reader.readAsDataURL(blob);
  });
};

const getBase64Image = async url => {
  const blob = await getImageBlob(url);
  const base64 = await blobToBase64(blob);
  return base64;
};

const AttachedFile = ({ file }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async _file => {
    setIsLoading(true);
    const _url = await getBase64Image(`${process.env.NEXT_PUBLIC_URL_HOST}${_file.path}`);
    const a = document.createElement('a');
    a.href = _url;
    a.download = _file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsLoading(false);
  };
  return (
    <>
      {lookup(file.name).includes('image') && (
        <>
          <img src={`${process.env.NEXT_PUBLIC_URL_HOST}${file.path}`} alt={file.name} />
          <CoaButton
            className="attached-files__file__button"
            type="primary"
            onClick={async () => handleDownload(file)}
            loading={isLoading}
          >
            {!isLoading && <Icon type="download" />} Download
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
    </>
  );
};

export default function AttachedFiles({ files }) {
  const { texts } = React.useContext(DictionaryContext);

  return (
    <div className="attached-files">
      <h2 className="attached-files__header">{texts?.attachedFiles?.title || 'Attached Files'}</h2>

      {files &&
        files.map(file => {
          return (
            <div className="attached-files__file" key={file.name}>
              <AttachedFile file={file} />
            </div>
          );
        })}
    </div>
  );
}
