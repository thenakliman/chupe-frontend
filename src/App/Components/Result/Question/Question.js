import React from 'react';
import propTypes from 'prop-types';
import {history} from '../../../utils/history';

require('./Question.css');

/** Question component displaying questions on click. */
export class Question extends React.Component {
    /** Constructor for the Question component
     * @param {object} props, properties of the component
     */
    constructor(props) {
      super(props);
      this.state = {filter: null};
      this.setOwnerFilter = this.setOwnerFilter.bind(this);
      this.setAssignedToFilter = this.setAssignedToFilter.bind(this);
      this.filterByOwner = this.filterByOwner.bind(this);
      this.filterByAssignedTo = this.filterByAssignedTo.bind(this);
      this.resetFilter = this.resetFilter.bind(this);
    }

    /** Get all question on component mount */
    componentDidMount() {
        /* todo(thenakliman): Optimization, get questions only if questions
         * does not exist in redux
         */
        this.props.getQuestions();
        this.setState({filter: null});
    }

    /** set Filter for owner */
    setOwnerFilter() {
        this.setState({filter: {owner: this.props.loggedInUser}});
    }

    /** reset Filter for owner */
    resetFilter() {
        this.setState({filter: null});
    }

    /** set Filter for assigned to */
    setAssignedToFilter() {
        this.setState({filter: {assignedTo: this.props.loggedInUser}});
    }

    /** Filter question based on owner
     * @param {object} questions to be filtered
     * @return {object} filtered questiosn
     */
    filterByOwner(questions) {
        const questionsCopy = [...questions];
        if (!this.state.filter || !this.state.filter.owner) {
          return questionsCopy;
        }

        return (questionsCopy.filter(
          (question) => question.owner == this.state.filter.owner));
    }
    /** Filter question based on Assigned to
     * @param {object} questions to be filtered
     * @return {object} filtered questiosn
     */
    filterByAssignedTo(questions) {
        const questionsCopy = [...questions];
        if (!this.state.filter || !this.state.filter.assignedTo) {
          return questionsCopy;
        }

        return (questionsCopy.filter(
          (question) => question.assignedTo == this.state.filter.assignedTo));
    }

    /** returns Question component
    * @return {Object} Question component
    */
    render() {
        let questions = this.props.questions;
        questions = this.filterByOwner(questions);
        questions = this.filterByAssignedTo(questions);
        return (
          <div className='question-result-container'>
            <div>
              <button id='ask-question-button'
                className='question-button'
                type="button"
                onClick={()=> history.push('/question/ask')}
              >
                Ask Question
              </button>
            </div>
            <div>
              <button id='asked-to-me-question-button'
                className='question-button'
                type="button"
                onClick={this.setAssignedToFilter}
              >
                Asked to Me
              </button>
            </div>
              <div>
                <button id='asked-by-me-question-button'
                  className='question-button'
                  type="button"
                  onClick={this.setOwnerFilter}
                >
                  Ask By Me
                </button>
            </div>
            <div>
              <button id='show-all-question-button'
                className='question-button'
                type="button"
                onClick={this.resetFilter}
              >
                Show All
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
                      <th> Priority </th>
                        </tr>
                  </thead>
                  <tbody id='all-questions-table-id'>
                  {
                    questions.map((question) =>(
                      <tr key={`${question.id}`}>
                        <td> {question.id} </td>
                        <td> {question.question} </td>
                        <td> {question.owner}</td>
                        <td> {question.assignedTo} </td>
                        <td> {question.priority}</td>
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
    loggedInUser: propTypes.string.isRequired,
    getQuestions: propTypes.func.isRequired,
};
