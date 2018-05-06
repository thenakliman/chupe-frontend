import React from 'react'; // eslint-disable-line no-unused-vars
import propTypes from 'prop-types';

/** QuestionResult component with input field having for asking
* question.
*/
export class QuestionResult extends React.Component {
    /** Get all questions on component mount */
    componentDidMount() {
        // TODO(thenaliman): Uncomment it once backend api has been implemented
        // this.props.getQuestions();
    }
    /** Returns input field in form with a button.
    *
    * @return {object} Component for asking question.
    */
    render() {
        console.log('in question result component');
        return (
            <div id='ask-question-div' className='input-field-for-question'>
                <form id="ask-question-form">
                    <input type="text"
                           id="ask-question-input-field"/>
                    <button type="button"
                            onClick={this.props.askQuestion}>
                                    Ask Question
                    </button>
                </form>
            </div>
        );
    }
}

QuestionResult.propTypes = {
    getQuestions: propTypes.func.isRequired,
    askQuestion: propTypes.func.isRequired,
};
