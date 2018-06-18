import React from 'react';

require('QuestionAnswerWrapper.css');

/** Question answer header component. */
export class QuestionAnswerWrapper extends React.Component {
  /** Provide rendering for the Question Answer
   * @return {object} returns QuestionAnswerWrapper
  */
  render() {
    return (
      <div id='question-answer-wrapper-id'
           className='question-answer-wrapper'
      >
        <table id='question-wrappper-table-id'>
          <thead>
            {this.props.headerText}
          </thead>
          <tbody>
            {this.props.bodyText}
          </tbody>
        </table>
      </div>
    );
  }
}
