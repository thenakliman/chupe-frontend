import React from 'react';

require('./QuestionAnswerWrapper.css');

/** Question answer header component. */
export class QuestionAnswerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEditingMode = this.toggleEditingMode.bind(this);
    this.state = {isEditingHeader: false};
  }

  toggleEditingMode() {
    this.setState({isEditingHeader: !this.state.isEditingHeader});
  }
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
              <th className='table-border'
                  id='question-answer-wrapper-table-header-id'>
                <span id='question-answer-wrapper-table-header-text-id'>
                    {this.props.headerText}
                </span>
                <span id='edit-question-answer-wrapper-content-id'
                      className='edit-button'
                      onClick={this.toggleEditingMode}
                >
                  {this.state.isEditingHeader?'Save':'Edit'}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className='table-border'>
            <tr className='table-border'>
              <td className='table-border'
                  id='question-answer-wrapper-table-body-id'>
                {this.props.bodyText}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
