import React from 'react';
import propTypes from 'prop-types';
import {FeedbackPopUp} from './FeedbackPopUp';

require('./Feedbacks.css');

export class Feedbacks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isGivingFeedback: false};
      this.toggleGiveFeedbackPopUp = this.toggleGiveFeedbackPopUp.bind(this);
      this.onSubmitOfFeedback = this.onSubmitOfFeedback.bind(this);
    }

    componentDidMount() {
      this.props.getAllFeedbacks(this.props.match.params.id);
      this.props.getAllUsers();
    }

    toggleGiveFeedbackPopUp() {
      this.setState({isGivingFeedback: !this.state.isGivingFeedback});
    }

    onSubmitOfFeedback(feedback) {
      this.props.giveFeedback({...feedback, sessionId: this.props.match.params.id});
      this.toggleGiveFeedbackPopUp();
    }

    render() {
      return (
         <div className={'feedback-container'}>
           {this.state.isGivingFeedback &&
              <FeedbackPopUp users={this.props.users}
                             onSubmit={this.onSubmitOfFeedback}
                             onCancel={this.toggleGiveFeedbackPopUp}
              />
           }
           <div className={'give-feedback-button-container'}>
             <button id='give-feedback-button'
                     className={'give-feedback-button'}
                     onClick={() => this.toggleGiveFeedbackPopUp()}>
                Give Feedback
             </button>
           </div>
           <table id='all-feedbacks-ordered-list'>
             <thead>
               <tr className='feedbacks-table-header'>
                 <th> Id </th>
                 <th> description </th>
                 <th> Given By </th>
               </tr>
             </thead>
             <tbody id='all-feedbacks-table-body-id'
                    className={'feedbacks-table-body'}>
             {
               this.props.feedbacks.map((feedback) => (
                 <tr key={`${feedback.id}`}>
                   <td> {feedback.id} </td>
                   <td className='feedbacks-row'>
                           {feedback.description}
                   </td>
                   <td> {feedback.givenBy}</td>
                 </tr>
               ))
             }
             </tbody>
           </table>
         </div>
      );
    }
}

Feedbacks.propTypes = {
  getAllFeedbacks: propTypes.func.isRequired,
  getAllUsers: propTypes.func.isRequired,
  giveFeedback: propTypes.func.isRequired,
  feedbacks: propTypes.array.isRequired,
  users: propTypes.array.isRequired,
};
