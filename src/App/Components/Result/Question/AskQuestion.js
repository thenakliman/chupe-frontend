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
        this.state = this.getInitialState();

        this.handleQuestionSummary = this.handleQuestionSummary.bind(this);
        this.handleQuestionDescription = this
            .handleQuestionDescription.bind(this);

        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    /** Provide the initial state to the component
    * @return {Object} initial state of the component
    */
    getInitialState() {
        return {
            question: '',
            description: '',
            owner: '',
            assignedTo: '',
        };
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
        this.props.askQuestion(this.state);
        this.setState(this.getInitialState());
    }
    /** Returns input field in form with a button.
    *
    * @return {object} Component for asking question.
    */
    render() {
        return (
            <div id='ask-question-div' className='input-field-for-question'>
                <form id="ask-question-form" onSubmit = {this.handleSubmit}>
                  <p>
                    <label>
                      Question:
                    </label>
                    <input type="text"
                        id="ask-question-input-field"
                        value={this.state.value}
                        onChange={this.handleQuestionSummary}
                    />
                  </p>
                  <p>
                    <label>
                        Description:
                    </label>
                    <textarea id='question-description-textarea'
                        value={this.state.value}
                        onChange={this.handleQuestionDescription}
                    />
                  </p>
                  <p>
                    <label>
                        Owner:
                    </label>
                    <select id='question-owner'
                      value={this.state.value}
                      onChange={this.handleOwnerChange}>
                        <option value="">select owner</option>
                        {
                           this.props.users.map((user) =>(
                              <option key={`${user.userName}`}>
                                 {user.userName}
                              </option>))
                        }
                     </select>
                  </p>
                  <p>
                    <label>
                        Assigned TO:
                    </label>
                    <select id='question-assigned-to'
                      value={this.state.value}
                      onChange={this.handleAssignedToChange}>
                        <option value="">assign to user</option>
                        {
                           this.props.users.map((user) =>(
                             <option key={`${user.userName}`}>
                                {user.userName}
                             </option>))
                        }
                     </select>
                  </p>
                  <div className="ask-question-submit-button">
                    <button id="ask-question-submit-button"
                        type="submit"
                        value="Submit">
                        Ask Question
                    </button>
                  </div>
                </form>
            </div>
        );
    }
}

AskQuestion.propTypes = {
    askQuestion: propTypes.func.isRequired,
    users: propTypes.arrayOf(propTypes.object).isRequired,
};
