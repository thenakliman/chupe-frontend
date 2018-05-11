import React from 'react'; // eslint-disable-line no-unused-vars
import propTypes from 'prop-types';

require('./AskQuestion.css');


/** AskQuestion component with input field having for asking
* question.
*/
export class AskQuestion extends React.Component {
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

        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /** Get all questions on component mount */
    componentDidMount() {
         this.props.getQuestions();
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

    /** Handle changes on the question owner fields
    * @param {object} event containing new modified value
    */
    handleOwnerChange(event) {
        this.setState({owner: event.target.value});
    }

    /** Handle changes on the question assigned to fields
    * @param {object} event containing new modified value
    */
    handleAssignedToChange(event) {
        this.setState({assignedTo: event.target.value});
    }

    /** Handles submit of the form
    * @param {object} event containing new modified value
    */
    handleSubmit(event) {
        event.preventDefault();
        this.props.askQuestion(this.state);
    }
    /** Returns input field in form with a button.
    *
    * @return {object} Component for asking question.
    */
    render() {
        return (
            <div id='ask-question-div' className='input-field-for-question'>
                <form id="ask-question-form" onSubmit = {this.handleSubmit}>
                    <input type="text"
                        id="ask-question-input-field"
                        value={this.state.value}
                        onChange={this.handleQuestionSummary}
                    />
                    <textarea id='question-description-textarea'
                        value={this.state.value}
                        onChange={this.handleQuestionDescription}
                    />

                    <select id='question-owner'
                        value={this.state.value}
                        onChange={this.handleOwnerChange}>
                     {
                         this.props.users.map((user) =>(
                             <option key={`${user.userName}`}>
                                {user.userName}
                             </option>))
                     }
                     </select>
                    <select id='question-assigned-to'
                        value={this.state.value}
                        onChange={this.handleAssignedToChange}>
                     {
                         this.props.users.map((user) =>(
                             <option key={`${user.userName}`}>
                                {user.userName}
                             </option>))
                     }
                     </select>
                    <button id="ask-question-submit-button"
                        type="submit"
                        value="Submit">

                        Ask Question
                    </button>
                </form>
            </div>
        );
    }
}

AskQuestion.propTypes = {
    getQuestions: propTypes.func.isRequired,
    askQuestion: propTypes.func.isRequired,
    users: propTypes.arrayOf(propTypes.object).isRequired,
};
