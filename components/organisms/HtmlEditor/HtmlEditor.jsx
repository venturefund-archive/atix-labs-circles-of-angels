import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';

const htmlEditorModules = {
    toolbar: [[{ size: [] }], ['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
    clipboard: {
      matchVisual: false
    }
  };

  const htmlEditorFormats = ['size', 'bold', 'italic', 'underline', 'bullet'];

const HtmlEditor = ({ initialValue, value, onChange }) => (
  <div className="HtmlEditor">
    <ReactQuill
      theme="snow"
      onChange={onChange}
      defaultValue="hola"
      value="hola"
      modules={htmlEditorModules}
      formats={htmlEditorFormats}
    />
  </div>
);

export default HtmlEditor;
