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
  * @param {question} question with new modified value
  */
  handleQuestionSummary(question) {
    const completeQuestion = {
        id: this.state.id,
        question: question,
        description: this.state.description,
        assignedTo: this.state.assignedTo,
        owner: this.state.owner,
      };

    this.handleSubmit(completeQuestion);
  }

  /** Handle changes on the question description fields
  * @param {object} description new modified value
  */
  handleQuestionDescription(description) {
    const completeQuestion = {
        id: this.state.id,
        question: this.state.question,
        description: description,
        assignedTo: this.state.assignedTo,
        owner: this.state.owner,
      };

    this.handleSubmit(completeQuestion);
  }

  /** Validates form data
  * @param {object} questionData has question data
  * @return {bool} return whether data is valid or not
  */
  validateForm(questionData) {
      return (
          !questionData.question ||
          !questionData.description ||
          !questionData.owner ||
          !questionData.assignedTo);
  }

  /** Handles submit of the form
  * @param {object} question containing new modified value
  */
  handleSubmit(question) {
      const hasError = this.validateForm(question);
      if (hasError) {
          return;
      }
      this.props.updateQuestion(this.props.questions, question);
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
            saveHandler={this.handleQuestionSummary}
            id='question-answer-summary-wrapper-id'/>
        </div>
        <div>
          <QuestionAnswerWrapper
            headerText={'Description Added by ' + this.state.owner}
            bodyText={this.state.description}
            id='question-answer-description-wrapper-id'
            saveHandler={this.handleQuestionDescription}
          />
        </div>
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
