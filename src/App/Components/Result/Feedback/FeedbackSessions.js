import React from 'react';
import propTypes from 'prop-types';

require('./FeedbackSessions.css');

export class FeedbackSessions extends React.Component {
    componentDidMount() {
      this.props.getAllFeedbackSessions();
    }

    render() {
      return (
      <div id='feedbackSession-container-id'
           className='feedbackSession-container'>
          <div className='feedback-sessions-create-container'>
              <input id='feedbackSession-input-id'
                className='feedbackSession-input'
              />
              <button id='feedbackSession-button-id'
                className='feedbackSession-button'
                type='button'
              >
                Create Feedback Session
              </button>
          </div>
          <div>
            <table id='all-feedbackSessions-ordered-list'>
              <thead>
                <tr className='feedbackSession-table-header'>
                  <th> Id </th>
                  <th> description </th>
                  <th> Created By </th>
                </tr>
              </thead>
              <tbody id='all-feedbackSession-table-body-id'
                     className={'feedbackSession-table-body'}>
              {
                this.props.feedbackSessions.map((feedbackSession) => (
                  <tr key={`${feedbackSession.id}`}>
                    <td> {feedbackSession.id} </td>
                    <td className='feedbackSession-row'>
                            {feedbackSession.description}
                    </td>
                    <td> {feedbackSession.createdBy}</td>
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

FeedbackSessions.propTypes = {
  feedbackSessions: propTypes.array,
  getAllFeedbackSessions: propTypes.func.isRequired,
};
