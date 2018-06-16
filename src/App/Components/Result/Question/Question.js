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
      this.setFilter = this.setFilter.bind(this);
      this.filterByOwner = this.filterByOwner.bind(this);
    }

    /** Get all question on component mount */
    componentDidMount() {
        this.props.getQuestions();
        this.setState({filter: null});
    }

    /** set Filter for owner */
    setFilter() {
        this.setState({filter: {owner: this.props.loggedInUser}});
    }

    /** Filter question based on owner
     * @return {object} filtered questiosn
     */
    filterByOwner() {
        const questionsCopy = [...this.props.questions];
        if (!this.state.filter) {
          return questionsCopy;
        }

        return (questionsCopy.filter(
          (question) => question.owner == this.state.filter.owner));
    }
    /** returns Question component
    * @return {Object} Question component
    */
    render() {
        const questions = this.filterByOwner();
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
              </div>
              <div>
                <button id='asked-by-me-question-button'
                  className='ask-question-button'
                  type="button"
                  onClick={this.setFilter}
                >
                  Ask By Me
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
                    questions.map((question) =>(
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
    loggedInUser: propTypes.string.isRequired,
    getQuestions: propTypes.func.isRequired,
};
