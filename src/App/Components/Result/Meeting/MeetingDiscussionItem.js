import React from 'react';
import propTypes from 'prop-types';
/* eslint-disable */
import {MeetingDiscussionItemPopUp} from './MeetingDiscussionItemPopUp';
/* eslint-enable */

require('./MeetingDiscussionItem.css');

export class MeetingDiscussionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isAddingMeetingDiscussionItem: false};
    this.toggleMeetingDiscussionItemPopUp =
        this.toggleMeetingDiscussionItemPopUp.bind(this);
    this.onSubmitOfMeetingDiscussionItemPopUp =
        this.onSubmitOfMeetingDiscussionItemPopUp.bind(this);
  }

  componentDidMount() {
    this.props.getMeetingDiscussionItems(
        this.props.match.params.id);

    this.props.getAllUsers();
  }

  toggleMeetingDiscussionItemPopUp() {
    this.setState({
      isAddingMeetingDiscussionItem:
          !this.state.isAddingMeetingDiscussionItem,
    });
  }

  onSubmitOfMeetingDiscussionItemPopUp(meetingDiscussionItem) {
    this.props.createMeetingDiscussionItem({
      ...meetingDiscussionItem,
      meetingId: this.props.match.params.id,
    });
    this.toggleMeetingDiscussionItemPopUp();
  }

  render() {
    return (
        <div className={'meeting-discussion-item-container'}>
          {this.state.isAddingMeetingDiscussionItem &&
          <MeetingDiscussionItemPopUp
              users={this.props.users}
              onSubmit={this.onSubmitOfMeetingDiscussionItemPopUp}
              onCancel={this.toggleMeetingDiscussionItemPopUp}
          />
          }
          <div className={'meeting-discussion-item-button-container'}>
            <button id='meeting-discussion-item-button'
                    className={'meeting-discussion-item-button'}
                    onClick={() => this.toggleMeetingDiscussionItemPopUp()}>
              Create Meeting Discussion Item
            </button>
          </div>
          <table id='all-meeting-discussion-items-ordered-list'>
            <thead>
            <tr className='meeting-discussion-item-table-header'>
              <th> Id</th>
              <th> Subject</th>
              <th> Assigned To</th>
              <th> Created By</th>
            </tr>
            </thead>
            <tbody id='all-meeting-discussion-item-table-body-id'
                   className={'meeting-discussion-item-table-body'}>
            {
              this.props.meetingDiscussionItems.map((mDiscussionItem) => (
                  <tr key={`${mDiscussionItem.id}`}>
                    <td>{mDiscussionItem.id}</td>
                    <td>{mDiscussionItem.discussionItem}</td>
                    <td>{mDiscussionItem.assignedTo}</td>
                    <td>{mDiscussionItem.createdBy}</td>
                  </tr>
              ))
            }
            </tbody>
          </table>
        </div>
    );
  }
}

MeetingDiscussionItem.propTypes = {
  getMeetingDiscussionItems: propTypes.func.isRequired,
  getAllUsers: propTypes.func.isRequired,
  createMeetingDiscussionItem: propTypes.func.isRequired,
  meetingDiscussionItems: propTypes.array.isRequired,
  users: propTypes.array.isRequired,
};
