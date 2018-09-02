import React from 'react';
import propTypes from 'prop-types';
import {transactionMapping} from './constants';

require('./AddRedeemTeamFund.css');

/** Add or Redeem a team member fund. */
export class AddRedeemTeamFund extends React.Component {
  /** Constructor for the component.
   * @param {object} props for the component
   */
  constructor(props) {
    super(props);
    this.state = {
      transactionType: '',
      fundType: '',
      amount: 0,
    };

    this.handleAmountUpdate = this.handleAmountUpdate.bind(this);
    this.handleTransactionType = this.handleTransactionType.bind(this);
    this.handleFundType = this.handleFundType.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  /** Fetch team fund type on mount. */
  componentWillMount() {
    this.props.fetchFundTypes();
  }

  /** Handle amount update.
   * @param {number} amount to be added
   */
  handleAmountUpdate(amount) {
    this.setState({amount: amount});
  }

  /** Handle fund type update.
   * @param {string} fundType
   */
  handleFundType(fundType) {
    const typeId = this.props.fundTypes.find(
      (fund) => fund.type == fundType).id;

    this.setState({fundType: typeId});
  }

  /** Handle transaction type.
   * @param {string} value of transaction type
   */
  handleTransactionType(value) {
    this.setState({transactionType: transactionMapping[value]});
  }

  /** Handle submit event of button. */
  handleClick() {
    if (this.state.amount === 0) {
      return;
    }

    this.props.addFund(this.state.transactionType,
                       this.state.fundType,
                       this.state.amount);
  }

  /** Return Add/Redeem team fund type component.
   * @return {object} component for add/redeem
   */
  render() {
    return (
      <div id='team-fund-add-redeem-container-id'
           className='team-fund-add-redeem-container'>
        <select id='team-fund-action-select-id'
                value={this.state.value}
                onChange={
                  (event) => this.handleTransactionType(event.target.value)}
                className='add-redeem-ream-fund-select'>
          <option>Add</option>
          <option>Redeem</option>
        </select>

        <select id='team-fund-select-type-id'
                onChange={(event) => this.handleFundType(event.target.value)}
                value={this.state.value}
                className='add-redeem-ream-fund-select'>
        {
          this.props.fundTypes.map((fund) => (
            <option value={fund.id} key={fund.id}>{fund.type}</option>))
        }
        </select>

        <div className='team-fund-amount-container'>
          Amount:
          <input id='team-fund-amount-id'
                 onChange={
                  (event) => this.handleAmountUpdate(event.target.value)}
                 className='add-redeem-input-amount'/>
        </div>
        <button id='team-fund-submit-button-id'
                onClick={() => this.handleClick()}
                className='team-fund-submit-button'>Submit</button>
      </div>
    );
  }
}

AddRedeemTeamFund.propTypes = {
  fetchFundTypes: propTypes.func.isRequired,
  fundTypes: propTypes.arrayOf(propTypes.object).isRequired,
  addFund: propTypes.func.isRequired,
};
