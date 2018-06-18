import React from 'react';

require('./QuestionAnswerWrapper.css');

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
          <thead className='question-answer-header'>
            <tr className='table-border'>
              <th className='table-border'>
                {this.props.headerText}
              </th>
            </tr>
          </thead>
          <tbody className='table-border'>
            <tr className='table-border'>
              <td className='table-border'>
                {this.props.bodyText}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
