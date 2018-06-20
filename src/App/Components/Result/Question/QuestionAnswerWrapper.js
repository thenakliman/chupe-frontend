import React from 'react';

require('./QuestionAnswerWrapper.css');

/** Question answer header component. */
export class QuestionAnswerWrapper extends React.Component {
  /** Constructor for the QuestionAnswerWrapper.
   *  @param {object} props, properties of the component
   */
  constructor(props) {
    super(props);
    this.toggleEditingMode = this.toggleEditingMode.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.state = {isEditingHeader: false, bodyText: props.bodyText};
  }

  // todo(thenakliman): optimization here by using some alternate approach.
  /** Called on update of the component.
   * @param {object} prevProps, previous property of the component
   */
  componentDidUpdate(prevProps) {
    if (this.props.bodyText !== prevProps.bodyText) {
      this.setState({bodyText: this.props.bodyText});
    }
  }

  /** Toggle editing mode for the component. */
  toggleEditingMode() {
    if (this.state.isEditingHeader) {
      this.props.saveHandler(this.state.bodyText);
    }
    this.setState({isEditingHeader: !this.state.isEditingHeader});
  }

  /** Handle change in description.
   * @param {object} event caused by changed in description field
   */
  handleDescriptionChange(event) {
    this.setState({bodyText: event.target.value});
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
                <span id='edit-question-answer-wrapper-id'
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
                {this.state.isEditingHeader?
                  <textarea id="question-answer-wrapper-table-textarea-id"
                    className="description-textarea"
                    value={this.state.bodyText}
                    onChange={this.handleDescriptionChange}/>
                  :this.state.bodyText}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
