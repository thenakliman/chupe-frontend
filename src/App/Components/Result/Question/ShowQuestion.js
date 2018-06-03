import React from 'react';
import propTypes from 'prop-types';
require('./ShowQuestion.css');

/** Question component */
export class ShowQuestion extends React.Component {
  /** Renders show question component
      @return {object} returns ShowQuestion component
  */
  render() {
    return (
      <div className='show-question'>
        <p>
          <label htmlFor="show-question-input-field-id">
            Question:
          </label>
          <input type="text"
              id="show-question-input-field-id"
              value={this.props.question}
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
            value={this.props.description} />
        </p>
        <p>
            <label>
              Assigned To:
            </label>
            <select disabled={!this.props.isEditing}
                    id='show-question-assigned-to-input-field-id'>
              <option value="">{this.props.assignedTo}</option>
            </select>
        </p>
        <p>
            <label>
              Owner:
            </label>
            <select disabled={!this.props.isEditing}
                    id='show-question-owner-input-field-id'>
              <option value="">{this.props.owner}</option>
            </select>
        </p>
        <p>
            <button id='show-question-edit-button-id'
                    onClick={this.props.setEditingQuestion}>
              Edit
            </button>
        </p>
      </div>
    );
  }
}

ShowQuestion.propTypes = {
  question: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  assignedTo: propTypes.string.isRequired,
  owner: propTypes.string.isRequired,
  isEditing: propTypes.bool.isRequired,
  setEditingQuestion: propTypes.func.isRequired,
};
