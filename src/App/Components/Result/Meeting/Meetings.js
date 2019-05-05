import React from 'react';
import propTypes from 'prop-types';
import {history} from '../../../utils/history';

require('./Meetings.css');

export class Meetings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {subject: ''};
      this.createMeeting = this.createMeeting.bind(this);
      this.viewMeeting = this.viewMeeting.bind(this);
    }

    componentDidMount() {
      this.props.getAllMeetings();
    }

    onSubjectChange(newSubject) {
      this.setState({subject: newSubject});
    }

    createMeeting() {
      this.props.createMeeting(this.state.subject);
      this.setState({subject: ''});
    }

    viewMeeting(id) {
      history.push('/meeting/' + id);
    }

    render() {
      return (
      <div id='meeting-container-id'
           className='meeting-container'>
          <div className='meeting-create-container'>
              <input id='meeting-input-id'
                className='meeting-input'
                value={this.state.subject}
                onChange={(event) =>
                            this.onSubjectChange(event.target.value)}
              />
              <button id='meeting-button-id'
                className='meeting-button'
                type='button'
                onClick={this.createMeeting}
              >
                Create Meeting
              </button>
          </div>
          <div>
            <table id='all-meetings-ordered-list'>
              <thead>
                <tr className='meeting-table-header'>
                  <th> Id </th>
                  <th> subject </th>
                  <th> Created By </th>
                </tr>
              </thead>
              <tbody id='all-meeting-table-body-id'
                     className={'meeting-table-body'}>
              {
                this.props.meetings.map((meeting) => (
                  <tr key={`${meeting.id}`}
                      id={`meeting-${meeting.id}`}
                      onClick={() => this.viewMeeting(meeting.id)}>
                    <td> {meeting.id} </td>
                    <td className='meeting-row'>
                            {meeting.subject}
                    </td>
                    <td> {meeting.createdBy}</td>
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

Meetings.propTypes = {
  meetings: propTypes.array,
  getAllMeetings: propTypes.func.isRequired,
  createMeeting: propTypes.func.isRequired,
};
