import React, { useState } from 'react';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { lookup } from 'mime-types';
import { PaperClipOutlined } from '@ant-design/icons';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { Icon } from 'antd';

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

const getBase64File = async url => {
  const blob = await getImageBlob(url);
  const base64 = await blobToBase64(blob);
  return base64;
};

const downloadFile = async _file => {
  const _url = await getBase64File(`${process.env.NEXT_PUBLIC_URL_HOST}${_file.path}`);
  const a = document.createElement('a');
  a.href = _url;
  a.download = _file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const AttachedFile = ({ file }) => {
  const { texts } = React.useContext(DictionaryContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    await downloadFile(file);
    setIsLoading(false);
  };

  return (
    <div className="attached-files__file">
      {lookup(file.name).includes('image') && (
        <>
          <img src={`${process.env.NEXT_PUBLIC_URL_HOST}${file.path}`} alt={file.name} />
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
      <div className="attached-files__download">
        <div className="attached-files__download__file-left">
          <PaperClipOutlined />
          <h4 className="attached-files__download__file-title">{file.name}</h4>
        </div>
        <CoaTextButton
          onClick={handleDownload}
          loading={isLoading}
          className="attached-files__download__file-download"
        >
          {texts?.general?.btnDownload || 'Download'}
        </CoaTextButton>
      </div>
    </div>
  );
};

export default function AttachedFiles({ files }) {
  const { texts } = React.useContext(DictionaryContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadAll = async () => {
    setIsLoading(true);
    const promiseArray = files.map(async file => {
      await downloadFile(file);
    });

    await Promise.all(promiseArray);
    setIsLoading(false);
  };
  return (
    <div className="attached-files">
      <div className="attached-files__header">
        <div className="attached-files__header__titleContainer">
          <PaperClipOutlined />
          <h2 className="attached-files__header__title">
            {texts?.attachedFiles?.title || 'Attached Files'}
          </h2>
        </div>
        <CoaTextButton
          onClick={handleDownloadAll}
          loading={isLoading}
          className="attached-files__header__download"
        >
          <Icon type="download" />
          Download All
        </CoaTextButton>
      </div>

      {files && (
        <div className="attached-files__filesContainer">
          {files.map(file => {
            return <AttachedFile file={file} key={file.name} />;
          })}
        </div>
      )}
    </div>
  );
}
