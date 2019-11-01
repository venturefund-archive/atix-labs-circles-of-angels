import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';

const htmlEditorModules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'bullet' }]
  ],
  clipboard: {
    matchVisual: false
  }
};

const htmlEditorFormats = ['size', 'bold', 'italic', 'underline', 'bullet'];

export default class HtmlEditor extends Component {
  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill');
    }
  }

  render() {
    const { ReactQuill } = this;
    const { initialValue, value, onChange } = this.props;
    return typeof window !== 'undefined' && ReactQuill ? (
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
    ) : null;
  }
}
