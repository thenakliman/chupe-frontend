import React from 'react';
import propTypes from 'prop-types';
/* eslint-disable */
import {QuestionAnswerWrapper} from './QuestionAnswerWrapper';
/* eslint-enable */
require('./ShowQuestion.css');

/** Question component */
export class ShowQuestion extends React.Component {
  /** Constructor defining the default values for the fields.
  * @param {Object} props, properties for the component.
  */
  constructor(props) {
      super(props);
      this.state = {
        question: '',
        description: '',
        owner: '',
        assignedTo: '',
      };

      this.handleQuestionSummary = this.handleQuestionSummary.bind(this);
      this.handleQuestionDescription = this
          .handleQuestionDescription.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
      this.getInitialState = this.getInitialState.bind(this);
      this.validateForm = this.validateForm.bind(this);
      this.currentQuestion = this.getInitialState();
  }

  /** Provide the initial state to the component
  * @return {Object} initial state of the component
  */
  getInitialState() {
    const question = this.props.questions.find(
        (question) => question.id == this.props.match.params.id);
    return {
        question: question.question,
        description: question.description,
        owner: question.owner,
        assignedTo: question.assignedTo,
        id: question.id,
    };
  }

  /** Set initial state on component mount */
  componentDidMount() {
     this.setState(this.getInitialState());
  }

  /** Handle changes on the question fields
  * @param {object} event containing new modified value
  */
  handleQuestionSummary(event) {
      this.setState({question: event.target.value});
  }

  /** Handle changes on the question description fields
  * @param {object} event containing new modified value
  */
  handleQuestionDescription(event) {
      this.setState({description: event.target.value});
  }

  /** Validates form data
  * @return {bool} return whether data is valid or not
  */
  validateForm() {
      return (
          this.state.question =='' ||
          this.state.description == '' ||
          this.state.owner == '' ||
          this.state.assignedTo == '');
  }

  /** Handles submit of the form
  * @param {object} event containing new modified value
  */
  handleSubmit(event) {
      event.preventDefault();
      const hasError = this.validateForm();
      if (hasError) {
          return;
      }
      if (this.props.isEditing) {
        const question = {
          id: this.state.id,
          question: this.state.question,
          description: this.state.description,
          assignedTo: this.state.assignedTo,
          owner: this.state.owner,
        };
        this.props.updateQuestion(this.props.questions, question);
      }

      this.props.setEditingQuestion(!this.props.isEditing);
  }
  /** Renders show question component
      @return {object} returns ShowQuestion component
  */
  render() {
    const headerText = ('Asked By ' + this.state.owner +
                        ' to ' + this.state.assignedTo);
    return (
      <div className='show-question'>
        <div>
          <QuestionAnswerWrapper
            headerText={headerText}
            bodyText={this.state.question}
            id='question-answer-summary-wrapper-id'/>
        </div>
        <div>
          <QuestionAnswerWrapper
            headerText={'Description Added by ' + this.state.owner}
            bodyText={this.state.description}
            id='question-answer-description-wrapper-id'/>
        </div>
        <form id='show-question-form' onSubmit={this.handleSubmit}>
        <p>
          <label htmlFor="show-question-input-field-id">
            Question:
          </label>
          <input type="text"
              id="show-question-input-field-id"
              value={this.state.question}
              onChange={this.handleQuestionSummary}
              disabled={!this.props.isEditing}
          />

        </p>
        <p>
          <label htmlFor="show-question-description-input-field-id">
            Description:
          </label>
          <textarea type="text"
            id="show-question-description-input-field-id"
            disabled={!this.props.isEditing}
            value={this.state.description}
            onChange={this.handleQuestionDescription}/>
        </p>
        <p>
            <button id='show-question-edit-button-id'
                    type='submit'
                    value='Submit'
                    className='submit-button'
                    >
              {this.props.isEditing?'Save':'Edit'}
            </button>
        </p>
      </form>
      </div>
    );
  }
}

ShowQuestion.propTypes = {
  isEditing: propTypes.bool.isRequired,
  users: propTypes.arrayOf(propTypes.object).isRequired,
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  setEditingQuestion: propTypes.func.isRequired,
  updateQuestion: propTypes.func.isRequired,
};
