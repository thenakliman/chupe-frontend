import React from 'react';
import propTypes from 'prop-types';

require('./AddActionItem.css');

export class AddActionItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {description: '', assignedTo: '', deadlineToAct: ''};
      this.handleRetroDescription = this.handleRetroDescription.bind(this);
      this.handleActionItemAssignedToChange = this.handleActionItemAssignedToChange.bind(this);
      this.handleDueDateChange = this.handleDueDateChange.bind(this);
      this.createRetroActionItem = this.createRetroActionItem.bind(this);
    }

    handleRetroDescription(description) {
      this.setState({description: description});
    }

    handleActionItemAssignedToChange(assignedTo) {
      this.setState({assignedTo: assignedTo});
    }

    handleDueDateChange(deadlineToAct) {
      this.setState({deadlineToAct: deadlineToAct});
    }

    createRetroActionItem() {
      this.props.createActionItem(this.state);
      this.setState({description: '', assignedTo: '', deadlineToAct: ''});
    }

    render() {
      return (
      <div className='retro-pop-up-container'>
        <div id='add-action-item-container-id'
             className='add-action-item-container'>
                Description
                <textarea className={'add-action-item-creation-input'}
                       id={'add-action-item-description'}
                       maxLength={2000}
                       onChange={(event) =>
                          this.handleRetroDescription(event.target.value)}
                       value={this.state.description}
                />
                Due Date
                <input className={'action-item-due-date'}
                       id={'action-item-due-date'}
                       onChange={(event) =>
                          this.handleDueDateChange(event.target.value)}
                       value={this.state.deadlineToAct}
                       type={'date'}
                />
                Assigned To
                <select value={this.state.assignedTo}
                        className={'action-item-assigned-to'}
                        onChange={(event) =>
                            this.handleActionItemAssignedToChange(event.target.value)}>
                  <option>Select user</option>
                  {
                    this.props.users.map((user) =>
                      <option key={user.userName}
                              value={user.userName}>
                           {user.userName}
                      </option>
                    )
                  }
                </select>
                <div className='add-action-item-buttons-container'>
                    <button id='add-action-item-button-id'
                      className='add-action-item-button'
                      type='button'
                      onClick={this.createRetroActionItem}
                    >
                      Add Action Item
                    </button>
                    <button id='cancel-add-action-item-button-id'
                      className='add-action-item-button'
                      onClick={this.props.closeAddActionItemPopUp}
                      type='button'
                    >
                      Cancel
                    </button>
                </div>
        </div>
      </div>);
    }
}

AddActionItem.propTypes = {
  closeAddActionItemPopUp: propTypes.func.isRequired,
  createActionItem: propTypes.func.isRequired,
  users: propTypes.array.isRequired,
};
