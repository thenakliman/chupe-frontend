import React from 'react';
import propTypes from 'prop-types';
import {history} from '../../../utils/history';

require('./Question.css');

/** Question component displaying questions on click. */
export class Question extends React.Component {
    /** Constructor for the component
     * @param {object} props are the properties for the component
     */
    constructor(props) {
      super(props);
      this.state = {questions: []};
      this.filterOnOwner = this.filterOnOwner.bind(this);
    }

    /** Get all question on component mount */
    componentDidMount() {
        this.props.getQuestions();
        this.setState(Object.assign({}, {questions: this.props.questions}));
    }

    /** Filter component based on the owner */
    filterOnOwner() {
        const questions = [...this.props.questions];
        const filteredQuestion = questions.filter((question) =>
              question.owner === this.props.loggedInUsername);

        this.setState({questions: filteredQuestion});
    }

    /** returns Question component
    * @return {Object} Question component
    */
    render() {
        return (
          <div className='question-result-container'>
            <div>
              <button id='ask-question-button'
                className='ask-question-button'
                type="button"
                onClick={()=> history.push('/question/ask')}
              >
                Ask Question
              </button>
              <button id='show-owner-question-button-id'
                className='ask-question-button'
                type="button"
                onClick={this.filterOnOwner}
              >
                  Asked By Me
              </button>
              </div>
              <div>
                <table id='all-question-ordered-list'>
                  <thead>
                    <tr>
                      <th> Id </th>
                      <th> Question </th>
                      <th> Owner </th>
                      <th> Assigned To </th>
                        </tr>
                  </thead>
                  <tbody id='all-questions-table-id'>
                  {
                    this.state.questions.map((question) =>(
                      <tr key={`${question.id}`}>
                        <td> {question.id} </td>
                        <td> {question.question} </td>
                        <td> {question.owner}</td>
                        <td> {question.assignedTo} </td>
                        <td>
                          <button id={`view-question-button-` + question.id}
                                  className='view-question-button'
                                  type='button'
                                  onClick={
                                    ()=> history.push(
                                      '/question/' + question.id + '/view')}
                          >
                              View
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              </div>
            </div>
        );
    }
}

Question.propTypes = {
    questions: propTypes.arrayOf(propTypes.object).isRequired,
    loggedInUsername: propTypes.string.isRequired,
    getQuestions: propTypes.func.isRequired,
};
