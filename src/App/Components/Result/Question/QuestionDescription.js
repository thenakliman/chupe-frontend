import React from 'react';

require('./QuestionDescription.css');

/** Component for Question description */
export class QuestionDescription extends React.Component {
  /** Returns component to be rendered.
   *
   *  @return {object} component to be rendered
   */
  render() {
    return (
      <div id='question-description'>
        <div id='question-summary'>
          {this.props.summary}
        </div>
        <div className='question-description-container'>
          <div id='question-owner' className='question-summary-item'>
            Asked By: {this.props.owner}
          </div>
          <div id='question-assigned-to' className='question-summary-item'>
            Assigned To: {this.props.assignedTo}
          </div>
          <div id='question-status' className='question-summary-item'>
            Status: {this.props.status}
          </div>
          <div id='question-priority'className='question-summary-item'>
            Priority: {this.props.priority}
          </div>
        </div>
      </div>
    );
  }
}
