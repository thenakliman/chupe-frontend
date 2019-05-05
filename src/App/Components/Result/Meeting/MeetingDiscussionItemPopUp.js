import React from 'react';
import propTypes from 'prop-types';

require('./MeetingDiscussionItemPopUp.css');

export class MeetingDiscussionItemPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {discussionItem: '', discussionItemType: '', assignedTo: ''};
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleMeetingDiscussionItemTypeChange = this.handleMeetingDiscussionItemTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleSubjectChange(value) {
    this.setState({discussionItem: value});
  }

  handleMeetingDiscussionItemTypeChange(value) {
    this.setState({discussionItemType: value});
  }

  handleAssignedToUserChange(value) {
    this.setState({assignedTo: value});
  }

  onSubmit() {
    this.props.onSubmit({
        discussionItem: this.state.discussionItem,
        discussionItemType: this.state.discussionItemType,
        assignedTo: this.state.assignedTo,
    });
  }

  render() {
    return (
      <div className={'meeting-discussion-item-pop-up-container'}>
      <div className={'meeting-discussion-item-pop-up-inner'}>
        <div>
          Meeting Discussion Item:
        </div>
          <textarea className={'meeting-discussion-item'}
                  value={this.state.discussionItem}
                  onChange={(event) => this.handleSubjectChange(event.target.value)}
                  resize={'none'}/>

        Assigned To
        <select value={this.state.assignedTo}
                id={'select-assigned-to'}
                className={'select-meeting-discussion-item-pop-up'}
                onChange={(event) => this.handleAssignedToUserChange(event.target.value)}
        >
        <option key={''} value={''}> Select user </option>
        {
          this.props.users.map((user) =>
            <option key={user.userName} value={user.userName}>
              {user.userName}
            </option>)
        }
        </select>
        Meeting Discussion Item Type:
        <select value={this.state.discussionItemType}
                id={'select-discussion-item-type'}
                className={'select-meeting-discussion-item-pop-up'}
                onChange={(event) => this.handleMeetingDiscussionItemTypeChange(event.target.value)}
        >
        <option key={''} value={''}> Select Discussion Item type </option>
        <option key={'INFORMATION'} value={'INFORMATION'}> Information </option>
        <option key={'ACTION_ITEM'} value={'ACTION_ITEM'}> Action Item </option>
        </select>
        <div className={'button-container-meeting-discussion-item'}>
          <button className={'meeting-discussion-item-buttons'}
                  id={'meeting-discussion-item-submit-button'}
                  onClick={this.onSubmit}>
              Submit
          </button>
          <button className={'meeting-discussion-item-buttons'}
                  id={'meeting-discussion-item-cancel-button'} onClick={this.props.onCancel}>
              Cancel
          </button>
        </div>
      </div>
      </div>
    );
  }
}

MeetingDiscussionItemPopUp.propTypes = {
  users: propTypes.array.isRequired,
  onSubmit: propTypes.func.isRequired,
  onCancel: propTypes.func.isRequired,
};
