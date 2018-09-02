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
  /** Constructor, sets initial state and bind methods
   * @param {object} props initial state
   */
  constructor(props) {
    super(props);
    this.state = {hasPopup: false, owner: null};
    this.onClickAddRedeem = this.onClickAddRedeem.bind(this);
    this.addFund = this.addFund.bind(this);
  }
  /** Fetch team fund while mounting this component */
  componentWillMount() {
    this.props.fetchTeamFund();
  }

  /** toggle state of pop.
   * @param {string} owner
   */
  onClickAddRedeem(owner) {
    let currentOwner;
    if (this.state.hasPopup) {
      currentOwner = null;
    } else {
      currentOwner = owner;
    }

    this.setState({hasPopup: !this.state.hasPopup, owner: currentOwner});
  }

  /** Add fund.
   * @param {string} transactionType
   * @param {string} fundType
   * @param {number} amount
   */
  addFund(transactionType, fundType, amount) {
    this.props.addFund({
      transactionType: transactionType,
      fundType: fundType,
      amount: amount,
      owner: this.state.owner,
      addedBy: this.props.loggedInUser,
      isApproved: false,
    });
  }

  /**
  * Team Fund result component of the application.
  *
  * @return {Object} UserResult component.
  */
  render() {
    return (
        <div id='team-fund-container-id' className='team-fund-container'>
          { this.state.hasPopup &&
            <AddRedeemTeamFund fetchFundTypes={this.props.fetchFundTypes}
                               addFund={this.addFund}
                               fundTypes={this.props.fundTypes}/>
          }
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
                <tr key={`${teamMember.owner}`}>
                  <td>{index+1}</td>
                  <td>{teamMember.owner}</td>
                  <td>{teamMember.totalAmount}</td>
                  <td>
                    <span id={`add-redeem-team-fund-${teamMember.owner}`}
                          className='add-redeem-button'
                          onClick={
                            () => this.onClickAddRedeem(teamMember.owner)}>
                      Add/Redeem Fund
                    </span>
                  </td>
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
  loggedInUser: propTypes.string.isRequired,
  fetchTeamFund: propTypes.func.isRequired,
  fetchFundTypes: propTypes.func.isRequired,
  addFund: propTypes.func.isRequired,
};
