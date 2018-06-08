import React from 'react';
import propTypes from 'prop-types';
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
        question: this.props.question,
        description: this.props.description,
        owner: this.props.owner,
        assignedTo: this.props.assignedTo,
        id: this.props.id,
    };
  }

  /** Set initial state on component mount */
  componentDidMount() {
     this.setState(this.getInitialState());
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
      if (this.props.isEditing) {
        const question = {
          id: this.state.id,
          question: this.state.question,
          description: this.state.description,
          assignedTo: this.state.assignedTo,
          owner: this.state.owner,
        };
        this.props.updateQuestion(this.props.questions, question);
      }

      this.props.setEditingQuestion(!this.props.isEditing);
  }
  /** Renders show question component
      @return {object} returns ShowQuestion component
  */
  render() {
    return (
      <div className='show-question'>
        <form id='show-question-form' onSubmit={this.handleSubmit}>
        <p>
          <label htmlFor="show-question-input-field-id">
            Question:
          </label>
          <input type="text"
              id="show-question-input-field-id"
              value={this.state.question}
              onChange={this.handleQuestionSummary}
              disabled={!this.props.isEditing}
          />

        </p>
        <p>
          <label htmlFor="show-question-description-input-field-id">
            Description:
          </label>
          <textarea type="text"
            id="show-question-description-input-field-id"
            disabled={!this.props.isEditing}
            value={this.state.description}
            onChange={this.handleQuestionDescription}/>
        </p>
        <p>
            <label>
              Assigned To:
            </label>
            <select disabled={!this.props.isEditing}
                    id='show-question-assigned-to-input-field-id'
                    value={this.state.assignedTo}
                    onChange={this.handleAssignedToChange}>
            {
              this.props.isEditing &&
                 (<option value="">{this.props.owner}</option>) &&
                 this.props.users.map((user) =>
                 (user.username!=this.props.owner &&
                   <option key={`${user.userName}`}>
                      {user.userName}
                   </option>)) ||
               (!this.props.isEditing &&
                  <option value="">{this.props.assignedTo}</option>)
            }
            </select>
        </p>
        <p>
            <label>
              Owner:
            </label>
            <select disabled={!this.props.isEditing}
                    id='show-question-owner-input-field-id'
                    value={this.state.owner}
                    onChange={this.handleOwnerChange}
                    >
              {
                this.props.isEditing &&
                   (<option value="">{this.props.owner}</option>) &&
                   this.props.users.map((user) =>
                   ( user.username!=this.props.assignedTo &&
                     <option key={`${user.userName}`}>
                        {user.userName}
                     </option>)) ||
                 (!this.props.isEditing &&
                    <option value="">{this.props.owner}</option>)
              }
            </select>
        </p>
        <p>
            <button id='show-question-edit-button-id'
                    type='submit'
                    value='Submit'
                    className='submit-button'
                    >
              {this.props.isEditing?'Save':'Edit'}
            </button>
        </p>
      </form>
      </div>
    );
  }
}

ShowQuestion.propTypes = {
  id: propTypes.number.isRequired,
  question: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  assignedTo: propTypes.string.isRequired,
  owner: propTypes.string.isRequired,
  isEditing: propTypes.bool.isRequired,
  users: propTypes.arrayOf(propTypes.object).isRequired,
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  setEditingQuestion: propTypes.func.isRequired,
  updateQuestion: propTypes.func.isRequired,
};
