import React from 'react';
import propTypes from 'prop-types';

require('./Feedbacks.css');

export class Feedbacks extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.getAllFeedbacks(this.props.match.params.id);
    }

    render() {
      return (
         <div className={'feedback-container'}>
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
      )
    }
}

Feedbacks.propTypes = {
  getAllFeedbacks: propTypes.func.isRequired,
  feedbacks: propTypes.array
}