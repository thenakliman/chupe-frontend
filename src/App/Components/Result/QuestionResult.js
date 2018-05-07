import React from 'react'; // eslint-disable-line no-unused-vars
import propTypes from 'prop-types';

require('./QuestionResult.css');


/** QuestionResult component with input field having for asking
* question.
*/
export class QuestionResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {question: 'add your question here'};

        this.handleChange = this.handleChange.bind(this);
    }
    /** Get all questions on component mount */
    componentDidMount() {
        // TODO(thenaliman): Uncomment it once backend api has been implemented
        // this.props.getQuestions();
    }

    handleChange(event) {
        this.setState({question: event.target.value});
    }
    /** Returns input field in form with a button.
    *
    * @return {object} Component for asking question.
    */
    render() {
        return (
            <div id='ask-question-div' className='input-field-for-question'>
                <form id="ask-question-form" onSubmit = {this.props.askQuestion}>
                    <input type="text"
                        id="ask-question-input-field"
                        value={this.state.value} />
                    <button type="button" value="Submit">
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
