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
      <div id='question-description' className='question-description-with-summary'>
        <div id='question-summary' className='question-summary'>
          #{this.props.id} {this.props.summary}
        </div>
        <div className='question-description-container'>
          <div id='question-owner' className='question-summary-item'>
            <span>Asked By:</span>
            <span id='question-summary-asked-by'>{this.props.owner}</span>
          </div>
          <div id='question-assigned-to' className='question-summary-item'>
            <span>Assigned To: </span>
            <span id='question-summary-assigned-to'>
              {this.props.assignedTo}
            </span>
          </div>
          <div id='question-status' className='question-summary-item'>
            <span>Status: </span>
            <span id='question-summary-status'>{this.props.status}</span>
          </div>
          <div id='question-priority'className='question-summary-item'>
            <span>Priority: </span>
            <span id='question-summary-priority'>{this.props.priority}</span>
          </div>
        </div>
      </div>
    );
  }
}
