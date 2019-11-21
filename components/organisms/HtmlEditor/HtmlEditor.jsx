import React from 'react';
import 'react-quill/dist/quill.snow.css';

const htmlEditorModules = {
  toolbar: [[{ size: [] }], ['bold', 'italic'], [{ list: '' }]],
  clipboard: {
    matchVisual: false
  }
};

const htmlEditorFormats = ['size', 'bold', 'italic', 'underline'];

const HtmlEditor = ({ name, value, onChange }) => {
  const ReactQuill = require('react-quill');
  return (
    <div className="HtmlEditor">
      <ReactQuill
        name={name}
        theme="snow"
        onChange={content => {
          onChange(undefined, name, content);
        }}
        value={value}
        modules={htmlEditorModules}
        formats={htmlEditorFormats}
      />
    </div>
  );
};

export default HtmlEditor;
