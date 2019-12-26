import React from 'react';
import propTypes from 'prop-types';

require('./FeedbackPopUp.css');

export class FeedbackPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {description: '', feedbackGivenToUser: ''};
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleFeedbackTargetChange = this.handleFeedbackTargetChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleDescriptionChange(value) {
    this.setState({description: value});
  }

  handleFeedbackTargetChange(value) {
    this.setState({feedbackGivenToUser: value});
  }

  onSubmit() {
    this.props.onSubmit({
      description: this.state.description,
      givenTo: this.state.feedbackGivenToUser,
    });
  }

  render() {
    return (
        <div className={'feedback-pop-up-container'}>
          <div className={'feedback-pop-up-inner'}>
            <div>
              Feedback:
            </div>
            <textarea className={'feedback-description'}
                      value={this.state.feedback}
                      onChange={(event) => this.handleDescriptionChange(event.target.value)}
                      resize={'none'}/>

            Feedback To:
            <select value={this.state.feedbackGivenToUser}
                    className={'select-user-feedback'}
                    onChange={(event) => this.handleFeedbackTargetChange(event.target.value)}
            >
              <option key={''} value={''}> Select user</option>
              {
                this.props.users.map((user) =>
                    <option key={user.userName} value={user.userName}>
                      {user.userName}
                    </option>)
              }
            </select>
            <div className={'button-container'}>
              <button className={'feedback-buttons'}
                      id={'feedback-submit-button'}
                      onClick={this.onSubmit}>
                Submit
              </button>
              <button className={'feedback-buttons'}
                      id={'feedback-cancel-button'} onClick={this.props.onCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
    );
  }
}

FeedbackPopUp.propTypes = {
  users: propTypes.array.isRequired,
  onSubmit: propTypes.func.isRequired,
  onCancel: propTypes.func.isRequired,
};
