import React from 'react';
import propTypes from 'prop-types';

require('./Question.css');

/** Question component displaying questions on click. */
export class Question extends React.Component {
    /** returns Question component
    * @return {Object} Question component
    */
    render() {
        return (
            <div className='question-result-container'>
                <div>
                    <button id='ask-question-button'
                        type="button"
                        onClick={this.props.askQuestion}
                    >
                        Ask Question
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
                      <tbody>
                     {
                         this.props.questions.map((question) =>(
                         <tr key={`${question.id}`}>
                                <td> {question.id} </td>
                                <td> {question.question} </td>
                                <td> {question.owner}</td>
                                <td> {question.assignedTo} </td>
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
    askQuestion: propTypes.func.isRequired,
};
