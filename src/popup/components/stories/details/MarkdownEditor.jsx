import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import { tabsTitleClass, tabsPanelClass } from 'utils/foundation';
import bindAll from 'lodash/bindAll';

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.previewDefaultText = browser.i18n.getMessage('previewDefaultText');

    this.state = {
      previewMode: props.previewMode || false,
      content: props.content || '',
      previewSource: props.content || this.previewDefaultText
    }

    bindAll(this, [
      'handleWriteTabClick',
      'handlePreviewTabClick',
      'handleContentChange'
    ]);
  }

  handleWriteTabClick() {
    this.setState({previewMode: false});
  }

  handlePreviewTabClick() {
    this.setState({previewMode: true});
  }

  handleContentChange(event) {
    const value = event.target.value;
    this.setState({
      content: value,
      previewSource: value || this.previewDefaultText
    });
  }

  render() {
    return (
      <div>
        <ul className="tabs" data-tabs id={`edit-${this.props.id}`}>
          <li
            className={tabsTitleClass(!this.state.previewMode)}
            onClick={this.handleWriteTabClick}>
            <a href={`#write-${this.props.id}`} aria-selected={!this.state.previewMode}>
              Write
            </a>
          </li>
          <li
            className={tabsTitleClass(this.state.previewMode)}
            onClick={this.handlePreviewTabClick}>
            <a href={`#preview-${this.props.id}`} aria-selected={this.state.previewMode}>
              Preview
            </a>
          </li>
        </ul>
        <div className="tabs-content" data-tabs-content={`edit-${this.props.id}`}>
          <TextareaAutosize
            id={`write-${this.props.id}`}
            className={tabsPanelClass(!this.state.previewMode)}
            rows="2"
            placeholder={`Add a ${this.props.id}`}
            value={this.state.content}
            onChange={this.handleContentChange} />

          <div
            className={tabsPanelClass(this.state.previewMode)}
            id={`preview-${this.props.id}`}>
            <ReactMarkdown
              source={this.state.previewSource}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
