import React from 'react';
import propTypes from 'prop-types';
/* eslint-disable */
import {QuestionAnswerWrapper} from './QuestionAnswerWrapper';
import {QuestionDescription} from './QuestionDescription';
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
        status: '',
        priority: '',
      };

      this.handleQuestionSummary = this.handleQuestionSummary.bind(this);
      this.handleQuestionDescription = this
          .handleQuestionDescription.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
      this.getInitialState = this.getInitialState.bind(this);
      this.validateForm = this.validateForm.bind(this);
      this.addAnswer = this.addAnswer.bind(this);
      this.currentQuestion = this.getInitialState();
  }

  /** Add answer
   * @param {string} answer, is the answer to the question.
   */
  addAnswer(answer) {
    const completeAnswer = {
      answer: answer,
      answeredBy: this.props.loggedInUser,
      questionId: this.props.match.params.id,
    };

    this.props.addAnswer(completeAnswer);
  }

  /** Provide the initial state to the component
  * @return {Object} initial state of the component
  */
  getInitialState() {
    const question = this.props.questions.find(
        (question) => question.id == this.props.match.params.id) || {};
    return {
        question: question.question,
        description: question.description,
        owner: question.owner,
        assignedTo: question.assignedTo,
        id: question.id,
        status: question.status,
        priority: question.priority,
    };
  }

  /** Set initial state on component mount */
  componentDidMount() {
     if (!this.props.questions.length) {
       this.props.getAllQuestions();
     }

     if (!this.props.users.length) {
       this.props.getAllUsers();
     }

     this.props.getAnswers(this.props.match.params.id);
     this.setState(this.getInitialState());
  }

  /** component did update
   *  @param {object} prevProps previous props
   */
  componentDidUpdate(prevProps) {
    /* todo: Error prone code, correct this code by explicitly checking
     * equality for each element of the array.
     */
    if (this.props.questions !== prevProps.questions) {
      this.setState(this.getInitialState());
    }
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
        status: this.state.status,
        priority: this.state.priority,
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
        status: this.state.status,
        priority: this.state.priority,
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
    return (
      <div className='show-question'>
        <div className='question-description'>
          <QuestionDescription summary={this.state.question}
                               owner={this.state.owner}
                               priority={this.state.priority}
                               status={this.state.status}
                               id={this.state.id}
                               assignedTo={this.state.assignedTo} />
        </div>
        <div>
          <QuestionAnswerWrapper
            headerText={'Description Added by ' + this.state.owner}
            bodyText={this.state.description}
            id='question-answer-description-wrapper-id'
            saveHandler={this.handleQuestionDescription}
          />
        </div>
        {this.props.answers.map((answer) => (
          <div key={answer.id}>
            <QuestionAnswerWrapper
              headerText={'Answer Added by ' + answer.answeredBy}
              bodyText={answer.answer}
              saveHandler={this.handleQuestionDescription}
              id={`show-question--answer-${answer.id}-id`}
            />
          </div>
        ))}
        <div>
          <QuestionAnswerWrapper
            headerText={'Description Added by ' + this.props.loggedInUser}
            bodyText=''
            isEditing={true}
            id='show-question-answer--temporary-id'
            saveHandler={this.addAnswer}
          />
        </div>
      </div>
    );
  }
}

ShowQuestion.propTypes = {
  users: propTypes.arrayOf(propTypes.object).isRequired,
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  answers: propTypes.arrayOf(propTypes.object).isRequired,
  loggedInUser: propTypes.string.isRequired,
  updateQuestion: propTypes.func.isRequired,
  getAnswers: propTypes.func.isRequired,
  addAnswer: propTypes.func.isRequired,
  getAllQuestions: propTypes.func.isRequired,
  getAllUsers: propTypes.func.isRequired,
};
