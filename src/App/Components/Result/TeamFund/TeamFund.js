import propTypes from 'prop-types';
import React from 'react';

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
        <div id='team-fund-container-id' class='team-fund-container'>
          <table id='team-fund-table-id'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Username</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            { this.props.teamFund.map((teamMember, index) => (
                <tr key={`${teamMember.username}`}>
                  <td>{index+1}</td>
                  <td>{teamMember.owner}</td>
                  <td>{teamMember.totalAmount}</td>
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
  fetchTeamFund: propTypes.func.isRequired,
};
