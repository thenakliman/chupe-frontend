import propTypes from 'prop-types';
import React from 'react';
import {history} from '../../../utils/history';
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
    this.state = {hasPopup: false, owner: null, transactionType: ''};
    this.addRedeemFund = this.addRedeemFund.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickRedeem = this.onClickRedeem.bind(this);
    this.addFund = this.addFund.bind(this);
  }
  /** Fetch team fund while mounting this component */
  componentWillMount() {
    this.props.fetchTeamFund();
  }

  /** toggle state of pop.
   * @param {string} owner
   * @param {string} transactionType
   */
  addRedeemFund(owner, transactionType) {
    let currentOwner;
    if (this.state.hasPopup) {
      currentOwner = null;
      transactionType = '';
    } else {
      currentOwner = owner;
    }

    this.setState({
        hasPopup: !this.state.hasPopup,
        owner: currentOwner,
        transactionType: transactionType,
    });
  }

  /** toggle state of pop.
   * @param {string} owner
   */
  onClickAdd(owner) {
    this.addRedeemFund(owner, 'CREDIT');
  }

  /** toggle state of pop.
   * @param {string} owner
   */
  onClickRedeem(owner) {
    this.addRedeemFund(owner, 'DEBIT');
  }

  /** toggle state of pop.
   * @param {string} owner
   */
  onClickDetail(owner) {
    history.push('/funds/'+owner);
  }

  /** Add fund.
   * @param {string} fundType
   * @param {number} amount
   */
  addFund(fundType, amount) {
    this.props.addFund({
      transactionType: this.state.transactionType,
      type: fundType,
      amount: amount,
      owner: this.state.owner,
      addedBy: this.props.loggedInUser,
      isApproved: false,
    });

    this.addRedeemFund(null);
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
                               closePopup={() => this.addRedeemFund(null)}
                               fundTypes={this.props.fundTypes}/>
          }
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
                <tr key={`${teamMember.owner}`}>
                  <td>{index+1}</td>
                  <td>{teamMember.owner}</td>
                  <td>
                    <span className='user-amount-container'>
                      <span
                        className='fund-operation-negative-sign'
                        id={`fund-operation-negative-sign-${teamMember.owner}`}
                        onClick={() => this.onClickRedeem(teamMember.owner)}>
                        -
                      </span>
                      <span className={'user-fund'}>
                      <u id={`user-amount-${teamMember.owner}`}
                         onClick={() => this.onClickDetail(teamMember.owner)}>
                        <i className={'user-fund-amount'}>
                          {teamMember.totalAmount}
                        </i>
                      </u>
                      </span>
                      <span
                        className='fund-operation-positive-sign'
                        id={`fund-operation-positive-sign-${teamMember.owner}`}
                        onClick={() => this.onClickAdd(teamMember.owner)}>
                        +
                      </span>
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
