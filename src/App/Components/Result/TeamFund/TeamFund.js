import propTypes from 'prop-types';
import React from 'react';
/* eslint-disable */
import {AddRedeemTeamFund} from './AddRedeemTeamFund';
/* eslint-enable */

require('./TeamFund.css');
/**
* Team Fund component of the application.
*
* @author: thenakliman
*/
export class TeamFund extends React.Component {
  /** Fetch team fund while mounting this component */
  componentWillMount() {
    this.props.fetchTeamFund();
  }
/**
* Team Fund result component of the application.
*
* @return {Object} UserResult component.
*/
  render() {
    return (
        <div id='team-fund-container-id' className='team-fund-container'>
          <AddRedeemTeamFund fetchFundTypes={this.props.fetchFundTypes}
                             fundTypes={this.props.fundTypes}/>
          <table id='team-fund-table-id'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Username</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            { this.props.teamFund.map((teamMember, index) => (
                <tr key={`${teamMember.username}`}>
                  <td>{index+1}</td>
                  <td>{teamMember.owner}</td>
                  <td>{teamMember.totalAmount}</td>
                  <td>Add/Redeem Fund</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
    );
  }
}

TeamFund.propTypes = {
  teamFund: propTypes.arrayOf(propTypes.object).isRequired,
  fundTypes: propTypes.arrayOf(propTypes.object).isRequired,
  fetchTeamFund: propTypes.func.isRequired,
  fetchFundTypes: propTypes.func.isRequired,
};
